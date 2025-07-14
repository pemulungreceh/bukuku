import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';
import apiService from '../services/api';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [books, setBooks] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadCategoryBooks();
    }
  }, [slug]);

  const loadCategoryBooks = async () => {
    setIsLoading(true);
    try {
      // Load category info
      const categoriesResponse = await apiService.getCategories();
      if (categoriesResponse.success && categoriesResponse.data) {
        const foundCategory = categoriesResponse.data.find((cat: any) => cat.slug === slug);
        setCategory(foundCategory);
      }

      // Load books by category
      const booksResponse = await apiService.getBooks({ category: slug });
      if (booksResponse.success && booksResponse.data) {
        setBooks(booksResponse.data);
      }
    } catch (error) {
      console.error('Failed to load category books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat buku kategori...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 mx-auto">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {category?.name || 'Kategori'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category?.description || 'Koleksi buku dalam kategori ini'}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {books.length} buku ditemukan
          </div>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Belum ada buku dalam kategori ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;