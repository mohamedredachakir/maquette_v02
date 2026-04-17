import { motion } from "motion/react";
import { Product } from "../types";
import { Check, ArrowLeft, Star, ShoppingCart, Gift, Package, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const suitabilityIcons = {
    fountainPen: "🖋️",
    pencil: "✏️",
    watercolor: "🎨",
    marker: "🖍️"
  };

  return (
    <div className="pt-40 pb-32 px-10 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumb / Back */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-ink/40 hover:text-brand-blue transition-colors mb-20"
      >
        <ArrowLeft size={14} /> Retour à la Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[4/5] bg-[#EFECE6] overflow-hidden notebook-shadow relative paper-texture group"
          >
             <img 
              src={product.images[activeImage]} 
              className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000" 
              alt={product.name} 
             />
          </motion.div>

          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-24 aspect-square border transition-all overflow-hidden ${
                    activeImage === i ? "border-brand-blue scale-105" : "border-paper-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">{product.series}</span>
               <div className="w-1 h-1 rounded-full bg-paper-200" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">Article #{product.id.slice(0, 6)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-ink italic leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <p className="text-3xl font-serif text-brand-blue">€{product.price.toFixed(2)}</p>
              <span className="bg-paper-200 px-3 py-1 text-[9px] uppercase font-bold tracking-widest text-ink/60">TVA incluse</span>
            </div>
          </div>

          <p className="text-[15px] text-ink/70 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 py-10 border-y border-paper-200">
             <div>
               <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-ink/30 mb-2">Grammage</h5>
               <p className="text-sm font-bold">{product.specs.paperWeight}</p>
             </div>
             <div>
               <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-ink/30 mb-2">Format</h5>
               <p className="text-sm font-bold">{product.specs.format}</p>
             </div>
             <div>
               <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-ink/30 mb-2">Volume</h5>
               <p className="text-sm font-bold">{product.specs.pages} Pages</p>
             </div>
             <div>
               <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-ink/30 mb-2">Savoir-Faire</h5>
               <p className="text-sm font-bold italic">Etival, France</p>
             </div>
          </div>

          {/* Suitability Matrix */}
          <div className="space-y-8 bg-[#F3F0EB] p-10 border border-black/5">
             <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-center border-b border-black/10 pb-4">Matrice de Compatibilité</h4>
             <div className="grid grid-cols-4 gap-4">
                {Object.entries(product.suitability).map(([key, val]) => (
                  <div key={key} className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border border-ink/20 flex items-center justify-center text-xl bg-white shadow-sm">
                      {(suitabilityIcons as any)[key]}
                    </div>
                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-50 text-center">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex gap-[2px]">
                      {[1, 2, 3, 4, 5].map(star => (
                        <div key={star} className={`w-1 h-3 ${star <= val ? 'bg-brand-blue' : 'bg-ink/10'}`} />
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex border border-ink/10 items-center bg-white">
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-4 hover:bg-paper-100 transition-colors">-</button>
                 <span className="px-6 font-bold text-sm min-w-[50px] text-center">{quantity}</span>
                 <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-4 hover:bg-paper-100 transition-colors">+</button>
              </div>
              <button 
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-brand-blue text-white px-8 py-4 font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-4 hover:bg-ink transition-all shadow-md group"
              >
                <ShoppingCart size={18} strokeWidth={1.5} />
                <span>Ajouter au Panier</span>
              </button>
            </div>

            <button className="w-full border border-brand-red text-brand-red px-8 py-4 font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 hover:bg-brand-red hover:text-white transition-all">
               <Gift size={18} strokeWidth={1.5} />
               <span>Offrir ce carnet</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 pt-10 text-[9px] uppercase tracking-[0.2em] font-bold text-ink/30 text-center">
             <div className="flex flex-col items-center gap-3">
               <Package size={20} className="text-ink/20" strokeWidth={1} />
               <span>Livraison Soignée</span>
             </div>
             <div className="flex flex-col items-center gap-3">
               <RotateCcw size={20} className="text-ink/20" strokeWidth={1} />
               <span>Retours Simples</span>
             </div>
             <div className="flex flex-col items-center gap-3">
               <Star size={20} className="text-ink/20" strokeWidth={1} />
               <span>Label Vosges</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
