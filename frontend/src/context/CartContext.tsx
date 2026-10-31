import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { api } from '../services/api';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingCharge: number;
  freeShippingThreshold: number;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  total: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'giwansally_guest_cart';
const COUPON_STORAGE_KEY = 'giwansally_applied_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item
        );
      } else {
        const itemPrice = (product.salePrice && product.salePrice > 0) ? product.salePrice : product.price;
        return [
          ...prevItems,
          {
            productId: product._id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            salePrice: product.salePrice,
            image: product.images[0] || '/images/products/bottle-hero.png',
            volume: product.volume || '100ml',
            quantity: Math.min(quantity, product.stock || 99),
            maxStock: product.stock || 99
          }
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(quantity, item.maxStock) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.salePrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const freeShippingThreshold = 499;
  const shippingCharge = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 49;

  // Recalculate coupon discount whenever subtotal changes
  useEffect(() => {
    if (!appliedCoupon || subtotal === 0) {
      setCouponDiscount(0);
      return;
    }

    if (appliedCoupon.minOrderValue && subtotal < appliedCoupon.minOrderValue) {
      setCouponDiscount(0);
      return;
    }

    let discount = 0;
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
    setCouponDiscount(discount);
  }, [appliedCoupon, subtotal]);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.validateCoupon(code, subtotal);
      if (res.success && res.data) {
        setAppliedCoupon(res.data.coupon);
        setCouponDiscount(res.data.discount);
        return { success: true, message: res.message || 'Coupon applied successfully!' };
      }
      return { success: false, message: 'Invalid coupon' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to apply coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const total = Math.max(0, subtotal - couponDiscount + shippingCharge);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingCharge,
        freeShippingThreshold,
        appliedCoupon,
        couponDiscount,
        total,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

