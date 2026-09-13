export interface CapabilityCategory {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  bottleImage?: string | null;
  features: string[];
}

export interface OEMCapability {
  id: string;
  title: string;
  link: string;
}

export const OEM_CAPABILITIES: OEMCapability[] = [
  { id: "oem-1", title: "White-label manufacturing", link: "/about" },
  { id: "oem-2", title: "Custom fragrance development", link: "/about" },
  { id: "oem-3", title: "Premium packaging", link: "/about" },
  { id: "oem-4", title: "Scalable manufacturing", link: "/about" },
  { id: "oem-5", title: "Multiple fragrance formats", link: "/about" },
  { id: "oem-6", title: "End-to-end product development", link: "/about" }
];

export const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  {
    id: "attars",
    slug: "attars",
    name: "Attars",
    subtitle: "Traditional & Concentrated Botanical Oils",
    description: "Pure, alcohol-free fragrance oils crafted using traditional hydro-distillation and contemporary aging techniques for deep, authentic scent profiles.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/attar no bg.png",
    features: [
      "100% alcohol-free concentrated oil formulations",
      "Traditional sandalwood, vetiver, and cedar base carriers",
      "Custom aging & maceration timelines",
      "Roll-on, dabber, and apothecary vessel compatibility"
    ]
  },
  {
    id: "eau-de-toilette",
    slug: "eau-de-toilette",
    name: "Eau de Toilette (EDT)",
    subtitle: "Light & Refreshing Everyday Scents (8–15% Concentration)",
    description: "Vibrant, high-diffusion formulations perfect for casual daily wear, body mists, and summer fragrance collections.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/Eau de toilette EDT no BG.png",
    features: [
      "High top-note radiance & instant freshness",
      "Precise alcohol-water ratio for optimal atomization",
      "Cost-effective scalability for high-volume retail",
      "Ideal for youth, sporty, and daily lifestyle fragrance lines"
    ]
  },
  {
    id: "eau-de-parfum",
    slug: "eau-de-parfum",
    name: "Eau de Parfum (EDP)",
    subtitle: "High-Concentration Signature Perfumes (15–22% Concentration)",
    description: "Luxury-grade fine fragrance formulations engineered for rich sillage, complex heart notes, and 8+ hours longevity.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/Eau de Parfum (EDP) no bg.png",
    features: [
      "Premium essential oils & IFRA-compliant synthetic accords",
      "Engineered sillage and complex multi-tier note evaporation",
      "Custom maceration in temperature-controlled vats",
      "Heavyweight glass & crimp/screw spray pump integration"
    ]
  },
  {
    id: "deodorants",
    slug: "deodorants",
    name: "Deodorants",
    subtitle: "Active Odor Protection & Perfumed Body Sprays",
    description: "Dermatologically compliant body sprays and deodorant formulations combining effective antibacterial actives with signature fragrance notes.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/Deodrant red no bg.png",
    features: [
      "Aerosol & aerosol-free compressed propellant filling",
      "Aluminum-free and sensitive skin-safe formulations",
      "24-hour odor defense with micro-encapsulated freshness",
      "Custom aluminum can lithography & actuator options"
    ]
  },
  {
    id: "sports-active-fragrances",
    slug: "sports-active-fragrances",
    name: "Sports / active fragrances",
    subtitle: "High-Endurance, Sweat-Resistant Olfactory Formulations",
    description: "Formulated with micro-encapsulation technology for burst release during physical activity, intense movement, and outdoor endurance.",
    image: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/Sports no bg.png",
    features: [
      "Motion-activated fragrance capsule technology",
      "Sweat-neutralizing malodor counteracting accords",
      "Energizing citrus, aquatic, and ozone scent notes",
      "Shatter-resistant travel & gym bag packaging options"
    ]
  },
  {
    id: "scented-fragrance-candles",
    slug: "scented-fragrance-candles",
    name: "Scented and fragrance candles",
    subtitle: "Artisanal Soy, Beeswax & Paraffin Home Ambiance",
    description: "Premium hand-poured ambient candles engineered with high fragrance load (up to 12%) for intense hot and cold throw.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/fragrance candles no bg.png",
    features: [
      "100% natural soy, coconut, & botanical wax blends",
      "Lead-free organic cotton & crackling wood wicks",
      "Maximum aroma stability & clean burn profile",
      "Custom ceramic, glass, and metal vessel pouring"
    ]
  },
  {
    id: "incense-products",
    slug: "incense-products",
    name: "Incense products",
    subtitle: "Aromatic Sticks, Masala & Resin Formulations",
    description: "Clean-burning organic incense sticks infused with natural essential oils, resins, and aromatic wood powders.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/dhoop no bg.png", // Reuses dhoop image as instructed
    features: [
      "Low-smoke bamboo & natural charcoal core formulations",
      "Pure essential oil dipping & masala paste dipping",
      "Consistent 45–60 minute burn duration per stick",
      "Eco-friendly moisture-sealed packaging"
    ]
  },
  {
    id: "dhoop-incense-cones",
    slug: "dhoop-incense-cones",
    name: "Dhoop / incense cones",
    subtitle: "Backflow & Traditional Solid Incense Formulations",
    description: "Dense, charcoal-free aromatic cones designed for meditation, rituals, and ambient backflow smoke waterfall displays.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1000",
    bottleImage: "/images/formats/dhoop no bg.png",
    features: [
      "Charcoal-free herb, gum resin, and botanical mix",
      "Engineered backflow smoke physics for burner displays",
      "Intense room-filling aroma dispersion",
      "Custom cone sizing, color tinting, and fragrance blending"
    ]
  },
  {
    id: "customised-fragrances",
    slug: "customised-fragrances",
    name: "Customised Fragrances",
    subtitle: "Bespoke Perfumery & Exclusive Accord Creation",
    description: "Collaborative R&D with our master perfumers to synthesize exclusive, IP-protected scent profiles tailored to your brand story.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000",
    bottleImage: null, // Intentionally null as requested
    features: [
      "1-on-1 master perfumer consultation & benchmark matching",
      "Full IP ownership and exclusive compounding rights",
      "Advanced GC-MS analytical chromatography profiling",
      "Rapid sample turnaround for concept validation"
    ]
  }
];

export function getCapabilityBySlug(slug: string): CapabilityCategory | undefined {
  return CAPABILITY_CATEGORIES.find((c) => c.slug === slug);
}
