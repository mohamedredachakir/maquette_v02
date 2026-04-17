import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Leaf, History, ShieldCheck } from "lucide-react";

interface HomeProps {
  onNavigate: (page: "home" | "products" | "detail" | "cart" | "history", extra?: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative pt-24 bg-paper-cream min-h-screen">
      {/* Heritage side stamp */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left z-20 hidden xl:block">
        <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-ink/20 px-10 whitespace-nowrap">
          Papeterie de France depuis 1858
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Hero & Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-[64px] font-serif leading-[1.1] text-ink text-balance tracking-tight">
              Le papier qui <br /> <span className="italic">n'oublie jamais.</span>
            </h1>
            <p className="text-base text-ink/70 leading-relaxed max-w-[400px]">
              Depuis 1858, nous façonnons le papier au cœur des Vosges. Une texture veloutée, un blanc immaculé et une résistance à toute épreuve pour vos pensées les plus précieuses.
            </p>
            <button 
              onClick={() => onNavigate("products")}
              className="bg-brand-blue text-white px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors duration-500 shadow-sm"
            >
              Explorer la collection
            </button>
          </div>

          <div className="pt-16 border-t border-paper-200 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-serif italic text-lg text-ink">90g/m² Satiné</h4>
              <p className="text-[12px] text-ink/60 leading-normal">Le secret d'une écriture sans bavure, fluide et soyeuse au toucher.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-serif italic text-lg text-ink">Fabriqué en France</h4>
              <p className="text-[12px] text-ink/60 leading-normal">Un savoir-faire ancestral préservé dans notre moulin historique d'Étival.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-serif italic text-lg text-ink">Éco-responsable</h4>
              <p className="text-[12px] text-ink/60 leading-normal">Certifié PEFC pour une gestion durable des forêts vosgiennes.</p>
            </div>
          </div>
        </div>

        {/* Right: Product Spotlight */}
        <div className="lg:col-span-6 relative aspect-square lg:aspect-auto min-h-[500px] product-spotlight-bg flex items-center justify-center overflow-hidden paper-texture">
          {/* Badges */}
          <div className="absolute top-10 right-10 flex flex-col gap-4 z-10">
            <div className="bg-transparent border border-ink text-ink font-bold text-[10px] uppercase px-3 py-1.5 tracking-wider">
              Nouveauté
            </div>
            <div className="bg-accent-gold text-white font-bold text-[10px] uppercase px-3 py-1.5 tracking-wider">
              A5 Format
            </div>
          </div>

          {/* Notebook Rendering */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-72 h-[420px] bg-brand-red notebook-shadow relative group"
          >
             <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10" />
             <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white p-6 border border-black/5 text-center min-w-[200px]">
                <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-ink/40 mb-2">Clairefontaine</span>
                <span className="block font-serif text-2xl text-brand-blue italic">Age Bag</span>
                <div className="mt-4 pt-2 border-t border-paper-200">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ink/60">192 PAGES • LINÉ</span>
                </div>
             </div>
          </motion.div>

          {/* Texture Zoom Layer */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full notebook-shadow border-[6px] border-white z-20 flex items-center justify-center overflow-hidden"
          >
             <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 0)', backgroundSize: '8px 8px' }} />
          </motion.div>
          <div className="absolute bottom-6 right-20 bg-brand-blue text-white text-[10px] uppercase font-bold px-3 py-1 z-30 tracking-widest">
            Grain Velouté
          </div>

          {/* Suitability Matrix Mini */}
          <div className="absolute bottom-10 left-10 flex gap-5 opacity-40">
             <div className="flex flex-col items-center">
                <div className="w-6 h-6 border border-ink flex items-center justify-center text-xs mb-1">🖋️</div>
                <span className="text-[8px] font-bold uppercase">Plume</span>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-6 h-6 border border-ink flex items-center justify-center text-xs mb-1">✏️</div>
                <span className="text-[8px] font-bold uppercase">Crayon</span>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-6 h-6 border border-ink flex items-center justify-center text-xs mb-1">🖌️</div>
                <span className="text-[8px] font-bold uppercase">Gouache</span>
             </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-paper-200">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Carnets", tag: "Artistic Series", cat: "notebooks", img: "/images/triomphe.png" },
              { title: "Beaux-Arts", tag: "Professional", cat: "art", img: "/images/fontaine.png" },
              { title: "Scolaire", tag: "Education", cat: "school", img: "/images/seyes.png" }
            ].map((col, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group cursor-pointer bg-white border border-paper-200 overflow-hidden"
                onClick={() => onNavigate("products", col.cat)}
              >
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img src={col.img} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">{col.tag}</span>
                  <h4 className="font-serif text-2xl italic">{col.title}</h4>
                </div>
              </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}
