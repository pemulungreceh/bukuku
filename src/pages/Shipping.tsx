import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, CheckCircle } from 'lucide-react';

const Shipping: React.FC = () => {
  const shippingOptions = [
    {
      name: 'Reguler',
      icon: Package,
      time: '3-5 hari kerja',
      cost: 'Rp 15.000',
      description: 'Pengiriman standar dengan jaminan keamanan'
    },
    {
      name: 'Express',
      icon: Truck,
      time: '1-2 hari kerja',
      cost: 'Rp 25.000',
      description: 'Pengiriman cepat untuk kebutuhan mendesak'
    },
    {
      name: 'Same Day',
      icon: Clock,
      time: 'Hari yang sama',
      cost: 'Rp 35.000',
      description: 'Khusus Jakarta & sekitarnya, pesan sebelum jam 12:00'
    }
  ];

  const coverageAreas = [
    { area: 'Jakarta & Tangerang', time: '1-2 hari', cost: 'Rp 15.000' },
    { area: 'Bogor & Depok', time: '1-2 hari', cost: 'Rp 15.000' },
    { area: 'Bekasi & Karawang', time: '1-2 hari', cost: 'Rp 15.000' },
    { area: 'Bandung & Cimahi', time: '2-3 hari', cost: 'Rp 18.000' },
    { area: 'Surabaya & Sidoarjo', time: '2-3 hari', cost: 'Rp 20.000' },
    { area: 'Yogyakarta & Solo', time: '2-3 hari', cost: 'Rp 18.000' },
    { area: 'Semarang & Salatiga', time: '2-3 hari', cost: 'Rp 18.000' },
    { area: 'Medan & Binjai', time: '3-4 hari', cost: 'Rp 25.000' },
    { area: 'Makassar & Gowa', time: '3-4 hari', cost: 'Rp 25.000' },
    { area: 'Denpasar & Badung', time: '3-4 hari', cost: 'Rp 22.000' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Informasi Pengiriman</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami menggunakan kurir terpercaya untuk memastikan buku Anda sampai dengan aman
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Pilihan Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <option.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{option.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">{option.cost}</p>
                <p className="text-gray-600 mb-4">{option.time}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Free Shipping */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">🚚 GRATIS ONGKIR!</h2>
          <p className="text-xl mb-6">
            Untuk pembelian minimal <strong>Rp 200.000</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Seluruh Indonesia</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Tanpa Minimum Berat</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Berlaku Selamanya</span>
            </div>
          </div>
        </div>

        {/* Coverage Areas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Area Jangkauan</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimasi Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Biaya Pengiriman
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coverageAreas.map((area, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-green-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{area.area}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {area.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {area.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Shipping Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Proses Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pesanan Dikonfirmasi</h3>
              <p className="text-sm text-gray-600">Pesanan Anda akan diproses dalam 1-2 jam kerja</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Dikemas</h3>
              <p className="text-sm text-gray-600">Buku dikemas dengan aman menggunakan bubble wrap</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Dikirim</h3>
              <p className="text-sm text-gray-600">Paket diserahkan ke kurir dan nomor resi dikirim</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Diterima</h3>
              <p className="text-sm text-gray-600">Paket sampai di alamat tujuan dengan selamat</p>
            </div>
          </div>
        </div>

        {/* Shipping Partners */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Partner Pengiriman</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800">JNE</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">J&T Express</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">SiCepat</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">AnterAja</h3>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Semua partner kurir kami telah terpercaya dan berpengalaman dalam pengiriman buku
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;