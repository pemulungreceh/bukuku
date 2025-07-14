// src/components/SellerManagement.tsx

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Store,
  TrendingUp,
  Trash2,
} from 'lucide-react';
import apiService from '../../services/api';

interface Seller {
  id: string;
  user_id: string;
  store_name: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  total_products: number;
  total_sales: number;
  commission_rate: number;
  created_at: string;
  approved_at?: string;
}

const SellerManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  // Hanya fetch sekali saat mount
  useEffect(() => {
    loadSellers();
  }, []);

  const loadSellers = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.getSellers();
      if (res.success) setSellers(res.data);
      else throw new Error(res.error || 'Unknown error');
    } catch (err) {
      console.error(err);
      alert('Gagal memuat data seller');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSeller = async (id: string) => {
    if (!window.confirm('Hapus seller ini?')) return;
    try {
      const res = await apiService.deleteSeller(id);
      if (res.success) {
        setSellers(s => s.filter(x => x.id !== id));
        alert('Seller berhasil dihapus');
        setSelectedSeller(null);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus seller');
    }
  };

  const handleStatusChange = async (sellerId: string, newStatus: string) => {
    if (!window.confirm(`Ubah status seller menjadi "${newStatus}"?`)) return;
    try {
      const res = await apiService.approveSeller(sellerId, newStatus);
      if (res.success) {
        setSellers(sels =>
          sels.map(s =>
            s.id === sellerId
              ? {
                  ...s,
                  status: newStatus as Seller['status'],
                  approved_at:
                    newStatus === 'approved'
                      ? new Date().toISOString()
                      : s.approved_at,
                }
              : s
          )
        );
        alert('Status berhasil diubah');
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal mengubah status seller');
      loadSellers();
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  const filteredSellers = sellers.filter(seller => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      seller.store_name.toLowerCase().includes(q) ||
      seller.owner_name.toLowerCase().includes(q) ||
      seller.email.toLowerCase().includes(q);
    const matchesStatus =
      selectedStatus === '' || seller.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Seller</h1>
          <p className="text-gray-600 mt-2">
            Manajemen seller dan mitra penjualan
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Seller */}
        <StatCard
          label="Total Seller"
          value={sellers.length.toString()}
          icon={<Store className="h-6 w-6 text-blue-600" />}
          bg="bg-blue-100"
        />
        {/* Seller Aktif */}
        <StatCard
          label="Seller Aktif"
          value={sellers.filter(s => s.status === 'approved').length.toString()}
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          bg="bg-green-100"
        />
        {/* Menunggu Approval */}
        <StatCard
          label="Menunggu Approval"
          value={sellers.filter(s => s.status === 'pending').length.toString()}
          icon={<Clock className="h-6 w-6 text-yellow-600" />}
          bg="bg-yellow-100"
        />
        {/* Total Penjualan */}
        <StatCard
          label="Total Penjualan"
          value={formatPrice(
            sellers.reduce((sum, s) => sum + s.total_sales, 0)
          )}
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          bg="bg-purple-100"
        />
      </div>

      {/* Filters */}
      <FilterSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <SellerTable
            sellers={filteredSellers}
            onView={setSelectedSeller}
          />
        )}
      </div>

      {!isLoading && filteredSellers.length === 0 && (
        <EmptyState />
      )}

      {/* Detail Modal */}
      {selectedSeller && (
        <SellerDetailModal
          seller={selectedSeller}
          onClose={() => setSelectedSeller(null)}
          onStatusUpdate={handleStatusChange}
          onDelete={handleDeleteSeller}
        />
      )}
    </div>
  );
};

export default SellerManagement;


/* ——— Komponen Bantu ——— */

const StatCard: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
  bg: string;
}> = ({ label, value, icon, bg }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`${bg} p-3 rounded-full`}>{icon}</div>
    </div>
  </div>
);

const FilterSection: React.FC<{
  searchTerm: string;
  onSearchChange: (v: string) => void;
  selectedStatus: string;
  onStatusChange: (v: string) => void;
}> = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cari Seller
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Cari nama toko, pemilik, atau email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={e => onStatusChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Semua Status</option>
          <option value="pending">Menunggu</option>
          <option value="approved">Disetujui</option>
          <option value="rejected">Ditolak</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      <div className="flex items-end">
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  </div>
);

const LoadingPlaceholder = () => (
  <div className="p-8 text-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto" />
    <p className="mt-2 text-gray-600">Memuat data seller...</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-500">Tidak ada seller yang ditemukan</p>
  </div>
);

const SellerTable: React.FC<{
  sellers: Seller[];
  onView: (s: Seller) => void;
}> = ({ sellers, onView }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seller
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Kontak
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Performa
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Bergabung
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sellers.map(seller => (
          <tr key={seller.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Store className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {seller.store_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {seller.owner_name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div>{seller.email}</div>
              <div className="text-gray-500">{seller.phone}</div>
              <div className="text-gray-400 text-xs">{seller.address}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div>{seller.total_products} produk</div>
              <div className="text-green-600 font-medium">
                {formatPrice(seller.total_sales)}
              </div>
              <div className="text-gray-500 text-xs">
                Komisi: {seller.commission_rate}%
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {seller.status.charAt(0).toUpperCase() +
                  seller.status.slice(1)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {new Date(seller.created_at).toLocaleDateString('id-ID')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => onView(seller)}
                className="text-green-600 hover:text-green-700"
              >
                <Eye className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface DetailProps {
  seller: Seller;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const SellerDetailModal: React.FC<DetailProps> = ({
  seller,
  onClose,
  onStatusUpdate,
  onDelete,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          Detail Seller: {seller.store_name}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>
      {/* Informasi Toko & Performa (sama seperti sebelumnya) */}
      <div className="space-y-6">
        {/* … */}
      </div>
      {/* Kelola Status & Hapus */}
      <div className="flex justify-end mt-6 space-x-2">
        {seller.status === 'pending' && (
          <>
            <button
              onClick={() => onStatusUpdate(seller.id, 'approved')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
            >
              Setujui
            </button>
            <button
              onClick={() => onStatusUpdate(seller.id, 'rejected')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
            >
              Tolak
            </button>
          </>
        )}
        {(seller.status === 'approved' || seller.status === 'suspended') && (
          <button
            onClick={() =>
              onStatusUpdate(
                seller.id,
                seller.status === 'approved' ? 'suspended' : 'approved'
              )
            }
            className={`px-4 py-2 rounded-lg text-sm ${
              seller.status === 'approved'
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {seller.status === 'approved' ? 'Suspend' : 'Aktifkan'}
          </button>
        )}
        <button
          onClick={() => onDelete(seller.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
        >
          Hapus
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
);
