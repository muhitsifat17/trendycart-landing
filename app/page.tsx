"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deliveryArea, setDeliveryArea] = useState('dhaka');
  const [showSlip, setShowSlip] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  // আপনার সমস্ত প্রোডাক্টের লিস্ট (ছবি ও প্রাইস সহ ক্যাটাগরি অনুযায়ী)
  const productCategories = [
    {
      name: 'Anime LED Signs',
      products: [
        { id: 1, name: 'Dragon LED Sign', img: '/dragon.png', price: 1099 },
        { id: 2, name: 'Batman Logo LED', img: '/batman.webp', price: 1199 },
        { id: 3, name: 'Sukuna LED Sign', img: '/ccBxlmIe7xZsfkU4T2iL2yFqq5oFvIxR7DWu8MtH.jpg', price: 1199 },
        { id: 4, name: 'Spider-Man LED Sign', img: '/EikmxREadPKbGDI7DNXb7biI2HicAs91Gd6k7g5W.jpg', price: 1149 },
        { id: 5, name: 'Goku LED Sign', img: '/5lyQEW7JHQWTSo0mjLh6vLMMKJwjGYg65s4Sqodr.webp', price: 1149 },
      ],
    },
    {
      name: 'Ambient Moon Lamps',
      products: [
        { id: 6, name: 'Full Moon Lamp', img: '/moon.jpg', price: 1099 },
        { id: 7, name: 'Half Moon Lamp', img: '/half moon.jpg.webp', price: 999 },
        { id: 8, name: 'Crystal Lamp', img: '/crystal lamp .jpg', price: 1099 },
      ],
    },
    {
      name: 'Cute & Decor Lights',
      products: [
        { id: 9, name: 'Cute Panda Light', img: '/cute panda .webp', price: 299 },
        { id: 10, name: 'Mushroom Light', img: '/mashroom.jpg', price: 299 },
        { id: 11, name: 'Tree Lamp', img: '/tree.jpg', price: 1099 },
        { id: 12, name: 'Baby Toy Lamp', img: '/baby toy lamp.webp', price: 1799 },
        { id: 13, name: 'Decorative Bulb', img: '/9hGJGq5PIzlsOvyjTxem6yGcHz4tqGdBDgmfW3oa.jpg', price: 999 },
      ],
    },
  ];

  const deliveryCharge = deliveryArea === 'dhaka' ? 70 : 120;
  const totalPrice = selectedProduct ? selectedProduct.price + deliveryCharge : 0;

  const whatsappNumber = "8801700000000"; // <--- আপনার নম্বরটি এখানে দিন

  const handleOrder = async (e: any) => {
    e.preventDefault();
    if (!selectedProduct) return alert("দয়া করে একটি প্রোডাক্ট সিলেক্ট করুন!");
    
    setLoading(true);
    const orderData = {
      Name: e.target.name.value,
      Phone: e.target.phone.value,
      Address: e.target.address.value,
      Product: selectedProduct.name,
      Total: totalPrice,
      Date: new Date().toLocaleString("en-GB"),
    };

    try {
      const response = await fetch('https://api.sheetbest.com/sheets/174776a4-37c2-4e4e-87d9-77b06452f255', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([orderData]),
      });

      if (response.ok) {
        setOrderInfo(orderData);
        setShowSlip(true);
      }
    } catch (error) {
      alert("সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (showSlip) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-orange-500 w-full max-w-md shadow-2xl">
          <img src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" className="h-12 mx-auto mb-6" />
          <div className="border-b border-zinc-800 pb-4 mb-4 text-center">
            <p className="text-xl font-bold text-green-400">অর্ডার সফল হয়েছে! ✅</p>
          </div>
          <div className="space-y-3">
            <p><strong>নাম:</strong> {orderInfo.Name}</p>
            <p><strong>প্রোডাক্ট:</strong> {orderInfo.Product}</p>
            <p><strong>মোট মূল্য:</strong> ৳ {orderInfo.Total}</p>
          </div>
          <button onClick={() => window.print()} className="w-full mt-8 bg-orange-600 py-3 rounded-xl font-bold">স্লিপ ডাউনলোড করুন</button>
          <button onClick={() => setShowSlip(false)} className="w-full mt-2 text-zinc-500 text-sm">হোমে ফিরে যান</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans scroll-smooth relative overflow-hidden">
      
      {/* Background Logo Watermark */}
      <img 
        src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] opacity-5 pointer-events-none z-0"
      />

      <header className="py-20 text-center bg-zinc-900/30 border-b border-zinc-800 z-10 relative">
        <img src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" className="h-20 mx-auto mb-6" />
        <p className="text-xl text-zinc-400 font-bold">আপনার সেটআপকে দিন এক প্রিমিয়াম ভাইব! ⚡</p>
      </header>

      <section id="products" className="max-w-7xl mx-auto py-16 px-6 z-10 relative">
        {productCategories.map((category) => (
          <div key={category.name} className="mb-16">
            <h2 className="text-2xl font-black text-orange-500 mb-8 border-l-4 border-orange-500 pl-4">{category.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedProduct(p)}
                  className={`cursor-pointer bg-zinc-900 p-4 rounded-3xl border-2 transition-all ${selectedProduct?.id === p.id ? 'border-orange-500 scale-105 shadow-2xl' : 'border-zinc-800'}`}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-black mb-4">
                    <img src={p.img} className="w-full h-full object-contain p-2" />
                  </div>
                  <p className="font-bold text-center h-12 flex items-center justify-center">{p.name}</p>
                  <p className="text-orange-400 text-center font-black">৳ {p.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-zinc-900/50 py-20 px-6 z-10 relative">
        <div className="max-w-xl mx-auto bg-black p-10 rounded-[40px] border border-zinc-800">
          <h2 className="text-3xl font-black text-center mb-8">চেকআউট 🛒</h2>
          <form onSubmit={handleOrder} className="space-y-6">
            <input name="name" type="text" placeholder="আপনার পুরো নাম" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-orange-500" required />
            <input name="phone" type="tel" placeholder="মোবাইল নম্বর" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-orange-500" required />
            <textarea name="address" placeholder="বিস্তারিত ঠিকানা" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 h-32 outline-none focus:border-orange-500" required></textarea>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex gap-4">
              <label className="flex-1 flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={deliveryArea === 'dhaka'} onChange={() => setDeliveryArea('dhaka')} className="accent-orange-500" /> ঢাকার মধ্যে (৳৭০)
              </label>
              <label className="flex-1 flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={deliveryArea === 'outside'} onChange={() => setDeliveryArea('outside')} className="accent-orange-500" /> ঢাকার বাইরে (৳১২০)
              </label>
            </div>

            {selectedProduct && (
              <div className="p-6 bg-zinc-900/80 rounded-2xl border border-zinc-800 space-y-2">
                <div className="flex justify-between"><span>প্রোডাক্ট: {selectedProduct.name}</span><span>৳{selectedProduct.price}</span></div>
                <div className="flex justify-between text-2xl font-black text-orange-500 pt-4 border-t border-zinc-800"><span>মোট:</span><span>৳{totalPrice}</span></div>
              </div>
            )}

            <button type="submit" disabled={loading || !selectedProduct} className="w-full bg-orange-600 py-5 rounded-2xl font-black text-xl hover:bg-orange-700">
              {loading ? 'অর্ডার হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-600 border-t border-zinc-900 mt-10 z-10 relative">
        <img src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" className="h-10 mx-auto mb-2" />
        <p>© 2026 Premium Decor Signs | All Rights Reserved</p>
      </footer>
    </main>
  );
}