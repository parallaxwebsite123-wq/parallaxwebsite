import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface ImageMeta {
  url: string;
  alt: string;
  updatedAt?: number;
}

export interface BannerItem {
  id: string;
  order: number;
  desktop: ImageMeta;
  mobile: ImageMeta;
  createdAt?: number;
  updatedAt?: number;
}

export interface ProductItem {
  id: string;
  category: string;
  title: string;
  link: string;
  image: ImageMeta;
}

export interface CapabilityItem {
  id: string;
  title: string;
  image: ImageMeta;
}

export interface CapabilitiesSection {
  mainFineFragrance: ImageMeta;
  items: CapabilityItem[];
}

export interface HomepageContent {
  hero: {
    image: ImageMeta;
    banners?: BannerItem[];
  };
  mobileHero?: {
    image: ImageMeta;
  };
  aboutBanner?: {
    image: ImageMeta;
    banners?: BannerItem[];
  };
  aboutMobileBanner?: {
    image: ImageMeta;
  };
  products: ProductItem[];
  capabilities?: CapabilitiesSection;
}

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  hero: {
    image: {
      url: '/images/hero/hero-banner.png',
      alt: 'Our Preciously Curated Gift Collection - Parallax Perfumery',
      updatedAt: 1725840000000
    },
    banners: [
      {
        id: 'hero-banner-1',
        order: 1,
        desktop: {
          url: '/images/hero/hero-banner.png',
          alt: 'Our Preciously Curated Gift Collection - Parallax Perfumery',
          updatedAt: 1725840000000
        },
        mobile: {
          url: '/images/hero/mobile-hero-banner.png',
          alt: 'Our Preciously Curated Gift Collection - Parallax Perfumery (Mobile)',
          updatedAt: 1725840000000
        },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ]
  },
  mobileHero: {
    image: {
      url: '/images/hero/mobile-hero-banner.png',
      alt: 'Our Preciously Curated Gift Collection - Parallax Perfumery (Mobile)',
      updatedAt: 1725840000000
    }
  },
  aboutBanner: {
    image: {
      url: '/images/about-banner-bg.png',
      alt: 'Parallax About Us Banner (Desktop)',
      updatedAt: 1725840000000
    },
    banners: [
      {
        id: 'about-banner-1',
        order: 1,
        desktop: {
          url: '/images/about-banner-bg.png',
          alt: 'Parallax About Us Banner (Desktop)',
          updatedAt: 1725840000000
        },
        mobile: {
          url: '/images/about-mobile-banner.png',
          alt: 'Parallax About Us Banner (Mobile)',
          updatedAt: 1725840000000
        },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ]
  },
  aboutMobileBanner: {
    image: {
      url: '/images/about-mobile-banner.png',
      alt: 'Parallax About Us Banner (Mobile)',
      updatedAt: 1725840000000
    }
  },
  products: [
    {
      id: 'product-1',
      category: 'Signature Collection',
      title: 'Fine Fragrance Oils',
      link: '/marketplace?category=fine-fragrance',
      image: {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA',
        alt: 'Fine Fragrance Oils'
      }
    },
    {
      id: 'product-2',
      category: 'Bespoke Tooling',
      title: 'Custom Glassware',
      link: '/build-sample',
      image: {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA',
        alt: 'Custom Glassware'
      }
    },
    {
      id: 'product-3',
      category: 'Home & Ambient',
      title: 'Reed Diffusers & Sprays',
      link: '/marketplace?category=ambient',
      image: {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2RVrUT9aCMFofBgkTV06mfmP6SRbeYXsJDOUHgTEh45y7X7t0A06bRmomBNmsdPBgtduel1gR7trACZi47jS9yo0mxJ2Bb_nSbISPXyis3T761yLZz_1qZ_iDNyI08hx4dorgK0K1S0UPKeknPIP7gO9hdnV8wSsUV458sGIoL1MoW4leUJADvzOIdInqd4BhPutomPzrgnv18rQEUjEZhfOv33DbxeXKO3SsRdDhhIjO17egF_WJ_w',
        alt: 'Reed Diffusers & Sprays'
      }
    },
    {
      id: 'product-4',
      category: 'Private Label',
      title: 'Private Label Fragrance',
      link: '/marketplace',
      image: {
        url: '/images/product-4.png',
        alt: 'Private Label Fragrance'
      }
    },
    {
      id: 'product-5',
      category: 'Packaging',
      title: 'Bespoke Packaging',
      link: '/about',
      image: {
        url: '/images/product-5.png',
        alt: 'Bespoke Packaging'
      }
    }
  ],
  capabilities: {
    mainFineFragrance: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA',
      alt: 'Main Fine Fragrance'
    },
    items: [
      {
        id: 'white-label-manufacturing',
        title: 'White-label manufacturing',
        image: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA',
          alt: 'White-label manufacturing'
        }
      },
      {
        id: 'custom-fragrance-development',
        title: 'Custom fragrance development',
        image: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA',
          alt: 'Custom fragrance development'
        }
      },
      {
        id: 'premium-packaging',
        title: 'Premium packaging',
        image: {
          url: '/images/product-5.png',
          alt: 'Premium packaging'
        }
      },
      {
        id: 'scalable-manufacturing',
        title: 'Scalable manufacturing',
        image: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2RVrUT9aCMFofBgkTV06mfmP6SRbeYXsJDOUHgTEh45y7X7t0A06bRmomBNmsdPBgtduel1gR7trACZi47jS9yo0mxJ2Bb_nSbISPXyis3T761yLZz_1qZ_iDNyI08hx4dorgK0K1S0UPKeknPIP7gO9hdnV8wSsUV458sGIoL1MoW4leUJADvzOIdInqd4BhPutomPzrgnv18rQEUjEZhfOv33DbxeXKO3SsRdDhhIjO17egF_WJ_w',
          alt: 'Scalable manufacturing'
        }
      },
      {
        id: 'multiple-fragrance-formats',
        title: 'Multiple fragrance formats',
        image: {
          url: '/images/product-4.png',
          alt: 'Multiple fragrance formats'
        }
      },
      {
        id: 'end-to-end-product-development',
        title: 'End-to-end product development',
        image: {
          url: '/images/hero/hero-banner.png',
          alt: 'End-to-end product development'
        }
      }
    ]
  }
};

function normalizeBanners(
  rawBanners: any[] | undefined,
  fallbackDesktop: ImageMeta,
  fallbackMobile?: ImageMeta,
  prefix: string = 'banner'
): BannerItem[] {
  if (Array.isArray(rawBanners) && rawBanners.length > 0) {
    return rawBanners
      .map((item, idx) => ({
        id: item.id || `${prefix}-${idx + 1}-${Date.now()}`,
        order: typeof item.order === 'number' ? item.order : idx + 1,
        desktop: item.desktop || item.image || fallbackDesktop,
        mobile: item.mobile || fallbackMobile || item.desktop || item.image || fallbackDesktop,
        createdAt: item.createdAt || Date.now(),
        updatedAt: item.updatedAt || Date.now()
      }))
      .sort((a, b) => a.order - b.order);
  }

  return [
    {
      id: `${prefix}-1`,
      order: 1,
      desktop: fallbackDesktop,
      mobile: fallbackMobile || fallbackDesktop,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  ];
}

export function normalizeHomepageContent(raw: Partial<HomepageContent> | any): HomepageContent {
  const heroData = raw?.hero || DEFAULT_HOMEPAGE_CONTENT.hero;
  const mobileHeroData = raw?.mobile_hero || raw?.mobileHero || DEFAULT_HOMEPAGE_CONTENT.mobileHero;
  const aboutBannerData = raw?.about_banner || raw?.aboutBanner || DEFAULT_HOMEPAGE_CONTENT.aboutBanner;
  const aboutMobileBannerData = raw?.about_mobile_banner || raw?.aboutMobileBanner || DEFAULT_HOMEPAGE_CONTENT.aboutMobileBanner;

  const defaultHeroDesktop = DEFAULT_HOMEPAGE_CONTENT.hero.image;
  const defaultHeroMobile = DEFAULT_HOMEPAGE_CONTENT.mobileHero!.image;
  const defaultAboutDesktop = DEFAULT_HOMEPAGE_CONTENT.aboutBanner!.image;
  const defaultAboutMobile = DEFAULT_HOMEPAGE_CONTENT.aboutMobileBanner!.image;

  const heroBanners = normalizeBanners(
    heroData?.banners,
    heroData?.image || defaultHeroDesktop,
    mobileHeroData?.image || defaultHeroMobile,
    'hero-banner'
  );

  const aboutBanners = normalizeBanners(
    aboutBannerData?.banners,
    aboutBannerData?.image || defaultAboutDesktop,
    aboutMobileBannerData?.image || defaultAboutMobile,
    'about-banner'
  );

  return {
    hero: {
      image: heroBanners[0]?.desktop || heroData?.image || defaultHeroDesktop,
      banners: heroBanners
    },
    mobileHero: {
      image: heroBanners[0]?.mobile || mobileHeroData?.image || defaultHeroMobile
    },
    aboutBanner: {
      image: aboutBanners[0]?.desktop || aboutBannerData?.image || defaultAboutDesktop,
      banners: aboutBanners
    },
    aboutMobileBanner: {
      image: aboutBanners[0]?.mobile || aboutMobileBannerData?.image || defaultAboutMobile
    },
    products: raw?.products || DEFAULT_HOMEPAGE_CONTENT.products,
    capabilities: raw?.capabilities || DEFAULT_HOMEPAGE_CONTENT.capabilities
  };
}

export async function getPublishedHomepageContent(): Promise<HomepageContent> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .eq('id', 'published')
        .single();

      if (!error && data) {
        return normalizeHomepageContent(data);
      }
    } catch (err) {
      console.warn('Supabase getPublishedHomepageContent error:', err);
    }
  }

  try {
    const res = await fetch('/api/homepage-content', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return normalizeHomepageContent(data);
    }
    const fallbackRes = await fetch('/data/homepage-content.json', { cache: 'no-store' });
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      return normalizeHomepageContent(data);
    }
  } catch (err) {
    console.warn('Could not fetch homepage content from API, using defaults:', err);
  }
  return normalizeHomepageContent(DEFAULT_HOMEPAGE_CONTENT);
}

export async function uploadAdminImage(file: File): Promise<{ url: string; filename: string }> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image upload failed: File size exceeds 10MB limit.');
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    throw new Error('Image upload failed: Unsupported file type. Only JPG, PNG, and WebP images are allowed.');
  }

  // Primary: Upload to Supabase Storage if configured
  if (isSupabaseConfigured()) {
    try {
      const ext = file.name.split('.').pop() || 'png';
      const cleanFileName = `homepage/img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from('website-assets')
        .upload(cleanFileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('website-assets')
          .getPublicUrl(cleanFileName);

        if (publicUrlData?.publicUrl) {
          return { url: publicUrlData.publicUrl, filename: cleanFileName };
        }
      } else {
        console.warn('Supabase storage upload notice:', uploadError.message);
      }
    } catch (err) {
      console.warn('Supabase storage upload failed, attempting fallback API:', err);
    }
  }

  // Fallback to local server upload API
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64, name: file.name, type: file.type })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Image upload failed.');
        }

        const data = await res.json();
        resolve({ url: data.url, filename: data.filename });
      } catch (err: any) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file from disk.'));
    reader.readAsDataURL(file);
  });
}

export async function savePublishedHomepageContent(content: HomepageContent): Promise<void> {
  const normalized = normalizeHomepageContent(content);

  if (isSupabaseConfigured()) {
    try {
      const payload = {
        id: 'published',
        hero: {
          image: normalized.hero.image,
          banners: normalized.hero.banners
        },
        mobile_hero: {
          image: normalized.mobileHero?.image
        },
        about_banner: {
          image: normalized.aboutBanner?.image,
          banners: normalized.aboutBanner?.banners
        },
        about_mobile_banner: {
          image: normalized.aboutMobileBanner?.image
        },
        products: normalized.products,
        capabilities: normalized.capabilities || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('homepage_content')
        .upsert(payload);

      if (error) {
        console.warn('Supabase homepage_content save error:', error.message);
      }
    } catch (err) {
      console.warn('Failed to save to Supabase, saving to local API:', err);
    }
  }

  const res = await fetch('/api/homepage-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalized)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Could not publish this change. The current homepage image remains unchanged.');
  }
}
