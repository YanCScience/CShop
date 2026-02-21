// app/ssr/page.tsx
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export default async function SSRPage() {
  let products: Product[] = [];
  let error = false;
  let serverTime = "";

  try {
    // Memaksa SSR dengan cache: 'no-store' sesuai persyaratan 2a
    const res = await fetch('https://dummyjson.com/products/category/tops?limit=8', { 
      cache: 'no-store' 
    });
    
    if (!res.ok) throw new Error();
    
    const data = await res.json();
    products = data.products;
    // Mendapatkan waktu server saat proses rendering
    serverTime = new Date().toLocaleTimeString('id-ID');
  } catch (err) {
    error = true;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-12 border-b border-gray-100 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#800000] uppercase tracking-tighter">
              New Arrival (SSR)
            </h1>
            <p className="text-gray-500 mt-2 italic text-sm">
              Halaman ini di-render di server setiap kali ada permintaan baru.
            </p>
          </div>
          {/* Indikator Visual untuk Dosen */}
          <div className="text-right">
            <div className="bg-red-50 border border-red-200 text-[#800000] text-[10px] font-bold px-3 py-1.5 rounded-md shadow-sm inline-block">
              RENDERED AT: {serverTime} (SERVER)
            </div>
          </div>
        </div>
      </header>

      {error ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
          <p className="text-red-500">Gagal mengambil data terbaru dari server.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow items-center">
              <div className="w-40 h-40 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                  <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded">HOT ITEM</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-black text-[#800000]">${item.price}</span>
                  <button className="bg-[#800000] text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#600000] transition-colors shadow-sm active:scale-95">
                    VIEW DETAIL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}