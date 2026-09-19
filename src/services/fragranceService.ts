import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface FragranceItem {
  id: string;
  code: string;
  name: string;
  title: string;
  category: string;
  family: string;
  profile: string;
  format: string;
  longevity: string;
  image_url: string;
  image_alt?: string;
  sort_order?: number;
}

export const DEFAULT_FRAGRANCES: FragranceItem[] = [
  {
    id: "px-104",
    code: "PX-104",
    name: "Amber Resonance",
    title: "PX-104: Amber Resonance",
    category: "Eau de Parfum (EDP)",
    family: "Woody Amber",
    profile: "Top: Bergamot, Pink Pepper | Heart: Iris, Olibanum | Base: Cedar, Vetiver, Amber",
    format: "Eau de Parfum, Extrait",
    longevity: "8-10 Hours",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA",
    image_alt: "PX-104: Amber Resonance",
    sort_order: 1
  },
  {
    id: "px-209",
    code: "PX-209",
    name: "Midnight Flora",
    title: "PX-209: Midnight Flora",
    category: "Eau de Parfum (EDP)",
    family: "Floral",
    profile: "Top: Mandarin | Heart: Night Jasmine, Tuberose | Base: Sandalwood, Musk",
    format: "Eau de Parfum, Body Mist",
    longevity: "6-8 Hours",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-209: Midnight Flora",
    sort_order: 2
  },
  {
    id: "px-042",
    code: "PX-042",
    name: "Oudh Absolute",
    title: "PX-042: Oudh Absolute",
    category: "Attars",
    family: "Amber & Oriental",
    profile: "Top: Saffron | Heart: Rose, Patchouli | Base: Agarwood, Leather",
    format: "Attar, Extrait",
    longevity: "12+ Hours",
    image_url: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-042: Oudh Absolute",
    sort_order: 3
  },
  {
    id: "px-311",
    code: "PX-311",
    name: "Solar Citrus",
    title: "PX-311: Solar Citrus",
    category: "Eau de Toilette (EDT)",
    family: "Fresh",
    profile: "Top: Neroli, Lemon | Heart: Orange Blossom | Base: Sun-baked Clay, Musk",
    format: "Eau de Toilette, Room Spray",
    longevity: "4-6 Hours",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-311: Solar Citrus",
    sort_order: 4
  },
  {
    id: "px-405",
    code: "PX-405",
    name: "Ozone Sport Burst",
    title: "PX-405: Ozone Sport Burst",
    category: "Sports / active fragrances",
    family: "Fresh",
    profile: "Top: Marine Air, Spearmint | Heart: Eucalyptus, Bamboo | Base: Cedar, Clean Musk",
    format: "Body Spray, Eau de Toilette",
    longevity: "6-8 Hours",
    image_url: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-405: Ozone Sport Burst",
    sort_order: 5
  },
  {
    id: "px-512",
    code: "PX-512",
    name: "Velvet Deodorant Spray",
    title: "PX-512: Velvet Deodorant Spray",
    category: "Deodorants",
    family: "Woody",
    profile: "Top: Bergamot, Cardamom | Heart: Lavender, Sage | Base: Vetiver, Amberwood",
    format: "Aerosol Deodorant, Body Spray",
    longevity: "24 Hours Odor Protection",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-512: Velvet Deodorant Spray",
    sort_order: 6
  },
  {
    id: "px-601",
    code: "PX-601",
    name: "Botanical Soy Amber Candle",
    title: "PX-601: Botanical Soy Amber Candle",
    category: "Scented and fragrance candles",
    family: "Amber & Oriental",
    profile: "Top: Cinnamon Bark, Clove | Heart: Vanilla Pod, Myrrh | Base: Smoked Birch, Sandalwood",
    format: "Poured Glass Candle (12% Fragrance Load)",
    longevity: "50+ Hours Burn Time",
    image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-601: Botanical Soy Amber Candle",
    sort_order: 7
  },
  {
    id: "px-708",
    code: "PX-708",
    name: "Sacred Sandalwood Incense",
    title: "PX-708: Sacred Sandalwood Incense",
    category: "Incense products",
    family: "Woody",
    profile: "Top: Mysore Sandalwood, Cardamom | Heart: Nag Champa, Frangipani | Base: Benzoin, Cedar",
    format: "Bamboo Sticks, Organic Masala Dip",
    longevity: "60 Mins per Stick",
    image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-708: Sacred Sandalwood Incense",
    sort_order: 8
  },
  {
    id: "px-802",
    code: "PX-802",
    name: "Backflow Waterfall Dhoop Cones",
    title: "PX-802: Backflow Waterfall Dhoop Cones",
    category: "Dhoop / incense cones",
    family: "Woody Amber",
    profile: "Top: Frankincense, Lemon Zest | Heart: Labdanum, Patchouli | Base: Agarwood Resin",
    format: "Charcoal-Free Backflow Cones",
    longevity: "30 Mins per Cone",
    image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-802: Backflow Waterfall Dhoop Cones",
    sort_order: 9
  },
  {
    id: "px-909",
    code: "PX-909",
    name: "Alpine Breeze Car Vent Perfume",
    title: "PX-909: Alpine Breeze Car Vent Perfume",
    category: "Car Freshners",
    family: "Fresh",
    profile: "Top: Crisp Air accord, Bergamot | Heart: Glacier Mint, Eucalyptus | Base: Cedar, Clean Amber",
    format: "Vent Clip Diffuser, Liquid Pod",
    longevity: "45 Days Continuous Release",
    image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000",
    image_alt: "PX-909: Alpine Breeze Car Vent Perfume",
    sort_order: 10
  }
];

export async function fetchFragrances(): Promise<FragranceItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('fragrances')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as FragranceItem[];
      }

      if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
        console.warn('Fragrances table not found in database, returning seed data.');
      } else if (!data || data.length === 0) {
        // Seed default fragrances into database asynchronously
        try {
          await supabase.from('fragrances').upsert(DEFAULT_FRAGRANCES);
        } catch (e) {
          console.warn('Could not auto-seed fragrances:', e);
        }
      }
    } catch (err) {
      console.warn('Supabase fetchFragrances error:', err);
    }
  }

  return DEFAULT_FRAGRANCES;
}
