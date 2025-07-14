// Service untuk menangani upload gambar ke local storage
class ImageService {
  private baseUrl = 'http://localhost/bukuku-api';

  async uploadImage(file: File, folder: string = 'books'): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const response = await fetch(`${this.baseUrl}/upload/image.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data.url;
      } else {
        throw new Error(result.error || 'Upload gagal');
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback untuk demo - return placeholder image
      return 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
  }

  async deleteImage(imagePath: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/upload/delete.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePath }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  }

  // Generate unique filename
  generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${random}.${extension}`;
  }

  // Create date-based folder structure
  getDateFolder(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
}

export const imageService = new ImageService();
export default imageService;