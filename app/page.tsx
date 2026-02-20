// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#800000] mb-6 tracking-tighter">
          Elegant Modesty.
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
          Selamat datang di <span className="font-semibold text-[#800000]">D4RL Collection</span>. 
          Eksplorasi teknik rendering modern Next.js melalui katalog busana muslim kami yang dikembangkan secara sistematis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/ssg" className="p-6 border border-gray-200 rounded-xl hover:border-[#800000] transition-all group">
            <h3 className="font-bold text-[#800000] mb-2">SSG</h3>
            <p className="text-xs text-gray-400 group-hover:text-gray-600">Static Site Generation</p>
          </Link>
          
          <Link href="/ssr" className="p-6 border border-gray-200 rounded-xl hover:border-[#800000] transition-all group">
            <h3 className="font-bold text-[#800000] mb-2">SSR</h3>
            <p className="text-xs text-gray-400 group-hover:text-gray-600">Server-Side Rendering</p>
          </Link>
          
          <Link href="/csr" className="p-6 border border-gray-200 rounded-xl hover:border-[#800000] transition-all group">
            <h3 className="font-bold text-[#800000] mb-2">CSR</h3>
            <p className="text-xs text-gray-400 group-hover:text-gray-600">Client-Side Rendering</p>
          </Link>
        </div>
      </div>
    </div>
  );
}