// app/ssg/page.tsx
export default async function SSGPage() {
  const res = await fetch('https://dummyjson.com/products/category/womens-dresses');
  const data = await res.json();
  const products = data.products;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#800000] mb-8">Dress Catalogue</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((item: any) => (
          <div key={item.id} className="border p-4 rounded shadow-sm bg-white">
            <img src={item.thumbnail} alt={item.title} className="h-48 w-full object-cover mb-4" />
            <h2 className="font-semibold text-sm truncate">{item.title}</h2>
            <p className="text-[#800000] font-bold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}