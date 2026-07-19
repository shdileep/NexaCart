import React from 'react';

export default function CustomerFooter() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant w-full py-12">
      <div className="max-w-[1440px] mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcz5Ask9bLyohEW6UHpMdob4taTSvvB2pSpMkTuOKut_6XBGAmSxS9f8qWrxe1ifg9Lxng_S3ZC5nKyXzHrpzTWdpW-0sv0swB1K708sA_hMLOdtILlIh4Ig2X9fFYSYY9G1i3KdYzY_k9_F5mBKVvQ3AyQSMUfxef1R_Vwh4lKTR_ALdte3ZqlGVcS8TnZccqalu9UZBFNzj9FyzDFdyxsYA9k6r0gIq7SV7OUslWvEMzPU7YaFvgvWXIaZT1UumxvQ9GfFb3fPk" 
                alt="NexaCart Logo" 
                className="h-8 w-auto grayscale" 
              />
              <span className="font-headline-md text-headline-md font-bold text-primary">NexaCart</span>
            </div>
            <p className="text-on-surface-variant font-body-md max-w-xs">
              Redefining high-volume enterprise commerce with uncompromising precision and elite service.
            </p>
          </div>
          <div>
            <h5 className="font-label-sm text-primary mb-6 uppercase tracking-wider">Company</h5>
            <ul className="space-y-4">
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-sm text-primary mb-6 uppercase tracking-wider">Help</h5>
            <ul className="space-y-4">
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping Info</a></li>
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Returns</a></li>
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-sm text-primary mb-6 uppercase tracking-wider">Legal</h5>
            <ul className="space-y-4">
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-sm text-primary mb-6 uppercase tracking-wider">Stay Updated</h5>
            <div className="flex gap-2 mb-4">
              <input 
                className="bg-surface-container-high border border-outline-variant px-4 py-2 rounded-lg w-full text-body-sm focus:ring-1 focus:ring-primary outline-none" 
                placeholder="Professional Email" 
                type="email" 
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-label-sm font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant">Get exclusive insights and early access to seasonal collections.</p>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-on-surface-variant">© 2024 NexaCart Enterprise. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">share</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">language</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
