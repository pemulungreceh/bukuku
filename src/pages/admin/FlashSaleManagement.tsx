import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Zap, Clock, Calendar } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

interface FlashSaleItem {
  id: string;
  bookId: string;
  book: any;
  originalPrice: number;
  salePrice: number;
  discount: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  stock: number;
}

const FlashSaleManagement: React.FC = () => {
  const { books } = useBooks();
  const [flashSaleItems, setFlashSaleItems] = useState<FlashSaleItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FlashSaleItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFlashSaleItems();
  }, []);

  const loadFlashSaleItems = () => {
    // Mock data - in real app, load from database
    const mockFlashSale: FlashSaleItem[] = [
      {
        id: '1',
        bookId: '1',
        book: books.find(b => b.id === '1'),
        originalPrice: 85000,
        salePrice: 59500,
        discount: 30,
        startTime: '2024-01-20T00:00:00',
        endTime: '2024-01-21T23:59:59',
        isActive: true,
        stock: 50
      },
      {
        id: '2',
        bookId: '3',
        book: books.find(b => b.id === '3'),
        originalPrice: 120000,
        salePrice: 84000,
        discount: 30,
        startTime: '2024-01-20T00:00:00',
        endTime: '2024-01-21T23:59:59',
        isActive: true,
        stock: 30
      }
    ];
    setFlashSaleItems(mockFlashSale);
  };

  const handleSaveFlashSale = (formData: any) => {
    const newItem: FlashSaleItem = {
      id: editingItem?.id || Date.now().toString(),
      bookId: formData.bookId,
      book: books.find(b => b.id === formData.bookId),
      originalPrice: parseFloat(formData.originalPrice),
      salePrice: parseFloat(formData.salePrice),
      discount: Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.salePrice)) / parseFloat(formData.originalPrice)) * 100),
      startTime: formData.startTime,
      endTime: formData.endTime,
      isActive: formData.isActive,
      stock: parseInt(formData.stock)
    };

    if (editingItem) {
      setFlashSaleItems(items => items.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setFlashSaleItems(items => [...items, newItem]);
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item flash sale ini?')) {
      setFlashSaleItems(items => items.filter(item => item.id !== id));
    }
  };

  const toggleActiveStatus = (id: string) => {
    setFlashSaleItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('id-ID');
  };

  const isCurrentlyActive = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Zap className="h-8 w-8 text-red-500 mr-3" />
            Kelola Flash Sale
          </h1>
          <p className="text-gray-600 mt-2">Atur produk dan waktu flash sale</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Flash Sale</span>
        </button>
      </div>

      {/* Flash Sale Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {flashSaleItems.length === 0 ? (
          <div className="p-8 text-center">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada item flash sale</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buku
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diskon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waktu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flashSaleItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={item.book?.coverImage}
                          alt={item.book?.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.book?.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.book?.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="line-through text-gray-500">
                          {formatPrice(item.originalPrice)}
                        </div>
                        <div className="font-bold text-red-600">
                          {formatPrice(item.salePrice)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        -{item.discount}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <div>
                          <div>Mulai: {formatDateTime(item.startTime)}</div>
                          <div>Selesai: {formatDateTime(item.endTime)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.isActive && isCurrentlyActive(item.startTime, item.endTime)
                            ? 'bg-green-100 text-green-800'
                            : item.isActive
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isActive && isCurrentlyActive(item.startTime, item.endTime)
                            ? 'Aktif'
                            : item.isActive
                            ? 'Terjadwal'
                            : 'Nonaktif'
                          }
                        </span>
                        <span className="text-xs text-gray-500">
                          Stok: {item.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleActiveStatus(item.id)}
                          className={`p-1 rounded ${
                            item.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'
                          }`}
                          title={item.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          <Clock className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1 rounded"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Flash Sale Modal */}
      {showModal && (
        <FlashSaleModal
          books={books}
          item={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSave={handleSaveFlashSale}
        />
      )}
    </div>
  );
};

// Flash Sale Modal Component
const FlashSaleModal: React.FC<{
  books: any[];
  item: FlashSaleItem | null;
  onClose: () => void;
  onSave: (data: any) => void;
}> = ({ books, item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    bookId: item?.bookId || '',
    originalPrice: item?.originalPrice?.toString() || '',
    salePrice: item?.salePrice?.toString() || '',
    startTime: item?.startTime || '',
    endTime: item?.endTime || '',
    isActive: item?.isActive ?? true,
    stock: item?.stock?.toString() || '50'
  });

  const selectedBook = books.find(book => book.id === formData.bookId);

  useEffect(() => {
    if (selectedBook && !item) {
      setFormData(prev => ({
        ...prev,
        originalPrice: selectedBook.price.toString()
      }));
    }
  }, [selectedBook, item]);

  const calculateDiscount = () => {
    const original = parseFloat(formData.originalPrice) || 0;
    const sale = parseFloat(formData.salePrice) || 0;
    if (original > 0 && sale > 0) {
      return Math.round(((original - sale) / original) * 100);
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {item ? 'Edit Flash Sale' : 'Tambah Flash Sale Baru'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Buku
            </label>
            <select
              value={formData.bookId}
              onChange={(e) => setFormData({...formData, bookId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Pilih Buku</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title} - {book.author}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Asli
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Sale
              </label>
              <input
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {formData.originalPrice && formData.salePrice && (
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-red-700">
                Diskon: <strong>{calculateDiscount()}%</strong>
              </p>
              <p className="text-sm text-red-700">
                Hemat: <strong>Rp {(parseFloat(formData.originalPrice) - parseFloat(formData.salePrice)).toLocaleString('id-ID')}</strong>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waktu Mulai
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waktu Selesai
              </label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok Flash Sale
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              min="1"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Aktifkan flash sale
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashSaleManagement;