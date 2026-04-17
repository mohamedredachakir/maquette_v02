import { motion } from "motion/react";

export default function History() {
  const years = [
    { year: "1858", event: "L'origine de l'excellence", description: "Les Papeteries de Clairefontaine commencent leur production dans la vallée de la Meurthe. Un savoir-faire ancestral se met au service de l'écriture." },
    { year: "1951", event: "L'iconique Seyes", description: "Clairefontaine lance son célèbre réglage Seyes, devenant le standard incontesté des écoles françaises pour l'apprentissage de la calligraphie." },
    { year: "1990", event: "L'engagement écologique", description: "Pionnier du développement durable, le site de production devient un modèle de gestion des eaux et des ressources forestières." },
    { year: "Aujourd'hui", event: "L'héritage vivant", description: "Plus qu'une marque, Clairefontaine est la gardienne d'un art de vivre où le papier reste le support privilégié de la pensée et de l'émotion." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-brand-blue mb-6 block">Notre Histoire</span>
          <h1 className="font-serif text-5xl lg:text-7xl mb-10 leading-tight">Depuis 1858, le papier qui <span className="italic">n'oublie jamais</span>.</h1>
          <div className="space-y-6 text-ink/70 leading-relaxed text-lg">
            <p>
              Nichées au cœur des Vosges, les Papeteries de Clairefontaine produisent leur propre papier depuis plus de 160 ans. Cette autonomie unique en Europe nous permet de garantir une qualité constante et exceptionnelle.
            </p>
            <p>
              Chaque feuille qui sort de nos machines est le fruit d'une passion pour la matière. Notre papier 90g satiné, célèbre pour sa douceur incomparable, est devenu une légende pour tous les amoureux de la plume.
            </p>
          </div>
        </motion.div>
        
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src="/images/heritage_desk.png" 
            alt="Clairefontaine Heritage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border-[20px] border-paper-cream/50 pointer-events-none" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-black/5 pt-20">
        {years.map((item, idx) => (
          <motion.div 
            key={item.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="font-serif text-4xl text-brand-blue mb-4 block italic">{item.year}</span>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4">{item.event}</h3>
            <p className="text-sm text-ink/60 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 bg-brand-blue p-20 text-white text-center rounded-sm">
         <h2 className="font-serif text-4xl mb-8">Un engagement pour l'avenir</h2>
         <p className="max-w-2xl mx-auto text-white/70 leading-relaxed mb-12">
           Nous gérons nos propres forêts de manière durable et recyclons 80% des eaux utilisées dans nos processus. L'excellence du papier ne peut se concevoir sans le respect de la nature qui nous l'offre.
         </p>
         <div className="flex justify-center gap-12 font-bold text-[10px] tracking-[0.3em] uppercase">
            <span>PEFC Certified</span>
            <span>Eco-Label</span>
            <span>FSC Certified</span>
         </div>
      </div>
    </div>
  );
}
