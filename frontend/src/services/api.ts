import { SITE } from '../config/site';

const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
const API_BASE = configuredApiUrl ? `${configuredApiUrl}/api` : '/api';

export const resolveImageUrl = (image?: string) => {
  if (!image) return SITE.fallbackImage;
  if (/^(https?:)?\/\//.test(image) || image.startsWith('data:')) return image;
  if (configuredApiUrl && image.startsWith('/uploads/')) return `${configuredApiUrl}${image}`;
  return image.startsWith('/') ? image : `/${image}`;
};

export const getAuthToken = () => localStorage.getItem('jeevan_shaili_admin_token');

const getHeaders = (isMultipart = false): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (!isMultipart) headers['Content-Type'] = 'application/json';
  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const readResponse = async (response: Response): Promise<any> => {
  const text = await response.text();
  let data: any = {};
  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Invalid JSON response from server');
    }
  }
  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }
  return data;
};

const get = async (path: string) => readResponse(await fetch(`${API_BASE}${path}`, { headers: getHeaders() }));
const send = async (path: string, init: RequestInit) => readResponse(await fetch(`${API_BASE}${path}`, init));
const query = (params?: Record<string, string>) => params ? `?${new URLSearchParams(params).toString()}` : '';

export const api = {
  async getProducts(params?: Record<string, string>) {
    const data = await get(`/products${query(params)}`);
    return data.data;
  },
  async getProductBySlug(slug: string) {
    const data = await get(`/products/${encodeURIComponent(slug)}`);
    return data.data;
  },
  async getCategories() {
    const data = await get('/categories');
    return data.data;
  },
  async getAdminCategories() {
    const data = await get('/categories/admin/all');
    return data.data;
  },
  async createCategory(formData: FormData) {
    const data = await send('/categories', { method: 'POST', headers: getHeaders(true), body: formData });
    return data.data;
  },
  async updateCategory(id: string, formData: FormData) {
    const data = await send(`/categories/${encodeURIComponent(id)}`, { method: 'PUT', headers: getHeaders(true), body: formData });
    return data.data;
  },
  async deleteCategory(id: string) {
    return send(`/categories/${encodeURIComponent(id)}`, { method: 'DELETE', headers: getHeaders() });
  },
  async createOrder(orderPayload: unknown) {
    return send('/orders', { method: 'POST', headers: getHeaders(), body: JSON.stringify(orderPayload) });
  },
  async trackOrder(orderId: string, mobile: string) {
    const data = await send('/orders/track', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ orderId, mobile }) });
    return data.data;
  },
  async verifyPayment(payload: unknown) {
    return send('/payments/verify', { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });
  },
  async validateCoupon(code: string, orderValue: number) {
    return send('/coupons/validate', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ code, orderValue }) });
  },
  async getBlogs(params?: Record<string, string>) {
    const data = await get(`/blogs${query(params)}`);
    return data.data;
  },
  async getBlogBySlug(slug: string) {
    const data = await get(`/blogs/${encodeURIComponent(slug)}`);
    return data.data;
  },
  async sendContactMessage(payload: unknown) {
    return send('/contact', { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });
  },
  async subscribeNewsletter(email: string) {
    return send('/subscribers', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ email }) });
  },
  async getProductReviews(productId: string) {
    const data = await get(`/reviews/${encodeURIComponent(productId)}`);
    return data.data;
  },
  async submitReview(payload: unknown) {
    return send('/reviews', { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });
  },
  async adminLogin(credentials: { email: string; password: string }) {
    const data = await send('/auth/admin/login', { method: 'POST', headers: getHeaders(), body: JSON.stringify(credentials) });
    return data.data;
  },
  async getAdminMe() {
    const data = await get('/auth/admin/me');
    return data.data;
  },
  async getAdminStats() {
    const data = await get('/admin/orders/stats');
    return data.data;
  },
  async getAdminOrders(params?: Record<string, string>) {
    const data = await get(`/admin/orders${query(params)}`);
    return data.data;
  },
  async getAdminCustomers(params?: Record<string, string>) {
    const data = await get(`/admin/customers${query(params)}`);
    return data.data;
  },
  async getAdminCoupons() {
    const data = await get('/admin/coupons');
    return data.data;
  },
  async updateOrderStatus(orderId: string, updatePayload: unknown) {
    const data = await send(`/admin/orders/${encodeURIComponent(orderId)}/status`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(updatePayload) });
    return data.data;
  },
  async getAdminProducts(params?: Record<string, string>) {
    const data = await get(`/admin/products${query(params)}`);
    return data.data;
  },
  async createProduct(formData: FormData) {
    const data = await send('/products', { method: 'POST', headers: getHeaders(true), body: formData });
    return data.data;
  },
  async updateProduct(id: string, formData: FormData) {
    const data = await send(`/products/${encodeURIComponent(id)}`, { method: 'PUT', headers: getHeaders(true), body: formData });
    return data.data;
  },
  async deleteProduct(id: string) {
    return send(`/products/${encodeURIComponent(id)}`, { method: 'DELETE', headers: getHeaders() });
  },
  async getAdminSettings() {
    const data = await get('/admin/settings');
    return data.data;
  },
  async saveAdminSettings(settings: Record<string, unknown>) {
    return send('/admin/settings/bulk', { method: 'POST', headers: getHeaders(), body: JSON.stringify(settings) });
  }
};
