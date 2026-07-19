import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';

export default function BrowseCategories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Electronics',
      desc: 'Next-generation hardware for the modern professional and home enterprise.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1VOFHX_2MQKUGe0HFfopcZNKf1ksIJcsh70cp1sdcSbRVxhWLS8vuSbWldgv_H0g2oReK-AMxW0hBuO-pskYMSypDGVeocYjkbbnvgH8SVcVJd1wdofWTCbgRFjCW2_SKRsFIU7clj7Gm_RBjWLJKRidxbSlpJAOMBdCn-Lzu3AHbqDvKC6Gmu_FszvMNRJXVvNSd6N0PU-mJ0GMeiKFEj318noTksMtrrRi0UywmzpwJTtwoV-sJ0MO3xH7ZxTbgp4xPfgP-Wbk'
    },
    {
      name: 'Fashion',
      desc: 'Executive apparel and luxury accessories curated for discerning global tastes.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3IYFmQe52DsOJ4aP4hHTCOhloMZi6rhWJ6rEUniu9LqdNJfxC49dW2GY87rGIy7cHPedZFBSonsA6rIPip98cKxX0ch66oS7mC5gg9LKiUfkhVKeqjnoMZOdlj7aGMa6RhycQA1Qh6UbQYBDofNh59UAmElp0PDomfeff-56PR9AVo0UpE_DCpWK8PxEfv1yCoIW36SrTP8AKSenczDHS8VMRG_zC6BdPwyLtdXS-MUM90-RoKVHqrfF--_PQE7P_zt5uf7-cLkc'
    },
    {
      name: 'Furniture',
      desc: 'Architecturally designed pieces that redefine corporate and residential spaces.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXoK0E6WIcAV7X8UZRmie3-b8M3WGJ8aehs-EDMmbC3Aj29Auqaiz_-tDCuGP2jHVRuaxDacrsCcgoBFmyCxCwuEVOMTZXgAgfQdEsBkcGpV0ui53Juv7_qR840fkrFcZXTF69AR-UMHnr7m2aLH4y5u4QT6QiUEFanLfum6VnBEIXjpSH5ZVK_SYL6GEVVVRkPu0vqJvmoFNN6xcJQCyGpBoGrJ4hyFmbbsbYaOcILtd-NG75NNhmiMvLFV8ybRwrdZu9gGKjMME'
    },
    {
      name: 'Mobiles',
      desc: 'The latest flagship communication devices engineered for performance.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG1SsZ_Cr2wNafauMZhhGQBbSRfzoYIfRQSHSK3pnJG1v6np2NkPwYFmPd9ioUpP25wP5PcXoHcObToFmGEilZAUlJxBnQklMZKpiF1bl2uN1L4KjOosiE4O0evsiBaJ1W_GYEByzP002tRa04HrCQ-tnn_k4QJu-XbS3DX2LqcfkzxcipwV001pqw5oPkqqN_OUKFNQssYpBSsi1DwTnh7fN2I_aTlSAdcbIDsM-bb5BV583CzfKBXkSWwBj4SR1Y0SPANXPoRDk'
    },
    {
      name: 'Beauty',
      desc: 'Professional grooming and skincare solutions for the modern executive.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIaJBmPgMGcl_nhIA3umZHYU_RfVrFgNamYB29U0OOkIZpBnEPT6r2JVNsX05EkdL68KrcH4YNnIH52mRgS_abliZkdMslhWHl4CwddaQjZsUC1VPlZDX1IXekQfblXEKoa-lT_4MXA80W4znX5qcWcU9sEDkN8ziVwrtYWpVMAPpUKuFQWzlknVa2NGhtIkLIQ_Ex3selGUoso1vCAbZQz04nHa4HCfFtMxdcXcDsuUfLsCUQEvM6AF-NHEL_VEkGV0jg737d2Q8'
    },
    {
      name: 'Appliances',
      desc: 'High-efficiency precision instruments for the high-performance home.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU7ZuoGmOovm6MVHpUMkRVjWvbfx4W7wbZ-c7QUyD3pyzP3oABBgp7dEyckvrx0oL4Hf9TsRqg9M7xOqYEsnsHH2BmsjzyUiY39eIcr9JIlqmhEqz5izoDZfhYrhBLNX4UKh5_OdilfMbSN5IU_oyvMy_-9NdA03BS6tdYz74JU5yF1oIMgnZA6wLRzd0pr5LxXEii6xDgMbcJLJzH29yENVbYUkG2rPM73jPm-xTIufx2kZOXrRHRm-dWdQ1Dvyfh0nfrVVYBQFU'
    }
  ];

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Hero Section */}
      <header className="w-full max-w-[1440px] mx-auto px-margin-desktop py-16 bg-surface-container-low mt-[80px]">
        <div className="max-w-3xl">
          <h1 className="font-display-lg text-4xl lg:text-[48px] font-bold text-on-surface mb-4">Explore Categories</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed">
            Discover our curated selection of premium goods across all industries. From cutting-edge technology to high-fashion essentials, find exactly what you need to scale your lifestyle.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1440px] mx-auto px-margin-desktop py-12 flex gap-gutter flex-grow">
        {/* Discovery Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <nav className="space-y-8">
            <div>
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-4">Discovery</h3>
              <ul className="space-y-3 text-primary font-medium">
                <li>
                  <button onClick={() => navigate('/customer/search')} className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors cursor-pointer text-left w-full">
                    <span className="material-symbols-outlined text-[20px]">star</span> Featured
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/customer/search?q=Bestsellers')} className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors cursor-pointer text-left w-full">
                    <span className="material-symbols-outlined text-[20px]">trending_up</span> Best Sellers
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/customer/search?q=Offers')} className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors cursor-pointer text-left w-full">
                    <span className="material-symbols-outlined text-[20px]">loyalty</span> Exclusive Offers
                  </button>
                </li>
              </ul>
            </div>
            {/* Membership Promotion Card */}
            <div className="p-6 bg-primary text-white rounded-xl">
              <span className="font-label-sm text-label-sm text-secondary-fixed bg-white/10 px-2 py-1 rounded-full mb-4 inline-block">NexaPlus</span>
              <h4 className="font-headline-md text-headline-md mb-2 leading-tight">Elevate Your Shopping</h4>
              <p className="font-body-md text-body-md opacity-85 mb-6 leading-relaxed">Join NexaPlus for unlimited free shipping and executive concierge support.</p>
              <button className="w-full py-3 bg-white text-primary rounded-full font-semibold hover:bg-slate-100 transition-colors text-body-md cursor-pointer">
                Get Started
              </button>
            </div>
          </nav>
        </aside>

        {/* Category Grid */}
        <section className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/customer/search?q=${encodeURIComponent(cat.name)}`)}
                className="group bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={cat.image}
                    alt={cat.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-headline-md text-headline-md text-primary mb-2 font-bold">{cat.name}</h2>
                  <p className="font-body-md text-body-md text-secondary mb-6 flex-grow leading-relaxed">{cat.desc}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    Shop Now <span className="material-symbols-outlined transition-transform">arrow_forward</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}
