import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Pesan Anda telah terkirim! Kami akan merespons dalam 24 jam.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ada pertanyaan atau butuh bantuan? Tim customer service kami siap membantu Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Informasi Kontak</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Alamat Kantor</h3>
                  <p className="text-gray-600">
                    Jl. Sudirman No. 123<br />
                    Jakarta Selatan 12190<br />
                    Indonesia
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Telepon</h3>
                  <p className="text-gray-600">+62 21 1234 5678</p>
                  <p className="text-gray-600">+62 812 3456 7890 (WhatsApp)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">info@bukuku.com</p>
                  <p className="text-gray-600">support@bukuku.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Jam Operasional</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Senin - Jumat: 09:00 - 18:00</p>
                    <p>Sabtu: 09:00 - 15:00</p>
                    <p>Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-8 space-y-4">
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat WhatsApp</span>
              </button>
              
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Telepon Sekarang</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjek *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Pilih subjek</option>
                  <option value="order">Pertanyaan Pesanan</option>
                  <option value="shipping">Informasi Pengiriman</option>
                  <option value="return">Pengembalian Barang</option>
                  <option value="payment">Masalah Pembayaran</option>
                  <option value="product">Pertanyaan Produk</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Lokasi Kami</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Peta akan ditampilkan di sini</p>
                <p className="text-sm text-gray-500 mt-2">
                  Jl. Sudirman No. 123, Jakarta Selatan 12190
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Berapa lama respon customer service?</h3>
              <p className="text-gray-600 text-sm">Kami merespons dalam 2-4 jam untuk chat dan email, 24 jam maksimal untuk pertanyaan kompleks.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Bisakah berkunjung langsung ke toko?</h3>
              <p className="text-gray-600 text-sm">Saat ini kami hanya melayani online. Namun Anda bisa mengunjungi kantor untuk keperluan khusus dengan appointment.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Apakah ada layanan konsultasi buku?</h3>
              <p className="text-gray-600 text-sm">Ya, tim kami bisa membantu merekomendasikan buku sesuai kebutuhan dan minat Anda.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Bagaimana cara komplain?</h3>
              <p className="text-gray-600 text-sm">Anda bisa menghubungi kami melalui form di atas, email, atau WhatsApp dengan menyertakan nomor pesanan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;