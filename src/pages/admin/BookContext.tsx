import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  coverImage: string;
  publishYear: number;
  isbn: string;
  featured: boolean;
  bestseller: boolean;
  new_arrival: boolean;
}

interface BookContextType {
  books: Book[];
  addBook: (data: FormData) => Promise<boolean>;
  updateBook: (id: string, data: FormData) => Promise<boolean>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost/bukuku-api/books/index.php');
      console.log('Fetch books response:', response.data);
      if (response.data.success) {
        setBooks(response.data.data);
      } else {
        console.error('Gagal mengambil data buku:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (data: FormData): Promise<boolean> => {
    try {
      const response = await axios.post('http://localhost/bukuku-api/books/create.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Add book response:', response.data);
      if (response.data.success) {
        await fetchBooks();
        return true;
      } else {
        console.error('Gagal menambah buku:', response.data.error);
        return false;
      }
    } catch (error) {
      console.error('Error adding book:', error);
      return false;
    }
  };

  const updateBook = async (id: string, data: FormData): Promise<boolean> => {
    try {
      const response = await axios.post(`http://localhost/bukuku-api/books/update.php?id=${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Update book response:', response.data);
      if (response.data.success) {
        await fetchBooks();
        return true;
      } else {
        console.error('Gagal mengupdate buku:', response.data.error);
        return false;
      }
    } catch (error) {
      console.error('Error updating book:', error);
      return false;
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};