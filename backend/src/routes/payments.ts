import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { Order } from '../models/Order';
import { adminAuth } from '../middleware/auth';

const router = Router();

// POST /api/payments/verify — Server-side signature verification
router.post('/verify', async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!orderId) {
      res.status(400).json({ success: false, message: 'Order ID is required' });
      return;
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    // Check if already paid to prevent duplicate processing
    if (order.paymentStatus === 'paid') {
      res.json({
        success: true,
        message: 'Order is already verified and marked as paid',
        data: { orderId: order.orderId }
      });
      return;
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isPlaceholderSecret = !keySecret || keySecret === 'placeholder_secret_key' || keySecret.includes('placeholder');

    if (!isPlaceholderSecret) {
      // Real Razorpay signature verification
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        res.status(400).json({ success: false, message: 'Missing Razorpay verification parameters' });
        return;
      }

      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        // Mark failed
        await Order.findOneAndUpdate(
          { orderId },
          {
            paymentStatus: 'failed',
            $push: { statusHistory: { status: 'failed', timestamp: new Date(), note: 'Payment signature mismatch' } }
          }
        );
        res.status(400).json({ success: false, message: 'Payment verification failed: Invalid signature' });
        return;
      }
    }

    // Signature verified or simulated in test mode
    order.paymentStatus = 'paid';
    order.razorpayPaymentId = razorpay_payment_id || `pay_sim_${Date.now()}`;
    if (razorpay_order_id) order.razorpayOrderId = razorpay_order_id;
    order.orderStatus = 'confirmed';
    order.statusHistory.push({
      status: 'confirmed',
      timestamp: new Date(),
      note: `Payment confirmed via Razorpay (Payment ID: ${order.razorpayPaymentId})`
    });

    await order.save();

    res.json({
      success: true,
      message: 'Payment verified and order confirmed successfully',
      data: {
        orderId: order.orderId,
        paymentId: order.razorpayPaymentId
      }
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: error.message || 'Payment verification failed' });
  }
});

// POST /api/payments/webhook — Razorpay Webhook listener
router.post('/webhook', async (req: Request, res: Response): Promise<void> => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'] as string;

    if (webhookSecret && webhookSecret !== 'placeholder_webhook_secret' && signature) {
      const rawBody = req.body.toString();
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        res.status(400).json({ success: false, message: 'Invalid webhook signature' });
        return;
      }
    }

    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const event = payload.event;

    if (event === 'payment.captured') {
      const payment = payload.payload?.payment?.entity;
      if (payment && payment.order_id) {
        await Order.findOneAndUpdate(
          { razorpayOrderId: payment.order_id },
          {
            paymentStatus: 'paid',
            razorpayPaymentId: payment.id,
            orderStatus: 'confirmed'
          }
        );
      }
    } else if (event === 'payment.failed') {
      const payment = payload.payload?.payment?.entity;
      if (payment && payment.order_id) {
        await Order.findOneAndUpdate(
          { razorpayOrderId: payment.order_id },
          { paymentStatus: 'failed' }
        );
      }
    }

    res.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false });
  }
});

// POST /api/payments/refund (Admin)
router.post('/refund/:orderId', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    if (order.paymentStatus !== 'paid') {
      res.status(400).json({ success: false, message: 'Only paid orders can be refunded' });
      return;
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (order.paymentMethod === 'razorpay' && order.razorpayPaymentId && keyId && keySecret && !keyId.includes('placeholder')) {
      const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
      await razorpay.payments.refund(order.razorpayPaymentId, {
        amount: Math.round(order.pricing.total * 100),
        notes: { reason: req.body.reason || 'Admin initiated refund' }
      });
    }

    order.paymentStatus = 'refunded';
    order.orderStatus = 'refunded';
    order.statusHistory.push({
      status: 'refunded',
      timestamp: new Date(),
      note: req.body.reason ? `Refund processed: ${req.body.reason}` : 'Refund processed by Admin'
    });

    await order.save();

    res.json({
      success: true,
      message: 'Refund recorded and order updated successfully',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Refund failed' });
  }
});

export default router;

