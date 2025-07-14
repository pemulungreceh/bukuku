import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, DollarSign, TrendingUp, Package, Eye, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SellerStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyGrowth: number;
  recentOrders: Array<{
    id: string;
    order_number: string;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
  }>;
  topProducts: Array<{
    id: string;
    title: string;
    sales: number;
    revenue: number;
  }>;
}

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSellerStats();
  }, []);

  const loadSellerStats = async () => {
    setIsLoading(true);
    try {
      // Mock data for seller dashboard
      setStats({
        totalProducts: 15,
        totalOrders: 45,
        totalRevenue: 2750000,
        monthlyGrowth: 18,
        recentOrders: [
          {
            id: '1',
            order_number: 'BK-2024-001',
            customer_name: 'John Doe',
            total_amount: 150000,
            status: 'processing',
            created_at: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            order_number: 'BK-2024-002',
            customer_name: 'Jane Smith',
            total_amount: 95000,
            status: 'shipped',
            created_at: '2024-01-14T15:30:00Z'
          }
        ],
        topProducts: [
          { id: '1', title: 'Laskar Pelangi', sales: 25, revenue: 2125000 },
          { id: '2', title: 'Atomic Habits', sales: 18, revenue: 2160000 },
          { id: '3', title: 'Negeri 5 Menara', sales: 15, revenue: 1170000 }
        ]
      });
    } catch (error) {
      console.error('Failed to load seller stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Diproses' },
      shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Dikirim' },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Selesai' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dibatalkan' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Memuat dashboard seller...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Seller</h1>
        <p className="text-gray-600 mt-2">Selamat datang, {user?.name}! Kelola toko buku Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Produk</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.totalProducts || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pesanan</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.totalOrders || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pendapatan</p>
              <p className="text-2xl font-bold text-gray-800">{formatPrice(stats?.totalRevenue || 0)}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pertumbuhan</p>
              <p className="text-2xl font-bold text-gray-800">+{stats?.monthlyGrowth || 0}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Pesanan Terbaru</h2>
            <Link to="/seller/orders" className="text-green-600 hover:text-green-700 font-medium">
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recentOrders?.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">#{order.order_number}</p>
                  <p className="text-sm text-gray-600">{order.customer_name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{formatPrice(order.total_amount)}</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Produk Terlaris</h2>
            <Link to="/seller/products" className="text-green-600 hover:text-green-700 font-medium">
              Kelola Produk
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.topProducts?.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.title}</p>
                    <p className="text-sm text-gray-600">{product.sales} terjual</p>
                  </div>
                </div>
                <p className="font-medium text-green-600">{formatPrice(product.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/seller/products/add"
            className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Plus className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-600">Tambah Produk</span>
          </Link>
          <Link
            to="/seller/orders"
            className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Package className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-600">Kelola Pesanan</span>
          </Link>
          <Link
            to="/seller/analytics"
            className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-600">Lihat Analitik</span>
          </Link>
          <Link
            to="/seller/settings"
            className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <Settings className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-yellow-600">Pengaturan</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;