"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deliveryArea, setDeliveryArea] = useState('dhaka');
  const [showSlip, setShowSlip] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  // আপনার ৪টি প্রোডাক্টের লিস্ট
  const products = [
    { id: 1, name: 'Sukuna LED Sign', img: '/GWPS7RvojNjsIRXUGBKDdKaNgU9s51p1Cwx3hnAP (1).png', price: 850 },
    { id: 2, name: 'Dragon LED Sign', img: '/jAKEos7Bhunnx80AY9eE5lCLXkztmWOkSNckyhhq.png', price: 950 },
    { id: 3, name: 'Goku LED Sign', img: '/jNAjYvdEOwrZ6SogQwEIWRlfJoKzPUxxThkTGtrK.png', price: 850 },
    { id: 4, name: 'Spider-Man LED Sign', img: '/dSq5UUDzXFa8PQLePJa9s5CJDJ5M61SM2sHa1f1n.png', price: 900 },
  ];

  // ডেলিভারি চার্জ ক্যালকুলেশন
  const deliveryCharge = deliveryArea === 'dhaka' ? 70 : 120;
  const totalPrice = selectedProduct ? selectedProduct.price + deliveryCharge : 0;

  // আপনার হোয়াটসঅ্যাপ নম্বর এখানে দিন (বিনা জিরো ও কান্ট্রি কোড সহ)
  const whatsappNumber = "8801601342114"; // <--- এখানে আপনার নম্বরটি দিন

  // অর্ডার হ্যান্ডেল করার ফাংশন
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
      } else {
        alert("সার্ভারে সমস্যা হচ্ছে, আবার চেষ্টা করুন।");
      }
    } catch (error) {
      alert("নেটওয়ার্ক সমস্যা, দয়া করে ইন্টারনেট চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  // অর্ডার সফল হলে স্লিপ দেখানোর অংশ
  if (showSlip) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-orange-500 w-full max-w-md shadow-2xl">
          <h1 className="text-3xl font-black text-orange-500 text-center mb-6">TrendyCart BD</h1>
          <div className="border-b border-zinc-800 pb-4 mb-4">
            <p className="text-zinc-400 text-sm">অর্ডার স্লিপ</p>
            <p className="text-xl font-bold text-green-400">অর্ডার সফল হয়েছে! ✅</p>
          </div>
          <div className="space-y-3">
            <p><strong>নাম:</strong> {orderInfo.Name}</p>
            <p><strong>প্রোডাক্ট:</strong> {orderInfo.Product}</p>
            <p><strong>মোট মূল্য:</strong> ৳ {orderInfo.Total}</p>
            <p className="text-sm text-zinc-500 italic pt-4 text-center">অর্ডারের জন্য ধন্যবাদ। ৩-৫ দিনের মধ্যে ডেলিভারি পাবেন।</p>
          </div>
          <button onClick={() => window.print()} className="w-full mt-8 bg-orange-600 py-3 rounded-xl font-bold hover:bg-orange-700 transition">স্লিপ ডাউনলোড করুন</button>
          <button onClick={() => setShowSlip(false)} className="w-full mt-2 text-zinc-500 text-sm hover:underline">হোমে ফিরে যান</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 scroll-smooth">
      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=হ্যালো, আমি TrendyCart BD থেকে একটি এলইডি সাইন নিয়ে কথা বলতে চাই!`}
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition active:scale-95 border-2 border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

      {/* Hero Section */}
      <header className="py-20 text-center bg-zinc-900/30 border-b border-zinc-800">
        <h1 className="text-6xl font-black text-orange-500 mb-4 tracking-tighter">TrendyCart BD</h1>
        <p className="text-xl text-zinc-400">আপনার গেমিং সেটআপকে দিন এক প্রিমিয়াম ভাইব! ⚡</p>
        <div className="mt-8">
          <a href="#products" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition">অর্ডার শুরু করুন</a>
        </div>
      </header>

      {/* Product Selection */}
      <section id="products" className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center underline decoration-orange-500 decoration-4 underline-offset-8">পছন্দের প্রোডাক্ট সিলেক্ট করুন</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProduct(p)}
              className={`cursor-pointer bg-zinc-900 p-5 rounded-3xl border-2 transition-all duration-300 ${selectedProduct?.id === p.id ? 'border-orange-500 scale-105 shadow-2xl shadow-orange-900/40' : 'border-zinc-800'}`}
            >
              <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-2xl bg-black border border-zinc-800">
                <img src={p.img} alt={p.name} className="w-full h-full object-contain p-2" />
              </div>
              <p className="text-lg font-bold text-center mb-1">{p.name}</p>
              <p className="text-orange-400 text-center font-black">৳ {p.price}</p>
              {selectedProduct?.id === p.id && (
                <div className="text-center mt-2 text-xs text-orange-500 font-bold uppercase tracking-wider">সিলেক্টেড ✅</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Checkout Form */}
      <section id="order" className="bg-zinc-900/50 py-20 px-6">
        <div className="max-w-xl mx-auto bg-black p-10 rounded-[40px] border border-zinc-800 shadow-2xl">
          <h2 className="text-3xl font-black text-center mb-8">চেকআউট 🛒</h2>
          
          <form onSubmit={handleOrder} className="space-y-6">
            <input name="name" type="text" placeholder="আপনার পুরো নাম" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none transition" required />
            <input name="phone" type="tel" placeholder="মোবাইল নম্বর" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none transition" required />
            <textarea name="address" placeholder="বিস্তারিত ঠিকানা (গ্রাম/রোড, থানা, জেলা)" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 h-32 focus:border-orange-500 outline-none transition" required></textarea>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <p className="mb-4 text-sm text-zinc-400 font-bold uppercase tracking-widest">শিপিং এরিয়া:</p>
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="area" className="w-5 h-5 accent-orange-500" checked={deliveryArea === 'dhaka'} onChange={() => setDeliveryArea('dhaka')} /> 
                  <span className="font-bold group-hover:text-orange-400 transition">ঢাকার মধ্যে (৳৭০)</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input type="radio" name="area" className="w-5 h-5 accent-orange-500" checked={deliveryArea === 'outside'} onChange={() => setDeliveryArea('outside')} /> 
                  <span className="font-bold group-hover:text-orange-400 transition">ঢাকার বাইরে (৳১২০)</span>
                </label>
              </div>
            </div>

            {selectedProduct ? (
              <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex justify-between text-zinc-400">
                  <span>নির্বাচিত: {selectedProduct.name}</span>
                  <span className="font-bold text-white">৳ {selectedProduct.price}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>শিপিং চার্জ:</span>
                  <span className="font-bold text-white">৳ {deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-3xl font-black text-orange-500 pt-4 border-t border-zinc-800">
                  <span>সর্বমোট:</span>
                  <span>৳ {totalPrice}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-orange-950/20 border-2 border-dashed border-orange-500/30 rounded-2xl text-orange-400 text-center font-bold">
                ⚠️ একটি প্রোডাক্ট সিলেক্ট করুন
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading || !selectedProduct}
              className="w-full bg-orange-600 py-5 rounded-2xl font-black text-2xl hover:bg-orange-700 transition disabled:bg-zinc-800 shadow-xl shadow-orange-600/20"
            >
              {loading ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-600 border-t border-zinc-900 mt-10">
        <p className="text-orange-500 font-bold mb-2 tracking-widest uppercase">TrendyCart BD</p>
        <p>© 2026 Premium Anime LED Signs | Built by Sifat</p>
      </footer>
    </main>
  );
}