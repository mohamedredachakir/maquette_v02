import { motion } from "motion/react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onCheckout: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onBack, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 5.90 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-32 min-h-screen">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-ink/50 hover:text-brand-blue transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[11px] font-bold tracking-widest uppercase">Continuer mes achats</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-1">
          <h1 className="font-serif text-4xl mb-12">Votre Panier</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-20 border-y border-black/5">
              <ShoppingBag size={48} className="mx-auto mb-6 text-ink/10" />
              <p className="text-ink/50 font-serif italic text-lg">Votre panier est tristement vide.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-black/5 last:border-0">
                  <div className="w-24 h-32 bg-paper-100 overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-brand-blue uppercase mb-1">{item.series}</p>
                        <h3 className="font-serif text-lg">{item.name}</h3>
                      </div>
                      <p className="font-medium">{item.price.toFixed(2)} €</p>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center border border-black/10 rounded-full h-10 px-4 gap-4">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="hover:text-brand-blue transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="hover:text-brand-blue transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-ink/40 hover:text-brand-red transition-colors p-2"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-paper-100 p-8 sticky top-32">
            <h2 className="font-serif text-2xl mb-8">Récapitulatif</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Livraison</span>
                <span>{shipping.toFixed(2)} €</span>
              </div>
              <div className="pt-4 border-t border-black/5 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-blue">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button 
              disabled={items.length === 0}
              onClick={onCheckout}
              className="w-full bg-brand-blue text-white py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Passer au paiement
            </button>
            
            <p className="mt-6 text-[10px] text-ink/40 text-center leading-relaxed">
              Taxes incluses. Livraison standard sous 3 à 5 jours ouvrés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
