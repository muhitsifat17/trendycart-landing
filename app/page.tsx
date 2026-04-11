"use client";

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deliveryArea, setDeliveryArea] = useState('dhaka');
  const [showSlip, setShowSlip] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const productCategories = [
    {
      name: 'Premium Gadgets',
      products: [
        { id: 20, name: '3D Firework Led Bulb', img: '/3D Firework Led Bulb.jpg', price: 550 },
        { id: 21, name: '3-in-1 Speaker Stand', img: '/3-in-1 Speaker Stand.jpg', price: 1250 },
        { id: 22, name: '6 Fit Tripod Stand + 10″ Ring Light', img: '/6 Fit Tripod Stand + 10″ Ring Light.jpg', price: 1150 },
        { id: 23, name: 'Air Humidifier Mini Night Light', img: '/Air Humidifier Mini Night Light.jpg', price: 700 },
        { id: 24, name: 'Awei P5K Powerbank', img: '/Awei P5K Powerbank.jpg', price: 850 },
        { id: 25, name: 'Bladeless Neck Fan', img: '/Bladeless Neck Fan.jpg', price: 550 },
        { id: 26, name: 'Boya Wireless Mic Box', img: '/Boya Wireless Mic Box.jpg', price: 499 },
        { id: 27, name: 'Bulb Humidifier Lamp Shade', img: '/Bulb Humidifier Lamp Shade550tk.png', price: 550 },
        { id: 28, name: 'Car Home Humidifier USB', img: '/Car Home Humidifier USB.jpg', price: 750 },
        { id: 29, name: 'Handheld Portable Desktop Table', img: '/Handheld Portable Desktop Table450tk.jpg', price: 450 },
        { id: 30, name: 'Anti Snoring Air Purifier Device', img: '/High Quality 2 in 1 Sleeping Anti Snoring Air Purifier Device 300.jpg', price: 300 },
        { id: 31, name: 'LED Thermal Flask Indicator', img: '/LED Thermal Flask Indicator.jpg', price: 850 },
        { id: 32, name: 'Mini Air Humidifier Aroma', img: '/Mini Air Humidifier Aroma Essential Oil Diffuser 250TK Lamp.png', price: 250 },
        { id: 33, name: 'Notebook Stand Metal', img: '/Notebook Stand Metal.jpg', price: 500 },
        { id: 34, name: 'Panda Humidifier', img: '/panda humidifier 350tk.png', price: 350 },
        { id: 35, name: 'Stylish Mini Umbrella', img: '/Stylish Mini Umbrella.jpg', price: 900 },
        { id: 36, name: 'USB Mosquito Killer Lamp', img: '/USB Mosquito Killer Lamp.jpg', price: 599 },
        { id: 37, name: 'Boya M1 Mic Box', img: '/FB_IMG_1729532597687.jpg', price: 499 },
      ],
    },
    {
      name: 'Special Gift & Decor',
      products: [
        { id: 14, name: 'Heart Shaped Gift Box', img: '/Heart Shaped Gift Box.jpg', price: 270 },
        { id: 15, name: 'Love Pearl Kit Set', img: '/love pearl kit Pearl Stone Locket Set.webp', price: 480 },
        { id: 16, name: 'Love Pearl Box Pink', img: '/Love Pearl Box Pink.jpg', price: 720 },
        { id: 17, name: 'Wooden Swiss Bank', img: '/Wooden Swiss Bank.jpg', price: 499 },
        { id: 18, name: 'Medicine Storage Box', img: '/Medicine Storage Box 4 layer.png', price: 550 },
        { id: 19, name: 'Kaba Bank Money Box', img: '/Kaba Bank, Omrah Bank.webp', price: 570 },
      ],
    },
    {
      name: 'Anime LED Signs',
      products: [
        { id: 1, name: 'Dragon LED Sign', img: '/dragon.png', price: 1099 },
        { id: 2, name: 'Batman Logo LED', img: '/batman.webp', price: 1199 },
        { id: 3, name: 'Sukuna LED Sign', img: '/sukuna.jpg', price: 1199 },
        { id: 4, name: 'Spider-Man Sign', img: '/spiderman.png', price: 1149 },
        { id: 5, name: 'Goku LED Sign', img: '/goku.png', price: 1149 },
      ],
    },
    {
      name: 'Ambient Moon Lamps',
      products: [
        { id: 6, name: 'Full Moon Lamp', img: '/fullmoon.jpg', price: 1099 },
        { id: 7, name: 'Half Moon Crystal', img: '/halfmoon.webp', price: 999 },
        { id: 8, name: 'Crystal Table Lamp', img: '/crystallamp.jpg', price: 1099 },
        { id: 13, name: 'Galaxy Crystal Ball', img: '/lamp.webp', price: 1299 }, 
      ],
    },
    {
      name: 'Cute & Decor Lights',
      products: [
        { id: 9, name: 'Cute Panda Light', img: '/panda.webp', price: 299 },
        { id: 10, name: 'Mushroom Light', img: '/mashroom.jpg', price: 299 },
        { id: 11, name: 'Tree Fairy Light', img: '/tree.jpg', price: 1099 },
        { id: 12, name: 'Dreamy Galaxy Projector', img: '/babylamp.webp', price: 1799 },
      ],
    },
  ];

  const deliveryCharge = deliveryArea === 'dhaka' ? 70 : 120;
  const totalPrice = selectedProduct ? selectedProduct.price + deliveryCharge : 0;
  const whatsappNumber = "8801601342114";

  const handleOrder = async (e: any) => {
    e.preventDefault();
    if (!selectedProduct) return alert("দয়া করে একটি প্রোডাক্ট সিলেক্ট করুন!");
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
      alert("সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (showSlip) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
        <img src="/logo.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] opacity-10 pointer-events-none" />
        <div className="bg-zinc-900 p-8 rounded-3xl border border-orange-500 w-full max-w-md shadow-2xl relative z-10 text-center">
          <img src="/logo.jpg" className="h-20 mx-auto mb-6 rounded-full border-2 border-orange-500" />
          <h2 className="text-xl font-bold text-green-400 mb-4">অর্ডার সফল হয়েছে! ✅</h2>
          <div className="text-left space-y-2 text-zinc-300">
            <p><strong>নাম:</strong> {orderInfo.Name}</p>
            <p><strong>প্রোডাক্ট:</strong> {orderInfo.Product}</p>
            <p><strong>মোট:</strong> ৳ {orderInfo.Total}</p>
          </div>
          <button onClick={() => window.print()} className="w-full mt-6 bg-orange-600 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors">স্লিপ ডাউনলোড করুন</button>
          <button onClick={() => setShowSlip(false)} className="w-full mt-2 text-sm text-zinc-500">হোমে ফিরে যান</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden selection:bg-orange-500">
      <img src="/logo.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] opacity-5 pointer-events-none z-0" />

      <header className="py-24 text-center border-b border-zinc-900 bg-zinc-950/50 relative z-10">
        <img src="/logo.jpg" className="h-40 w-40 mx-auto rounded-full border-4 border-orange-600 shadow-2xl mb-6 object-cover" />
        <h1 className="text-4xl font-black uppercase tracking-tighter text-orange-500">TrendyCart BD</h1>
        <p className="text-lg text-zinc-400 mt-2">আপনার সেটআপকে দিন এক প্রিমিয়াম ভাইব! ⚡</p>
      </header>

      <section className="max-w-7xl mx-auto py-16 px-6 relative z-10">
        {productCategories.map((cat) => (
          <div key={cat.name} className="mb-20">
            <h2 className="text-3xl font-bold text-orange-500 mb-10 border-l-8 border-orange-600 pl-4">{cat.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {cat.products.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => {
                    setSelectedProduct(p);
                    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className={`bg-zinc-900 p-4 rounded-[32px] border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-orange-500/10 ${selectedProduct?.id === p.id ? 'border-orange-500 scale-105 shadow-2xl shadow-orange-500/20' : 'border-zinc-800'}`}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-black mb-4">
                    <img src={p.img} className="w-full h-full object-contain p-2 hover:scale-110 transition-transform duration-500" alt={p.name} />
                  </div>
                  <h3 className="font-bold text-center h-12 flex items-center justify-center text-sm md:text-base leading-tight px-2">{p.name}</h3>
                  <p className="text-orange-500 text-center font-black text-xl mt-2">৳ {p.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="checkout" className="bg-zinc-900/50 py-20 px-6 relative z-10">
        <div className="max-w-xl mx-auto bg-black p-10 rounded-[40px] border border-zinc-800 shadow-2xl relative">
          <img src="/logo.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] opacity-10 pointer-events-none" />
          <h2 className="text-3xl font-black text-center mb-8 relative z-10 text-orange-500">চেকআউট 🛒</h2>
          <form onSubmit={handleOrder} className="space-y-6 relative z-10">
            <input name="name" type="text" placeholder="পুরো নাম" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-orange-500 transition-all text-white" required />
            <input name="phone" type="tel" placeholder="ফোন নম্বর" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-orange-500 transition-all text-white" required />
            <textarea name="address" placeholder="বিস্তারিত ঠিকানা (থানা ও জেলাসহ)" className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 h-32 outline-none focus:border-orange-500 transition-all text-white" required></textarea>
            
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex gap-4">
              <label className="flex-1 flex items-center gap-2 cursor-pointer font-bold transition-colors hover:text-orange-500">
                <input type="radio" checked={deliveryArea === 'dhaka'} onChange={() => setDeliveryArea('dhaka')} className="accent-orange-500 w-5 h-5" /> ঢাকার মধ্যে
              </label>
              <label className="flex-1 flex items-center gap-2 cursor-pointer font-bold transition-colors hover:text-orange-500">
                <input type="radio" checked={deliveryArea === 'outside'} onChange={() => setDeliveryArea('outside')} className="accent-orange-500 w-5 h-5" /> ঢাকার বাইরে
              </label>
            </div>

            {selectedProduct && (
              <div className="p-6 bg-orange-600/10 rounded-2xl border border-orange-500/20 text-center animate-pulse">
                <p className="text-sm text-zinc-400 mb-1">মোট পরিশোধযোগ্য টাকা:</p>
                <p className="text-3xl font-black text-orange-500">৳ {totalPrice}</p>
                <p className="text-xs text-zinc-500 mt-1">( ডেলিভারি চার্জ সহ )</p>
              </div>
            )}

            <button type="submit" disabled={loading || !selectedProduct} className="w-full bg-orange-600 py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:bg-zinc-800">
              {loading ? 'প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-600 border-t border-zinc-900 bg-zinc-950/80">
        <p>© 2026 TrendyCart BD - Premium Decor & Gadgets</p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-2xl z-50 hover:scale-110 active:scale-95 transition-transform"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-8 h-8" alt="WhatsApp" />
      </a>
    </main>
  );
}