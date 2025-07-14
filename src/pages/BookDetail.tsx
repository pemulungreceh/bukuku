import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useBooks();
  const { addToCart } = useCart();
  const [book, setBook] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id && books.length > 0) {
      const foundBook = books.find(b => b.id === id);
      setBook(foundBook);
      setIsLoading(false);
    }
  }, [id, books]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
      alert('Buku berhasil ditambahkan ke keranjang!');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat detail buku...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Buku tidak ditemukan</p>
            <Link to="/books" className="text-green-600 hover:text-green-700 mt-4 inline-block">
              Kembali ke Katalog Buku
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600">Beranda</Link>
          <span>/</span>
          <Link to="/books" className="hover:text-green-600">Buku</Link>
          <span>/</span>
          <span className="text-gray-800">{book.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Book Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full max-w-md h-auto rounded-lg shadow-lg"
              />
              {book.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Pilihan
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">oleh {book.author}</p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {book.rating} ({book.reviews} ulasan)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-green-600">
                {formatPrice(book.price)}
              </span>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-600">Kategori:</span>
                <span className="ml-2 font-medium">{book.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Tahun Terbit:</span>
                <span className="ml-2 font-medium">{book.publishYear}</span>
              </div>
              <div>
                <span className="text-gray-600">ISBN:</span>
                <span className="ml-2 font-medium">{book.isbn}</span>
              </div>
              <div>
                <span className="text-gray-600">Stok:</span>
                <span className={`ml-2 font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.stock > 0 ? `${book.stock} tersedia` : 'Habis'}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{book.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Bagikan</span>
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Buku Serupa</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books
              .filter(b => b.category === book.category && b.id !== book.id)
              .slice(0, 5)
              .map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  to={`/book/${relatedBook.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedBook.coverImage}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 text-sm">
                      {relatedBook.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{relatedBook.author}</p>
                    <p className="text-green-600 font-bold">
                      {formatPrice(relatedBook.price)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;