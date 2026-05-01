/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  ShieldCheck, 
  Truck, 
  MessageSquare, 
  Lock, 
  ArrowRight,
  Star,
  ChevronRight,
  Apple
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  badge: string;
  badgeType: '' | 'sale';
  name: string;
  sub: string;
  storage: string;
  chip: string;
  camera: string;
  display: string;
  price: number;
  original: number | null;
}

interface CartItem extends Product {
  qty: number;
}

// --- Data ---
const PRODUCTS: Product[] = [
  { id: 1, badge: 'New', badgeType: '', name: 'iPhone 16 Pro Max', sub: '256GB · Titanium Black', storage: '256GB', chip: 'A18 Pro', camera: '48MP ProRAW', display: '6.9" ProMotion', price: 32999, original: null },
  { id: 2, badge: 'New', badgeType: '', name: 'iPhone 16 Pro', sub: '128GB · Desert Titanium', storage: '128GB', chip: 'A18 Pro', camera: '48MP ProRAW', display: '6.3" ProMotion', price: 28999, original: null },
  { id: 3, badge: 'Popular', badgeType: '', name: 'iPhone 16', sub: '128GB · Ultramarine', storage: '128GB', chip: 'A18', camera: '48MP Fusion', display: '6.1" Super Retina', price: 22999, original: null },
  { id: 4, badge: 'Sale', badgeType: 'sale', name: 'iPhone 15 Pro Max', sub: '256GB · Natural Titanium', storage: '256GB', chip: 'A17 Pro', camera: '48MP ProRAW', display: '6.7" ProMotion', price: 26999, original: 31999 },
  { id: 5, badge: 'Sale', badgeType: 'sale', name: 'iPhone 15', sub: '128GB · Black', storage: '128GB', chip: 'A16 Bionic', camera: '48MP Main', display: '6.1" Super Retina', price: 17999, original: 21999 },
  { id: 6, badge: 'Value', badgeType: '', name: 'iPhone 14', sub: '128GB · Midnight', storage: '128GB', chip: 'A15 Bionic', camera: '12MP Main', display: '6.1" Super Retina', price: 14999, original: null },
];

const TICKER_ITEMS = [
  'iPhone 16 Pro Max', 
  'Free Nationwide Shipping', 
  'iPhone 16 Pro', 
  'Trade-In Available', 
  'iPhone 16', 
  'Genuine Apple Products', 
  'iPhone 15 Pro Max', 
  'Flexible Financing', 
  'Same-Day Dispatch'
];

const TESTIMONIALS = [
  { id: 1, text: "Ordered an iPhone 16 Pro on a Friday evening — it arrived Monday morning. Device is perfect, packaging immaculate. Won't shop anywhere else.", author: "Thabo M.", location: "Johannesburg" },
  { id: 2, text: "Trade-in was seamless. Got R4,500 off my new iPhone 16, no haggling. The whole process was transparent and fast.", author: "Priya N.", location: "Cape Town" },
  { id: 3, text: "I was nervous about buying online but the team on WhatsApp answered every question patiently. Best customer service experience I've had in a long time.", author: "Liam F.", location: "Durban" },
];

// --- Components ---

const Navbar = ({ cartCount, onCartClick }: { cartCount: number, onCartClick: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-brand-black/80 backdrop-blur-xl border-b border-brand-border">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center font-bold text-white text-sm">A</div>
        <a href="#" className="font-bold text-xl tracking-tight uppercase text-brand-off-white no-underline">
          APEX
        </a>
      </div>
      <ul className="hidden md:flex gap-8 list-none">
        {['iPhones', 'Why Us', 'Trade-In', 'Reviews'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-brand-off-white opacity-60 hover:opacity-100 transition-all duration-200 no-underline">
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <button 
          onClick={onCartClick}
          className="flex items-center gap-2 bg-brand-zinc-800 border border-brand-zinc-700 hover:border-brand-zinc-600 text-brand-off-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95"
        >
          <ShoppingBag size={16} />
          <span>Cart ({cartCount})</span>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen px-6 md:px-16 pt-24 pb-16 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Main Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 bento-card p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-h-[500px]"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 blur-[120px]" />
          <div className="relative z-10">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] mb-6 block">Primary Engine</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              The iPhone<br />for the next<br /><span className="accent-text-gradient">generation.</span>
            </h1>
            <p className="text-lg text-brand-muted max-w-md mb-10 leading-relaxed">
              Experience unparalleled performance and cinematic clarity. Authentic Apple technology, refined by APEX.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#iphones" className="accent-gradient px-8 py-4 rounded-2xl font-bold text-white hover:opacity-90 transition-opacity no-underline">
                SHOP NOW
              </a>
              <a href="#trade-in" className="bg-brand-zinc-800 px-8 py-4 rounded-2xl font-bold border border-brand-zinc-700 hover:bg-brand-zinc-700 transition-colors no-underline">
                TRADE-IN
              </a>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bento-card p-8 flex flex-col justify-center"
          >
            <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest mb-4 block">Performance</span>
            <div className="flex justify-between items-end mb-4">
              <span className="text-4xl font-bold">99.9%</span>
              <span className="text-brand-muted text-xs mb-1 uppercase">Reliability</span>
            </div>
            <div className="w-full bg-brand-zinc-700 h-1.5 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "99.9%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="accent-gradient h-full" 
               />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-brand-black/40 p-3 rounded-xl border border-brand-zinc-700 flex flex-col gap-1">
                <span className="text-brand-muted text-[10px] uppercase">Warranty</span>
                <span className="text-lg font-bold">12 mo.</span>
              </div>
              <div className="bg-brand-black/40 p-3 rounded-xl border border-brand-zinc-700 flex flex-col gap-1">
                <span className="text-brand-muted text-[10px] uppercase">Service</span>
                <span className="text-lg font-bold">Pro</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bento-card p-8 flex items-center justify-between group"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                <Apple size={28} />
              </div>
              <div>
                <div className="font-bold text-lg">Authorised</div>
                <div className="text-xs text-brand-muted">Genuine Parts Only</div>
              </div>
            </div>
            <div className="w-12 h-6 bg-brand-zinc-700 rounded-full flex items-center px-1 border border-brand-zinc-600">
              <div className="w-4 h-4 bg-emerald-500 rounded-full ml-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Ticker = () => {
  const items = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS], []);
  return (
    <div className="border-y border-brand-border overflow-hidden py-4 bg-brand-zinc-800/50 backdrop-blur-sm">
      <div className="flex gap-16 whitespace-nowrap w-max animate-ticker">
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-4 text-xs font-medium tracking-[0.1em] uppercase text-brand-muted">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
          </span>
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAdd }: { product: Product, onAdd: (p: Product) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bento-card p-8 flex flex-col group h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <span className={`inline-block py-1 px-3 text-[10px] font-bold tracking-widest uppercase rounded-lg ${product.badgeType === 'sale' ? 'bg-red-500 text-white' : 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30'}`}>
          {product.badge}
        </span>
        {product.original && (
          <span className="text-xs text-brand-muted line-through">
            R{product.original.toLocaleString()}
          </span>
        )}
      </div>

      <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:accent-text-gradient transition-all duration-300">
        {product.name}
      </h3>
      <p className="text-sm text-brand-muted mb-8">
        {product.sub}
      </p>

      <div className="space-y-3 mb-10 flex-1">
        {[
          { label: 'Storage', val: product.storage },
          { label: 'Chip', val: product.chip }
        ].map((spec) => (
          <div key={spec.label} className="bg-brand-black/30 p-4 rounded-2xl border border-brand-border flex justify-between items-center group-hover:border-brand-zinc-600 transition-colors">
            <span className="text-[10px] uppercase font-bold text-brand-muted tracking-widest">{spec.label}</span>
            <span className="text-sm font-medium">{spec.val}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-brand-border">
        <div className="text-2xl font-bold tracking-tighter">
          R{product.price.toLocaleString()}
        </div>
        <button 
          onClick={() => onAdd(product)}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-zinc-700 hover:bg-brand-accent hover:text-white transition-all duration-300 active:scale-90"
        >
          <Plus size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const Products = ({ onAdd }: { onAdd: (p: Product) => void }) => {
  return (
    <section id="iphones" className="py-24 px-6 md:px-16">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-brand-accent font-mono text-[10px] uppercase tracking-[0.2em] mb-4 block">Store Catalog</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Active Inventory</h2>
        </div>
        <p className="text-brand-muted max-w-xs text-sm">
          Browse our selection of the world's most powerful handheld devices.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
};

const Features = () => {
  const featItems = [
    { icon: Lock, title: 'Secure Layer', desc: 'Encrypted multi-step gateway.', accent: 'orange-500' },
    { icon: Truck, title: 'Rapid Transit', desc: 'Nationwide logistics sync.', accent: 'cyan-500' },
    { icon: ShieldCheck, title: 'Core Protection', desc: 'Certified Apple coverage.', accent: 'emerald-500' },
    { icon: MessageSquare, title: 'Live Interface', desc: 'Direct expert line 24/7.', accent: 'indigo-500' }
  ];

  return (
    <section id="why-us" className="py-24 px-6 md:px-16">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bento-card p-10 flex flex-col justify-center">
            <span className="text-brand-accent font-mono text-[10px] uppercase tracking-[0.2em] mb-6 block">Strategic Advantage</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">The Apex<br />Standard.</h2>
            <ul className="space-y-4">
              {[
                'Authenticity guaranteed by signature',
                'Global Apple network partnership',
                'Zero-interest upgrade paths'
              ].map((text) => (
                <li key={text} className="flex items-center gap-4 text-sm text-brand-muted">
                  <div className="w-1.5 h-1.5 rounded-full accent-gradient" />
                  {text}
                </li>
              ))}
            </ul>
        </div>
        
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featItems.map((item, idx) => (
            <motion.div 
               key={idx}
               whileHover={{ y: -5 }}
               className="bento-card p-8 flex items-center space-x-6 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors bg-brand-zinc-700 group-hover:bg-brand-accent/20 group-hover:text-brand-accent`}>
                <item.icon size={24} />
              </div>
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-xs text-brand-muted mt-1">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
       </div>
    </section>
  );
};

const TradeIn = () => {
  return (
    <section id="trade-in" className="mx-6 md:mx-16 bento-card p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden bg-brand-zinc-800/80">
      <div className="absolute top-0 left-0 w-full h-1 accent-gradient opacity-50" />
      <div className="relative z-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Value Exchange<br />Program.</h2>
        <p className="text-brand-muted max-w-sm text-sm">
          Liquidate your current hardware and unlock instant credit for your next upgrade.
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full border-4 border-dashed border-brand-zinc-700 flex items-center justify-center text-brand-muted text-3xl font-light">
          +
        </div>
        <button className="bg-brand-off-white text-brand-black px-10 py-4 rounded-2xl font-bold text-sm hover:bg-white transition-colors">
          GENERATE QUOTE
        </button>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 px-6 md:px-16">
      <div className="mb-12 flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Timeline Activity</h2>
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-brand-accent' : 'bg-brand-zinc-700'}`} />)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <motion.div 
            key={t.id}
            whileHover={{ y: -5 }}
            className="bento-card p-10 flex flex-col"
          >
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center font-bold text-white uppercase text-sm">
                {t.author[0]}
              </div>
              <div>
                <div className="text-sm font-bold tracking-wide">{t.author}</div>
                <div className="text-[10px] text-brand-muted uppercase tracking-widest">{t.location}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-brand-muted flex-1">
              "{t.text}"
            </p>
            <div className="flex gap-1 mt-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#6366f1" className="text-brand-accent opacity-50" />)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  const footerCols = [
    { title: 'Shop', links: ['iPhone 16 Series', 'iPhone 15 Series', 'iPhone 14 Series', 'Refurbished', 'Accessories'] },
    { title: 'Support', links: ['Track Order', 'Returns Policy', 'Warranty Claims', 'Contact Us', 'FAQ'] },
    { title: 'Company', links: ['About Apex', 'Careers', 'Trade-In', 'Business Sales', 'Press'] }
  ];

  return (
    <footer className="mt-20 border-t border-brand-border py-16 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
        <div>
           <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center font-bold text-white text-sm">A</div>
            <a href="#" className="font-bold text-2xl tracking-tight uppercase text-brand-off-white no-underline">
              APEX
            </a>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
            The next generation of iPhone acquisition. Sophisticated, rapid, and genuine.
          </p>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] tracking-[0.15em] uppercase font-bold text-brand-accent mb-6">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-brand-muted hover:text-brand-off-white transition-colors duration-200 no-underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-brand-muted font-bold tracking-widest uppercase">
        <span>© 2026 APEX CORE INTERFACE</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-off-white">Privacy</a>
          <a href="#" className="hover:text-brand-off-white">Terms</a>
          <a href="#" className="hover:text-brand-off-white">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

const Cart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onRemove: (id: number) => void 
}) => {
  const total = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.qty), 0), [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] bg-brand-zinc-800 border-l border-brand-border z-[110] flex flex-col"
          >
            <div className="flex items-center justify-between p-8 border-b border-brand-border">
              <h2 className="font-bold text-xl tracking-tight text-brand-off-white">INTERFACE_CART</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-xl border border-brand-border flex items-center justify-center hover:bg-brand-zinc-700 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-brand-zinc-700 flex items-center justify-center text-brand-muted text-2xl mb-4">
                    +
                  </div>
                  <p className="text-brand-muted text-sm uppercase tracking-widest font-bold">Registry Empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="bg-brand-black/40 border border-brand-border p-6 rounded-2xl flex flex-col gap-4 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-bold tracking-wide uppercase">{item.name}</h3>
                          <p className="text-[10px] text-brand-muted mt-1 uppercase tracking-widest">{item.sub}</p>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-brand-muted hover:text-red-500 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="bg-brand-zinc-700 px-3 py-1 rounded-lg text-xs font-mono font-bold">QTY: {item.qty}</div>
                        <div className="text-lg font-bold text-brand-accent">R{(item.price * item.qty).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-brand-border space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted">Total Payload</span>
                  <span className="text-3xl font-bold accent-text-gradient">R{total.toLocaleString()}</span>
                </div>
                <button className="w-full accent-gradient py-5 rounded-2xl font-bold text-sm text-white uppercase tracking-widest hover:opacity-90 transition-opacity">
                  EXECUTE CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-accent selection:text-brand-black">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <Ticker />
        <Products onAdd={addToCart} />
        <Features />
        <TradeIn />
        <Testimonials />
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />
    </div>
  );
}
