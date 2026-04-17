import { motion, AnimatePresence } from "motion/react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { PRODUCTS, Product } from "../types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (id: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, onProductClick }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.series.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[100]"
          />

          {/* Search Panel */}
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 w-full bg-paper-cream z-[101] shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-10 py-12">
              <div className="flex items-center gap-6 mb-12">
                <SearchIcon size={24} className="text-ink/30" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Rechercher un produit, une collection..."
                  className="flex-1 bg-transparent border-none text-3xl font-serif focus:ring-0 placeholder:text-ink/10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={onClose} className="p-2 hover:text-brand-blue transition-colors">
                  <X size={28} strokeWidth={1} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink/30 mb-8">Suggestions</h3>
                  <div className="space-y-6">
                    {results.length > 0 ? (
                      results.map(product => (
                        <button 
                          key={product.id}
                          onClick={() => {
                            onProductClick(product.id);
                            onClose();
                            setQuery("");
                          }}
                          className="flex items-center gap-6 group w-full text-left"
                        >
                          <div className="w-16 h-20 bg-paper-100 overflow-hidden">
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[9px] font-bold tracking-widest text-brand-blue uppercase">{product.series}</p>
                            <h4 className="font-serif text-lg">{product.name}</h4>
                          </div>
                          <ArrowRight size={16} className="text-ink/0 group-hover:text-brand-blue group-hover:translate-x-2 transition-all" />
                        </button>
                      ))
                    ) : (
                      <div className="space-y-4">
                        {["Carnets", "Beaux-Arts", "Collection Neo Deco", "Triomphe"].map(term => (
                          <button 
                            key={term}
                            onClick={() => setQuery(term)}
                            className="block text-xl font-serif text-ink/60 hover:text-brand-blue transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden lg:block border-l border-black/5 pl-20">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink/30 mb-8">Collections Vedettes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Scolaire", image: "/images/seyes.png" },
                      { name: "L'Atelier", image: "/images/triomphe.png" },
                    ].map(col => (
                      <div key={col.name} className="relative aspect-square overflow-hidden group cursor-pointer">
                        <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
                          <span className="text-white font-serif text-xl">{col.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
