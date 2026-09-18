import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
  getPublishedHomepageContent,
  uploadAdminImage,
  savePublishedHomepageContent,
  HomepageContent,
  DEFAULT_HOMEPAGE_CONTENT,
  BannerItem
} from '../services/homepageContent';
import { fetchInquiries, updateInquiryStatus, Inquiry } from '../services/inquiriesService';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

export interface HomepageSectionConfig {
  id: string;
  title: string;
  shortDesc: string;
  itemCountText: (content: HomepageContent) => string;
  getThumbnailUrl: (content: HomepageContent) => string;
  getThumbnailAlt: (content: HomepageContent) => string;
}

export const HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  {
    id: 'hero',
    title: 'Homepage Hero',
    shortDesc: 'Manage desktop and mobile landing hero imagery displayed at the top of the homepage.',
    itemCountText: (content) => `${content.hero?.banners?.length || 1} Banners`,
    getThumbnailUrl: (content) => content.hero?.banners?.[0]?.desktop?.url || content.hero?.image?.url || '/images/hero/hero-banner.png',
    getThumbnailAlt: (content) => content.hero?.banners?.[0]?.desktop?.alt || 'Homepage Hero',
  },
  {
    id: 'about',
    title: 'About Us',
    shortDesc: 'Manage desktop and mobile banner imagery displayed on the About Us page.',
    itemCountText: (content) => `${content.aboutBanner?.banners?.length || 1} Banners`,
    getThumbnailUrl: (content) => content.aboutBanner?.banners?.[0]?.desktop?.url || content.aboutBanner?.image?.url || '/images/about-banner-bg.png',
    getThumbnailAlt: (content) => content.aboutBanner?.banners?.[0]?.desktop?.alt || 'About Us Banner',
  },
  {
    id: 'products',
    title: 'Product Display',
    shortDesc: 'Manage product card imagery used in the moving continuous marquee chain.',
    itemCountText: (content) => `${content.products?.length || 5} Product Cards`,
    getThumbnailUrl: (content) => content.products?.[0]?.image?.url || '/images/product-4.png',
    getThumbnailAlt: (content) => content.products?.[0]?.title || 'Product Display',
  },
  {
    id: 'capabilities',
    title: 'Manufacturing Capabilities Frame',
    shortDesc: 'Manage carousel images displayed inside the left frame of the Manufacturing Capabilities section.',
    itemCountText: (content) => `${content.capabilities?.banners?.length || 1} Banners`,
    getThumbnailUrl: (content) => content.capabilities?.banners?.[0]?.desktop?.url || content.capabilities?.mainFineFragrance?.url || '',
    getThumbnailAlt: (content) => content.capabilities?.banners?.[0]?.desktop?.alt || 'Manufacturing Capabilities',
  },
];

interface BannerListEditorProps {
  sectionTitle: string;
  sectionKey: 'hero' | 'about' | 'capabilities';
  banners: BannerItem[];
  recommendedDesktopSpec: string;
  recommendedMobileSpec: string;
  onSaveBanners: (newBanners: BannerItem[]) => Promise<void>;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export function BannerListEditor({
  sectionTitle,
  sectionKey,
  banners,
  recommendedDesktopSpec,
  recommendedMobileSpec,
  onSaveBanners,
  showNotification
}: BannerListEditorProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [uploadingState, setUploadingState] = useState<{ id: string; target: 'desktop' | 'mobile' } | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const formatOrder = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    setDragOverIdx(idx);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIdx) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }

    const updated = [...banners];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(dropIdx, 0, movedItem);

    const reordered = updated.map((item, idx) => ({
      ...item,
      order: idx + 1,
      updatedAt: Date.now()
    }));

    setDraggedIdx(null);
    setDragOverIdx(null);

    try {
      await onSaveBanners(reordered);
      showNotification('success', `${sectionTitle}: Banner order updated.`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save banner order.');
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleAddNewBanner = async () => {
    const newOrder = banners.length + 1;
    const newBanner: BannerItem = {
      id: `${sectionKey}-banner-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      order: newOrder,
      desktop: { url: '', alt: `${sectionTitle} Banner ${newOrder}` },
      mobile: { url: '', alt: `${sectionTitle} Mobile Banner ${newOrder}` },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updated = [...banners, newBanner];
    try {
      await onSaveBanners(updated);
      showNotification('success', `${sectionTitle}: Added Banner ${formatOrder(newOrder)}.`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to add banner.');
    }
  };

  const handleDeleteBanner = async (item: BannerItem) => {
    if (!window.confirm(`Are you sure you want to delete Banner ${formatOrder(item.order)}?`)) {
      return;
    }

    const filtered = banners.filter((b) => b.id !== item.id);
    const reordered = filtered.map((b, idx) => ({
      ...b,
      order: idx + 1,
      updatedAt: Date.now()
    }));

    try {
      await onSaveBanners(reordered);
      showNotification('success', `${sectionTitle}: Banner ${formatOrder(item.order)} deleted.`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete banner.');
    }
  };

  const handleFileChange = async (
    item: BannerItem,
    targetType: 'desktop' | 'mobile',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      return;
    }

    if (file.type && !file.type.startsWith('image/')) {
      showNotification('error', 'Image upload failed: Unsupported file type. Please select a valid image file (JPG, PNG, WebP, etc.).');
      return;
    }

    setUploadingState({ id: item.id, target: targetType });
    try {
      const uploaded = await uploadAdminImage(file);

      const updated = banners.map((b) => {
        if (b.id === item.id) {
          return {
            ...b,
            [targetType]: {
              url: uploaded.url,
              alt: `${sectionTitle} Banner ${formatOrder(b.order)} (${targetType})`,
              updatedAt: Date.now()
            },
            updatedAt: Date.now()
          };
        }
        return b;
      });

      await onSaveBanners(updated);
      showNotification('success', `${sectionTitle}: Banner ${formatOrder(item.order)} ${targetType} image updated.`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to upload image.');
    } finally {
      setUploadingState(null);
      const key = `${item.id}-${targetType}`;
      if (fileInputRefs.current[key]) {
        fileInputRefs.current[key]!.value = '';
      }
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4 w-full">
        {banners.map((item, idx) => {
          const isDragging = draggedIdx === idx;
          const isOver = dragOverIdx === idx;
          const isUploadingDesktop = uploadingState?.id === item.id && uploadingState.target === 'desktop';
          const isUploadingMobile = uploadingState?.id === item.id && uploadingState.target === 'mobile';

          return (
            <div
              key={item.id}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, idx)}
              className={`glass-panel p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative ${
                isDragging
                  ? 'opacity-40 border-dashed border-primary scale-[0.99]'
                  : isOver
                  ? 'border-2 border-primary bg-primary/5 shadow-lg scale-[1.01]'
                  : 'border-white/60 hover:border-primary/40 shadow-[0px_10px_30px_rgba(45,90,97,0.06)] bg-white/30'
              }`}
            >
              {/* Header: Order Number, Drag Handle, Title, Delete Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-headline-md font-extrabold text-base shrink-0 shadow-inner">
                    {formatOrder(idx + 1)}
                  </div>

                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragEnd={handleDragEnd}
                    className="p-2 rounded-lg bg-white/60 hover:bg-primary/10 border border-white/80 cursor-grab active:cursor-grabbing text-primary/70 hover:text-primary transition-all flex flex-col gap-1 items-center justify-center select-none shadow-sm"
                    title="Hold and drag to reorder"
                  >
                    <div className="flex gap-1 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </div>
                    <div className="flex gap-1 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </div>
                  </div>

                  <span className="font-headline-md text-sm font-bold text-primary uppercase tracking-wider">
                    BANNER ITEM {formatOrder(idx + 1)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteBanner(item)}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-500 hover:text-white font-label-sm text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  <span>DELETE BANNER</span>
                </button>
              </div>

              {/* Banner Previews Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Desktop Banner Column */}
                <div className="lg:col-span-7 space-y-3 min-w-0">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
                      CURRENT DESKTOP BANNER
                    </span>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      {recommendedDesktopSpec}
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[`${item.id}-desktop`] = el)}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(item, 'desktop', e)}
                  />

                  <button
                    disabled={isUploadingDesktop}
                    onClick={() => fileInputRefs.current[`${item.id}-desktop`]?.click()}
                    className="w-full py-2.5 px-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-label-sm text-xs uppercase tracking-widest font-bold transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isUploadingDesktop ? 'sync' : 'upload_file'}
                    </span>
                    <span>
                      {isUploadingDesktop
                        ? 'UPLOADING...'
                        : item.desktop.url
                        ? 'CHANGE DESKTOP IMAGE'
                        : 'UPLOAD DESKTOP IMAGE'}
                    </span>
                  </button>

                  <div className="w-full aspect-[1920/650] max-h-[280px] rounded-xl overflow-hidden bg-black/5 border border-white/70 shadow-inner relative flex items-center justify-center">
                    {item.desktop.url ? (
                      <img
                        src={item.desktop.url}
                        alt={item.desktop.alt || `Banner ${formatOrder(idx + 1)} Desktop`}
                        className="w-full h-full object-contain block"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-1">
                          desktop_windows
                        </span>
                        <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
                          No Desktop Image Uploaded
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Banner Column */}
                <div className="lg:col-span-5 space-y-3 min-w-0">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
                      CURRENT MOBILE BANNER
                    </span>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      {recommendedMobileSpec}
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[`${item.id}-mobile`] = el)}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(item, 'mobile', e)}
                  />

                  <button
                    disabled={isUploadingMobile}
                    onClick={() => fileInputRefs.current[`${item.id}-mobile`]?.click()}
                    className="w-full py-2.5 px-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-label-sm text-xs uppercase tracking-widest font-bold transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isUploadingMobile ? 'sync' : 'smartphone'}
                    </span>
                    <span>
                      {isUploadingMobile
                        ? 'UPLOADING...'
                        : item.mobile.url
                        ? 'CHANGE MOBILE IMAGE'
                        : 'UPLOAD MOBILE IMAGE'}
                    </span>
                  </button>

                  <div className="w-full aspect-[535/378] max-h-[280px] rounded-xl overflow-hidden bg-black/5 border border-white/70 shadow-inner relative flex items-center justify-center">
                    {item.mobile.url ? (
                      <img
                        src={item.mobile.url}
                        alt={item.mobile.alt || `Banner ${formatOrder(idx + 1)} Mobile`}
                        className="w-full h-full object-contain block"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-1">
                          smartphone
                        </span>
                        <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
                          No Mobile Image Uploaded
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleAddNewBanner}
          className="w-full py-3.5 px-6 rounded-2xl border-2 border-dashed border-primary/40 bg-white/40 hover:bg-primary/10 hover:border-primary text-primary font-label-sm text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>+ ADD NEW BANNER</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'homepage' | 'video' | 'leads' | 'marketplace'>('homepage');
  const [activeHomepageSection, setActiveHomepageSection] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<'hero' | 'about' | 'products' | 'capabilities' | null>('hero');

  useEffect(() => {
    setActiveHomepageSection(null);
  }, [activeTab]);
  
  // Inquiries CMS state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [inquirySearch, setInquirySearch] = useState('');
  
  // Video tab state (legacy)
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Homepage CMS state
  const [cmsContent, setCmsContent] = useState<HomepageContent>(DEFAULT_HOMEPAGE_CONTENT);
  const [isLoadingCms, setIsLoadingCms] = useState(true);
  
  // Hero CMS editing state
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const [heroNewFile, setHeroNewFile] = useState<File | null>(null);
  const [heroNewPreview, setHeroNewPreview] = useState<string | null>(null);
  const [isPublishingHero, setIsPublishingHero] = useState(false);

  // Mobile Hero CMS editing state
  const mobileHeroFileInputRef = useRef<HTMLInputElement>(null);
  const [mobileHeroNewFile, setMobileHeroNewFile] = useState<File | null>(null);
  const [mobileHeroNewPreview, setMobileHeroNewPreview] = useState<string | null>(null);
  const [isPublishingMobileHero, setIsPublishingMobileHero] = useState(false);

  // About Us Desktop Banner CMS editing state
  const aboutBannerFileInputRef = useRef<HTMLInputElement>(null);
  const [aboutBannerNewFile, setAboutBannerNewFile] = useState<File | null>(null);
  const [aboutBannerNewPreview, setAboutBannerNewPreview] = useState<string | null>(null);
  const [isPublishingAboutBanner, setIsPublishingAboutBanner] = useState(false);

  // About Us Mobile Banner CMS editing state
  const aboutMobileBannerFileInputRef = useRef<HTMLInputElement>(null);
  const [aboutMobileBannerNewFile, setAboutMobileBannerNewFile] = useState<File | null>(null);
  const [aboutMobileBannerNewPreview, setAboutMobileBannerNewPreview] = useState<string | null>(null);
  const [isPublishingAboutMobileBanner, setIsPublishingAboutMobileBanner] = useState(false);

  // Products CMS editing state
  const productFileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [productNewFiles, setProductNewFiles] = useState<{ [key: string]: File | null }>({});
  const [productNewPreviews, setProductNewPreviews] = useState<{ [key: string]: string | null }>({});
  const [productTitleInputs, setProductTitleInputs] = useState<{ [key: string]: string }>({});
  const [publishingProductId, setPublishingProductId] = useState<string | null>(null);

  // Capabilities CMS editing state
  const capabilityFileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [capabilityNewFiles, setCapabilityNewFiles] = useState<{ [key: string]: File | null }>({});
  const [capabilityNewPreviews, setCapabilityNewPreviews] = useState<{ [key: string]: string | null }>({});
  const [publishingCapabilityId, setPublishingCapabilityId] = useState<string | null>(null);

  // Feedback notifications
  const [statusNotification, setStatusNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch published CMS content and inquiries on mount
  useEffect(() => {
    loadHomepageContent();
    loadInquiries();

    let channel: any = null;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel('public:homepage_content_admin')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'homepage_content' },
          () => {
            loadHomepageContent(false);
          }
        )
        .subscribe();
    }

    const handleFocus = () => {
      loadHomepageContent(false);
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const loadHomepageContent = async (showLoadingSpinner = true) => {
    if (showLoadingSpinner) setIsLoadingCms(true);
    try {
      const data = await getPublishedHomepageContent();
      setCmsContent(data);
      
      // Sync initial title inputs if not already dirty
      if (Array.isArray(data.products)) {
        const initialTitles: { [key: string]: string } = {};
        data.products.forEach(p => {
          initialTitles[p.id] = p.title;
        });
        setProductTitleInputs(prev => {
          // Keep active un-saved edits, but populate missing ones
          const merged = { ...initialTitles, ...prev };
          return merged;
        });
      }
    } catch (err) {
      console.error('Failed to load published homepage content:', err);
    } finally {
      if (showLoadingSpinner) setIsLoadingCms(false);
    }
  };

  const loadInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const data = await fetchInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const handleStatusChange = async (inquiryId: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      const updated = await updateInquiryStatus(inquiryId, newStatus);
      setInquiries(prev => prev.map(i => i.id === inquiryId ? updated : i));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(updated);
      }
      showNotification('success', `Inquiry status updated to ${newStatus.toUpperCase()}`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status.');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setStatusNotification({ type, message });
    setTimeout(() => {
      setStatusNotification(null);
    }, 6000);
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/admin/login');
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('Video upload is disabled until new backend service is configured (TEMPORARY — BACKEND NOT IMPLEMENTED).');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveVideo = async () => {
    setVideoUrl(null);
  };

  // --- HERO BANNER WORKFLOW ---
  const handleHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showNotification('error', 'Image upload failed: Unsupported file format. Only JPG, PNG, and WebP images are allowed.');
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';
      return;
    }

    setHeroNewFile(file);
    const objectUrl = URL.createObjectURL(file);
    setHeroNewPreview(objectUrl);
  };

  const handleCancelHeroChange = () => {
    setHeroNewFile(null);
    if (heroNewPreview) {
      URL.revokeObjectURL(heroNewPreview);
      setHeroNewPreview(null);
    }
    if (heroFileInputRef.current) heroFileInputRef.current.value = '';
  };

  const handlePublishHero = async () => {
    if (!heroNewFile) return;

    setIsPublishingHero(true);
    try {
      // 1. Upload image to persistent storage
      const uploaded = await uploadAdminImage(heroNewFile);
      
      // 2. Construct updated content record
      const updatedContent: HomepageContent = {
        ...cmsContent,
        hero: {
          image: {
            url: uploaded.url,
            alt: 'Parallax fragrance manufacturing banner',
            updatedAt: Date.now()
          }
        }
      };

      // 3. Atomically persist content JSON record
      await savePublishedHomepageContent(updatedContent);

      // 4. Update local admin UI state
      setCmsContent(updatedContent);
      handleCancelHeroChange();
      showNotification('success', 'Homepage banner updated successfully.');
    } catch (err: any) {
      console.error('Hero publishing error:', err);
      showNotification('error', err.message || 'Image upload failed. Your current image has not been changed.');
    } finally {
      setIsPublishingHero(false);
    }
  };

  // --- MOBILE HERO BANNER WORKFLOW ---
  const handleMobileHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      if (mobileHeroFileInputRef.current) mobileHeroFileInputRef.current.value = '';
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showNotification('error', 'Image upload failed: Unsupported file format. Only JPG, PNG, and WebP images are allowed.');
      if (mobileHeroFileInputRef.current) mobileHeroFileInputRef.current.value = '';
      return;
    }

    setMobileHeroNewFile(file);
    const objectUrl = URL.createObjectURL(file);
    setMobileHeroNewPreview(objectUrl);
  };

  const handleCancelMobileHeroChange = () => {
    setMobileHeroNewFile(null);
    if (mobileHeroNewPreview) {
      URL.revokeObjectURL(mobileHeroNewPreview);
      setMobileHeroNewPreview(null);
    }
    if (mobileHeroFileInputRef.current) mobileHeroFileInputRef.current.value = '';
  };

  const handlePublishMobileHero = async () => {
    if (!mobileHeroNewFile) return;

    setIsPublishingMobileHero(true);
    try {
      const uploaded = await uploadAdminImage(mobileHeroNewFile);
      
      const updatedContent: HomepageContent = {
        ...cmsContent,
        mobileHero: {
          image: {
            url: uploaded.url,
            alt: 'Parallax fragrance manufacturing mobile banner (535x378)',
            updatedAt: Date.now()
          }
        }
      };

      await savePublishedHomepageContent(updatedContent);

      setCmsContent(updatedContent);
      handleCancelMobileHeroChange();
      showNotification('success', 'Mobile homepage banner updated successfully.');
    } catch (err: any) {
      console.error('Mobile Hero publishing error:', err);
      showNotification('error', err.message || 'Image upload failed. Your current mobile banner image has not been changed.');
    } finally {
      setIsPublishingMobileHero(false);
    }
  };

  // --- ABOUT US DESKTOP BANNER WORKFLOW ---
  const handleAboutBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      if (aboutBannerFileInputRef.current) aboutBannerFileInputRef.current.value = '';
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showNotification('error', 'Image upload failed: Unsupported file format. Only JPG, PNG, and WebP images are allowed.');
      if (aboutBannerFileInputRef.current) aboutBannerFileInputRef.current.value = '';
      return;
    }

    setAboutBannerNewFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAboutBannerNewPreview(objectUrl);
  };

  const handleCancelAboutBannerChange = () => {
    setAboutBannerNewFile(null);
    if (aboutBannerNewPreview) {
      URL.revokeObjectURL(aboutBannerNewPreview);
      setAboutBannerNewPreview(null);
    }
    if (aboutBannerFileInputRef.current) aboutBannerFileInputRef.current.value = '';
  };

  const handlePublishAboutBanner = async () => {
    if (!aboutBannerNewFile) return;

    setIsPublishingAboutBanner(true);
    try {
      const uploaded = await uploadAdminImage(aboutBannerNewFile);
      
      const updatedContent: HomepageContent = {
        ...cmsContent,
        aboutBanner: {
          image: {
            url: uploaded.url,
            alt: 'Parallax About Us Banner (Desktop)',
            updatedAt: Date.now()
          }
        }
      };

      await savePublishedHomepageContent(updatedContent);

      setCmsContent(updatedContent);
      handleCancelAboutBannerChange();
      showNotification('success', 'About Us desktop banner updated successfully.');
    } catch (err: any) {
      console.error('About Banner publishing error:', err);
      showNotification('error', err.message || 'Image upload failed.');
    } finally {
      setIsPublishingAboutBanner(false);
    }
  };

  // --- ABOUT US MOBILE BANNER WORKFLOW ---
  const handleAboutMobileBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      if (aboutMobileBannerFileInputRef.current) aboutMobileBannerFileInputRef.current.value = '';
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showNotification('error', 'Image upload failed: Unsupported file format. Only JPG, PNG, and WebP images are allowed.');
      if (aboutMobileBannerFileInputRef.current) aboutMobileBannerFileInputRef.current.value = '';
      return;
    }

    setAboutMobileBannerNewFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAboutMobileBannerNewPreview(objectUrl);
  };

  const handleCancelAboutMobileBannerChange = () => {
    setAboutMobileBannerNewFile(null);
    if (aboutMobileBannerNewPreview) {
      URL.revokeObjectURL(aboutMobileBannerNewPreview);
      setAboutMobileBannerNewPreview(null);
    }
    if (aboutMobileBannerFileInputRef.current) aboutMobileBannerFileInputRef.current.value = '';
  };

  const handlePublishAboutMobileBanner = async () => {
    if (!aboutMobileBannerNewFile) return;

    setIsPublishingAboutMobileBanner(true);
    try {
      const uploaded = await uploadAdminImage(aboutMobileBannerNewFile);
      
      const updatedContent: HomepageContent = {
        ...cmsContent,
        aboutMobileBanner: {
          image: {
            url: uploaded.url,
            alt: 'Parallax About Us Banner (Mobile)',
            updatedAt: Date.now()
          }
        }
      };

      await savePublishedHomepageContent(updatedContent);

      setCmsContent(updatedContent);
      handleCancelAboutMobileBannerChange();
      showNotification('success', 'About Us mobile banner updated successfully.');
    } catch (err: any) {
      console.error('About Mobile Banner publishing error:', err);
      showNotification('error', err.message || 'Image upload failed.');
    } finally {
      setIsPublishingAboutMobileBanner(false);
    }
  };

  // --- PRODUCT DISPLAY WORKFLOW ---
  const handleProductFileSelect = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      if (productFileRefs.current[productId]) productFileRefs.current[productId]!.value = '';
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showNotification('error', 'Image upload failed: Unsupported file format. Only JPG, PNG, and WebP images are allowed.');
      if (productFileRefs.current[productId]) productFileRefs.current[productId]!.value = '';
      return;
    }

    setProductNewFiles(prev => ({ ...prev, [productId]: file }));
    const objectUrl = URL.createObjectURL(file);
    setProductNewPreviews(prev => ({ ...prev, [productId]: objectUrl }));
  };

  const handleCancelProductChange = (productId: string) => {
    setProductNewFiles(prev => ({ ...prev, [productId]: null }));
    if (productNewPreviews[productId]) {
      URL.revokeObjectURL(productNewPreviews[productId]!);
      setProductNewPreviews(prev => ({ ...prev, [productId]: null }));
    }
    if (productFileRefs.current[productId]) productFileRefs.current[productId]!.value = '';
  };

  const handleSaveProductCard = async (productId: string) => {
    const targetProduct = cmsContent.products.find(p => p.id === productId);
    if (!targetProduct) return;

    const file = productNewFiles[productId];
    const newTitleInput = productTitleInputs[productId];
    const updatedTitle = (newTitleInput !== undefined ? newTitleInput : targetProduct.title).trim();

    if (!updatedTitle) {
      showNotification('error', 'Product title cannot be empty.');
      return;
    }

    setPublishingProductId(productId);
    try {
      let imageUrl = targetProduct.image.url;

      // 1. Upload new image if a file was selected from local disk
      if (file) {
        const folderPath = `homepage/products/${productId}`;
        const uploaded = await uploadAdminImage(file, folderPath);
        imageUrl = uploaded.url;
      }

      // 2. Construct updated products array preserving order and updating target product
      const updatedProducts = cmsContent.products.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            title: updatedTitle,
            image: {
              url: imageUrl,
              alt: updatedTitle,
              updatedAt: Date.now()
            }
          };
        }
        return p;
      });

      const updatedContent: HomepageContent = {
        ...cmsContent,
        products: updatedProducts
      };

      // 3. Atomically save & persist to Supabase database
      await savePublishedHomepageContent(updatedContent);

      // 4. Update local state and clear temporary preview/file state
      setCmsContent(updatedContent);
      setProductTitleInputs(prev => ({ ...prev, [productId]: updatedTitle }));
      handleCancelProductChange(productId);

      if (file && newTitleInput !== undefined && newTitleInput.trim() !== targetProduct.title) {
        showNotification('success', `Product "${updatedTitle}" name and image updated successfully.`);
      } else if (file) {
        showNotification('success', `Product image for "${updatedTitle}" updated successfully.`);
      } else {
        showNotification('success', `Product name "${updatedTitle}" updated successfully.`);
      }
    } catch (err: any) {
      console.error('Product save error:', err);
      showNotification('error', err.message || 'Could not publish changes for this product card.');
    } finally {
      setPublishingProductId(null);
    }
  };

  // --- MANUFACTURING CAPABILITIES WORKFLOW ---
  const handleCapabilityFileSelect = (capId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Image upload failed: File size exceeds 10MB limit.');
      if (capabilityFileRefs.current[capId]) capabilityFileRefs.current[capId]!.value = '';
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showNotification('error', 'Image upload failed: Unsupported file format. Only JPG, PNG, and WebP images are allowed.');
      if (capabilityFileRefs.current[capId]) capabilityFileRefs.current[capId]!.value = '';
      return;
    }

    setCapabilityNewFiles(prev => ({ ...prev, [capId]: file }));
    const objectUrl = URL.createObjectURL(file);
    setCapabilityNewPreviews(prev => ({ ...prev, [capId]: objectUrl }));
  };

  const handleCancelCapabilityChange = (capId: string) => {
    setCapabilityNewFiles(prev => ({ ...prev, [capId]: null }));
    if (capabilityNewPreviews[capId]) {
      URL.revokeObjectURL(capabilityNewPreviews[capId]!);
      setCapabilityNewPreviews(prev => ({ ...prev, [capId]: null }));
    }
    if (capabilityFileRefs.current[capId]) capabilityFileRefs.current[capId]!.value = '';
  };

  const handlePublishCapability = async (capId: string, itemTitle: string) => {
    const file = capabilityNewFiles[capId];
    if (!file) return;

    setPublishingCapabilityId(capId);
    try {
      const uploaded = await uploadAdminImage(file);

      let updatedCapabilities = cmsContent.capabilities || DEFAULT_HOMEPAGE_CONTENT.capabilities!;

      if (capId === 'mainFineFragrance') {
        updatedCapabilities = {
          ...updatedCapabilities,
          mainFineFragrance: {
            url: uploaded.url,
            alt: 'Main Fine Fragrance',
            updatedAt: Date.now()
          }
        };
      } else {
        const updatedItems = updatedCapabilities.items.map(item => {
          if (item.id === capId) {
            return {
              ...item,
              image: {
                url: uploaded.url,
                alt: item.title,
                updatedAt: Date.now()
              }
            };
          }
          return item;
        });

        updatedCapabilities = {
          ...updatedCapabilities,
          items: updatedItems
        };
      }

      const updatedContent: HomepageContent = {
        ...cmsContent,
        capabilities: updatedCapabilities
      };

      await savePublishedHomepageContent(updatedContent);

      setCmsContent(updatedContent);
      handleCancelCapabilityChange(capId);
      showNotification('success', `${itemTitle} image updated successfully.`);
    } catch (err: any) {
      console.error('Capability image publishing error:', err);
      showNotification('error', err.message || 'Could not publish this change. The current homepage image remains unchanged.');
    } finally {
      setPublishingCapabilityId(null);
    }
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1" style={{ width: '400px', height: '400px', top: '10%' }}></div>
        <div className="ambient-blob blob-2" style={{ width: '500px', height: '500px', bottom: '10%', right: '-100px' }}></div>
      </div>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax OEM</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1 bg-white/60 px-3 py-1.5 rounded-lg border border-white/80"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span> View Homepage
            </a>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/marketplace">Marketplace</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/admin/login';
              }}
              className="font-label-sm text-[10px] uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-3 py-1.5 rounded-lg transition-all duration-300 active:scale-95 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">logout</span>
              Sign Out
            </button>
            <div className="text-primary bg-white/40 shadow-inner p-2 rounded-full flex items-center justify-center h-9 w-9">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-28 pb-24 w-full px-4 sm:px-6 lg:px-8">
        
        {/* Status Notification Toast */}
        {statusNotification && (
          <div className={`mb-6 p-4 rounded-xl shadow-lg border flex items-center gap-3 transition-all ${
            statusNotification.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}>
            <span className="material-symbols-outlined text-2xl">
              {statusNotification.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="font-body-md text-sm font-semibold">{statusNotification.message}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          {/* Admin Sidebar - Anchored to Far Left */}
          <aside className="w-full lg:w-64 xl:w-72 lg:shrink-0">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl text-center sticky top-28 border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed flex items-center justify-center text-primary font-headline-md text-headline-md mb-4 shadow-inner border border-white/50">
                A
              </div>
              <h1 className="font-headline-md text-xl sm:text-2xl text-primary mb-1 font-bold">Admin Portal</h1>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm mb-6 sm:mb-8">System Access</p>
              
              <nav className="flex flex-col gap-2 text-left">
                <button onClick={() => setActiveTab('homepage')} className={`font-label-sm text-xs sm:text-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'homepage' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined text-lg">tune</span> Homepage Content
                </button>
                <button onClick={() => setActiveTab('overview')} className={`font-label-sm text-xs sm:text-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'overview' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined text-lg">dashboard</span> Overview
                </button>
                <button onClick={() => setActiveTab('video')} className={`font-label-sm text-xs sm:text-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'video' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined text-lg">movie</span> Hero Video
                </button>
                <button onClick={() => { setActiveTab('leads'); loadInquiries(); }} className={`font-label-sm text-xs sm:text-sm uppercase tracking-widest p-3 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${activeTab === 'leads' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-secondary">inbox</span>
                    <span>Inquiries</span>
                  </div>
                  {newInquiriesCount > 0 && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {newInquiriesCount}
                    </span>
                  )}
                </button>
                <button onClick={() => setActiveTab('marketplace')} className={`font-label-sm text-xs sm:text-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'marketplace' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined text-lg">science</span> Marketplace
                </button>
                <button onClick={handleSignOut} className="font-label-sm text-xs sm:text-sm uppercase tracking-widest p-3 rounded-lg text-error hover:bg-error/10 transition-colors flex items-center gap-3 mt-6 sm:mt-8 cursor-pointer">
                  <span className="material-symbols-outlined text-lg text-outline">logout</span> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area - Full Remaining Horizontal Space */}
          <div className="flex-1 min-w-0 w-full space-y-8">
            
            {/* HOMEPAGE CONTENT SECTION */}
            {activeTab === 'homepage' && (
              <div className="space-y-6 w-full">
                {isLoadingCms ? (
                  <div className="glass-panel p-12 rounded-2xl text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant text-sm font-label-sm uppercase tracking-widest">Loading Published Content...</p>
                  </div>
                ) : (
                  <div className="space-y-6 w-full">
                    {/* Header Card */}
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h1 className="font-headline-md text-2xl text-primary font-bold uppercase tracking-wide">HOMEPAGE CONTENT</h1>
                        <p className="font-body-md text-on-surface-variant text-sm mt-1">
                          Manage homepage imagery and content sections using the expandable editor list below.
                        </p>
                      </div>
                      <a 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary text-xs py-2.5 px-4 inline-flex items-center gap-2 self-start sm:self-auto shrink-0 uppercase tracking-wider font-bold"
                      >
                        <span className="material-symbols-outlined text-base">visibility</span> Preview Homepage
                      </a>
                    </div>

                    {/* EXPANDABLE VERTICAL LIST (ACCORDION) */}
                    <div className="space-y-4 w-full">                      {/* 1. HOMEPAGE HERO SECTION */}
                      <div className="glass-panel rounded-2xl border border-white/60 shadow-[0px_10px_30px_rgba(45,90,97,0.06)] overflow-hidden transition-all duration-300">
                        {/* Collapsed/Expanded Row Header */}
                        <div
                          onClick={() => setExpandedSection(prev => prev === 'hero' ? null : 'hero')}
                          className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors bg-white/30"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            {/* SINGLE FIRST / DESKTOP BANNER THUMBNAIL */}
                            <div className="w-28 sm:w-40 aspect-[1920/650] rounded-lg overflow-hidden border border-white/70 bg-black/10 shrink-0 shadow-inner relative flex items-center justify-center">
                              <img 
                                src={cmsContent.hero?.banners?.[0]?.desktop?.url || cmsContent.hero?.image?.url || '/images/hero/hero-banner.png'} 
                                alt="Homepage Hero Desktop Banner Preview" 
                                className="w-full h-full object-contain block bg-black/5"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="font-headline-md text-lg text-primary font-bold tracking-wide">Homepage Hero</h2>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                  {cmsContent.hero?.banners?.length || 1} Banners
                                </span>
                              </div>
                              <p className="font-body-md text-xs text-on-surface-variant mt-1 truncate">
                                Desktop & Mobile main landing hero imagery
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider hidden sm:inline-block">
                              {expandedSection === 'hero' ? 'Collapse' : 'Expand'}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/60 border border-white/80 flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-xl transition-transform duration-300 font-bold">
                                {expandedSection === 'hero' ? 'expand_less' : 'expand_more'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content Body */}
                        {expandedSection === 'hero' && (
                          <div className="p-6 sm:p-8 border-t border-outline-variant/30 space-y-8 bg-white/20 transition-all duration-300">
                            <BannerListEditor
                              sectionTitle="Homepage Hero"
                              sectionKey="hero"
                              banners={cmsContent.hero?.banners || []}
                              recommendedDesktopSpec="RECOMMENDED: 1920 × 650 PX"
                              recommendedMobileSpec="RECOMMENDED: 535 × 378 PX"
                              onSaveBanners={async (newBanners) => {
                                const updatedContent: HomepageContent = {
                                  ...cmsContent,
                                  hero: {
                                    ...cmsContent.hero,
                                    image: newBanners[0]?.desktop || cmsContent.hero.image,
                                    banners: newBanners
                                  },
                                  mobileHero: {
                                    image: newBanners[0]?.mobile || cmsContent.mobileHero?.image || cmsContent.hero.image
                                  }
                                };
                                await savePublishedHomepageContent(updatedContent);
                                setCmsContent(updatedContent);
                              }}
                              showNotification={showNotification}
                            />
                          </div>
                        )}
                      </div>

                      {/* 2. ABOUT US SECTION */}
                      <div className="glass-panel rounded-2xl border border-white/60 shadow-[0px_10px_30px_rgba(45,90,97,0.06)] overflow-hidden transition-all duration-300">
                        {/* Collapsed/Expanded Row Header */}
                        <div
                          onClick={() => setExpandedSection(prev => prev === 'about' ? null : 'about')}
                          className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors bg-white/30"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            {/* SINGLE FIRST / DESKTOP BANNER THUMBNAIL */}
                            <div className="w-28 sm:w-40 aspect-[1920/650] rounded-lg overflow-hidden border border-white/70 bg-black/10 shrink-0 shadow-inner relative flex items-center justify-center">
                              <img 
                                src={cmsContent.aboutBanner?.banners?.[0]?.desktop?.url || cmsContent.aboutBanner?.image?.url || '/images/about-banner-bg.png'} 
                                alt="About Us Desktop Banner Preview" 
                                className="w-full h-full object-contain block bg-black/5"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="font-headline-md text-lg text-primary font-bold tracking-wide">About Us</h2>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                  {cmsContent.aboutBanner?.banners?.length || 1} Banners
                                </span>
                              </div>
                              <p className="font-body-md text-xs text-on-surface-variant mt-1 truncate">
                                Desktop & Mobile background banner imagery for /about page
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider hidden sm:inline-block">
                              {expandedSection === 'about' ? 'Collapse' : 'Expand'}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/60 border border-white/80 flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-xl transition-transform duration-300 font-bold">
                                {expandedSection === 'about' ? 'expand_less' : 'expand_more'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content Body */}
                        {expandedSection === 'about' && (
                          <div className="p-6 sm:p-8 border-t border-outline-variant/30 space-y-8 bg-white/20 transition-all duration-300">
                            <BannerListEditor
                              sectionTitle="About Us"
                              sectionKey="about"
                              banners={cmsContent.aboutBanner?.banners || []}
                              recommendedDesktopSpec="RECOMMENDED: 1900 × 840 PX"
                              recommendedMobileSpec="RECOMMENDED: 535 × 378 PX"
                              onSaveBanners={async (newBanners) => {
                                const updatedContent: HomepageContent = {
                                  ...cmsContent,
                                  aboutBanner: {
                                    ...cmsContent.aboutBanner,
                                    image: newBanners[0]?.desktop || cmsContent.aboutBanner?.image,
                                    banners: newBanners
                                  },
                                  aboutMobileBanner: {
                                    image: newBanners[0]?.mobile || cmsContent.aboutMobileBanner?.image
                                  }
                                };
                                await savePublishedHomepageContent(updatedContent);
                                setCmsContent(updatedContent);
                              }}
                              showNotification={showNotification}
                            />
                          </div>
                        )}
                      </div>

                      {/* 3. PRODUCT DISPLAY SECTION */}
                      <div className="glass-panel rounded-2xl border border-white/60 shadow-[0px_10px_30px_rgba(45,90,97,0.06)] overflow-hidden transition-all duration-300">
                        {/* Collapsed/Expanded Row Header */}
                        <div
                          onClick={() => setExpandedSection(prev => prev === 'products' ? null : 'products')}
                          className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors bg-white/30"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            {/* SINGLE PRODUCT DISPLAY THUMBNAIL */}
                            <div className="w-20 sm:w-28 aspect-[16/10] rounded-lg overflow-hidden border border-white/70 bg-black/10 shrink-0 shadow-inner relative flex items-center justify-center">
                              <img 
                                src={cmsContent.products?.[0]?.image?.url || '/images/product-4.png'} 
                                alt="Product Display Preview" 
                                className="w-full h-full object-contain block bg-black/5"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="font-headline-md text-lg text-primary font-bold tracking-wide">Product Display</h2>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-secondary text-white font-bold">
                                  5 Product Cards
                                </span>
                              </div>
                              <p className="font-body-md text-xs text-on-surface-variant mt-1 truncate">
                                Continuous moving marquee product cards (5 products)
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider hidden sm:inline-block">
                              {expandedSection === 'products' ? 'Collapse' : 'Expand'}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/60 border border-white/80 flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-xl transition-transform duration-300 font-bold">
                                {expandedSection === 'products' ? 'expand_less' : 'expand_more'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content Body */}
                        {expandedSection === 'products' && (
                          <div className="p-6 sm:p-8 border-t border-outline-variant/30 space-y-6 bg-white/20 transition-all duration-300">
                            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                              <div>
                                <h3 className="font-headline-md text-base text-primary font-bold uppercase tracking-wide">
                                  Leading White & Private labelling Manufacturer
                                </h3>
                                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
                                  Continuous Moving Marquee Product Cards (5 Active Cards)
                                </span>
                              </div>
                            </div>

                            <div className="space-y-6">
                              {cmsContent.products.map((product, idx) => {
                                const newPreview = productNewPreviews[product.id];
                                const isPublishing = publishingProductId === product.id;
                                const currentTitleInput = productTitleInputs[product.id] !== undefined ? productTitleInputs[product.id] : product.title;
                                const hasTitleChanged = productTitleInputs[product.id] !== undefined && productTitleInputs[product.id].trim() !== product.title;

                                return (
                                  <div key={product.id} className="bg-white/40 rounded-xl p-5 border border-white/60 shadow-sm transition-all hover:border-white space-y-4">
                                    {/* Card Header */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-outline-variant/20">
                                      <div>
                                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-bold">
                                          PRODUCT 0{idx + 1} · {product.category.toUpperCase()}
                                        </span>
                                        <h4 className="font-headline-md text-base text-primary font-bold truncate max-w-md">
                                          {currentTitleInput}
                                        </h4>
                                      </div>
                                      <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant/70 bg-white/50 px-2.5 py-1 rounded border border-white/60 shrink-0">
                                        ID: {product.id}
                                      </span>
                                    </div>

                                    {/* Editable Product Name Input */}
                                    <div className="max-w-xl">
                                      <label className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1.5 font-bold">
                                        PRODUCT NAME
                                      </label>
                                      <input
                                        type="text"
                                        value={currentTitleInput}
                                        onChange={(e) => setProductTitleInputs(prev => ({ ...prev, [product.id]: e.target.value }))}
                                        className="w-full bg-white/70 border border-white/80 rounded-lg px-3.5 py-2.5 text-primary font-headline-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
                                        placeholder="Enter Product Name"
                                      />
                                    </div>

                                    {/* Product Image Section */}
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start pt-1">
                                      {/* Current Image */}
                                      <div className="min-w-0">
                                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                          CURRENT IMAGE
                                        </span>
                                        <div className="w-full max-w-xs aspect-[16/10] rounded-lg overflow-hidden bg-black/5 border border-white/60 shadow-inner relative flex items-center justify-center">
                                          <img 
                                            src={product.image.url} 
                                            alt={product.title} 
                                            className="w-full h-full object-contain block"
                                          />
                                        </div>
                                      </div>

                                      {/* Update Image / New Preview */}
                                      <div className="min-w-0 space-y-3">
                                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                          {newPreview ? 'NEW IMAGE PREVIEW' : 'UPDATE IMAGE'}
                                        </span>

                                        {newPreview ? (
                                          <div className="space-y-3 max-w-xs">
                                            <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/5 border-2 border-primary shadow-md relative flex items-center justify-center">
                                              <img 
                                                src={newPreview} 
                                                alt={`New ${product.title} Preview`} 
                                                className="w-full h-full object-contain block"
                                              />
                                            </div>
                                            <button
                                              type="button"
                                              disabled={isPublishing}
                                              onClick={() => handleCancelProductChange(product.id)}
                                              className="font-label-sm text-[10px] uppercase tracking-widest text-rose-700 hover:underline font-bold"
                                            >
                                              Cancel Selected Image
                                            </button>
                                          </div>
                                        ) : (
                                          <div>
                                            <input 
                                              type="file" 
                                              ref={el => productFileRefs.current[product.id] = el} 
                                              accept="image/jpeg,image/png,image/webp,image/jpg" 
                                              className="hidden" 
                                              onChange={(e) => handleProductFileSelect(product.id, e)}
                                            />
                                            <button
                                              type="button"
                                              onClick={() => productFileRefs.current[product.id]?.click()}
                                              className="font-label-sm text-xs text-primary uppercase tracking-widest border border-primary px-4 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2 bg-white/60 shadow-sm cursor-pointer active:scale-95"
                                            >
                                              <span className="material-symbols-outlined text-base">photo_camera</span> CHANGE IMAGE
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Action Footer: Save Button */}
                                    <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between flex-wrap gap-3">
                                      <button
                                        type="button"
                                        disabled={isPublishing}
                                        onClick={() => handleSaveProductCard(product.id)}
                                        className="btn-primary py-2.5 px-6 text-xs uppercase tracking-wider font-bold shadow-md active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                                      >
                                        <span className="material-symbols-outlined text-base">
                                          {isPublishing ? 'sync' : 'save'}
                                        </span>
                                        <span>{isPublishing ? 'SAVING...' : 'SAVE CHANGES'}</span>
                                      </button>
                                      {(hasTitleChanged || newPreview) && (
                                        <span className="font-label-sm text-[10px] text-amber-700 uppercase tracking-widest font-bold">
                                          • Unsaved changes pending
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4. MANUFACTURING CAPABILITIES SECTION */}
                      <div className="glass-panel rounded-2xl border border-white/60 shadow-[0px_10px_30px_rgba(45,90,97,0.06)] overflow-hidden transition-all duration-300">
                        {/* Collapsed/Expanded Row Header */}
                        <div
                          onClick={() => setExpandedSection(prev => prev === 'capabilities' ? null : 'capabilities')}
                          className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors bg-white/30"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            {/* THUMBNAIL */}
                            <div className="w-20 sm:w-28 aspect-[4/3] rounded-lg overflow-hidden border border-white/70 bg-black/10 shrink-0 shadow-inner relative flex items-center justify-center">
                              <img 
                                src={cmsContent.capabilities?.banners?.[0]?.desktop?.url || cmsContent.capabilities?.mainFineFragrance?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA"} 
                                alt="Manufacturing Capabilities Preview" 
                                className="w-full h-full object-contain block bg-black/5"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="font-headline-md text-lg text-primary font-bold tracking-wide">Manufacturing Capabilities Frame</h2>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                  {cmsContent.capabilities?.banners?.length || 1} Banners
                                </span>
                              </div>
                              <p className="font-body-md text-xs text-on-surface-variant mt-1 truncate">
                                Left-side image frame carousel in Manufacturing Capabilities section
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider hidden sm:inline-block">
                              {expandedSection === 'capabilities' ? 'Collapse' : 'Expand'}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/60 border border-white/80 flex items-center justify-center text-primary shadow-sm">
                              <span className="material-symbols-outlined text-xl transition-transform duration-300 font-bold">
                                {expandedSection === 'capabilities' ? 'expand_less' : 'expand_more'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content Body */}
                        {expandedSection === 'capabilities' && (
                          <div className="p-6 sm:p-8 border-t border-outline-variant/30 space-y-6 bg-white/20 transition-all duration-300">
                            {/* Frame Resolution Specification Box */}
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                              <div className="flex items-center gap-2 text-primary font-headline-md text-xs font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-base">aspect_ratio</span>
                                <span>Recommended Frame Image Resolution & Specifications</span>
                              </div>
                              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                                • <strong>Desktop Frame Resolution:</strong> 1200 × 900 PX (Aspect Ratio 4:3) or 1600 × 1200 PX (Minimum height: 580px)<br />
                                • <strong>Mobile Frame Resolution:</strong> 535 × 378 PX (Aspect Ratio 535:378)
                              </p>
                            </div>

                            <BannerListEditor
                              sectionTitle="Manufacturing Capabilities Frame"
                              sectionKey="capabilities"
                              banners={cmsContent.capabilities?.banners || []}
                              recommendedDesktopSpec="RECOMMENDED: 1200 × 900 PX"
                              recommendedMobileSpec="RECOMMENDED: 535 × 378 PX"
                              onSaveBanners={async (newBanners) => {
                                const updatedCapabilities = {
                                  ...cmsContent.capabilities,
                                  mainFineFragrance: newBanners[0]?.desktop || cmsContent.capabilities?.mainFineFragrance || DEFAULT_HOMEPAGE_CONTENT.capabilities!.mainFineFragrance,
                                  banners: newBanners,
                                  items: cmsContent.capabilities?.items || DEFAULT_HOMEPAGE_CONTENT.capabilities!.items
                                };
                                const updatedContent: HomepageContent = {
                                  ...cmsContent,
                                  capabilities: updatedCapabilities
                                };
                                await savePublishedHomepageContent(updatedContent);
                                setCmsContent(updatedContent);
                              }}
                              showNotification={showNotification}
                            />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'overview' && (
              <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                   <h2 className="font-headline-md text-headline-md text-primary">Overview</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/30 p-6 rounded-xl border border-white/40 text-center">
                    <span className="block font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Total Inquiries</span>
                    <span className="font-headline-lg text-4xl text-primary">0</span>
                  </div>
                  <div className="bg-white/30 p-6 rounded-xl border border-white/40 text-center">
                    <span className="block font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Sample Requests</span>
                    <span className="font-headline-lg text-4xl text-primary">0</span>
                  </div>
                  <div className="bg-white/30 p-6 rounded-xl border border-white/40 text-center">
                    <span className="block font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Active Products</span>
                    <span className="font-headline-lg text-4xl text-primary">5</span>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'video' && (
              <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                   <h2 className="font-headline-md text-headline-md text-primary">Hero Background Video</h2>
                   <span className={`font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${videoUrl ? 'bg-primary text-white' : 'bg-surface-variant text-on-surface-variant'}`}>
                     {videoUrl ? '● Active' : '● Inactive'}
                   </span>
                </div>
                <div className="space-y-6">
                  <p className="font-body-md text-on-surface-variant text-sm">Background video player is currently disabled in favor of high-resolution hero banners.</p>
                </div>
              </section>
            )}

            {activeTab === 'leads' && (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="font-headline-md text-headline-md text-primary font-bold">INQUIRIES MANAGEMENT</h1>
                      {newInquiriesCount > 0 && (
                        <span className="bg-amber-500/20 text-amber-900 border border-amber-500/30 text-xs font-bold px-3 py-0.5 rounded-full">
                          {newInquiriesCount} NEW
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-on-surface-variant text-sm">
                      Review and manage customer doubts submitted from the Manufacturing Capabilities section.
                    </p>
                  </div>
                  <button
                    onClick={loadInquiries}
                    disabled={isLoadingInquiries}
                    className="font-label-sm text-xs uppercase tracking-widest border border-outline-variant px-4 py-2.5 rounded-xl hover:bg-white/40 transition-colors flex items-center gap-2 text-primary font-semibold shrink-0 cursor-pointer"
                  >
                    <span className={`material-symbols-outlined text-sm ${isLoadingInquiries ? 'animate-spin' : ''}`}>refresh</span>
                    {isLoadingInquiries ? 'Refreshing...' : 'Refresh List'}
                  </button>
                </div>

                {/* Filters and Search Bar */}
                <div className="glass-panel p-4 rounded-2xl border border-white/50 shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  {/* Status Filter Buttons */}
                  <div className="inline-flex p-1 bg-white/40 rounded-xl border border-white/60">
                    {(['all', 'new', 'contacted', 'resolved'] as const).map((filter) => {
                      const count = filter === 'all' 
                        ? inquiries.length 
                        : inquiries.filter(i => i.status === filter).length;

                      return (
                        <button
                          key={filter}
                          onClick={() => setInquiryFilter(filter)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-label-sm uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                            inquiryFilter === filter
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-on-surface-variant hover:text-primary'
                          }`}
                        >
                          {filter} ({count})
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input */}
                  <div className="relative flex-grow max-w-xs">
                    <input
                      type="text"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      placeholder="Search name, email, service..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-body-md focus:outline-none focus:border-primary"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">
                      search
                    </span>
                  </div>
                </div>

                {/* Inquiries Table */}
                <div className="glass-panel rounded-2xl overflow-hidden border border-white/50 shadow-sm">
                  {inquiries.filter(inq => {
                    const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
                    const matchesSearch = !inquirySearch.trim() || 
                      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                      inq.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                      inq.service.toLowerCase().includes(inquirySearch.toLowerCase());
                    return matchesFilter && matchesSearch;
                  }).length === 0 ? (
                    <div className="p-12 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl mb-2 text-primary/40 block">inbox</span>
                      <h3 className="font-headline-md text-lg text-primary font-bold mb-1">No inquiries found</h3>
                      <p className="font-body-md text-xs">
                        {inquirySearch || inquiryFilter !== 'all' 
                          ? 'No inquiries match your current search or filter criteria.' 
                          : 'New customer queries will appear here when submitted.'}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-black/5 border-b border-outline-variant/30 text-[#0e3237]">
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider">NAME</th>
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider">PHONE</th>
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider">EMAIL</th>
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider">DOUBT / SERVICE</th>
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider">STATUS</th>
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider">SUBMITTED</th>
                            <th className="p-4 font-label-sm font-bold uppercase tracking-wider text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {inquiries.filter(inq => {
                            const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
                            const matchesSearch = !inquirySearch.trim() || 
                              inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                              inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                              inq.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                              inq.service.toLowerCase().includes(inquirySearch.toLowerCase());
                            return matchesFilter && matchesSearch;
                          }).map((inq) => (
                            <tr 
                              key={inq.id} 
                              onClick={() => setSelectedInquiry(inq)}
                              className="hover:bg-white/40 transition-colors cursor-pointer"
                            >
                              <td className="p-4 font-semibold text-primary">{inq.name}</td>
                              <td className="p-4 text-on-surface-variant font-mono">{inq.phone}</td>
                              <td className="p-4 text-on-surface-variant">{inq.email}</td>
                              <td className="p-4 font-medium text-primary max-w-[200px] truncate">{inq.service}</td>
                              <td className="p-4">
                                <span className={`inline-block px-2.5 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-wider font-bold border ${
                                  inq.status === 'new'
                                    ? 'bg-amber-500/20 text-amber-900 border-amber-500/40'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-900 border-blue-500/40'
                                    : 'bg-emerald-500/20 text-emerald-900 border-emerald-500/40'
                                }`}>
                                  {inq.status}
                                </span>
                              </td>
                              <td className="p-4 text-on-surface-variant/80 whitespace-nowrap">
                                {new Date(inq.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="px-3 py-1 rounded-lg border border-outline-variant text-[11px] font-semibold text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Inquiry Detail View Modal */}
                {selectedInquiry && (
                  <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedInquiry(null)}
                  >
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-lg bg-[#faf8f5] rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/10 relative text-[#0e3237]"
                    >
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="absolute top-5 right-5 text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                        aria-label="Close detail modal"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>

                      <div className="flex items-center gap-3 mb-6 pr-8">
                        <span className="material-symbols-outlined text-2xl text-secondary">inbox</span>
                        <div>
                          <h2 className="font-headline-md text-xl font-bold text-primary">Inquiry Details</h2>
                          <span className="font-mono text-[11px] text-on-surface-variant">ID: {selectedInquiry.id}</span>
                        </div>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="bg-white/80 p-4 rounded-xl border border-black/5 space-y-3">
                          <div>
                            <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/70 block font-bold">Customer Name</span>
                            <span className="font-body-md text-sm font-bold text-primary">{selectedInquiry.name}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/70 block font-bold">Phone</span>
                              <a href={`tel:${selectedInquiry.phone}`} className="font-mono text-xs font-semibold text-secondary hover:underline">
                                {selectedInquiry.phone}
                              </a>
                            </div>
                            <div>
                              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/70 block font-bold">Email</span>
                              <a href={`mailto:${selectedInquiry.email}`} className="font-body-md text-xs font-semibold text-secondary hover:underline truncate block">
                                {selectedInquiry.email}
                              </a>
                            </div>
                          </div>
                          <div>
                            <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/70 block font-bold">I Have a Doubt In (Capability Service)</span>
                            <span className="font-body-md text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md inline-block mt-1">
                              {selectedInquiry.service}
                            </span>
                          </div>
                          <div>
                            <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/70 block font-bold">Submitted At</span>
                            <span className="font-body-md text-xs text-on-surface-variant">
                              {new Date(selectedInquiry.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Status Selector */}
                        <div className="bg-white/80 p-4 rounded-xl border border-black/5 space-y-2">
                          <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/70 block font-bold">Update Status</span>
                          <div className="flex gap-2 pt-1">
                            {(['new', 'contacted', 'resolved'] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => handleStatusChange(selectedInquiry.id, st)}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-label-sm uppercase tracking-wider font-bold transition-all border cursor-pointer ${
                                  selectedInquiry.status === st
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="px-5 py-2 rounded-full bg-primary text-white font-label-sm text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-all cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'marketplace' && (
              <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                   <h2 className="font-headline-md text-headline-md text-primary">Marketplace Products</h2>
                </div>
                <div className="bg-white/20 rounded-xl p-12 border border-white/30 text-center border-dashed">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">inventory_2</span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">No marketplace products added yet</h3>
                </div>
              </section>
            )}
            
          </div>
        </div>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-white/30 z-10 text-center">
        <div className="font-body-md text-body-md text-on-surface-variant text-sm">
          © 2026 Parallax Perfumery. Administrative Portal.
        </div>
      </footer>
    </div>
  );
}
