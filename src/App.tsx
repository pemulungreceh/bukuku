import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BookProvider } from './context/BookContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import Help from './pages/Help';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Contact from './pages/Contact';

// Public Pages
import Books from './pages/Books';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import FlashSale from './pages/FlashSale';
import Bestsellers from './pages/Bestsellers';
import NewArrivals from './pages/NewArrivals';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import BookManagement from './pages/admin/BookManagement';
import BookForm from './pages/admin/BookForm';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import NotificationManagement from './pages/admin/NotificationManagement';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import FlashSaleManagement from './pages/admin/FlashSaleManagement';
import SellerManagement from './pages/admin/SellerManagement';


// Customer Pages
import CustomerLayout from './pages/customer/CustomerLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerWishlist from './pages/customer/CustomerWishlist';
import CustomerAddresses from './pages/customer/CustomerAddresses';
import CustomerSettings from './pages/customer/CustomerSettings';
import CustomerPayments from './pages/customer/CustomerPayments';
import CustomerNotifications from './pages/customer/CustomerNotifications';

// Seller Pages
import SellerLayout from './pages/seller/SellerLayout';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerProductForm from './pages/seller/SellerProductForm';

const ProtectedRoute: React.FC<{ children: React.ReactNode, requireAdmin?: boolean }> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="books" element={<Books />} />
               <Route path="book/:id" element={<BookDetail />} />
               <Route path="checkout" element={<Checkout />} />
               <Route path="categories"         element={<Categories      />} />
                <Route path="category/:slug"     element={<CategoryPage    />} />
                <Route path="flash-sale"         element={<FlashSale       />} />
                <Route path="bestsellers"        element={<Bestsellers     />} />
                <Route path="new-arrivals"       element={<NewArrivals    />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="cart" element={<Cart />} />
                <Route path="help" element={<Help />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="returns" element={<Returns />} />
                <Route path="contact" element={<Contact />} />
              </Route>
              
              {/* Admin Login Route - Separated */}
              <Route path="/f1/f2/mlebu/masuk" element={<AdminLogin />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="books" element={<BookManagement />} />
                <Route path="books/add" element={<BookForm />} />
                <Route path="books/edit/:id" element={<BookForm />} />
                <Route path="flash-sale" element={<FlashSaleManagement   />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="flash-sales" element={<FlashSaleManagement />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="sellers" element={<SellerManagement />} />
                <Route path="notifications" element={<NotificationManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Customer Routes */}
              <Route path="/customer" element={
                <ProtectedRoute>
                  <CustomerLayout />
                </ProtectedRoute>
              }>
                <Route index element={<CustomerDashboard />} />
                <Route path="orders" element={<CustomerOrders />} />
                <Route path="wishlist" element={<CustomerWishlist />} />
                <Route path="addresses" element={<CustomerAddresses />} />
                <Route path="notifications" element={<CustomerNotifications />} />
                <Route path="payments" element={<CustomerPayments />} />
                <Route path="settings" element={<CustomerSettings />} />
              </Route>

              {/* Seller Routes */}
              <Route path="/seller" element={
                <ProtectedRoute>
                  <SellerLayout />
                </ProtectedRoute>
              }>
                <Route index element={<SellerDashboard />} />
                <Route path="products" element={<SellerProducts />} />
                <Route path="products/add" element={<SellerProductForm />} />
                <Route path="products/edit/:id" element={<SellerProductForm />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;