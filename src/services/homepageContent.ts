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
  capabilityBanners?: Record<string, BannerItem[]>;
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
  },
  capabilityBanners: {
    attars: [
      {
        id: 'attars-banner-1',
        order: 1,
        desktop: { url: '/images/marketplace/attars-1.png', alt: 'Attars Desktop Banner' },
        mobile: { url: '/images/marketplace/attars-1.png', alt: 'Attars Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'eau-de-toilette': [
      {
        id: 'eau-de-toilette-banner-1',
        order: 1,
        desktop: { url: '/images/marketplace/edt-3.png', alt: 'Eau de Toilette Desktop Banner' },
        mobile: { url: '/images/marketplace/edt-3.png', alt: 'Eau de Toilette Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'eau-de-parfum': [
      {
        id: 'eau-de-parfum-banner-1',
        order: 1,
        desktop: { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000', alt: 'Eau de Parfum Desktop Banner' },
        mobile: { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000', alt: 'Eau de Parfum Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    deodorants: [
      {
        id: 'deodorants-banner-1',
        order: 1,
        desktop: { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', alt: 'Deodorants Desktop Banner' },
        mobile: { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000', alt: 'Deodorants Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'sports-active-fragrances': [
      {
        id: 'sports-active-fragrances-banner-1',
        order: 1,
        desktop: { url: 'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80&w=1000', alt: 'Sports Fragrances Desktop Banner' },
        mobile: { url: 'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80&w=1000', alt: 'Sports Fragrances Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'scented-fragrance-candles': [
      {
        id: 'scented-fragrance-candles-banner-1',
        order: 1,
        desktop: { url: '/images/marketplace/scented-fragrance-candles-6.png', alt: 'Candles Desktop Banner' },
        mobile: { url: '/images/marketplace/scented-fragrance-candles-6.png', alt: 'Candles Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'incense-products': [
      {
        id: 'incense-products-banner-1',
        order: 1,
        desktop: { url: '/images/marketplace/incense-products-7.png', alt: 'Incense Desktop Banner' },
        mobile: { url: '/images/marketplace/incense-products-7.png', alt: 'Incense Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'dhoop-incense-cones': [
      {
        id: 'dhoop-incense-cones-banner-1',
        order: 1,
        desktop: { url: '/images/marketplace/dhoop-incense-cones-8.png', alt: 'Dhoop Desktop Banner' },
        mobile: { url: '/images/marketplace/dhoop-incense-cones-8.png', alt: 'Dhoop Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
      }
    ],
    'customised-fragrances': [
      {
        id: 'customised-fragrances-banner-1',
        order: 1,
        desktop: { url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000', alt: 'Customised Fragrances Desktop Banner' },
        mobile: { url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000', alt: 'Customised Fragrances Mobile Banner' },
        createdAt: 1725840000000,
        updatedAt: 1725840000000
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
      .map((item, idx) => {
        const desktopObj = item.desktop && typeof item.desktop === 'object' && item.desktop.url && String(item.desktop.url).trim() ? item.desktop : (item.image && typeof item.image === 'object' && item.image.url && String(item.image.url).trim() ? item.image : fallbackDesktop);
        const mobileObj = item.mobile && typeof item.mobile === 'object' && item.mobile.url && String(item.mobile.url).trim() ? item.mobile : (fallbackMobile && fallbackMobile.url && String(fallbackMobile.url).trim() ? fallbackMobile : desktopObj);

        return {
          id: item.id || `${prefix}-${idx + 1}-${Date.now()}`,
          order: typeof item.order === 'number' ? item.order : idx + 1,
          desktop: desktopObj,
          mobile: mobileObj,
          createdAt: item.createdAt || Date.now(),
          updatedAt: item.updatedAt || Date.now()
        };
      })
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
  const marketplaceBannerData =
    raw?.marketplace_banner ||
    raw?.marketplaceBanner ||
    raw?.about_banner?.marketplace_banner ||
    raw?.aboutBanner?.marketplaceBanner ||
    raw?.hero?.marketplace_banner ||
    DEFAULT_HOMEPAGE_CONTENT.marketplaceBanner;

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

  // Normalize capability product banners
  const rawCapBanners =
    raw?.capabilityBanners ||
    raw?.capability_banners ||
    raw?.capabilities?.capabilityBanners ||
    raw?.capabilities?.capability_banners ||
    raw?.about_banner?.capability_banners ||
    {};
  const defaultCapBanners = DEFAULT_HOMEPAGE_CONTENT.capabilityBanners || {};
  const normalizedCapBanners: Record<string, BannerItem[]> = {};

  const allCapSlugs = Array.from(new Set([...Object.keys(defaultCapBanners), ...Object.keys(rawCapBanners)]));
  for (const slug of allCapSlugs) {
    const defaultList = defaultCapBanners[slug] || [];
    const sourceBanners =
      rawCapBanners[slug] && Array.isArray(rawCapBanners[slug]) && rawCapBanners[slug].length > 0
        ? rawCapBanners[slug]
        : defaultList;

    if (sourceBanners && sourceBanners.length > 0) {
      normalizedCapBanners[slug] = normalizeBanners(
        sourceBanners,
        defaultList[0]?.desktop || defaultMarketplaceDesktop,
        defaultList[0]?.mobile || defaultMarketplaceDesktop,
        `${slug}-banner`
      );
    }
  }

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
    capabilities: raw?.capabilities || DEFAULT_HOMEPAGE_CONTENT.capabilities,
    capabilityBanners: normalizedCapBanners
  };
}

async function compressImageFile(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
          return;
        }
        resolve(e.target?.result as string);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

export async function uploadAdminImage(file: File, folderPath: string = 'homepage'): Promise<{ url: string; filename: string }> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image upload failed: File size exceeds 10MB limit.');
  }

  if (file.type && !file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|avif|heic|svg)$/i)) {
    throw new Error('Image upload failed: Unsupported file format. Please select a valid image file (JPG, PNG, WebP, etc.).');
  }

  // 1. Upload to Supabase Storage 'website-assets' bucket if configured
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
        console.warn('Supabase storage upload notice, using compressed local Data URL:', uploadError.message);
      }
    } catch (err: any) {
      console.warn('Supabase storage upload exception, using compressed local Data URL:', err);
    }
  }

  // 2. High-performance compressed Data URL fallback
  const compressedDataUrl = await compressImageFile(file);
  if (compressedDataUrl) {
    return { url: compressedDataUrl, filename: file.name };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ url: reader.result as string, filename: file.name });
    reader.onerror = () => reject(new Error('Failed to read image file.'));
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
    const payload: any = {
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
        banners: normalized.aboutBanner?.banners,
        marketplace_banner: normalized.marketplaceBanner,
        capability_banners: normalized.capabilityBanners
      },
      about_mobile_banner: {
        image: normalized.aboutMobileBanner?.image
      },
      marketplace_banner: {
        image: normalized.marketplaceBanner?.image,
        banners: normalized.marketplaceBanner?.banners
      },
      products: normalized.products,
      capabilities: normalized.capabilities
        ? {
            ...normalized.capabilities,
            capabilityBanners: normalized.capabilityBanners,
            capability_banners: normalized.capabilityBanners
          }
        : null,
      capability_banners: normalized.capabilityBanners,
      capabilityBanners: normalized.capabilityBanners,
      updated_at: new Date().toISOString()
    };

    let { error } = await supabase
      .from('homepage_content')
      .upsert(payload);

    // If column errors occur on live Supabase Postgres schema cache, strip non-standard top-level columns and retry
    if (error && (error.code === 'PGRST204' || error.message?.includes('column') || error.message?.includes('schema cache'))) {
      console.warn('Top-level non-standard columns not found in homepage_content table. Retrying with JSONB embedded payload.');
      delete payload.marketplace_banner;
      delete payload.capability_banners;
      delete payload.capabilityBanners;
      const retryResult = await supabase
        .from('homepage_content')
        .upsert(payload);
      error = retryResult.error;
    }

    if (error) {
      console.error('Supabase homepage_content save notice:', error.message);
    }
  }
}

export async function getPublishedHomepageContent(): Promise<HomepageContent> {
  // Check local storage first for immediate admin edits
  let localNormalized: HomepageContent | null = null;
  try {
    const localData = localStorage.getItem('parallax_homepage_content');
    if (localData) {
      localNormalized = normalizeHomepageContent(JSON.parse(localData));
    }
  } catch {}

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .eq('id', 'published')
        .single();

      if (!error && data) {
        const remoteNormalized = normalizeHomepageContent(data);
        // Deep-merge remote with local capabilityBanners per slug so all product page banners persist
        const mergedCapBanners: Record<string, BannerItem[]> = {
          ...(remoteNormalized.capabilityBanners || {})
        };
        if (localNormalized?.capabilityBanners) {
          for (const slug of Object.keys(localNormalized.capabilityBanners)) {
            const localList = localNormalized.capabilityBanners[slug];
            const remoteList = remoteNormalized.capabilityBanners?.[slug];
            if (localList && localList.length > 0) {
              const localUpdated = localList[0]?.updatedAt || 0;
              const remoteUpdated = remoteList?.[0]?.updatedAt || 0;
              if (!remoteList || localUpdated >= remoteUpdated) {
                mergedCapBanners[slug] = localList;
              }
            }
          }
        }

        const merged: HomepageContent = {
          ...remoteNormalized,
          capabilityBanners: mergedCapBanners,
          marketplaceBanner: localNormalized?.marketplaceBanner?.banners?.length
            ? localNormalized.marketplaceBanner
            : remoteNormalized.marketplaceBanner
        };
        try {
          localStorage.setItem('parallax_homepage_content', JSON.stringify(merged));
        } catch {}
        return merged;
      }
    } catch (err) {
      console.warn('Supabase getPublishedHomepageContent error:', err);
    }
  }

  if (localNormalized) {
    return localNormalized;
  }

  return normalizeHomepageContent(DEFAULT_HOMEPAGE_CONTENT);
}
