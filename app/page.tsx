"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deliveryArea, setDeliveryArea] = useState('dhaka');
  const [showSlip, setShowSlip] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  // আপনার রিনেম করা ছবির নাম অনুযায়ী এখানে পাথ সেট করা হয়েছে
  const products = [
    { id: 1, name: 'Dragon LED Sign', img: '/dragon.png', price: 1099, cat: 'Anime' },
    { id: 2, name: 'Batman Logo LED', img: '/batman.webp', price: 1199, cat: 'Anime' },
    { id: 3, name: 'Sukuna LED Sign', img: '/sukuna.jpg', price: 1199, cat: 'Anime' },
    { id: 4, name: 'Full Moon Lamp', img: '/moon.jpg', price: 1099, cat: 'Ambient' },
    { id: 5, name: 'Cute Panda Light', img: '/panda.webp', price: 299, cat: 'Cute' },
  ];

  const deliveryCharge = deliveryArea === 'dhaka' ? 70 : 120;
  const totalPrice = selectedProduct ? selectedProduct.price + deliveryCharge : 0;

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
      <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
        <img src="/logo.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] opacity-10 pointer-events-none" />
        <div className="bg-zinc-900 p-8 rounded-3xl border border-orange-500 w-full max-w-md shadow-2xl relative z-10 text-center">
          <img src="/logo.jpg" className="h-20 mx-auto mb-6 rounded-full border-2 border-orange-500" />
          <h2 className="text-xl font-bold text-green-400 mb-4">অর্ডার সফল হয়েছে! ✅</h2>
          <div className="text-left space-y-2 text-zinc-300">
            <p><strong>নাম:</strong> {orderInfo.Name}</p>
            <p><strong>প্রোডাক্ট:</strong> {orderInfo.Product}</p>
            <p><strong>মোট:</strong> ৳ {orderInfo.Total}</p>
          </div>
          <button onClick={() => window.print()} className="w-full mt-6 bg-orange-600 py-3 rounded-xl font-bold">স্লিপ ডাউনলোড করুন</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden selection:bg-orange-500">
      {/* Background Logo Watermark */}
      <img src="/logo.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] opacity-5 pointer-events-none" />

      {/* Header with Large Logo */}
      <header className="py-24 text-center border-b border-zinc-900 bg-zinc-950/50 relative z-10">
        <div className="inline-block p-4 rounded-full bg-gradient-to-b from-orange-500/20 to-transparent mb-6">
          <img src="/logo.jpg" className="h-32 w-32 md:h-40 md:w-40 mx-auto rounded-full border-4 border-orange-600 shadow-[0_0_50px_rgba(234,88,12,0.3)] object-cover" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">TrendyCart BD</h1>
        <p className="text-lg text-zinc-400">আপনার সেটআপকে দিন এক প্রিমিয়াম ভাইব! ⚡</p>
      </header>

      {/* Product List */}
      <section className="max-w-6xl mx-auto py-16 px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} onClick={() => setSelectedProduct(p)} className={`bg-zinc-900 p-4 rounded-[32px] border-2 transition-all duration-500 cursor-pointer ${selectedProduct?.id === p.id ? 'border-orange-500 scale-105 shadow-[0_0_30px_rgba(234,88,12,0.2)]' : 'border-zinc-800'}`}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-black mb-4">
                <img src={p.img} className="w-full h-full object-contain p-2" alt={p.name} />
              </div>
              <h3 className="font-bold text-center h-12 flex items-center justify-center text-sm md:text-base">{p.name}</h3>
              <p className="text-orange-500 text-center font-black text-lg">৳ {p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form */}
      <section className="bg-zinc-900/50 py-20 px-6 relative z-10">
        <div className="max-w-xl mx-auto bg-black p-8 rounded-[40px] border border-zinc-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">চেকআউট 🛒</h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <input name="name" type="text" placeholder="আপনার নাম" className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-orange-500 transition-all" required />
            <input name="phone" type="tel" placeholder="ফোন নম্বর" className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-orange-500 transition-all" required />
            <textarea name="address" placeholder="বিস্তারিত ঠিকানা" className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 h-28 outline-none focus:border-orange-500 transition-all" required></textarea>
            
            <div className="flex gap-4 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <label className="flex-1 flex items-center gap-2 cursor-pointer font-bold"><input type="radio" checked={deliveryArea === 'dhaka'} onChange={() => setDeliveryArea('dhaka')} className="accent-orange-500" /> ঢাকার মধ্যে</label>
              <label className="flex-1 flex items-center gap-2 cursor-pointer font-bold"><input type="radio" checked={deliveryArea === 'outside'} onChange={() => setDeliveryArea('outside')} className="accent-orange-500" /> ঢাকার বাইরে</label>
            </div>

            {selectedProduct && (
              <div className="p-5 bg-orange-600/10 rounded-2xl border border-orange-500/20 text-center">
                <p className="text-sm text-zinc-400 mb-1">মোট পরিশোধযোগ্য টাকা:</p>
                <p className="text-3xl font-black text-orange-500">৳ {totalPrice}</p>
              </div>
            )}

            <button type="submit" disabled={loading || !selectedProduct} className="w-full bg-orange-600 py-4 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 disabled:bg-zinc-800">
              {loading ? 'অর্ডার হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-600 border-t border-zinc-900">
        <p>© 2026 TrendyCart BD - Premium Decor</p>
      </footer>
    </main>
  );
}