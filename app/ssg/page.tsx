// app/ssg/page.tsx
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default async function SSGPage() {
  // Pengambilan data standar (Default SSG di Next.js App Router)
  const res = await fetch('https://dummyjson.com/products/category/womens-dresses');
  const data = await res.json();
  const products: Product[] = data.products;

  // Mendapatkan waktu saat proses build (statis)
  const buildTime = new Date().toLocaleTimeString('id-ID');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#800000]">Catalogue (SSG)</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Halaman ini dibuat satu kali saat proses build. Sangat cepat dan hemat sumber daya server.
            </p>
          </div>
          {/* Indikator Visual untuk Dosen */}
          <div className="text-right">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold px-3 py-1.5 rounded-md shadow-sm inline-block">
              GENERATED AT BUILD: {buildTime} (STATIC)
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50">
            <div className="relative h-72 w-full bg-gray-50">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h2 className="text-xs font-medium text-gray-500 truncate uppercase tracking-widest mb-1">CShop Collection</h2>
              <h3 className="text-sm font-bold text-gray-800 truncate">{item.title}</h3>
              <p className="text-[#800000] font-black mt-3 text-lg">${item.price}</p>
              
              <button className="mt-4 w-full border border-[#800000] text-[#800000] py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-[#800000] hover:text-white transition-all active:scale-95">
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center text-gray-400 text-[10px]">
        *Data fetched from DummyJSON API via Static Site Generation
      </footer>
    </div>
  );
}