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
  banners?: BannerItem[];
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
  marketplaceBanner?: {
    image: ImageMeta;
    banners?: BannerItem[];
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
  marketplaceBanner: {
    image: {
      url: '/images/fragrance-library-banner.png',
      alt: 'Parallax Marketplace Banner (Required: 1900 x 840 px)',
      updatedAt: 1725840000000
    },
    banners: [
      {
        id: 'marketplace-banner-1',
        order: 1,
        desktop: {
          url: '/images/fragrance-library-banner.png',
          alt: 'Parallax Marketplace Banner (1900 x 840 px)',
          updatedAt: 1725840000000
        },
        mobile: {
          url: '/images/fragrance-library-banner.png',
          alt: 'Parallax Marketplace Banner (Mobile)',
          updatedAt: 1725840000000
        },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ]
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
    banners: [
      {
        id: 'cap-banner-1',
        order: 1,
        desktop: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA',
          alt: 'Fine Fragrance Manufacturing'
        },
        mobile: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA',
          alt: 'Fine Fragrance Manufacturing'
        },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      },
      {
        id: 'cap-banner-2',
        order: 2,
        desktop: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA',
          alt: 'Custom Fragrance Development'
        },
        mobile: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA',
          alt: 'Custom Fragrance Development'
        },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      },
      {
        id: 'cap-banner-3',
        order: 3,
        desktop: {
          url: '/images/product-5.png',
          alt: 'Premium Packaging & Bottling'
        },
        mobile: {
          url: '/images/product-5.png',
          alt: 'Premium Packaging & Bottling'
        },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
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

function normalizeProducts(rawProducts: any[] | undefined): ProductItem[] {
  const defaults = DEFAULT_HOMEPAGE_CONTENT.products;
  if (!Array.isArray(rawProducts) || rawProducts.length === 0) {
    return defaults;
  }

  return defaults.map((fallback, idx) => {
    const item = rawProducts.find(p => p && (p.id === fallback.id || p.id === `product-${idx + 1}`)) || rawProducts[idx];
    if (!item) return fallback;

    const rawImage = item?.image || item?.image_url || fallback.image;
    const imageUrl = typeof rawImage === 'string' ? rawImage : (rawImage?.url || fallback.image.url);
    const imageAlt = typeof rawImage === 'object' && rawImage?.alt ? rawImage.alt : (item?.title || fallback.title);

    return {
      id: fallback.id,
      category: item?.category || fallback.category,
      title: (item?.title && String(item.title).trim()) ? String(item.title).trim() : fallback.title,
      link: item?.link || fallback.link,
      image: {
        url: imageUrl,
        alt: imageAlt,
        updatedAt: item?.image?.updatedAt || Date.now()
      }
    };
  });
}

export function normalizeHomepageContent(raw: Partial<HomepageContent> | any): HomepageContent {
  const heroData = raw?.hero || DEFAULT_HOMEPAGE_CONTENT.hero;
  const mobileHeroData = raw?.mobile_hero || raw?.mobileHero || DEFAULT_HOMEPAGE_CONTENT.mobileHero;
  const aboutBannerData = raw?.about_banner || raw?.aboutBanner || DEFAULT_HOMEPAGE_CONTENT.aboutBanner;
  const aboutMobileBannerData = raw?.about_mobile_banner || raw?.aboutMobileBanner || DEFAULT_HOMEPAGE_CONTENT.aboutMobileBanner;
  const marketplaceBannerData = raw?.marketplace_banner || raw?.marketplaceBanner || DEFAULT_HOMEPAGE_CONTENT.marketplaceBanner;

  const defaultHeroDesktop = DEFAULT_HOMEPAGE_CONTENT.hero.image;
  const defaultHeroMobile = DEFAULT_HOMEPAGE_CONTENT.mobileHero!.image;
  const defaultAboutDesktop = DEFAULT_HOMEPAGE_CONTENT.aboutBanner!.image;
  const defaultAboutMobile = DEFAULT_HOMEPAGE_CONTENT.aboutMobileBanner!.image;
  const defaultMarketplaceDesktop = DEFAULT_HOMEPAGE_CONTENT.marketplaceBanner!.image;

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

  const marketplaceBanners = normalizeBanners(
    marketplaceBannerData?.banners,
    marketplaceBannerData?.image || defaultMarketplaceDesktop,
    marketplaceBannerData?.image || defaultMarketplaceDesktop,
    'marketplace-banner'
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
    marketplaceBanner: {
      image: marketplaceBanners[0]?.desktop || marketplaceBannerData?.image || defaultMarketplaceDesktop,
      banners: marketplaceBanners
    },
    products: normalizeProducts(raw?.products),
    capabilities: raw?.capabilities || DEFAULT_HOMEPAGE_CONTENT.capabilities
  };
}

export async function uploadAdminImage(file: File, folderPath: string = 'homepage'): Promise<{ url: string; filename: string }> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image upload failed: File size exceeds 10MB limit.');
  }

  if (file.type && !file.type.startsWith('image/')) {
    throw new Error('Image upload failed: Unsupported file format. Please select a valid image file (JPG, PNG, WebP, etc.).');
  }

  // 1. Upload to Supabase Storage 'website-assets' bucket
  if (isSupabaseConfigured()) {
    try {
      const ext = file.name.split('.').pop() || 'png';
      const cleanPath = folderPath.replace(/\/+$/, '');
      const cleanFileName = `${cleanPath}/img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      
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
        console.error('Supabase storage upload error:', uploadError.message);
        if (uploadError.message?.includes('not found') || uploadError.message?.includes('Bucket')) {
          console.warn('Bucket "website-assets" not found in Supabase Storage. Falling back to Data URL encoding.');
        } else {
          throw new Error(`Supabase Storage upload error: ${uploadError.message}`);
        }
      }
    } catch (err: any) {
      if (err.message && err.message.includes('Supabase Storage upload error')) {
        throw err;
      }
      console.warn('Supabase storage upload exception, using fallback encoding:', err);
    }
  }

  // 2. Local image processing fallback (Convert to Data URL / Base64)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;

        try {
          const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: dataUrl, name: file.name, type: file.type })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              resolve({ url: data.url, filename: data.filename || file.name });
              return;
            }
          }
        } catch {
          // Static host without /api endpoint; resolve with Data URL
        }

        resolve({ url: dataUrl, filename: file.name });
      } catch (err: any) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file from local disk.'));
    reader.readAsDataURL(file);
  });
}

export async function savePublishedHomepageContent(content: HomepageContent): Promise<void> {
  const normalized = normalizeHomepageContent(content);

  // 1. Sync to local browser cache as immediate local backup
  try {
    localStorage.setItem('parallax_homepage_content', JSON.stringify(normalized));
  } catch (e) {
    console.warn('Could not save homepage content to localStorage:', e);
  }

  // 2. Primary Supabase cloud database persistence
  if (isSupabaseConfigured()) {
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
      marketplace_banner: {
        image: normalized.marketplaceBanner?.image,
        banners: normalized.marketplaceBanner?.banners
      },
      products: normalized.products,
      capabilities: normalized.capabilities || null,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('homepage_content')
      .upsert(payload);

    if (error) {
      console.error('Supabase homepage_content save error:', error.message);
      throw new Error(`Database Save Error: ${error.message}. Changes could not be published to Supabase.`);
    }

    // Dual-write products to homepage_products table for full database alignment
    if (Array.isArray(normalized.products)) {
      try {
        for (const p of normalized.products) {
          await supabase.from('homepage_products').upsert({
            id: p.id,
            category: p.category,
            title: p.title,
            link: p.link,
            image_url: p.image.url,
            image_alt: p.image.alt || p.title,
            updated_at: new Date().toISOString()
          });
        }
      } catch {}
    }

    // Sync local JSON backup asynchronously if dev server is running
    fetch('/api/homepage-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized)
    }).catch(() => {});

    return;
  }

  // Sync to local API server if available
  fetch('/api/homepage-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalized)
  }).catch(() => {});
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
        const normalized = normalizeHomepageContent(data);
        try {
          localStorage.setItem('parallax_homepage_content', JSON.stringify(normalized));
        } catch {}
        return normalized;
      } else if (error) {
        console.warn('Supabase homepage_content query notice:', error.message);
        if (error.code === 'PGRST116' || error.message?.includes('0 rows') || error.message?.includes('multiple')) {
          console.log('Seeding initial homepage_content row in Supabase...');
          await savePublishedHomepageContent(DEFAULT_HOMEPAGE_CONTENT).catch(() => {});
          return normalizeHomepageContent(DEFAULT_HOMEPAGE_CONTENT);
        }
      }
    } catch (err) {
      console.warn('Supabase getPublishedHomepageContent error:', err);
    }
  }

  // Check localStorage SECOND if Supabase is offline or unconfigured
  try {
    const localData = localStorage.getItem('parallax_homepage_content');
    if (localData) {
      const parsed = JSON.parse(localData);
      return normalizeHomepageContent(parsed);
    }
  } catch (err) {
    console.warn('Could not load homepage content from localStorage:', err);
  }

  return normalizeHomepageContent(DEFAULT_HOMEPAGE_CONTENT);
}
