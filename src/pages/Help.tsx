import React from 'react';
import { Search, MessageCircle, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

const Help: React.FC = () => {
  const faqs = [
    {
      question: 'Bagaimana cara memesan buku?',
      answer: 'Anda dapat memesan buku dengan cara: 1) Pilih buku yang diinginkan, 2) Klik "Tambah ke Keranjang", 3) Lanjutkan ke checkout, 4) Isi data pengiriman, 5) Pilih metode pembayaran, 6) Selesaikan pembayaran.'
    },
    {
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer: 'Kami menerima pembayaran melalui: Transfer Bank, Kartu Kredit/Debit, E-wallet (OVO, GoPay, DANA), dan COD (Cash on Delivery) untuk area tertentu.'
    },
    {
      question: 'Berapa lama waktu pengiriman?',
      answer: 'Waktu pengiriman bervariasi tergantung lokasi: Jakarta & sekitarnya (1-2 hari), Jawa (2-3 hari), Luar Jawa (3-5 hari). Untuk pengiriman express tersedia dengan biaya tambahan.'
    },
    {
      question: 'Apakah bisa retur atau tukar buku?',
      answer: 'Ya, kami menerima retur/tukar dalam 7 hari setelah barang diterima dengan kondisi: buku masih dalam kondisi baik, tidak rusak, dan masih dalam kemasan asli.'
    },
    {
      question: 'Bagaimana cara melacak pesanan?',
      answer: 'Setelah pesanan dikirim, Anda akan menerima nomor resi melalui email/SMS. Anda dapat melacak pesanan di halaman "Pesanan Saya" atau langsung di website kurir.'
    },
    {
      question: 'Apakah ada diskon untuk pembelian dalam jumlah banyak?',
      answer: 'Ya, kami memberikan diskon khusus untuk pembelian grosir (minimal 10 buku). Silakan hubungi customer service untuk informasi lebih lanjut.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pusat Bantuan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari bantuan..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pertanyaan yang Sering Diajukan</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                      <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hubungi Kami</h2>
            
            <div className="space-y-4">
              {/* Live Chat */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Live Chat</h3>
                    <p className="text-sm text-gray-600">Respon cepat dalam hitungan menit</p>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Mulai Chat
                </button>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Telepon</h3>
                    <p className="text-sm text-gray-600">+62 21 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Senin - Jumat: 09:00 - 18:00</span>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-sm text-gray-600">info@bukuku.com</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Respon dalam 24 jam</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tautan Cepat</h3>
              <div className="space-y-2">
                <a href="/shipping" className="block text-green-600 hover:text-green-700">
                  Informasi Pengiriman
                </a>
                <a href="/returns" className="block text-green-600 hover:text-green-700">
                  Kebijakan Pengembalian
                </a>
                <a href="/contact" className="block text-green-600 hover:text-green-700">
                  Kontak Kami
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Kategori Bantuan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pemesanan</h3>
              <p className="text-gray-600 text-sm">Bantuan seputar cara memesan dan checkout</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pembayaran</h3>
              <p className="text-gray-600 text-sm">Informasi metode pembayaran dan transaksi</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pengiriman</h3>
              <p className="text-gray-600 text-sm">Tracking pesanan dan informasi pengiriman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;