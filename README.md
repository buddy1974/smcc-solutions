# SMCC - School of Marriage Counseling & Coaching

Production Next.js 14 application for Hostinger Business Web Hosting.

## Deployment Instructions

### 1. Local Setup
```bash
npm install
npm run build
npm run start
```

### 2. Hostinger Deployment

**Node.js App Configuration in hPanel:**

- **Application Root:** `/home/u470588398/smcc-node`
- **Domain:** `smcc.solutions`
- **Node Version:** 20.x
- **Build Command:** `npm run build`
- **Start Command:** `npm run start`
- **Port:** Auto-assigned by Hostinger

**GitHub Integration:**
1. Push code to GitHub repository
2. Connect repository in hPanel Node.js section
3. Configure auto-deploy on push

**Environment Variables (set in hPanel):**
```
NODE_ENV=production
```

### 3. Directory Structure on Server
```
/home/u470588398/
├── smcc-node/                          # Node.js app root
│   ├── .next/
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   └── next.config.js
└── domains/
    └── smcc.solutions/
        └── public_html/                # LiteSpeed serves from here
```

### 4. LiteSpeed Proxy
Hostinger automatically configures LiteSpeed to proxy requests to the Node.js application.

## Tech Stack

- Next.js 14.2.18 (App Router)
- React 18.3.1
- TypeScript 5
- Tailwind CSS 3.4.1
- Node.js 20.x

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── Navbar.tsx
    ├── Footer.tsx
    └── CTA.tsx
```

## Build Output

The project uses `output: "standalone"` in next.config.js for optimized Node.js deployment.

## Support

Contact via application form on website.
