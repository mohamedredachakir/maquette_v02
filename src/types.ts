export interface Product {
  id: string;
  name: string;
  series: string;
  description: string;
  shortDescription: string;
  price: number;
  category: "notebooks" | "art" | "school" | "office";
  images: string[];
  specs: {
    paperWeight: string;
    pages?: number;
    format: string;
    coating?: string;
    binding?: string;
  };
  features: string[];
  suitability: {
    fountainPen: number; // 0-5
    pencil: number;
    watercolor: number;
    marker: number;
  };
  badges: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "triomphe-writing-pad",
    name: "Triomphe Tablette de Correspondance",
    series: "Classic Stationery",
    description: "The gold standard for letter writing. Triomphe paper is exceptionally smooth, bright white, and acid-free. It provides an unparalleled surface for fountain pens, ensuring no bleed-through and a perfectly crisp line.",
    shortDescription: "90 g/m² ultra-smooth bright white paper, 50 sheets.",
    price: 12.50,
    category: "office",
    images: ["/images/triomphe.png"],
    specs: {
      paperWeight: "90 g/m²",
      pages: 50,
      format: "A5 (14.8 x 21 cm)",
      coating: "Extra smooth",
      binding: "Glued top"
    },
    features: ["Extra White", "Acid-free", "Clarity of line", "Fountain pen benchmark"],
    suitability: {
      fountainPen: 5,
      pencil: 3,
      watercolor: 1,
      marker: 4
    },
    badges: ["Made in France", "Writing Excellence"]
  },
  {
    id: "seyes-notebook-a4",
    name: "Cahier Classique Grands Carreaux",
    series: "Scolaire Tradition",
    description: "The iconic French school notebook. Featuring the famous Seyes ruling (French ruling) that helps students master calligraphy and organization. Our satin-finish 90g paper is the favorite of generations of French students.",
    shortDescription: "90 g/m² Seyes ruled paper, 96 pages.",
    price: 6.80,
    category: "school",
    images: ["/images/seyes.png"],
    specs: {
      paperWeight: "90 g/m²",
      pages: 96,
      format: "A4 (21 x 29.7 cm)",
      binding: "Staplebound"
    },
    features: ["Seyes Ruling", "Satin finish", "Durable Polypro Cover", "In-house paper"],
    suitability: {
      fountainPen: 5,
      pencil: 4,
      watercolor: 1,
      marker: 3
    },
    badges: ["School Standard", "Eco-Friendly"]
  },
  {
    id: "fontaine-watercolor-cold-press",
    name: "Fontaine Professional Watercolor Pad",
    series: "Beaux-Arts",
    description: "Our premium 100% cotton watercolor paper. Each sheet is gelatin-sized to the core, allowing for incredible transparency and vibrant color lifting. The cold-press grain provides the perfect balance of texture and detail.",
    shortDescription: "300 g/m² 100% Cotton, 20 sheets.",
    price: 34.00,
    category: "art",
    images: ["/images/fontaine.png"],
    specs: {
      paperWeight: "300 g/m²",
      pages: 20,
      format: "24 x 32 cm",
      coating: "Cold pressed"
    },
    features: ["100% Cotton", "Acid-free", "Gelatin-sized", "Highest archival quality"],
    suitability: {
      fountainPen: 2,
      pencil: 5,
      watercolor: 5,
      marker: 2
    },
    badges: ["Professional Grade", "Heritage Art"]
  },
  {
    id: "age-bag-a5-black",
    name: "Age Bag Black Clothbound Notebook",
    series: "L'Atelier Everyday",
    description: "Authentic and timeless. The Age Bag collection features a robust leather-look card cover and our signature 90g brushed vellum paper. Designed for those who carry their story wherever they go.",
    shortDescription: "90 g/m² brushed vellum, 192 pages.",
    price: 14.50,
    category: "notebooks",
    images: ["/images/age_bag.png"],
    specs: {
      paperWeight: "90 g/m²",
      pages: 192,
      format: "A5 (14.8 x 21 cm)",
      binding: "Thread bound"
    },
    features: ["Brushed Vellum", "Leather-look cover", "Lay-flat opening", "Vintage aesthetic"],
    suitability: {
      fountainPen: 5,
      pencil: 4,
      watercolor: 1,
      marker: 3
    },
    badges: ["Traveler's Choice", "Vegan Leather"]
  },
  {
    id: "neo-deco-gold",
    name: "Neo Deco Limited Edition",
    series: "Luxury Collection",
    description: "A tribute to the Art Deco era. This exquisite notebook features an embossed gold foil cover and our finest ivory paper. It combines heritage craftsmanship with modern elegance.",
    shortDescription: "90 g/m² ivory paper, embossed gold cover.",
    price: 28.00,
    category: "notebooks",
    images: ["/images/neo_deco.png"],
    specs: {
      paperWeight: "90 g/m²",
      pages: 160,
      format: "A5",
      binding: "Stitched"
    },
    features: ["Gold Foil", "Ivory Paper", "Art Deco design", "Limited Edition"],
    suitability: {
      fountainPen: 5,
      pencil: 3,
      watercolor: 1,
      marker: 3
    },
    badges: ["Premium", "Collector's Item"]
  },
  {
    id: "flying-spirit-kraft",
    name: "Flying Spirit Kraft Journal",
    series: "Retro Collection",
    description: "Inspired by the pioneers of aviation. This notebook features a raw kraft cover and our premium ivory paper. A perfect companion for sketching and journaling on the fly.",
    shortDescription: "90 g/m² ivory paper, kraft cover.",
    price: 11.20,
    category: "notebooks",
    images: ["/images/flying_spirit.png"],
    specs: {
      paperWeight: "90 g/m²",
      pages: 80,
      format: "11 x 17 cm",
      binding: "Stitched"
    },
    features: ["Kraft Cover", "Retro Style", "Flexible", "Acid-free"],
    suitability: {
      fountainPen: 5,
      pencil: 4,
      watercolor: 1,
      marker: 3
    },
    badges: ["Classic", "Vintage"]
  }
];
