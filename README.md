# Parallax Perfumery Web App

## Overview
This is a high-performance e-commerce and marketing website for Parallax Perfumery, featuring an interactive marketplace, a custom sample builder, 3D configurator, and an admin dashboard for content management.

## Tech Stack
* **Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + Framer Motion (for animations)
* **Language**: TypeScript

## Project Structure
```
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, Modals)
│   ├── pages/           # Main route views (Home, Marketplace, AdminDashboard)
│   ├── App.tsx          # Router configuration
│   └── index.css        # Global CSS and Tailwind entrypoint
├── public/              # Static assets (fonts, images)
```

## Prerequisites
* Node.js (v18+)
* npm

## Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally
To run the development server with hot-module replacement (HMR):
```bash
npm run dev
```

## Production Build
To create a production-ready optimized build:
```bash
npm run build
```
This will output the compiled files into the `dist/` directory.

## Admin System
The website includes an Admin Dashboard located at the `/admin` route.
- **Login Route**: `/admin/login`
- **Dashboard Route**: `/admin`
