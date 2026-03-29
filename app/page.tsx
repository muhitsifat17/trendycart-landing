"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  // আপনার ৪টি প্রোডাক্টের লিস্ট
  const products = [
    { name: 'Sukuna LED Sign', img: '/GWPS7RvojNjsIRXUGBKDdKaNgU9s51p1Cwx3hnAP (1).png', price: '৳ ৮৫০' },
    { name: 'Dragon LED Sign', img: '/jAKEos7Bhunnx80AY9eE5lCLXkztmWOkSNckyhhq.png', price: '৳ ৯৫০' },
    { name: 'Goku LED Sign', img: '/jNAjYvdEOwrZ6SogQwEIWRlfJoKzPUxxThkTGtrK.png', price: '৳ ৮৫০' },
    { name: 'Spider-Man LED Sign', img: '/dSq5UUDzXFa8PQLePJa9s5CJDJ5M61SM2sHa1f1n.png', price: '৳ ৯০০' },
  ];

  // অর্ডার হ্যান্ডেল করার ফাংশন (গুগল শিট কানেকশন সহ)
  const handleOrder = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = [
      {
        Name: e.target.name.value,
        Phone: e.target.phone.value,
        Address: e.target.address.value,
        Date: new Date().toLocaleString("en-GB"),
      }
    ];

    try {
      const response = await fetch('https://api.sheetbest.com/sheets/174776a4-37c2-4e4e-87d9-77b06452f255', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("অর্ডার সফলভাবে নেওয়া হয়েছে! ধন্যবাদ।");
        e.target.reset();
      } else {
        alert("সার্ভারে সমস্যা হচ্ছে, শিট সেটিংস চেক করুন।");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("নেটওয়ার্ক সমস্যা, দয়া করে ইন্টারনেট চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-orange-500">
      {/* Header Section */}
      <header className="py-20 text-center bg-zinc-900/30 border-b border-zinc-800">
        <h1 className="text-6xl font-black text-orange-500 mb-4 tracking-tighter">TrendyCart BD</h1>
        <p className="text-xl text-zinc-400">আপনার গেমিং সেটআপকে দিন এক প্রিমিয়াম ভাইব! ⚡</p>
        <div className="mt-8">
          <a href="#order" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition">অর্ডার করুন</a>
        </div>
      </header>

      {/* Product List */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {products.map((p, i) => (
          <div key={i} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300">
            <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-2xl bg-black border border-zinc-800">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain p-4" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{p.name}</h2>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-black text-orange-400">{p.price}</span>
              <a href="#order" className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-xl font-bold transition">অর্ডার দিন</a>
            </div>
          </div>
        ))}
      </section>

      {/* Form Section */}
      <section id="order" className="bg-zinc-900 py-20 px-6">
        <div className="max-w-md mx-auto bg-black p-8 rounded-3xl border border-zinc-800 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">অর্ডার কনফার্ম করুন 🛒</h2>
          
          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-500 mb-1 ml-1">আপনার নাম</label>
              <input name="name" type="text" placeholder="পুরো নাম লিখুন" className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none transition" required />
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-1 ml-1">মোবাইল নম্বর</label>
              <input name="phone" type="tel" placeholder="০১৭xxxxxxxx" className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none transition" required />
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-1 ml-1">ডেলিভারি ঠিকানা</label>
              <textarea name="address" placeholder="গ্রাম/রোড, থানা, জেলা" className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 h-32 focus:border-orange-500 outline-none transition" required></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 py-4 rounded-xl font-bold text-xl hover:bg-orange-700 transition disabled:bg-zinc-700 active:scale-95"
            >
              {loading ? 'অর্ডার পাঠানো হচ্ছে...' : 'ক্যাশ অন ডেলিভারি (Confirm)'}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-zinc-600 border-t border-zinc-900 mt-10">
        <p>© 2026 TrendyCart BD | Premium Anime LED Signs</p>
      </footer>
    </main>
  );
}