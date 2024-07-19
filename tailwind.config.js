/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface": "#191c1e",
        "on-secondary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed-variant": "#3a485c",
        "surface-dim": "#d8dadc",
        "primary": "#0f172a",
        "on-primary-fixed-variant": "#3f465c",
        "error": "#ba1a1a",
        "tertiary": "#000000",
        "on-tertiary-fixed": "#0b1c30",
        "surface-container-low": "#f2f4f6",
        "tertiary-container": "#0b1c30",
        "surface-tint": "#565e74",
        "secondary": "#515f74",
        "surface-container-high": "#e6e8ea",
        "on-tertiary-fixed-variant": "#38485d",
        "inverse-primary": "#bec6e0",
        "secondary-container": "#d5e3fd",
        "on-secondary-fixed": "#0d1c2f",
        "secondary-fixed": "#d5e3fd",
        "on-secondary-container": "#57657b",
        "on-tertiary": "#ffffff",
        "outline-variant": "#c6c6cd",
        "tertiary-fixed": "#d3e4fe",
        "on-surface-variant": "#45464d",
        "surface-container-highest": "#e0e3e5",
        "on-primary": "#ffffff",
        "error-container": "#ffdad6",
        "inverse-surface": "#2d3133",
        "secondary-fixed-dim": "#b9c7e0",
        "background": "#f7f9fb",
        "on-error-container": "#93000a",
        "on-background": "#191c1e",
        "outline": "#76777d",
        "on-error": "#ffffff",
        "surface-bright": "#f7f9fb",
        "surface-variant": "#e0e3e5",
        "primary-container": "#131b2e",
        "primary-fixed": "#dae2fd",
        "inverse-on-surface": "#eff1f3",
        "surface-container": "#eceef0",
        "primary-fixed-dim": "#bec6e0",
        "on-tertiary-container": "#75859d",
        "surface": "#f7f9fb",
        "on-primary-fixed": "#131b2e",
        "on-primary-container": "#7c839b",
        "tertiary-fixed-dim": "#b7c8e1"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px",
        "brand": "20px"
      },
      spacing: {
        "unit": "4px",
        "container-max": "1440px",
        "gutter": "24px",
        "margin-desktop": "64px",
        "margin-mobile": "20px"
      },
      fontFamily: {
        "display-lg-mobile": ["Hanken Grotesk"],
        "label-sm": ["JetBrains Mono"],
        "display-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"]
      },
      fontSize: {
        "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
