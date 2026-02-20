// app/ssr/page.tsx
export default async function SSRPage() {
  const res = await fetch('https://dummyjson.com/products/category/tops?limit=5', { 
    cache: 'no-store' 
  });
  const data = await res.json();
  const products = data.products;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#800000] mb-8">New Collection</h1>
      <div className="space-y-4">
        {products.map((item: any) => (
          <div key={item.id} className="flex gap-4 p-4 bg-white border-l-4 border-[#800000] shadow-sm">
            <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover" />
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p className="text-[#800000]">${item.price}</p>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">Server Rendered</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}