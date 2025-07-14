import React from 'react';
import { RotateCcw, CheckCircle, XCircle, Clock, AlertTriangle, Package } from 'lucide-react';

const Returns: React.FC = () => {
  const returnReasons = [
    'Buku rusak atau cacat',
    'Buku tidak sesuai pesanan',
    'Kemasan rusak saat pengiriman',
    'Buku tidak lengkap (halaman hilang)',
    'Salah kirim produk',
    'Tidak puas dengan kualitas'
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'Ajukan Pengembalian',
      description: 'Hubungi customer service dalam 7 hari setelah barang diterima',
      icon: Package
    },
    {
      step: 2,
      title: 'Konfirmasi Tim',
      description: 'Tim kami akan mengkonfirmasi dan memberikan instruksi pengembalian',
      icon: CheckCircle
    },
    {
      step: 3,
      title: 'Kirim Barang',
      description: 'Kirim barang sesuai instruksi dengan kondisi masih baik',
      icon: RotateCcw
    },
    {
      step: 4,
      title: 'Verifikasi',
      description: 'Tim kami akan memeriksa kondisi barang yang dikembalikan',
      icon: Clock
    },
    {
      step: 5,
      title: 'Refund/Tukar',
      description: 'Refund atau penukaran akan diproses dalam 3-5 hari kerja',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Kebijakan Pengembalian</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan terbaik termasuk kemudahan pengembalian barang
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">🔄 Garansi Pengembalian 7 Hari</h2>
          <p className="text-xl mb-6">
            Tidak puas? Kembalikan dalam 7 hari untuk refund 100%
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Gratis Biaya Return</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Refund 100%</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Proses Cepat</span>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Syarat Pengembalian</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Barang dalam kondisi asli dan tidak rusak</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Masih dalam kemasan asli (jika ada)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Dikembalikan dalam 7 hari setelah diterima</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Menyertakan bukti pembelian</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Tidak ada coretan atau kerusakan</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Tidak Dapat Dikembalikan</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Buku yang sudah dibaca habis</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Buku dengan coretan atau highlight</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Buku yang rusak karena kelalaian pembeli</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Buku custom atau pesanan khusus</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <span className="text-gray-700">Lewat dari batas waktu 7 hari</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Return Reasons */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Alasan Pengembalian yang Diterima</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {returnReasons.map((reason, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                <span className="text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Proses Pengembalian</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {returnProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <process.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{process.title}</h3>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for Returns */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ingin Mengembalikan Barang?</h2>
          <p className="text-xl mb-6">
            Hubungi customer service kami untuk bantuan pengembalian
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Chat Customer Service
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Telepon: +62 21 1234 5678
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQ Pengembalian</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Berapa lama proses refund?</h3>
              <p className="text-gray-600">Setelah barang diterima dan diverifikasi, refund akan diproses dalam 3-5 hari kerja ke rekening atau metode pembayaran asal.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Apakah biaya pengiriman return ditanggung?</h3>
              <p className="text-gray-600">Ya, untuk return karena kesalahan kami (barang rusak, salah kirim), biaya return ditanggung sepenuhnya oleh Buku-ku.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Bisakah tukar dengan buku lain?</h3>
              <p className="text-gray-600">Ya, Anda bisa menukar dengan buku lain dengan nilai yang sama atau membayar selisihnya jika lebih mahal.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Bagaimana cara melacak status return?</h3>
              <p className="text-gray-600">Anda akan mendapat email konfirmasi dan update status return. Bisa juga cek di halaman "Pesanan Saya".</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;