import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';
import apiService from '../services/api';

const NewArrivals: React.FC = () => {
  const [newBooks, setNewBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNewArrivals();
  }, []);

  const loadNewArrivals = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getBooks({ new_arrival: true });
      if (response.success && response.data) {
        // Sort by creation date (newest first)
        const sortedBooks = response.data.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setNewBooks(sortedBooks);
      }
    } catch (error) {
      console.error('Failed to load new arrivals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isNewRelease = (dateString: string) => {
    const bookDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - bookDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // New if added within 7 days
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NEW ARRIVALS
            </h1>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-xl text-gray-700 mb-8">
            Koleksi buku terbaru yang baru saja tiba di toko kami
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {newBooks.length}
              </div>
              <div className="text-gray-600">Buku Baru</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {newBooks.filter(book => isNewRelease(book.createdAt)).length}
              </div>
              <div className="text-gray-600">Rilis Minggu Ini</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {new Set(newBooks.map(book => book.category)).size}
              </div>
              <div className="text-gray-600">Kategori</div>
            </div>
          </div>
        </div>

        {/* New Arrivals Books */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat buku baru...</p>
          </div>
        ) : newBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Belum ada buku baru</p>
          </div>
        ) : (
          <>
            {/* Latest Releases */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                🆕 Rilis Terbaru Minggu Ini
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {newBooks
                  .filter(book => isNewRelease(book.createdAt))
                  .slice(0, 4)
                  .map((book) => (
                    <div key={book.id} className="relative">
                      {/* New Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          NEW
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-blue-200">
                        <div className="relative">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm">
                            {book.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                          
                          <div className="flex items-center mb-2">
                            <Calendar className="h-3 w-3 text-blue-500 mr-1" />
                            <span className="text-xs text-blue-600">
                              {formatDate(book.createdAt)}
                            </span>
                          </div>
                          
                          <div className="text-lg font-bold text-green-600 mb-3">
                            Rp {book.price.toLocaleString('id-ID')}
                          </div>
                          
                          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium text-sm">
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* All New Arrivals */}
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Semua Buku Baru
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {newBooks.map((book) => (
                  <div key={book.id} className="relative">
                    {/* New Arrival Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className={`text-white text-xs font-bold px-2 py-1 rounded-full ${
                        isNewRelease(book.createdAt) 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse' 
                          : 'bg-gray-500'
                      }`}>
                        {isNewRelease(book.createdAt) ? 'NEW' : 'BARU'}
                      </div>
                    </div>
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Jangan Lewatkan Buku Baru!</h2>
          <p className="text-xl mb-6 text-blue-100">
            Berlangganan newsletter untuk mendapat notifikasi buku terbaru
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Berlangganan
            </button>
          </div>
        </div>

        {/* Categories of New Books */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Kategori Buku Baru
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from(new Set(newBooks.map(book => book.category))).map((category) => {
              const categoryCount = newBooks.filter(book => book.category === category).length;
              return (
                <div key={category} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {categoryCount}
                  </div>
                  <div className="text-sm text-gray-600">{category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;