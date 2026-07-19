import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState('home');

  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active', 'animate-scroll-down', 'animate-scroll-up');
          if (scrollingDown) {
            entry.target.classList.add('animate-scroll-down');
          } else {
            entry.target.classList.add('animate-scroll-up');
          }
        }
      });
      lastScrollY = window.scrollY;
    }, observerOptions);

    const sections = document.querySelectorAll('.section-animate');
    sections.forEach(section => {
      // If it starts with active (like home/about), let's keep it visible
      if (!section.classList.contains('active')) {
        section.classList.add('animate-scroll-down');
      }
      observer.observe(section);
    });

    // Scroll spy for navigation
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    const spySectionIds = ['home', 'about', 'products', 'categories', 'become-seller'];
    spySectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) spyObserver.observe(section);
    });

    // Counter Animation
    let current = 0;
    const target = 120;
    const element = document.getElementById("customerCount");
    const increment = target / 80;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (element) {
        element.innerText = Math.floor(current) + "K+";
      }
    }, 20);

    return () => {
      clearInterval(timer);
      sections.forEach(section => observer.unobserve(section));
      spySectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) spyObserver.unobserve(section);
      });
    };
  }, []);

  return (

    <>
{/* 1. Header */}
<nav className="fixed top-0 w-full h-[80px] z-50 bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 flex items-center">
<div className="flex justify-between items-center max-w-container-max mx-auto px-gutter w-full">
<a className="flex items-center gap-3 text-headline-md font-bold tracking-tight text-primary" href="#home">
<img alt="NexaCart Brand Mark" className="object-contain h-10 w-10 grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo-ay1s0NO1SOHWsKsAmhGFMIeStlIkGuolozxtNcDWFOoUgq-pVznQFUFoHU4XkWDAhpJbCexrkShuH0i9BlBc9ZXUB6czyFtHkDlmYxI6om6lEFBb2dczltRmM01SDzWtETd8zv___S8_sZESDzn-LZv0IWzTcySNc6UsiCFs2ZTexrjgk3HDR9j5GhsdjaAtzVJzylpFY1mWa_eA0feit8HTyRsjOzgihQ9we1HEK3qRVgADh8aaLBmvztIWxBfhh2ipmwwStg" />
<span className="">NexaCart</span>
</a>
<div className="hidden md:flex items-center gap-10">
<a className={`text-sm font-medium transition-all relative py-2 ${activeSection === 'home' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="#home">
  Home
  {activeSection === 'home' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full transition-all duration-300" />}
</a>
<a className={`text-sm font-medium transition-all relative py-2 ${activeSection === 'about' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="#about">
  About
  {activeSection === 'about' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full transition-all duration-300" />}
</a>
<a className={`text-sm font-medium transition-all relative py-2 ${activeSection === 'products' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="#products">
  Products
  {activeSection === 'products' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full transition-all duration-300" />}
</a>
<a className={`text-sm font-medium transition-all relative py-2 ${activeSection === 'categories' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="#categories">
  Categories
  {activeSection === 'categories' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full transition-all duration-300" />}
</a>
<a className={`text-sm font-medium transition-all relative py-2 ${activeSection === 'become-seller' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} href="#become-seller">
  Become Seller
  {activeSection === 'become-seller' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full transition-all duration-300" />}
</a>
</div>
<button onClick={() => navigate("/portal")} className="bg-primary text-on-primary px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:opacity-95 active:scale-95 hover:scale-105 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)] transition-all">
                Get Started
            </button>
</div>
</nav>
{/* 2. Hero Section */}
<section className="section-animate pt-[180px] pb-32 relative overflow-hidden animate-scroll-up active" id="home">
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
<div>
<p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
<span className="w-10 h-[1px] bg-primary"></span>
                    India's first branded trusted platform
                </p>
<h1 className="font-display-lg text-[64px] lg:text-[72px] mb-8 leading-[1.1] tracking-tight">Everything You Love, <span className="text-primary/40">Delivered Smarter.</span></h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-[580px] leading-relaxed">Experience a global shopping ecosystem engineered for maximum efficiency, absolute transparency, and uncompromising quality.</p>
<div className="flex items-center gap-10">
<button onClick={() => navigate("/portal")} className="bg-primary text-on-primary px-10 py-4 rounded-lg text-sm font-bold flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)] transition-all">
                        Explore Ecosystem <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<div className="border-l border-outline-variant pl-10">
<p className="text-3xl font-bold tracking-tight text-primary" id="customerCount">120K+</p>
<p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em]">Global Customers</p>
</div>
</div>
</div>
<div className="relative h-[640px] hidden lg:block">
<div className="absolute inset-0 bg-primary/5 rounded-[4rem] blur-3xl opacity-50"></div>
<div className="absolute top-[5%] left-[10%] animate-float" style={{"animationDelay": "0s"}}>
<div className="glass-card p-6 rounded-2xl shadow-xl w-56 border border-white/50">
<img className="w-full h-36 object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe4dB2vgS8n0Yg-dfXoufqveHX1cKBS4pdot3KCHpIE0GwfOSwQx8XbPJa_EwmKsbsfqiHxRDhy2xhVQPjH50mfKo6xof0IMXtrkfBuhRPGnq4Rmx95sElqA4dvg_8R9Xqqw_Oaa434NMWBFv1UtsjEglk_ZflEnL9dBlPLrJNZsHUjt0qkIkmGzDolSBBcYKJH3g2UyJ7WPpVnvwcPM-bmwPGP7DKorEyswDfprMioVlvqzZUd6Wm8nVa8CLyNUj7tAnRMW_kr_0" />
<p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Precision Tech</p>
</div>
</div>
<div className="absolute top-[45%] right-[0%] animate-float" style={{"animationDelay": "2s"}}>
<div className="glass-card p-6 rounded-2xl shadow-xl w-48 border border-white/50">
<img className="w-full h-32 object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_PbMYvZKBTP8JVcQ6xBnqIXKncIiDzfDtoSvmKkmP_Eupktbd29os2R7tvUQDOq1836oTg_zFLiJNeyl_i5xZcdkeAgskgacBEGeVEEHKqRPkeIUaAyFKMnNXhgYldoVJKuGNZk8_QsnRq6fUROtci0ImkKAgc3CMRl0FSr4w62vdzUka2SO6G7ivQU1eQEFlpkitFUD7b7uPKEkpPhdgZFTsmy1B7JetHT_iiVNy6ZQpIAjXmkreFGPVH0aM_8LlBjjJ-6vE5NY" />
<p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Modern Apparel</p>
</div>
</div>
<div className="absolute bottom-[5%] left-[20%] animate-float" style={{"animationDelay": "1s"}}>
<div className="glass-card logistics-card p-8 rounded-2xl shadow-xl w-48 text-center border border-white/50 cursor-pointer">
<img alt="Global Logistics" className="w-full h-24 object-cover rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" src="https://lh3.googleusercontent.com/aida/AP1WRLt9XfqxhjQcDiWQmrh7xgZ298go_MrlL7UBrTizHrMp_ha6fRHVfh9YRfz0436a-7cZe5H4oKCBXh7Tro_0ru3ZsMhqljowqlOswfTBWIgZKYEs_1OieiAsojhJ40xcykGOArhA2bYmDEgZvlpv-HgeNHRvCo0-x5euxyfqWk5XHmonUXCGq5_3zw36JzPqJWQ5lyTxueP4871bUmz0Ghu1SlpmazeNcAdJb7V3rz-zPzYL11LJMEEFtDo" />
<p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Global Logistics</p>
</div>
</div>
</div>
</div>
</section>
{/* 3. About Section */}
<section className="section-animate py-32 bg-white animate-scroll-up active" id="about">
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
<div className="order-2 lg:order-1">
<div className="grid grid-cols-2 gap-6">
<div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/40 hover:border-primary/20 transition-all group">
<div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span className="material-symbols-outlined">verified_user</span>
</div>
<h3 className="text-lg font-bold mb-3">Premier Ecosystem</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">NexaCart is India's leading branded commerce infrastructure, designed for trust.</p>
</div>
<div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/40 hover:border-primary/20 transition-all group mt-12">
<div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span className="material-symbols-outlined">security</span>
</div>
<h3 className="text-lg font-bold mb-3">Branded Trust</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">Rigorous vetting ensures every merchant and product meets global benchmarks.</p>
</div>
<div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/40 hover:border-primary/20 transition-all group">
<div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span className="material-symbols-outlined">hub</span>
</div>
<h3 className="text-lg font-bold mb-3">Unified Supply</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">Connecting diverse verticals through a single, secure enterprise-grade platform.</p>
</div>
<div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/40 hover:border-primary/20 transition-all group mt-12">
<div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span className="material-symbols-outlined">trending_up</span>
</div>
<h3 className="text-lg font-bold mb-3">Scale Ready</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">Empowering Indian businesses to reach global standards and audiences.</p>
</div>
</div>
</div>
<div className="order-1 lg:order-2">
<p className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-4">India's first branded trusted platform</p>
<h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">The Benchmark for <span className="text-primary/40">Branded Ecosystems.</span></h2>
<p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">NexaCart isn't just a marketplace; it's a statement of quality. We have redefined procurement for the modern era by bridging the gap between high-end sellers and discerning buyers within a single, secure environment.</p>
<p className="text-body-lg text-on-surface-variant mb-12 leading-relaxed">From precision tech to luxury lifestyle, our platform ensures every transaction is backed by the NexaCart guarantee of authenticity and excellence.</p>
<button className="text-primary font-bold flex items-center gap-3 hover:gap-5 transition-all group">
                    Learn our Story <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</section>
{/* 4. Products Section */}
<section className="section-animate py-32 bg-surface animate-scroll-up" id="products">
<div className="max-w-container-max mx-auto px-gutter mb-20 flex justify-between items-center">
<div>
<h2 className="text-4xl font-bold tracking-tight mb-4">Curated Selection</h2>
<p className="text-on-surface-variant">Selected for quality, verified for excellence.</p>
</div>
<div className="flex gap-4">
<button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">west</span></button>
<button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">east</span></button>
</div>
</div>
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{/* Product 1 */}
<div className="group bg-white product-card-hover rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-2xl transition-all duration-500">
<div className="relative h-72 overflow-hidden">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWk3CrspOpT4QrkG80Qb0phFOCz1XIFRubiwm91WkyGxnksJWslXMYpLx2CPqvN_8FXdyCAZv4n9a-IRnW4X1-LFeusX0BX5EqhkM66l8RllfTLD5HW_46tayWtiZxyRF9Xpc_UpssDJJWAZpHBN5GF8_eLqu0NxkM2-sG18N9u5_MoZmTYs0oUUPDBg0HNIDvNoZT-hZKh3Z1G-JVX9TpV3sGBHVgUmN16cGvkcjFEYOgh_l-rsnDKh1tEHlT53LCWfn_e0qwvTs" />
<button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-primary hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[20px]">favorite</span></button>
</div>
<div className="p-8">
<p className="text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-2">Audiophiles</p>
<h3 className="text-lg font-bold mb-4">Aero-Z Pro Elite</h3>
<div className="flex items-center justify-between">
<p className="text-xl font-bold tracking-tight">₹2,09,900</p>
<button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all"><span className="material-symbols-outlined text-[20px]">add_shopping_cart</span></button>
</div>
</div>
</div>
{/* Product 2 */}
<div className="group bg-white product-card-hover rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-2xl transition-all duration-500">
<div className="relative h-72 overflow-hidden">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdupyJoVAoh7zv9CjGX-_-SzFsHyUMBPzIVM0kfIKN69zTBL-gceTkBRhQYdm1rg9sPSFcfkfSTYxWrUHzgvWi_WulAjkpkGKFoAmVEib7rOMhbW1_nWmdKv8lKSFF84GU_xcwt4pLfAJUNJsSjDFrLkOWstH94PWsDYbcXnyFMcmdq93aLEKdz-kXqO1UkMGjsCxdUxifzML9XZXBEV7C8jW83-0UjpbWSsal9c4BkfELOl1TDg1ubpvDSxO0d-wPIYyt_zU3P80" />
<button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-primary hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[20px]">favorite</span></button>
</div>
<div className="p-8">
<p className="text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-2">Luxury Leather</p>
<h3 className="text-lg font-bold mb-4">Nomad Obsidian</h3>
<div className="flex items-center justify-between">
<p className="text-xl font-bold tracking-tight">₹95,900</p>
<button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all"><span className="material-symbols-outlined text-[20px]">add_shopping_cart</span></button>
</div>
</div>
</div>
{/* Product 3 */}
<div className="group bg-white product-card-hover rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-2xl transition-all duration-500">
<div className="relative h-72 overflow-hidden">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkMBpIrkv80L3HRbZQhKXCNUdc7RLK558Qza2Dlld-2pKjOy9mGg-WNT6u9m7fQFTGHZ09OyijWNFGXW_u9Hg1XasU-vxx4eZ361xZZAzt58p5XdtB5CLMNYAx4aE2mZTCFIcO6dF3qt7dn4vMYWjdYabc-Kg3yGLamONcoe8IDz8LQ6STB4MvmKiDzv5oRkmMi3mROBtjlE_aTCW8FAJ0qasX7_oBHPIzGbDvEaSH1r7s8faPXxhySBx9XuNvfeRNM-xlNVUpz2s" />
<button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-primary hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[20px]">favorite</span></button>
</div>
<div className="p-8">
<p className="text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-2">Smart Systems</p>
<h3 className="text-lg font-bold mb-4">Lumina Quantum Hub</h3>
<div className="flex items-center justify-between">
<p className="text-xl font-bold tracking-tight">₹68,900</p>
<button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all"><span className="material-symbols-outlined text-[20px]">add_shopping_cart</span></button>
</div>
</div>
</div>
{/* Product 4 */}
<div className="group bg-white product-card-hover rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-2xl transition-all duration-500">
<div className="relative h-72 overflow-hidden">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Z55aj_wt-v1CRERUQ9ESmAy-PvW6Npt5XaDBGA76X2KNRU_zfrQEPLsaMi0kVifbV3UjROt0uDDt8CIV_j4ARs-j5Bwc4A_IlwROFK4veSsTJTslmp6sBodJAph85q9_GLMDGUi2EpNv6DSmgz7OEeaoLmWSdB1kIoySGuI-WAf_Jvv8iQvijgYPDHaIqREEwlUdgt8a03KWb_828WflPG_r7j_GpAr3mmHs9mN5Xk9Rai3xeoWLa6AFa1XYE2MeqIzkPrEUhu8" />
<button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-primary hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[20px]">favorite</span></button>
</div>
<div className="p-8">
<p className="text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-2">Scent &amp; Aura</p>
<h3 className="text-lg font-bold mb-4">Eau De Luxe Private</h3>
<div className="flex items-center justify-between">
<p className="text-xl font-bold tracking-tight">₹40,700</p>
<button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all"><span className="material-symbols-outlined text-[20px]">add_shopping_cart</span></button>
</div>
</div>
</div>
</div>
</section>
{/* 5 & 6. Categories & Market Verticals */}
<section className="section-animate py-32 bg-white animate-scroll-up" id="categories">
<div className="max-w-container-max mx-auto px-gutter flex justify-between items-end mb-20">
<div>
<h2 className="text-4xl font-bold tracking-tight mb-4">Market Verticals</h2>
<p className="text-on-surface-variant">Strategic segmentation for precise procurement.</p>
</div>
<button className="text-primary text-sm font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
                Browse All Verticals <span className="material-symbols-outlined">north_east</span>
</button>
</div>
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-6">
<div className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer transition-all duration-500 vertical-card-hover">
<div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-100 group-hover:opacity-40" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDj3W_3-MzylMAg9vkpnSgkRTKZSWwDwphhESsPgL6zsIqaiEVlVxUHYwNU2k_WmpPL9HSgG1YAlVkQuV-VJTvBIt3tW41dSWfmMsaRSmNH4_WS5slhjc9H1PDtMRRrD8uZKPdF0l6M07coIP3Cxv15l8N5d50SK4qUy2RREAtgoZJVoWwDkw5vBpuwTA7qL4dQ4u_BZUUMRdtNhml8VPKW4TVa9v8ICWXhWWOZzxJEURT6Om9NvFVO9pRPeucRU94Nu18ZNsrHY_4')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60"></div>
<div className="absolute bottom-10 left-10">
<p className="text-white text-xl font-bold tracking-tight">Enterprise Tech</p>
<span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-4">arrow_forward</span>
</div>
</div>
<div className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer transition-all duration-500 vertical-card-hover">
<div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-100 group-hover:opacity-40" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9i2EnuUgkiUTMcSdBvJSrzC0kiFOk9g9woYOETXmCKonkYpE60ZjR9_ViPuUQD-Oup4apZRIjKKMFlTVOmO3nyFIdv_ihVAq-MF4oQCoRHhfKY4qJo2WOqpteB22JNgHoBTamlybvWpJnivcERBmXAZZ_3I5zG6pV9QAt6KXSZ3k9NBz-MEnlBg4wkhMEO_-vANGh_dGvqzTJ7JMKmUj2wOIUEbioVVrqcIL42FwJs-DzgEpsLiy0ESnmh6JOYB-lyd3jvJ3Kf9I')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60"></div>
<div className="absolute bottom-10 left-10">
<p className="text-white text-xl font-bold tracking-tight">Curated Fashion</p>
<span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-4">arrow_forward</span>
</div>
</div>
<div className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer transition-all duration-500 vertical-card-hover">
<div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-100 group-hover:opacity-40" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDotB4XTF7Dr-e_P8jrBlo6funFmJzzwyvXhuLUEY1hK5DfC-j-EnkgmcImPqJxuRayHmSJCPi-qqXSp4GvI714ex4hdN1alzkLVLeAnMUpHmErH7sil1yiruwZi_1q-8ikMnxeyu58HWxt5NX3lWZ1DG8RxebrvkE1OqFAOLJt8iC1ZF8ljd9HzuwnB4N0iZdHEIV9dVwV1yVo6eSZKh90biUHOXNs40mbOHdpqRsNipagder8O6yqS69PdbCUmwvXW1vu44A2_PI')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60"></div>
<div className="absolute bottom-10 left-10">
<p className="text-white text-xl font-bold tracking-tight">Prime Estates</p>
<span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-4">arrow_forward</span>
</div>
</div>
<div className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer transition-all duration-500 vertical-card-hover">
<div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-100 group-hover:opacity-40" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHvEypzGrIcsiKsq0b7GJkw4IX5Z0Ysv5Wack8B6A66uGNQfgHVViYnwsgvPmLGOuk17ngCuVLS0fF9-2hGoYi2LJ01oODVZ-uAf6BGbHpIVdhbnMOkiOOyXP63gW8p-SBKAWTYOaqkUtrWKmE1ogf0dV4dkZfZtf0h5xC6MGCk4np_dOi631BagKyMBVnMZ_gbM2wd6Tnll2uTsLuykQg7N9zDQZcEFSyVoyi9g4M6O1jcN6GKRtyHjuOOVBEmdNCwb7KEue_hBc')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60"></div>
<div className="absolute bottom-10 left-10">
<p className="text-white text-xl font-bold tracking-tight">Luxury Beauty</p>
<span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-4">arrow_forward</span>
</div>
</div>
</div>
</section>
{/* 7. Become Seller Section */}
<section className="section-animate py-32 bg-surface overflow-hidden animate-scroll-up" id="become-seller">
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
<div className="relative order-2 lg:order-1">
<div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px] opacity-40"></div>
<div className="relative bg-white p-8 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(15,23,42,0.1)] border border-outline-variant/40">
<div className="flex items-center justify-between mb-12 border-b border-outline-variant/30 pb-8">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
<span className="material-symbols-outlined text-white">analytics</span>
</div>
<div>
<p className="text-sm font-bold tracking-tight">Seller Intel</p>
<p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Enterprise Dashboard</p>
</div>
</div>
<div className="flex gap-2">
<div className="w-3 h-3 rounded-full bg-red-400"></div>
<div className="w-3 h-3 rounded-full bg-amber-400"></div>
<div className="w-3 h-3 rounded-full bg-emerald-400"></div>
</div>
</div>
<div className="grid grid-cols-3 gap-6 mb-12">
<div className="p-6 bg-surface rounded-2xl border border-outline-variant/20">
<p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Revenue</p>
<p className="text-2xl font-bold text-primary">₹40.3M</p>
</div>
<div className="p-6 bg-surface rounded-2xl border border-outline-variant/20">
<p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Fulfilled</p>
<p className="text-2xl font-bold text-primary">12k</p>
</div>
<div className="p-6 bg-surface rounded-2xl border border-outline-variant/20">
<p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Trust Score</p>
<p className="text-2xl font-bold text-primary">99.8%</p>
</div>
</div>
<img className="w-full h-56 object-cover rounded-2xl grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtRhSywUnNYLMhUEsVJ7OH0RfdwWsCPf2_dVJyD8ErN86zYyNBSdkEASnLaBsZ5Ac5s2SWP0nBn-Gd3RZHERIzXgzwUJZ1xXdZIoarO1pV7JrBogrjp58gMjP3_1w9g9h2NECdUm_wBc8yJrozlgk3sOXk5h4L0Lfeyy1TCXoJBOZ5o5ncAs9-q-hoX13Y3kiaD3qjZPaHoUCh_ScmgUa4WjbaHRWRRX-P3dyEwBFVfTMYSAMZNFRF5ikIaY7FRm30JUWYEBCKz2w" />
</div>
</div>
<div className="order-1 lg:order-2">
<h2 className="text-5xl font-bold tracking-tight mb-8 leading-[1.1]">Scale Your Enterprise. <span className="text-primary/40">Reach Global Markets.</span></h2>
<p className="text-body-lg text-on-surface-variant mb-12 leading-relaxed">Join NexaCart's elite tier of verified merchants. Access institutional-grade analytics, integrated multi-modal logistics, and a refined global audience.</p>
<div className="space-y-6 mb-12">
<div className="flex items-center gap-4">
<span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[16px] text-primary">done</span>
</span>
<span className="text-sm font-medium">Strategic Market Access</span>
</div>
<div className="flex items-center gap-4">
<span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[16px] text-primary">done</span>
</span>
<span className="text-sm font-medium">Automated Regulatory Compliance</span>
</div>
<div className="flex items-center gap-4">
<span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[16px] text-primary">done</span>
</span>
<span className="text-sm font-medium">Unified Liquidity Management</span>
</div>
</div>
<button className="bg-primary text-white px-10 py-4 rounded-lg text-sm font-bold tracking-wide hover:opacity-90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)]">Become Seller</button>
</div>
</div>
</section>
{/* 8. Reviews Section */}
<section className="section-animate py-32 bg-white overflow-hidden animate-scroll-up" id="reviews">
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
<div>
<h2 className="text-5xl font-bold tracking-tight mb-8 leading-[1.1]">Strategic Trust. <span className="text-primary/40">Market Proven.</span></h2>
<p className="text-body-lg text-on-surface-variant mb-12 leading-relaxed">Join thousands of high-net-worth individuals and global enterprises who have centralized their procurement on NexaCart.</p>
<div className="flex items-center gap-6">
<div className="flex -space-x-4">
<div className="w-14 h-14 rounded-full border-[3px] border-white bg-slate-200 bg-cover" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAO6x_YnaAksF-16z5jiwM5GfvtzCRl66qLW6ijlLNIstmupEPjvEB6SP1YwkJghNSSKpEn6MWXMQ9UGtdsYn7LBqyDVvbD78DB2DHVk4D3h00JGulyzm5UTih0S0kDdGvQxHuC42P7dU7j8XI6BEio_Y6Mwy4GduGxbMWi7uw_gf3eLIcWiGiJdUHitw96rbGXnmwnqB7ab763_3hqe_EZPwATzwBkzVKxQzke7lePVB6oBBrHaior9X9D8Y-X1zSIenuWLYtbHK8')"}}></div>
<div className="w-14 h-14 rounded-full border-[3px] border-white bg-slate-200 bg-cover" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSmzYFmbyoe2obAmKV0wKLNyLNtwUyZDGSjKlxfGJY9Yfa9iekj_blyJWvlG_zxjAhNByHhZ_B10O6Q5WaOiOhcz2y0eU-nnXv710sTnN30hbJxMzpeSDWQjNDRQRcEe2hGYnk03g_GuLrQWraM93qyHmzRzfDNN_5RId2IsHpF9LCRhAbv25rvwcF-jf5hoi0ZSsptq4SkKbfy8ywfb72xfGOpEzhczUoLfGOzL37yoi1t5kGkgeMB_6Ll7YNn2JSYGX-Z4vntkI')"}}></div>
<div className="w-14 h-14 rounded-full border-[3px] border-white bg-slate-200 bg-cover" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpJx6EI7wsEass5PHRvYlmqicFfsk7_C66mu7JgzZTFJ6ZD9SrWptZg5f_1xUP9iOt8eUMdiM8g15Twpr4iB2-VGDrjckziYi-6V-s6UNqNtojhl7GvVfzECEOJoRbdxZuErfPfjPwBkrfpmz8jmJuCWm-GxYUDvtQXRQ1XSOuEIwHSFw2T1BJbp2OiFUzY4TPuqQZk8hxE0llf2ncBXPHikXLGdPz0A-U_2PsYwTi1Xe5bY7fCAxveSy2_H76ChESS2Ea9QOXP-0')"}}></div>
</div>
<div>
<p className="text-sm font-bold tracking-tight">Institutional Rating 4.9/5</p>
<p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Based on 200k+ global audits</p>
</div>
</div>
</div>
<div className="space-y-8">
<div className="glass-card p-10 rounded-[2rem] border border-outline-variant/40 hover:translate-y-[-4px] transition-all cursor-default">
<p className="text-lg font-medium italic mb-8 leading-relaxed">"NexaCart has redefined our expectation for cross-border commerce. The speed of settlement and logistics precision is unparalleled."</p>
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary/10"></div>
<div>
<p className="text-sm font-bold tracking-tight">Marcus Thorne</p>
<p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">CTO, Global Tech Holdings</p>
</div>
</div>
</div>
<div className="glass-card p-10 rounded-[2rem] border border-outline-variant/40 hover:translate-y-[-4px] transition-all cursor-default translate-x-8">
<p className="text-lg font-medium italic mb-8 leading-relaxed">"The platform's verification protocols provide a level of security that was previously missing in the digital marketplace."</p>
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary/10"></div>
<div>
<p className="text-sm font-bold tracking-tight">Sarah Chen</p>
<p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Director, Curated Assets</p>
</div>
</div>
</div>
</div>
</div>
</section>
{/* 9. Signup Section */}
<section className="section-animate py-32 bg-surface animate-scroll-up" id="signup">
<div className="max-w-[1000px] mx-auto px-gutter text-center bg-white p-24 rounded-[3rem] border border-outline-variant/40 shadow-xl">
<h2 className="text-4xl font-bold tracking-tight mb-8">Strategic Market Insights</h2>
<p className="text-on-surface-variant mb-12 max-w-lg mx-auto">Receive exclusive quarterly reports on global market trends and upcoming asset drops.</p>
<form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
<input className="flex-grow h-14 px-8 rounded-xl border border-outline-variant focus:border-primary focus:ring-0 bg-surface outline-none transition-all text-sm font-medium" placeholder="Institutional Email" type="email" />
<button className="bg-primary text-white px-10 h-14 rounded-xl text-sm font-bold tracking-wide hover:opacity-90 transition-all shadow-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)]">Subscribe</button>
</form>
<p className="text-[11px] font-medium text-on-surface-variant mt-8 opacity-60">Confidentiality guaranteed. Read our Data Governance policy.</p>
</div>
</section>
{/* 10. Footer */}
<footer className="section-animate pt-32 pb-16 bg-white border-t border-outline-variant/30 animate-scroll-up">
<div className="max-w-container-max mx-auto px-gutter grid grid-cols-2 md:grid-cols-5 gap-20 mb-24">
<div className="col-span-2">
<a className="flex items-center gap-3 font-bold tracking-tight text-primary mb-8 text-4xl gap-4" to="#">
<img alt="NexaCart Brand Mark" className="object-contain h-14 w-14 grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo-ay1s0NO1SOHWsKsAmhGFMIeStlIkGuolozxtNcDWFOoUgq-pVznQFUFoHU4XkWDAhpJbCexrkShuH0i9BlBc9ZXUB6czyFtHkDlmYxI6om6lEFBb2dczltRmM01SDzWtETd8zv___S8_sZESDzn-LZv0IWzTcySNc6UsiCFs2ZTexrjgk3HDR9j5GhsdjaAtzVJzylpFY1mWa_eA0feit8HTyRsjOzgihQ9we1HEK3qRVgADh8aaLBmvztIWxBfhh2ipmwwStg" />
<span className="">NexaCart</span>
</a>
<p className="text-sm text-on-surface-variant mb-8 max-w-[280px]">India's premier branded ecosystem connecting high-end sellers with a global audience through precision logistics and trusted verification.</p>
<div className="flex gap-4">
<a className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-primary hover:text-white transition-all duration-300" to="#"><span className="material-symbols-outlined text-[20px]">public</span></a>
<a className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-primary hover:text-white transition-all duration-300" to="#"><span className="material-symbols-outlined text-[20px]">alternate_email</span></a>
<a className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-primary hover:text-white transition-all duration-300" to="#"><span className="material-symbols-outlined text-[20px]">hub</span></a>
</div>
</div>
<div>
<p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-8">Navigation</p>
<ul className="space-y-4">
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#home">Home</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#about">About</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#products">Products</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#categories">Categories</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#become-seller">Become Seller</a></li>
</ul>
</div>
<div>
<p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-8">About</p>
<ul className="space-y-4">
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#">Governance</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#">Investor Relations</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#">Career Path</a></li>
</ul>
</div>
<div>
<p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-8">Ecosystem</p>
<ul className="space-y-4">
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#">Merchant Portal</a></li>
<li className=""><a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" to="#">Connect API</a></li>
</ul>
</div>
</div>
<div className="max-w-container-max mx-auto px-gutter pt-12 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-8">
<p className="text-on-surface-variant text-[11px] font-bold tracking-widest uppercase">© 2026 NexaCart. All Rights Reserved.</p>
<div className="flex items-center gap-12 grayscale opacity-30">
<span className="text-[10px] font-bold tracking-widest">VISA PLATINUM</span>
<span className="text-[10px] font-bold tracking-widest">WORLD ELITE</span>
<span className="text-[10px] font-bold tracking-widest">SWIFT ISO</span>
</div>
</div>
</footer>

    </>

  );
}
