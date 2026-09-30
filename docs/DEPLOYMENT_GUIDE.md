# NexaCart Production Deployment Guide

Instructions for deploying NexaCart frontend and backend services to cloud environments.

---

## Architecture Overview
- **Frontend**: Vite Single Page Application (SPA) deployed to Vercel / Netlify.
- **Backend**: Express Node.js REST API deployed to Render Web Service.
- **Database**: Managed PostgreSQL instance (Render PostgreSQL / Neon / Supabase).
- **Media**: Cloudinary CDN for product image storage.

---

## 1. Backend Deployment (Render)

1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. Set the Root Directory to: `server`
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Configure Environment Variables:
   - `PORT`: `5000`
   - `DATABASE_URL`: `postgres://...`
   - `JWT_SECRET`: `...`
   - `RAZORPAY_KEY_ID`: `...`
   - `RAZORPAY_KEY_SECRET`: `...`

---

## 2. Frontend Deployment (Vercel)

1. Import repository on Vercel.
2. Build Settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-render-service.onrender.com/api`
   - `VITE_RAZORPAY_KEY_ID`: `rzp_test_...`

---

## 3. Post-Deployment Verification
- Run database schema migration: `psql $DATABASE_URL -f server/schema.sql`
- Check health status endpoint: `GET /health` -> `200 OK`
- Verify CORS headers allow requests from the Vercel frontend domain.
