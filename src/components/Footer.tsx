export default function Footer() {
  return (
    <footer className="bg-paper-100 border-t border-paper-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <span className="font-serif text-2xl font-semibold text-brand-blue block mb-4">Clairefontaine</span>
          <p className="text-ink/60 leading-relaxed max-w-sm font-light">
            Founded in 1858 in the Vosges region of France. We are the only European manufacturer still making their own paper for their own products. 
            Experience the satin finish of the finest French vellum.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-ink mb-6">Collections</h4>
          <ul className="space-y-4 text-sm text-ink/60">
            <li><button className="hover:text-brand-blue transition-colors">Notebooks</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Fine Art</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Calligraphy</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Envelopes</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-ink mb-6">Maison</h4>
          <ul className="space-y-4 text-sm text-ink/60">
            <li><button className="hover:text-brand-blue transition-colors">Our History</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Sustainability</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Made in France</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Store Locator</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-paper-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-ink/40 font-bold">
        <span>© 2026 Clairefontaine · Excellence du Papier</span>
        <div className="flex gap-8">
          <button className="hover:text-ink transition-colors">Privacy</button>
          <button className="hover:text-ink transition-colors">Terms</button>
          <button className="hover:text-ink transition-colors">International</button>
        </div>
      </div>
    </footer>
  );
}
