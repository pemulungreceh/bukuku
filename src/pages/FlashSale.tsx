import React, { useState, useEffect } from 'react';
import { Zap, Clock, Siren as Fire } from 'lucide-react';
import BookCard from '../components/BookCard';
import apiService from '../services/api';

const FlashSale: React.FC = () => {
  const [flashSaleBooks, setFlashSaleBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 45
  });

  useEffect(() => {
    loadFlashSaleBooks();
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadFlashSaleBooks = async () => {
    setIsLoading(true);
    try {
      // Get featured books as flash sale items
      const response = await apiService.getBooks({ featured: true, limit: 8 });
      if (response.success && response.data) {
        // Add flash sale discount to books
        const flashSaleBooks = response.data.map((book: any) => ({
          ...book,
          originalPrice: book.price,
          price: Math.round(book.price * 0.7), // 30% discount
          discount: 30
        }));
        setFlashSaleBooks(flashSaleBooks);
      }
    } catch (error) {
      console.error('Failed to load flash sale books:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              FLASH SALE
            </h1>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full">
              <Fire className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-xl text-gray-700 mb-8">
            Diskon hingga 30% untuk buku pilihan! Buruan, stok terbatas!
          </p>

          {/* Countdown Timer */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="h-6 w-6 text-red-500" />
              <span className="text-lg font-semibold text-gray-800">Berakhir dalam:</span>
            </div>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-2xl font-bold py-3 px-4 rounded-lg min-w-[60px]">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 mt-1">Jam</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-2xl font-bold py-3 px-4 rounded-lg min-w-[60px]">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 mt-1">Menit</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-2xl font-bold py-3 px-4 rounded-lg min-w-[60px]">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 mt-1">Detik</div>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Books */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat produk flash sale...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flashSaleBooks.map((book) => (
              <div key={book.id} className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{book.discount}%
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-red-200">
                  <div className="relative overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Flash Sale Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    
                    {/* Price with discount */}
                    <div className="mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-red-600">
                          {formatPrice(book.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(book.originalPrice)}
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Hemat {formatPrice(book.originalPrice - book.price)}
                      </div>
                    </div>
                    
                    {/* Stock indicator */}
                    <div className="mb-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${Math.max(20, (book.stock / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Tersisa {book.stock} item
                      </p>
                    </div>

                    <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 font-medium text-sm">
                      BELI SEKARANG
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Flash Sale Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Syarat & Ketentuan Flash Sale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Ketentuan Umum:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Flash sale berlaku selama waktu yang ditentukan</li>
                <li>• Stok terbatas, selama persediaan masih ada</li>
                <li>• Tidak dapat digabung dengan promo lain</li>
                <li>• Harga sudah termasuk diskon</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Cara Berbelanja:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Pilih buku yang diinginkan</li>
                <li>• Klik "Beli Sekarang" untuk checkout langsung</li>
                <li>• Atau tambahkan ke keranjang untuk belanja lainnya</li>
                <li>• Selesaikan pembayaran sebelum waktu habis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;