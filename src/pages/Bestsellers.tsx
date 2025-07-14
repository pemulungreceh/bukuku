import React, { useState, useEffect } from 'react';
import { TrendingUp, Star, Award } from 'lucide-react';
import BookCard from '../components/BookCard';
import apiService from '../services/api';

const Bestsellers: React.FC = () => {
  const [bestsellerBooks, setBestsellerBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBestsellerBooks();
  }, []);

  const loadBestsellerBooks = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getBooks({ bestseller: true });
      if (response.success && response.data) {
        // Sort by rating and reviews
        const sortedBooks = response.data.sort((a: any, b: any) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviews - a.reviews;
        });
        setBestsellerBooks(sortedBooks);
      }
    } catch (error) {
      console.error('Failed to load bestseller books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              BESTSELLERS
            </h1>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-xl text-gray-700 mb-8">
            Buku-buku terlaris yang paling banyak dibeli dan direkomendasikan pembaca
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {bestsellerBooks.length}
              </div>
              <div className="text-gray-600">Buku Bestseller</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.7+</div>
              <div className="text-gray-600">Rating Rata-rata</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
              <div className="text-gray-600">Total Terjual</div>
            </div>
          </div>
        </div>

        {/* Bestseller Books */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat buku bestseller...</p>
          </div>
        ) : bestsellerBooks.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Belum ada buku bestseller</p>
          </div>
        ) : (
          <>
            {/* Top 3 Bestsellers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                🏆 Top 3 Bestsellers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {bestsellerBooks.slice(0, 3).map((book, index) => (
                  <div key={book.id} className="relative">
                    {/* Ranking Badge */}
                    <div className="absolute -top-4 -left-4 z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-yellow-200">
                      <div className="relative">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            #{index + 1} BESTSELLER
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{book.author}</p>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(book.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {book.rating} ({book.reviews} reviews)
                          </span>
                        </div>
                        
                        <div className="text-xl font-bold text-green-600 mb-4">
                          Rp {book.price.toLocaleString('id-ID')}
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 font-medium">
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Bestsellers */}
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Semua Buku Bestseller
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {bestsellerBooks.map((book, index) => (
                  <div key={book.id} className="relative">
                    {/* Bestseller Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        BESTSELLER
                      </div>
                    </div>
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Why Bestsellers Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Mengapa Memilih Buku Bestseller?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600 text-sm">
                Buku-buku yang telah terbukti berkualitas dan disukai banyak pembaca
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Trending Topic</h3>
              <p className="text-gray-600 text-sm">
                Mengikuti tren dan topik yang sedang populer di kalangan pembaca
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Rekomendasi Terbaik</h3>
              <p className="text-gray-600 text-sm">
                Direkomendasikan oleh pembaca lain berdasarkan pengalaman membaca
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;