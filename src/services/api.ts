// src/services/api.ts

import mockApiService from './mockApi';

const USE_MOCK_API = false; // Set to true to use mock implementation when backend is unavailable

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl = 'http://localhost/bukuku-api';

  /**
   * Core request method that handles mock fallback, headers, and JSON parsing
   */
  private async request<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
    // Fallback to mock API if backend is not available
    if (USE_MOCK_API) {
      console.info(`🔄 Using mock API for ${path}`);
      return mockApiService.request(path, init) as Promise<ApiResponse<T>>;
    }

    const url = `${this.baseUrl}${path}`;
    const headers = new Headers(init.headers);

    // Automatically set JSON content-type when body is not FormData
    if (!(init.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    // Attach auth token if present
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // —————————————————————————————————————————
  // Sellers API (CRUD + approve)
  // —————————————————————————————————————————
  getSellers() {
    return this.request<any[]>('/seller/index.php');
  }

  registerSeller(sellerData: any) {
    return this.request<null>('/seller/register.php', {
      method: 'POST',
      body: JSON.stringify(sellerData),
    });
  }

  approveSeller(id: string, status: string) {
    return this.request<null>('/seller/approve.php', {
      method: 'POST',
      body: JSON.stringify({ id, status }),
    });
  }

  deleteSeller(id: string) {
    return this.request<null>(`/seller/delete.php?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  }

  // —————————————————————————————————————————
  // Authentication API
  // —————————————————————————————————————————
  login(email: string, password: string) {
    return USE_MOCK_API
      ? mockApiService.login(email, password)
      : this.request<null>('/auth/login.php', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
  }

  register(userData: any) {
    return USE_MOCK_API
      ? mockApiService.register(userData)
      : this.request<null>('/auth/register.php', {
          method: 'POST',
          body: JSON.stringify(userData),
        });
  }

  logout() {
    return USE_MOCK_API
      ? mockApiService.logout()
      : this.request<null>('/auth/logout.php', { method: 'POST' });
  }

  // —————————————————————————————————————————
  // Books API
  // —————————————————————————————————————————
  getBooks(params?: Record<string, any>) {
    const qs = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    return USE_MOCK_API
      ? mockApiService.getBooks(params)
      : this.request<any>(`/books/index.php${qs}`);
  }

  getBook(id: string) {
    return USE_MOCK_API
      ? mockApiService.getBook(id)
      : this.request<any>(`/books/show.php?id=${encodeURIComponent(id)}`);
  }

  createBook(bookData: FormData) {
    // Attach upload folder structure
    const now = new Date();
    bookData.append('upload_path', `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`);
    return USE_MOCK_API
      ? mockApiService.createBook(bookData)
      : this.request<null>('/books/create.php', { method: 'POST', body: bookData });
  }

  updateBook(id: string, bookData: FormData) {
    const now = new Date();
    bookData.append('upload_path', `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`);
    return USE_MOCK_API
      ? mockApiService.updateBook(id, bookData)
      : this.request<null>(`/books/update.php?id=${encodeURIComponent(id)}`, { method: 'POST', body: bookData });
  }

  deleteBook(id: string) {
    return USE_MOCK_API
      ? mockApiService.deleteBook(id)
      : this.request<null>(`/books/delete.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  // —————————————————————————————————————————
  // Users API
  // —————————————————————————————————————————
  getUsers(params?: Record<string, any>) {
    const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return USE_MOCK_API
      ? mockApiService.getUsers(params)
      : this.request<any>(`/users/index.php${qs}`);
  }

  getUser(id: string) {
    return USE_MOCK_API
      ? mockApiService.getUser(id)
      : this.request<any>(`/users/show.php?id=${encodeURIComponent(id)}`);
  }

  createUser(userData: any) {
    return USE_MOCK_API
      ? mockApiService.createUser(userData)
      : this.request<null>('/users/create.php', { method: 'POST', body: JSON.stringify(userData) });
  }

  updateUser(id: string, userData: any) {
    return USE_MOCK_API
      ? mockApiService.updateUser(id, userData)
      : this.request<null>(`/users/update.php?id=${encodeURIComponent(id)}`, { method: 'POST', body: JSON.stringify(userData) });
  }

  deleteUser(id: string) {
    return USE_MOCK_API
      ? mockApiService.deleteUser(id)
      : this.request<null>(`/users/delete.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  updateProfile(userData: any) {
    return USE_MOCK_API
      ? mockApiService.request('/users/profile.php', { method: 'POST', body: JSON.stringify(userData) })
      : this.request<null>('/users/profile.php', { method: 'POST', body: JSON.stringify(userData) });
  }

  changePassword(passwordData: any) {
    return USE_MOCK_API
      ? mockApiService.request('/users/change-password.php', { method: 'POST', body: JSON.stringify(passwordData) })
      : this.request<null>('/users/change-password.php', { method: 'POST', body: JSON.stringify(passwordData) });
  }

  // —————————————————————————————————————————
  // Orders API
  // —————————————————————————————————————————
  getOrders(params?: Record<string, any>) {
    const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return USE_MOCK_API
      ? mockApiService.getOrders(params)
      : this.request<any>(`/orders/index.php${qs}`);
  }

  getOrder(id: string) {
    return USE_MOCK_API
      ? mockApiService.getOrder(id)
      : this.request<any>(`/orders/show.php?id=${encodeURIComponent(id)}`);
  }

  createOrder(orderData: any) {
    return USE_MOCK_API
      ? mockApiService.request('/orders/create.php', { method: 'POST', body: JSON.stringify(orderData) })
      : this.request<null>('/orders/create.php', { method: 'POST', body: JSON.stringify(orderData) });
  }

  updateOrderStatus(id: string, status: string) {
    return USE_MOCK_API
      ? mockApiService.updateOrderStatus(id, status)
      : this.request<null>(`/orders/update-status.php?id=${encodeURIComponent(id)}`, { method: 'POST', body: JSON.stringify({ status }) });
  }

  updateOrderTracking(id: string, trackingData: any) {
    return USE_MOCK_API
      ? mockApiService.request(`/orders/update-tracking.php?id=${id}`, { method: 'POST', body: JSON.stringify(trackingData) })
      : this.request<null>(`/orders/update-tracking.php?id=${encodeURIComponent(id)}`, { method: 'POST', body: JSON.stringify(trackingData) });
  }

  cancelOrder(id: string) {
    return USE_MOCK_API
      ? mockApiService.request(`/orders/cancel.php?id=${id}`, { method: 'POST' })
      : this.request<null>(`/orders/cancel.php?id=${encodeURIComponent(id)}`, { method: 'POST' });
  }

  // —————————————————————————————————————————
  // Categories API
  // —————————————————————————————————————————
  getCategories() {
    return USE_MOCK_API
      ? mockApiService.getCategories()
      : this.request<any[]>('/categories/index.php');
  }

  getCategory(id: string) {
    return USE_MOCK_API
      ? mockApiService.request(`/categories/show.php?id=${id}`)
      : this.request<any>(`/categories/show.php?id=${encodeURIComponent(id)}`);
  }

  createCategory(data: any) {
    return USE_MOCK_API
      ? mockApiService.request('/categories/create.php', { method: 'POST', body: JSON.stringify(data) })
      : this.request<null>('/categories/create.php', { method: 'POST', body: JSON.stringify(data) });
  }

  updateCategory(id: string, data: any) {
    return USE_MOCK_API
      ? mockApiService.request(`/categories/update.php?id=${id}`, { method: 'POST', body: JSON.stringify(data) })
      : this.request<null>(`/categories/update.php?id=${encodeURIComponent(id)}`, { method: 'POST', body: JSON.stringify(data) });
  }

  deleteCategory(id: string) {
    return USE_MOCK_API
      ? mockApiService.request(`/categories/delete.php?id=${id}`, { method: 'DELETE' })
      : this.request<null>(`/categories/delete.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  // —————————————————————————————————————————
  // Cart API
  // —————————————————————————————————————————
  getCart() {
    return this.request<any>('/cart/index.php');
  }

  addToCart(bookId: string, quantity: number) {
    return this.request<null>('/cart/add.php', {
      method: 'POST',
      body: JSON.stringify({ book_id: bookId, quantity }),
    });
  }

  updateCartItem(itemId: string, quantity: number) {
    return this.request<null>(`/cart/update.php?id=${encodeURIComponent(itemId)}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  removeFromCart(itemId: string) {
    return this.request<null>(`/cart/remove.php?id=${encodeURIComponent(itemId)}`, {
      method: 'DELETE',
    });
  }

  clearCart() {
    return this.request<null>('/cart/clear.php', { method: 'DELETE' });
  }

  // —————————————————————————————————————————
  // Reviews API
  // —————————————————————————————————————————
  getReviews(bookId: string) {
    return this.request<any>(`/reviews/index.php?book_id=${encodeURIComponent(bookId)}`);
  }

  createReview(bookId: string, reviewData: any) {
    return this.request<null>('/reviews/create.php', {
      method: 'POST',
      body: JSON.stringify({ ...reviewData, book_id: bookId }),
    });
  }

  updateReview(reviewId: string, reviewData: any) {
    return this.request<null>(`/reviews/update.php?id=${encodeURIComponent(reviewId)}`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  deleteReview(reviewId: string) {
    return this.request<null>(`/reviews/delete.php?id=${encodeURIComponent(reviewId)}`, {
      method: 'DELETE',
    });
  }

  // —————————————————————————————————————————
  // Wishlist API
  // —————————————————————————————————————————
  getWishlist() {
    return this.request<any>('/wishlist/index.php');
  }

  addToWishlist(bookId: string) {
    return this.request<null>('/wishlist/add.php', {
      method: 'POST',
      body: JSON.stringify({ book_id: bookId }),
    });
  }

  removeFromWishlist(bookId: string) {
    return this.request<null>(`/wishlist/remove.php?book_id=${encodeURIComponent(bookId)}`, {
      method: 'DELETE',
    });
  }

  // —————————————————————————————————————————
  // Settings API
  // —————————————————————————————————————————
  getSettings() {
    return USE_MOCK_API
      ? mockApiService.getSettings()
      : this.request<any>('/settings/index.php');
  }

  updateSettings(settings: any) {
    return USE_MOCK_API
      ? mockApiService.updateSettings(settings)
      : this.request<null>('/settings/update.php', { method: 'POST', body: JSON.stringify(settings) });
  }

  // —————————————————————————————————————————
  // Dashboard Stats API
  // —————————————————————————————————————————
  getDashboardStats() {
    return USE_MOCK_API
      ? mockApiService.getDashboardStats()
      : this.request<any>('/dashboard/stats.php');
  }

  getRecentActivity() {
    return this.request<any>('/dashboard/recent-activity.php');
  }

  getSalesReport(params?: Record<string, any>) {
    const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return this.request<any>(`/dashboard/sales-report.php${qs}`);
  }

  // —————————————————————————————————————————
  // Payment API (iPaymu integration)
  // —————————————————————————————————————————
  createPayment(orderData: any) {
    return this.request<any>('/payment/create.php', { method: 'POST', body: JSON.stringify(orderData) });
  }

  checkPaymentStatus(orderId: string) {
    return this.request<any>(`/payment/status.php?order_id=${encodeURIComponent(orderId)}`);
  }

  handlePaymentCallback(callbackData: any) {
    return this.request<null>('/payment/callback.php', { method: 'POST', body: JSON.stringify(callbackData) });
  }

  // —————————————————————————————————————————
  // Banners API
  // —————————————————————————————————————————
  getBanners(position?: string) {
    const qs = position ? `?position=${encodeURIComponent(position)}` : '';
    return this.request<any>(`/banners/index.php${qs}`);
  }

  createBanner(bannerData: FormData) {
    return this.request<null>('/banners/create.php', { method: 'POST', body: bannerData });
  }

  updateBanner(id: string, bannerData: FormData) {
    return this.request<null>(`/banners/update.php?id=${encodeURIComponent(id)}`, { method: 'POST', body: bannerData });
  }

  deleteBanner(id: string) {
    return this.request<null>(`/banners/delete.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
export default apiService;
