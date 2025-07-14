import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Eye } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

const SellerProducts: React.FC = () => {
  const { books, deleteBook, isLoading } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter books for current seller (in real app, filter by seller_id)
  const sellerBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteBook = async (bookId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setIsDeleting(bookId);
      try {
        const success = await deleteBook(bookId);
        if (success) {
          alert('Produk berhasil dihapus');
        } else {
          alert('Gagal menghapus produk');
        }
      } catch (error) {
        alert('Terjadi kesalahan saat menghapus produk');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Produk Saya</h1>
        <Link
          to="/seller/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Produk</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Produk
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan judul atau penulis..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Semua Kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
          ))
        ) : (
          sellerBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Link
                    to={`/seller/products/edit/${book.id}`}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 text-green-600" />
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    disabled={isDeleting === book.id}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isDeleting === book.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-green-600">
                    {formatPrice(book.price)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    book.stock > 10 ? 'bg-green-100 text-green-800' :
                    book.stock > 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Stok: {book.stock}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({book.reviews})</span>
                  </div>
                  <Link
                    to={`/book/${book.id}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {sellerBooks.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
          <Link
            to="/seller/products/add"
            className="mt-4 inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Produk Pertama</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;