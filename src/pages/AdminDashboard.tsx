import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../firebase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'leads' | 'marketplace'>('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'hero-video'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().url) {
        setVideoUrl(docSnap.data().url);
      } else {
        setVideoUrl(null);
      }
    });
    return () => unsub();
  }, []);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `hero-videos/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error: any) => {
          console.error("Storage upload error:", error);
          alert(`Upload failed: ${error.message}\n\nMake sure your Storage Rules are correct and CORS is configured.`);
          setIsUploading(false);
          setUploadProgress(0);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await setDoc(doc(db, 'settings', 'hero-video'), { url: downloadURL, path: uploadTask.snapshot.ref.fullPath });
            setIsUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
          } catch (firestoreError: any) {
            console.error("Firestore save error:", firestoreError);
            alert(`Video uploaded successfully, but failed to save URL to Database.\n\nError: ${firestoreError.message}\n\nPlease check your Firestore Database rules.`);
            setIsUploading(false);
            setUploadProgress(0);
          }
        }
      );
      
    } catch (err: any) {
      console.error("Storage upload error:", err);
      alert(`Upload failed immediately. Error Details: ${err.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveVideo = async () => {
    try {
      setIsUploading(true);
      // Fetch current doc to get the storage path (if we stored it, else we just delete the doc)
      // For simplicity, we just delete the doc so it stops showing on the frontend.
      // (Optional: also delete from Storage if we stored the path).
      await deleteDoc(doc(db, 'settings', 'hero-video'));
      setIsUploading(false);
    } catch (err) {
      alert('Failed to remove video');
      setIsUploading(false);
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
          <nav className="hidden md:flex gap-8">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/marketplace">Marketplace</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/build-sample">Build a Sample</Link>
          </nav>
          <div className="flex gap-4">
            <div className="text-primary bg-white/40 shadow-inner p-2 rounded-full">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
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
                <button onClick={() => setActiveTab('overview')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined">dashboard</span> Overview
                </button>
                <button onClick={() => setActiveTab('video')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'video' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined">movie</span> Hero Video
                </button>
                <button onClick={() => setActiveTab('leads')} className={`font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'leads' ? 'bg-white/40 text-primary font-semibold border border-white/50 shadow-sm' : 'text-on-surface-variant hover:bg-white/20 hover:text-primary'}`}>
                  <span className="material-symbols-outlined text-secondary">inbox</span> Inquiries
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
                    <span className="font-headline-lg text-4xl text-primary">0</span>
                  </div>
                </div>
                <div className="mt-8 text-center text-on-surface-variant text-sm py-12 bg-white/20 rounded-xl border border-white/30 border-dashed">
                  Not enough data yet.<br/>Analytics will appear as visitors interact with the website.
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
                  {videoUrl ? (
                    <div className="bg-white/30 rounded-xl p-6 border border-white/40">
                      <div className="mb-4">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Current Video Preview</span>
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/10 border border-white/20">
                          <video src={videoUrl} controls muted className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex gap-4 border-t border-outline-variant/30 pt-4">
                        <input
                          type="file"
                          accept="video/mp4"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleVideoUpload}
                        />
                        <button
                          disabled={isUploading}
                          onClick={() => fileInputRef.current?.click()}
                          className="font-label-sm text-label-sm text-primary uppercase tracking-widest border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
                        >
                          {isUploading ? `Uploading... ${uploadProgress}%` : 'Replace Video'}
                        </button>
                        <button
                          onClick={handleRemoveVideo}
                          disabled={isUploading}
                          className="font-label-sm text-label-sm text-error uppercase tracking-widest border border-error px-4 py-2 rounded-lg hover:bg-error hover:text-white transition-colors disabled:opacity-50"
                        >
                          Remove Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/20 rounded-xl p-12 border border-white/30 text-center border-dashed">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">video_file</span>
                      <h3 className="font-headline-md text-headline-md text-primary mb-2">No active video</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">Upload an MP4 to display a cinematic background video on the landing page.</p>
                      <input
                        type="file"
                        accept="video/mp4"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleVideoUpload}
                      />
                      <button
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="font-label-sm text-label-sm text-white bg-primary uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-2"
                      >
                        {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload MP4'}
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === 'leads' && (
              <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                   <h2 className="font-headline-md text-headline-md text-primary">Inbound Sample Requests</h2>
                </div>
                
                <div className="bg-white/20 rounded-xl p-12 border border-white/30 text-center border-dashed">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">inbox</span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">No enquiries yet</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">New enquiries and sample requests will appear here once customers place them.</p>
                </div>
              </section>
            )}

            {activeTab === 'marketplace' && (
              <section className="glass-panel p-8 rounded-2xl border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                   <h2 className="font-headline-md text-headline-md text-primary">Marketplace Products</h2>
                   <button className="font-label-sm text-label-sm text-white bg-primary uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                     Add Product
                   </button>
                </div>
                
                <div className="bg-white/20 rounded-xl p-12 border border-white/30 text-center border-dashed">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">inventory_2</span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">No marketplace products added yet</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6">Add your first fragrance formulation to begin.</p>
                </div>
              </section>
            )}
            
          </div>
        </div>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-white/30 z-10 text-center">
        <div className="font-body-md text-body-md text-on-surface-variant text-sm">
          © 2024 Parallax Perfumery. Administrative Portal.
        </div>
      </footer>
    </div>
  );
}
