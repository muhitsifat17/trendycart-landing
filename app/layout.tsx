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
      ],
    },
    {
      name: 'Ambient Moon Lamps',
      products: [
        { id: 3, name: 'Moon Lamp', img: '/moon.jpg', price: 1099 },
        { id: 4, name: 'Half Moon Lamp', img: '/half moon.jpg.webp', price: 999 },
        { id: 5, name: 'Crystal Lamp', img: '/crystal lamp .jpg', price: 1099 }, // প্রাইস দেওয়া ছিল না, তাই ১০৯৯ সেট করা হয়েছে
      ],
    },
    {
      name: 'Cute & Decor Lights',
      products: [
        { id: 6, name: 'Cute Panda Light', img: '/cute panda .webp', price: 299 },
        { id: 7, name: 'Mushroom Light', img: '/mashroom.jpg', price: 299 },
        { id: 8, name: 'Tree Lamp', img: '/tree.jpg', price: 1099 },
        { id: 9, name: 'Baby Toy Lamp', img: '/baby toy lamp.webp', price: 1799 },
      ],
    },
  ];

  // ডেলিভারি চার্জ ক্যালকুলেশন
  const deliveryCharge = deliveryArea === 'dhaka' ? 70 : 120;
  const totalPrice = selectedProduct ? selectedProduct.price + deliveryCharge : 0;

  // আপনার হোয়াটসঅ্যাপ নম্বর এখানে দিন (বিনা জিরো ও কান্ট্রি কোড সহ)
  const whatsappNumber = "8801700000000"; // <--- আপনার নম্বরটি বসান

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
          <img src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" alt="TechnoMartBD" className="h-12 mx-auto mb-6" />
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
    <main className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 scroll-smooth relative overflow-hidden">
      
      {/* Background Logo Watermark */}
      <img 
        src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" 
        alt="TechnoMartBD Watermark" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[150vh] opacity-5 pointer-events-none z-0"
      />

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=হ্যালো, আমি TechnoMartBD থেকে একটি প্রোডাক্ট নিয়ে কথা বলতে চাই!`}
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition active:scale-95 border-2 border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

      {/* Hero Section */}
      <header className="py-20 text-center bg-zinc-900/30 border-b border-zinc-800 z-10 relative">
        <img src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" alt="TechnoMartBD" className="h-16 mx-auto mb-6" />
        <p className="text-xl text-zinc-400">আপনার সেটআপকে দিন এক প্রিমিয়াম ভাইব! ⚡</p>
        <div className="mt-8">
          <a href="#products" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition">অর্ডার শুরু করুন</a>
        </div>
      </header>

      {/* Product Selection */}
      <section id="products" className="max-w-7xl mx-auto py-16 px-6 z-10 relative">
        <h2 className="text-3xl font-bold mb-10 text-center underline decoration-orange-500 decoration-4 underline-offset-8">পছন্দের প্রোডাক্ট সিলেক্ট করুন</h2>
        
        {productCategories.map((category) => (
          <div key={category.name} className="mb-12">
            <h3 className="text-2xl font-semibold text-orange-400 mb-6 border-b border-zinc-800 pb-2">{category.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {category.products.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedProduct(p)}
                  className={`cursor-pointer bg-zinc-900 p-5 rounded-3xl border-2 transition-all duration-300 ${selectedProduct?.id === p.id ? 'border-orange-500 scale-105 shadow-2xl shadow-orange-900/40' : 'border-zinc-800'}`}
                >
                  <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-2xl bg-black border border-zinc-800">
                    <img src={p.img} alt={p.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <p className="text-base font-bold text-center mb-1 h-12 flex items-center justify-center">{p.name}</p>
                  <p className="text-orange-400 text-center font-black">৳ {p.price}</p>
                  {selectedProduct?.id === p.id && (
                    <div className="text-center mt-2 text-xs text-orange-500 font-bold uppercase tracking-wider bg-orange-500/10 py-1 rounded-full">সিলেক্টেড ✅</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Checkout Form */}
      <section id="order" className="bg-zinc-900/50 py-20 px-6 z-10 relative">
        <div className="max-w-xl mx-auto bg-black p-10 rounded-[40px] border border-zinc-800 shadow-2xl overflow-hidden relative">
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
              <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-3 relative z-10">
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
              <div className="p-4 bg-orange-950/20 border-2 border-dashed border-orange-500/30 rounded-2xl text-orange-400 text-center font-bold relative z-10">
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

      <footer className="py-12 text-center text-zinc-600 border-t border-zinc-900 mt-10 z-10 relative">
        <img src="/ideogram-v3.0_A_modern_minimalist_logo_for_an_e-commerce_brand_named_TrendyCart_BD_._The_logo_-0 (1).jpg" alt="TechnoMartBD" className="h-10 mx-auto mb-2" />
        <p>© 2026 Premium Decor Signs | All Rights Reserved</p>
      </footer>
    </main>
  );
}