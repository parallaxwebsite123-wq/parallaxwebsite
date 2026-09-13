import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
  getPublishedHomepageContent,
  uploadAdminImage,
  savePublishedHomepageContent,
  HomepageContent,
  DEFAULT_HOMEPAGE_CONTENT
} from '../services/homepageContent';
import { fetchInquiries, updateInquiryStatus, Inquiry } from '../services/inquiriesService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'homepage' | 'video' | 'leads' | 'marketplace'>('homepage');
  
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
  }, []);

  const loadHomepageContent = async () => {
    setIsLoadingCms(true);
    try {
      const data = await getPublishedHomepageContent();
      setCmsContent(data);
    } catch (err) {
      console.error('Failed to load published homepage content:', err);
    } finally {
      setIsLoadingCms(false);
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

  const handlePublishProduct = async (productId: string) => {
    const file = productNewFiles[productId];
    if (!file) return;

    setPublishingProductId(productId);
    try {
      // 1. Upload image to persistent storage
      const uploaded = await uploadAdminImage(file);

      // 2. Update target product item in record
      const updatedProducts = cmsContent.products.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            image: {
              url: uploaded.url,
              alt: p.title,
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

      // 3. Persist content JSON record
      await savePublishedHomepageContent(updatedContent);

      // 4. Update local state
      setCmsContent(updatedContent);
      handleCancelProductChange(productId);
      showNotification('success', `Product image for card ${productId.replace('product-', '#')} updated successfully.`);
    } catch (err: any) {
      console.error('Product publishing error:', err);
      showNotification('error', err.message || 'Could not publish this change. The current homepage image remains unchanged.');
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
          <div className="flex gap-4">
            <div className="text-primary bg-white/40 shadow-inner p-2 rounded-full">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Admin Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-2xl text-center sticky top-32 border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed flex items-center justify-center text-primary font-headline-md text-headline-md mb-4 shadow-inner border border-white/50">
                A
              </div>
              <h1 className="font-headline-md text-headline-md text-primary mb-1">Admin Portal</h1>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-8">System Access</p>
              
              <nav className="flex flex-col gap-2 text-left">
                <button onClick={() => setActiveTab('homepage')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'homepage' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined">tune</span> Homepage Content
                </button>
                <button onClick={() => setActiveTab('overview')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined">dashboard</span> Overview
                </button>
                <button onClick={() => setActiveTab('video')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'video' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined">movie</span> Hero Video
                </button>
                <button onClick={() => { setActiveTab('leads'); loadInquiries(); }} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center justify-between transition-colors ${activeTab === 'leads' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">inbox</span>
                    <span>Inquiries</span>
                  </div>
                  {newInquiriesCount > 0 && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {newInquiriesCount}
                    </span>
                  )}
                </button>
                <button onClick={() => setActiveTab('marketplace')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'marketplace' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined">science</span> Marketplace
                </button>
                <button onClick={handleSignOut} className="font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg text-error hover:bg-error/10 transition-colors flex items-center gap-3 mt-8">
                  <span className="material-symbols-outlined text-outline">logout</span> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* HOMEPAGE CONTENT SECTION */}
            {activeTab === 'homepage' && (
              <div className="space-y-8">
                
                {/* Header Card */}
                <div className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)] flex justify-between items-center">
                  <div>
                    <h1 className="font-headline-md text-headline-md text-primary mb-1">HOMEPAGE CONTENT</h1>
                    <p className="font-body-md text-on-surface-variant text-sm">
                      Manage the images displayed on the public homepage.
                    </p>
                  </div>
                  <a 
                    href="/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2.5 px-4 inline-flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">visibility</span> Preview Homepage
                  </a>
                </div>

                {isLoadingCms ? (
                  <div className="glass-panel p-12 rounded-2xl text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant text-sm font-label-sm uppercase tracking-widest">Loading Published Content...</p>
                  </div>
                ) : (
                  <>
                    {/* SECTION 1 — HERO BANNER */}
                    <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                      <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                        <div>
                          <h2 className="font-headline-md text-xl text-primary font-bold uppercase tracking-wide">HERO BANNER</h2>
                          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Public Landing Page Main Visual (1920x650 Frame)</span>
                        </div>
                        <span className="font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-white">
                          ● Published
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Current Image */}
                        <div className="space-y-3">
                          <span className="font-label-sm text-xs text-primary uppercase tracking-widest block font-bold">
                            Current Published Image
                          </span>
                          <div className="aspect-[1920/650] w-full rounded-xl overflow-hidden bg-black/10 border border-white/40 shadow-sm relative group">
                            <img 
                              src={cmsContent.hero.image.url} 
                              alt="Current Hero Banner" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-on-surface-variant font-mono truncate bg-white/40 p-2 rounded border border-white/50">
                            {cmsContent.hero.image.url}
                          </p>
                        </div>

                        {/* New Image Selection / Preview */}
                        <div className="space-y-3 flex flex-col">
                          <span className="font-label-sm text-xs text-primary uppercase tracking-widest block font-bold">
                            New Image Selection
                          </span>
                          {heroNewPreview ? (
                            <div className="space-y-3 flex-grow flex flex-col">
                              <div className="aspect-[1920/650] w-full rounded-xl overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                <img 
                                  src={heroNewPreview} 
                                  alt="New Hero Banner Preview" 
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-label-sm uppercase tracking-widest px-2 py-0.5 rounded shadow">
                                  New Preview
                                </span>
                              </div>
                              <div className="flex gap-3 pt-2 mt-auto">
                                <button
                                  disabled={isPublishingHero}
                                  onClick={handlePublishHero}
                                  className="flex-1 btn-primary py-2.5 px-4 text-sm disabled:opacity-50"
                                >
                                  {isPublishingHero ? 'Publishing...' : 'Save & Publish Banner'}
                                </button>
                                <button
                                  disabled={isPublishingHero}
                                  onClick={handleCancelHeroChange}
                                  className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-grow border-2 border-dashed border-white/60 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/20 hover:bg-white/30 transition-colors">
                              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">add_photo_alternate</span>
                              <p className="font-body-md text-sm text-primary font-semibold mb-1">Upload New Hero Banner</p>
                              <p className="font-body-md text-xs text-on-surface-variant mb-4">JPG, PNG, or WebP up to 10MB</p>
                              <input 
                                type="file" 
                                ref={heroFileInputRef} 
                                accept="image/jpeg,image/png,image/webp" 
                                className="hidden" 
                                onChange={handleHeroFileSelect}
                              />
                              <button
                                onClick={() => heroFileInputRef.current?.click()}
                                className="font-label-sm text-xs text-primary uppercase tracking-widest border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                              >
                                Change Image
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* SECTION 1B — MOBILE HOMEPAGE BANNER (535x378) */}
                    <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                      <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                        <div>
                          <h2 className="font-headline-md text-xl text-primary font-bold uppercase tracking-wide">MOBILE HOMEPAGE BANNER</h2>
                          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Aspect Ratio 535x378 (Mobile Viewport)</span>
                        </div>
                        <span className="font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-white">
                          Mobile View
                        </span>
                      </div>

                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          {/* Current Mobile Image */}
                          <div className="w-full md:w-1/2">
                            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                              Current Mobile Banner
                            </span>
                            <div className="aspect-[535/378] w-full rounded-xl overflow-hidden bg-black/10 border border-white/60 shadow-sm relative">
                              <img 
                                src={cmsContent.mobileHero?.image?.url || cmsContent.hero.image.url} 
                                alt={cmsContent.mobileHero?.image?.alt || cmsContent.hero.image.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Update / New Mobile Image Preview */}
                          <div className="w-full md:w-1/2">
                            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                              {mobileHeroNewPreview ? 'New Mobile Banner Preview' : 'Update Mobile Banner'}
                            </span>

                            {mobileHeroNewPreview ? (
                              <div className="space-y-4">
                                <div className="aspect-[535/378] w-full rounded-xl overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                  <img 
                                    src={mobileHeroNewPreview} 
                                    alt="New Mobile Banner Preview" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex gap-3">
                                  <button
                                    disabled={isPublishingMobileHero}
                                    onClick={handlePublishMobileHero}
                                    className="flex-1 btn-primary py-2.5 px-4 text-xs uppercase tracking-wider disabled:opacity-50"
                                  >
                                    {isPublishingMobileHero ? 'Publishing...' : 'Save Mobile Banner'}
                                  </button>
                                  <button
                                    disabled={isPublishingMobileHero}
                                    onClick={handleCancelMobileHeroChange}
                                    className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full min-h-[180px] border-2 border-dashed border-white/60 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/20 hover:bg-white/30 transition-colors">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">phone_iphone</span>
                                <p className="font-body-md text-sm text-primary font-semibold mb-1">Upload New Mobile Banner (535x378)</p>
                                <p className="font-body-md text-xs text-on-surface-variant mb-4">JPG, PNG, or WebP up to 10MB</p>
                                <input 
                                  type="file" 
                                  ref={mobileHeroFileInputRef} 
                                  accept="image/jpeg,image/png,image/webp" 
                                  className="hidden" 
                                  onChange={handleMobileHeroFileSelect}
                                />
                                <button
                                  onClick={() => mobileHeroFileInputRef.current?.click()}
                                  className="font-label-sm text-xs text-primary uppercase tracking-widest border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                                >
                                  Change Mobile Image
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* SECTION 1C — ABOUT US PAGE BANNERS (DESKTOP & MOBILE) */}
                    <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                      <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                        <div>
                          <h2 className="font-headline-md text-xl text-primary font-bold uppercase tracking-wide">ABOUT US PAGE BANNERS</h2>
                          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Desktop & Mobile Banner Images for /about Page</span>
                        </div>
                        <span className="font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-white">
                          About Page
                        </span>
                      </div>

                      <div className="space-y-8">
                        {/* 1. Desktop Banner */}
                        <div className="border-b border-outline-variant/30 pb-6">
                          <span className="font-label-sm text-xs text-primary uppercase tracking-widest block font-bold mb-4">
                            Desktop About Us Banner Image
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Image */}
                            <div>
                              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                Current Desktop Banner
                              </span>
                              <div className="aspect-[1920/650] w-full rounded-xl overflow-hidden bg-black/10 border border-white/60 shadow-sm relative">
                                <img 
                                  src={cmsContent.aboutBanner?.image?.url || '/images/about-banner-bg.png'} 
                                  alt="Current About Desktop Banner" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            {/* New Image Selection / Preview */}
                            <div>
                              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                {aboutBannerNewPreview ? 'New Preview' : 'Update Desktop Banner'}
                              </span>

                              {aboutBannerNewPreview ? (
                                <div className="space-y-3">
                                  <div className="aspect-[1920/650] w-full rounded-xl overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                    <img 
                                      src={aboutBannerNewPreview} 
                                      alt="New About Desktop Preview" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex gap-3">
                                    <button
                                      disabled={isPublishingAboutBanner}
                                      onClick={handlePublishAboutBanner}
                                      className="flex-1 btn-primary py-2.5 px-4 text-xs uppercase tracking-wider disabled:opacity-50"
                                    >
                                      {isPublishingAboutBanner ? 'Publishing...' : 'Save Desktop Banner'}
                                    </button>
                                    <button
                                      disabled={isPublishingAboutBanner}
                                      onClick={handleCancelAboutBannerChange}
                                      className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full min-h-[160px] border-2 border-dashed border-white/60 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white/20 hover:bg-white/30 transition-colors">
                                  <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">desktop_windows</span>
                                  <p className="font-body-md text-xs text-primary font-semibold mb-1">Upload New Desktop Banner</p>
                                  <input 
                                    type="file" 
                                    ref={aboutBannerFileInputRef} 
                                    accept="image/jpeg,image/png,image/webp" 
                                    className="hidden" 
                                    onChange={handleAboutBannerFileSelect}
                                  />
                                  <button
                                    onClick={() => aboutBannerFileInputRef.current?.click()}
                                    className="font-label-sm text-[11px] text-primary uppercase tracking-widest border border-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors mt-2"
                                  >
                                    Change Desktop Image
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 2. Mobile Banner */}
                        <div>
                          <span className="font-label-sm text-xs text-primary uppercase tracking-widest block font-bold mb-4">
                            Mobile About Us Banner Image
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Mobile Image */}
                            <div>
                              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                Current Mobile Banner
                              </span>
                              <div className="aspect-[535/378] w-full rounded-xl overflow-hidden bg-black/10 border border-white/60 shadow-sm relative">
                                <img 
                                  src={cmsContent.aboutMobileBanner?.image?.url || cmsContent.aboutBanner?.image?.url || '/images/about-banner-bg.png'} 
                                  alt="Current About Mobile Banner" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            {/* New Image Selection / Preview */}
                            <div>
                              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                {aboutMobileBannerNewPreview ? 'New Preview' : 'Update Mobile Banner'}
                              </span>

                              {aboutMobileBannerNewPreview ? (
                                <div className="space-y-3">
                                  <div className="aspect-[535/378] w-full rounded-xl overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                    <img 
                                      src={aboutMobileBannerNewPreview} 
                                      alt="New About Mobile Preview" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex gap-3">
                                    <button
                                      disabled={isPublishingAboutMobileBanner}
                                      onClick={handlePublishAboutMobileBanner}
                                      className="flex-1 btn-primary py-2.5 px-4 text-xs uppercase tracking-wider disabled:opacity-50"
                                    >
                                      {isPublishingAboutMobileBanner ? 'Publishing...' : 'Save Mobile Banner'}
                                    </button>
                                    <button
                                      disabled={isPublishingAboutMobileBanner}
                                      onClick={handleCancelAboutMobileBannerChange}
                                      className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full min-h-[160px] border-2 border-dashed border-white/60 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white/20 hover:bg-white/30 transition-colors">
                                  <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">smartphone</span>
                                  <p className="font-body-md text-xs text-primary font-semibold mb-1">Upload New Mobile Banner</p>
                                  <input 
                                    type="file" 
                                    ref={aboutMobileBannerFileInputRef} 
                                    accept="image/jpeg,image/png,image/webp" 
                                    className="hidden" 
                                    onChange={handleAboutMobileBannerFileSelect}
                                  />
                                  <button
                                    onClick={() => aboutMobileBannerFileInputRef.current?.click()}
                                    className="font-label-sm text-[11px] text-primary uppercase tracking-widest border border-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors mt-2"
                                  >
                                    Change Mobile Image
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* SECTION 2 — PRODUCT DISPLAY */}
                    <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                      <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                        <div>
                          <h2 className="font-headline-md text-xl text-primary font-bold uppercase tracking-wide">PRODUCT DISPLAY</h2>
                          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Continuous Marquee Cards (5 Products)</span>
                        </div>
                        <span className="font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-white">
                          5 Active Cards
                        </span>
                      </div>

                      <div className="space-y-6">
                        {cmsContent.products.map((product, idx) => {
                          const newPreview = productNewPreviews[product.id];
                          const newFile = productNewFiles[product.id];
                          const isPublishing = publishingProductId === product.id;

                          return (
                            <div key={product.id} className="bg-white/30 rounded-xl p-6 border border-white/50 shadow-sm transition-all hover:border-white/80">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-outline-variant/30">
                                <div>
                                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-bold">
                                    PRODUCT 0{idx + 1} • {product.category}
                                  </span>
                                  <h3 className="font-headline-md text-lg text-primary font-bold">{product.title}</h3>
                                </div>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant/70 bg-white/40 px-2.5 py-1 rounded border border-white/60">
                                  ID: {product.id}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                {/* Current Image */}
                                <div>
                                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                    Current Image
                                  </span>
                                  <div className="aspect-[16/10] w-full max-w-sm rounded-lg overflow-hidden bg-black/10 border border-white/40 shadow-sm relative">
                                    <img 
                                      src={product.image.url} 
                                      alt={product.title} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>

                                {/* Change / New Image */}
                                <div>
                                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                    {newPreview ? 'New Image Preview' : 'Update Image'}
                                  </span>

                                  {newPreview ? (
                                    <div className="space-y-3 max-w-sm">
                                      <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                        <img 
                                          src={newPreview} 
                                          alt={`New ${product.title} Preview`} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          disabled={isPublishing}
                                          onClick={() => handlePublishProduct(product.id)}
                                          className="flex-1 btn-primary py-2 px-3 text-xs uppercase tracking-wider disabled:opacity-50"
                                        >
                                          {isPublishing ? 'Publishing...' : 'Save Product Image'}
                                        </button>
                                        <button
                                          disabled={isPublishing}
                                          onClick={() => handleCancelProductChange(product.id)}
                                          className="px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      <input 
                                        type="file" 
                                        ref={el => productFileRefs.current[product.id] = el} 
                                        accept="image/jpeg,image/png,image/webp" 
                                        className="hidden" 
                                        onChange={(e) => handleProductFileSelect(product.id, e)}
                                      />
                                      <button
                                        onClick={() => productFileRefs.current[product.id]?.click()}
                                        className="font-label-sm text-xs text-primary uppercase tracking-widest border border-primary px-4 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2 bg-white/40"
                                      >
                                        <span className="material-symbols-outlined text-base">photo_camera</span> Change Image
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* SECTION 3 — MANUFACTURING CAPABILITIES */}
                    <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                      <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                        <div>
                          <h2 className="font-headline-md text-xl text-primary font-bold uppercase tracking-wide">MANUFACTURING CAPABILITIES</h2>
                          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Manage the images displayed when visitors explore manufacturing capabilities.</span>
                        </div>
                        <span className="font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-white">
                          7 Managed Images
                        </span>
                      </div>

                      <div className="space-y-6">
                        {/* Main Fine Fragrance Entry */}
                        {(() => {
                          const capId = 'mainFineFragrance';
                          const mainImg = cmsContent.capabilities?.mainFineFragrance || DEFAULT_HOMEPAGE_CONTENT.capabilities!.mainFineFragrance;
                          const newPreview = capabilityNewPreviews[capId];
                          const isPublishing = publishingCapabilityId === capId;

                          return (
                            <div key={capId} className="bg-white/30 rounded-xl p-6 border border-white/50 shadow-sm transition-all hover:border-white/80">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-outline-variant/30">
                                <div>
                                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-bold">
                                    MAIN SHOWCASE IMAGE
                                  </span>
                                  <h3 className="font-headline-md text-lg text-primary font-bold">MAIN FINE FRAGRANCE IMAGE</h3>
                                </div>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant/80 bg-white/50 px-2.5 py-1 rounded border border-white/60 font-semibold">
                                  Recommended: 1600 × 1000 px
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div>
                                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                    Current Image
                                  </span>
                                  <div className="aspect-[16/10] w-full max-w-sm rounded-lg overflow-hidden bg-black/10 border border-white/40 shadow-sm relative">
                                    <img 
                                      src={mainImg.url} 
                                      alt="Main Fine Fragrance" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                    {newPreview ? 'New Image Preview' : 'Update Image'}
                                  </span>

                                  {newPreview ? (
                                    <div className="space-y-3 max-w-sm">
                                      <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                        <img 
                                          src={newPreview} 
                                          alt="Main Fine Fragrance Preview" 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          disabled={isPublishing}
                                          onClick={() => handlePublishCapability(capId, 'Main Fine Fragrance')}
                                          className="flex-1 btn-primary py-2 px-3 text-xs uppercase tracking-wider disabled:opacity-50"
                                        >
                                          {isPublishing ? 'Publishing...' : 'Save Image'}
                                        </button>
                                        <button
                                          disabled={isPublishing}
                                          onClick={() => handleCancelCapabilityChange(capId)}
                                          className="px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      <input 
                                        type="file" 
                                        ref={el => capabilityFileRefs.current[capId] = el} 
                                        accept="image/jpeg,image/png,image/webp" 
                                        className="hidden" 
                                        onChange={(e) => handleCapabilityFileSelect(capId, e)}
                                      />
                                      <button
                                        onClick={() => capabilityFileRefs.current[capId]?.click()}
                                        className="font-label-sm text-xs text-primary uppercase tracking-widest border border-primary px-4 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2 bg-white/40"
                                      >
                                        <span className="material-symbols-outlined text-base">photo_camera</span> Change Image
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 6 Capability Specific Items */}
                        {(cmsContent.capabilities?.items || DEFAULT_HOMEPAGE_CONTENT.capabilities!.items).map((capItem, idx) => {
                          const capId = capItem.id;
                          const newPreview = capabilityNewPreviews[capId];
                          const isPublishing = publishingCapabilityId === capId;

                          return (
                            <div key={capId} className="bg-white/30 rounded-xl p-6 border border-white/50 shadow-sm transition-all hover:border-white/80">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-outline-variant/30">
                                <div>
                                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-bold">
                                    0{idx + 1} — CAPABILITY ITEM
                                  </span>
                                  <h3 className="font-headline-md text-lg text-primary font-bold">{capItem.title}</h3>
                                </div>
                                <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant/80 bg-white/50 px-2.5 py-1 rounded border border-white/60 font-semibold">
                                  Recommended: 1600 × 1000 px
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div>
                                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                    Current Image
                                  </span>
                                  <div className="aspect-[16/10] w-full max-w-sm rounded-lg overflow-hidden bg-black/10 border border-white/40 shadow-sm relative">
                                    <img 
                                      src={capItem.image.url} 
                                      alt={capItem.title} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2 font-bold">
                                    {newPreview ? 'New Image Preview' : 'Update Image'}
                                  </span>

                                  {newPreview ? (
                                    <div className="space-y-3 max-w-sm">
                                      <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/10 border-2 border-primary shadow-md relative">
                                        <img 
                                          src={newPreview} 
                                          alt={`New ${capItem.title} Preview`} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          disabled={isPublishing}
                                          onClick={() => handlePublishCapability(capId, capItem.title)}
                                          className="flex-1 btn-primary py-2 px-3 text-xs uppercase tracking-wider disabled:opacity-50"
                                        >
                                          {isPublishing ? 'Publishing...' : 'Save Capability Image'}
                                        </button>
                                        <button
                                          disabled={isPublishing}
                                          onClick={() => handleCancelCapabilityChange(capId)}
                                          className="px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest hover:bg-white/40 transition-colors disabled:opacity-50"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      <input 
                                        type="file" 
                                        ref={el => capabilityFileRefs.current[capId] = el} 
                                        accept="image/jpeg,image/png,image/webp" 
                                        className="hidden" 
                                        onChange={(e) => handleCapabilityFileSelect(capId, e)}
                                      />
                                      <button
                                        onClick={() => capabilityFileRefs.current[capId]?.click()}
                                        className="font-label-sm text-xs text-primary uppercase tracking-widest border border-primary px-4 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2 bg-white/40"
                                      >
                                        <span className="material-symbols-outlined text-base">photo_camera</span> Change Image
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </>
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
