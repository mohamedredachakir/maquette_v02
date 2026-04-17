import { motion } from "motion/react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onNavigate: (page: "home" | "products" | "detail" | "cart" | "history", extra?: string) => void;
  currentPage: string;
  onSearchClick: () => void;
  cartCount: number;
}

export default function Navbar({ onNavigate, currentPage, onSearchClick, cartCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Notre Histoire", page: "history" as const },
    { label: "Carnets", page: "products" as const, category: "notebooks" },
    { label: "Beaux-Arts", page: "products" as const, category: "art" },
    { label: "Scolaire", page: "products" as const, category: "school" },
    { label: "L'Atelier", page: "products" as const, category: "office" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-paper-cream/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2 text-ink"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1} />
        </button>

        {/* Logo */}
        <div 
          className="cursor-pointer flex flex-col items-center group"
          onClick={() => onNavigate("home")}
        >
          <span className="font-serif text-2xl tracking-[0.1em] font-bold text-brand-blue transition-colors duration-500 uppercase">
            Clairefontaine
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigate(link.page, link.category)}
              className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors relative py-2 ${
                currentPage === link.page ? "text-brand-blue" : "text-ink/70 hover:text-brand-blue"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8">
          <button 
            onClick={onSearchClick}
            className="text-ink/60 hover:text-brand-blue transition-colors"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => onNavigate("cart")}
            className={`text-[11px] font-bold tracking-widest transition-colors flex items-center gap-2 ${currentPage === "cart" ? "text-brand-blue" : "text-ink hover:text-brand-blue"}`}
          >
            PANIER ({cartCount})
          </button>
        </div>
      </div>


      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[60] bg-paper-100 lg:hidden paper-texture"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif text-xl font-semibold text-brand-blue">Clairefontaine</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-ink">
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.page);
                  setIsMenuOpen(false);
                }}
                className="text-3xl font-serif text-left hover:text-brand-blue transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-auto border-t border-paper-200 pt-8 space-y-4">
            <p className="text-xs uppercase tracking-widest text-ink/50 font-semibold">Our Heritage</p>
            <p className="text-sm text-ink/70 leading-relaxed italic">
              "The paper that never forgets."
            </p>
            <div className="flex gap-4 pt-4">
               <div className="w-10 h-10 rounded-full border border-paper-200 flex items-center justify-center text-xs font-bold">FR</div>
               <div className="w-10 h-10 rounded-full border border-paper-200 flex items-center justify-center text-xs font-bold">♻️</div>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
