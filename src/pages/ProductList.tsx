import { motion } from "motion/react";
import { PRODUCTS, Product } from "../types";
import { Filter, Check } from "lucide-react";
import { useState } from "react";

interface ProductListProps {
  onProductClick: (id: string) => void;
  products: Product[];
}

export default function ProductList({ onProductClick, products }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPaper, setSelectedPaper] = useState<string>("all");

  const categories = [
    { label: "Toutes les Collections", id: "all" },
    { label: "Carnets", id: "notebooks" },
    { label: "Beaux-Arts", id: "art" },
    { label: "Scolaire", id: "school" },
    { label: "L'Atelier/Bureau", id: "office" },
  ];

  const paperTypes = [
    { label: "90 g/m² Satin", id: "90" },
    { label: "300 g/m² Professional", id: "300" },
    { label: "Ivory Paper", id: "ivory" },
    { label: "Bright White", id: "white" },
  ];

  const displayProducts = (products.length > 0 ? products : PRODUCTS).filter(p => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (selectedPaper !== "all" && !p.specs.paperWeight.includes(selectedPaper) && !p.description.toLowerCase().includes(selectedPaper)) return false;
    return true;
  });

  return (
    <div className="pt-32 pb-20 px-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Filters Panel */}
        <aside className="w-full md:w-64 space-y-12 shrink-0">
          <div className="border-t-2 border-brand-blue pt-6">
            <div className="flex items-center gap-2 mb-8 text-brand-blue uppercase tracking-widest text-[11px] font-bold">
              <Filter size={14} /> Filtres Raffinés
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-ink/40">Collections</h4>
                <div className="flex flex-col gap-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[12px] text-left px-3 py-2 transition-all flex justify-between items-center tracking-wide font-medium ${
                        selectedCategory === cat.id 
                          ? "bg-brand-blue text-white" 
                          : "hover:bg-paper-200 text-ink/70"
                      }`}
                    >
                      {cat.label}
                      {selectedCategory === cat.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-ink/40">Grammage & Texture</h4>
                <div className="flex flex-col gap-1">
                  {paperTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedPaper(type.id)}
                      className={`text-[12px] text-left px-3 py-2 transition-all flex justify-between items-center tracking-wide font-medium ${
                        selectedPaper === type.id 
                          ? "bg-brand-blue text-white" 
                          : "hover:bg-paper-200 text-ink/70"
                      }`}
                    >
                      {type.label}
                      {selectedPaper === type.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-paper-200 p-8 border border-black/5">
            <h5 className="font-serif italic text-lg mb-2">Conseil d'Atelier</h5>
            <p className="text-[11px] text-ink/60 leading-relaxed font-medium">
              Pour la plume sergent-major, le 90g satiné est la référence absolue.
            </p>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 space-y-12">
          <div className="flex justify-between items-baseline border-b border-paper-200 pb-6 mb-12">
             <h2 className="text-3xl font-serif text-ink italic leading-none">
                {selectedCategory === "all" ? "L'Exquise Collection" : `${categories.find(c => c.id === selectedCategory)?.label}`}
             </h2>
             <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">{displayProducts.length} ARTICLES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-24">
            {displayProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={product.id}
                className="group cursor-pointer"
                onClick={() => onProductClick(product.id)}
              >
                <div className="aspect-[4/5] bg-[#EFECE6] overflow-hidden mb-6 relative paper-texture shadow-sm border border-black/5">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                    src={product.images[0]}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    alt={product.name}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="bg-white border border-ink px-3 py-1 text-[9px] uppercase tracking-widest font-bold shadow-sm">
                      Excellence
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="bg-brand-blue text-white px-4 py-2 text-[10px] uppercase font-bold tracking-[0.2em]">Détails du Produit</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-2xl font-serif leading-tight group-hover:text-brand-blue transition-colors italic">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-red">{product.series}</span>
                     <div className="h-px bg-paper-200 flex-1" />
                     <span className="text-xl font-serif italic text-ink/80">€{product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-[12px] text-ink/60 font-medium leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {displayProducts.length === 0 && (
             <div className="py-40 text-center space-y-6">
                <p className="text-2xl font-serif italic text-ink/40">Aucun papier ne correspond à votre recherche.</p>
                <button 
                  onClick={() => { setSelectedCategory("all"); setSelectedPaper("all"); }}
                  className="text-xs font-bold uppercase tracking-widest border-b border-ink py-2"
                >
                  Réinitialiser
                </button>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
