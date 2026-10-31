import { Router, Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Coupon } from '../models/Coupon';
import { WebsiteSettings } from '../models/WebsiteSettings';
import { generateOrderId } from '../utils/generateOrderId';
import Razorpay from 'razorpay';

const router = Router();

// POST /api/orders — Place Order (Guest or Registered)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer, shippingAddress, items, couponCode, paymentMethod } = req.body;

    if (!customer?.name || !customer?.mobile) {
      res.status(400).json({ success: false, message: 'Customer name and mobile number are required' });
      return;
    }

    if (!shippingAddress?.house || !shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.pincode) {
      res.status(400).json({ success: false, message: 'Complete delivery address with PIN code is required' });
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Shopping cart is empty' });
      return;
    }

    if (!['razorpay', 'cod'].includes(paymentMethod)) {
      res.status(400).json({ success: false, message: 'Invalid payment method selected' });
      return;
    }

    // Check COD configuration if COD chosen
    if (paymentMethod === 'cod') {
      const codSetting = await WebsiteSettings.findOne({ key: 'codEnabled' });
      if (codSetting && codSetting.value === false) {
        res.status(400).json({ success: false, message: 'Cash on Delivery is currently disabled by store admin' });
        return;
      }
    }

    // Backend validation of items, prices, and stock from MongoDB
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId || item._id);
      if (!product || !product.isActive) {
        res.status(400).json({ success: false, message: `Product "${item.name || 'Selected item'}" is unavailable or discontinued.` });
        return;
      }

      const reqQuantity = Number(item.quantity) || 1;
      if (product.stock < reqQuantity) {
        res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${product.stock} units remaining.`
        });
        return;
      }

      const currentPrice = (product.salePrice && product.salePrice > 0) ? product.salePrice : product.price;
      subtotal += currentPrice * reqQuantity;

      validatedItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        salePrice: product.salePrice,
        quantity: reqQuantity,
        volume: product.volume || '100ml'
      });
    }

    // Validate Coupon
    let couponDiscount = 0;
    let appliedCoupon = null;
    if (couponCode && couponCode.trim()) {
      appliedCoupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase(), isActive: true });
      if (appliedCoupon) {
        const now = new Date();
        const isExpired = appliedCoupon.expiryDate && new Date(appliedCoupon.expiryDate) < now;
        const isLimitReached = appliedCoupon.usageLimit && appliedCoupon.usedCount >= appliedCoupon.usageLimit;
        const isMinMet = subtotal >= (appliedCoupon.minOrderValue || 0);

        if (!isExpired && !isLimitReached && isMinMet) {
          if (appliedCoupon.type === 'percentage') {
            couponDiscount = Math.round((subtotal * appliedCoupon.value) / 100);
            if (appliedCoupon.maxDiscount && couponDiscount > appliedCoupon.maxDiscount) {
              couponDiscount = appliedCoupon.maxDiscount;
            }
          } else {
            couponDiscount = Math.min(appliedCoupon.value, subtotal);
          }
        }
      }
    }

    // Shipping calculations
    const shippingSetting = await WebsiteSettings.findOne({ key: 'shippingCharge' });
    const standardShipping = shippingSetting ? Number(shippingSetting.value) : 49;

    const freeShippingSetting = await WebsiteSettings.findOne({ key: 'freeShippingMinimum' });
    const freeShippingMin = freeShippingSetting ? Number(freeShippingSetting.value) : 499;

    const finalShippingCharge = subtotal >= freeShippingMin ? 0 : standardShipping;
    const total = Math.max(0, subtotal - couponDiscount + finalShippingCharge);
    const orderId = generateOrderId();

    // Create Razorpay Order if Razorpay selected
    let razorpayOrderId: string | undefined = undefined;
    if (paymentMethod === 'razorpay') {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      if (keyId && keySecret && keyId !== 'placeholder_key' && !keyId.includes('placeholder')) {
        try {
          const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret
          });
          const rpOrder = await razorpay.orders.create({
            amount: Math.round(total * 100), // paise
            currency: 'INR',
            receipt: orderId,
            notes: {
              orderId,
              customerName: customer.name,
              customerMobile: customer.mobile
            }
          });
          razorpayOrderId = rpOrder.id;
        } catch (rpErr: any) {
          console.error('Razorpay order creation error:', rpErr);
          res.status(500).json({ success: false, message: 'Payment gateway initialization failed. Please try Cash on Delivery or contact support.' });
          return;
        }
      } else {
        // Mock / Sandbox Razorpay order ID for seamless testing before live keys are inserted
        razorpayOrderId = `order_sim_${Date.now()}`;
      }
    }

    // Save order in MongoDB
    const order = await Order.create({
      orderId,
      customer: {
        name: customer.name.trim(),
        mobile: customer.mobile.trim(),
        email: customer.email?.trim() || ''
      },
      shippingAddress: {
        house: shippingAddress.house.trim(),
        street: shippingAddress.street.trim(),
        landmark: shippingAddress.landmark?.trim() || '',
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim(),
        deliveryInstructions: shippingAddress.deliveryInstructions?.trim() || ''
      },
      items: validatedItems,
      pricing: {
        subtotal,
        discount: 0,
        couponDiscount,
        shippingCharge: finalShippingCharge,
        total
      },
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      paymentMethod,
      paymentStatus: 'pending',
      razorpayOrderId,
      orderStatus: 'placed',
      statusHistory: [
        {
          status: 'placed',
          timestamp: new Date(),
          note: paymentMethod === 'cod' ? 'Order placed via Cash on Delivery' : 'Order placed, awaiting Razorpay payment'
        }
      ],
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // default 5 days
    });

    // Deduct stock for placed order
    for (const item of validatedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, totalSold: item.quantity }
      });
    }

    // Update coupon usage
    if (appliedCoupon && couponDiscount > 0) {
      await Coupon.findByIdAndUpdate(appliedCoupon._id, { $inc: { usedCount: 1 } });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.orderId,
        _id: order._id,
        total: order.pricing.total,
        paymentMethod: order.paymentMethod,
        razorpayOrderId: order.razorpayOrderId,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder'
      }
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error creating order' });
  }
});

// POST /api/orders/track — Secure Track My Order
router.post('/track', async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, mobile } = req.body;
    if (!orderId || !mobile) {
      res.status(400).json({ success: false, message: 'Please provide both Order ID and registered Mobile Number' });
      return;
    }

    const order = await Order.findOne({
      orderId: orderId.trim().toUpperCase(),
      'customer.mobile': mobile.trim()
    });

    if (!order) {
      res.status(404).json({
        success: false,
        message: 'No order found matching this Order ID and Mobile number combination. Please double check your details.'
      });
      return;
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/orders/:orderId (with mobile check)
router.get('/:orderId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mobile } = req.query;
    const query: any = { orderId: req.params.orderId.toUpperCase() };
    if (mobile) {
      query['customer.mobile'] = (mobile as string).trim();
    }

    const order = await Order.findOne(query);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

