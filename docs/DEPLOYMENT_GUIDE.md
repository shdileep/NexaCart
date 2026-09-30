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
6. Add the Environment Variables:
   - `PORT`: `5000`
   - `DATABASE_URL`: `postgres://...`
   - `JWT_SECRET`: `...`
   - `RAZORPAY_KEY_ID`: `...`
   - `RAZORPAY_KEY_SECRET`: `...`
   - `CLOUDINARY_CLOUD_NAME`: `...`
   - `CLOUDINARY_API_KEY`: `...`
   - `CLOUDINARY_API_SECRET`: `...`
