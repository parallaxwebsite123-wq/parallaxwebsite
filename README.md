# Parallax Perfumery Web App

## Overview
This is a high-performance e-commerce and marketing website for Parallax Perfumery, featuring an interactive marketplace, a custom sample builder, and an authenticated admin dashboard for managing content. 

## Tech Stack
* **Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + Framer Motion (for animations)
* **Backend & Database**: Firebase (Auth, Firestore, Storage, Hosting)
* **Icons**: Lucide React
* **Language**: TypeScript

## Project Structure
```
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, Modals)
│   ├── pages/           # Main route views (Home, Marketplace, AdminDashboard)
│   ├── App.tsx          # Router configuration
│   ├── firebase.ts      # Firebase initialization and exports
│   └── index.css        # Global CSS and Tailwind entrypoint
├── public/              # Static assets (fonts, images)
├── firebase.json        # Firebase deployment configuration
├── firestore.rules      # Firestore security rules
└── storage.rules        # Firebase Storage security rules
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

## Environment Setup
Currently, all Firebase client configuration keys are located directly in `src/firebase.ts`. Because this is a frontend Firebase application, these keys are intended to be public and rely on Firebase Security Rules for authorization. 

If you prefer to move these to environment variables, you can create a `.env` file in the root directory:
```
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
...
```
And update `src/firebase.ts` to use `import.meta.env.VITE_FIREBASE_API_KEY`.

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

## Deployment
This project is configured for **Firebase Hosting**. 

1. Ensure you have the Firebase CLI installed: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Deploy the application: 
   ```bash
   npm run deploy
   ```
*(Note: `npm run deploy` runs the build command and then `firebase deploy --only hosting`)*

## Authentication & Admin System
The website includes an authenticated Admin Dashboard located at the `/admin` route.
- **Login Route**: `/admin/login`
- **Dashboard Route**: `/admin`
- **Mechanism**: Uses Firebase Authentication (`signInWithEmailAndPassword`).
- **Functionality**: Allows administrators to upload and manage the Hero background video on the homepage. Video files are uploaded to **Firebase Storage** and the resulting URLs are saved to the `settings` collection in **Firestore Database**.

## Firebase / Database Architecture
* **Firestore Database**: 
  * Collection: `settings`
    * Document: `hero-video` (Stores `{ url: string, path: string }`)
  * *Rules*: Currently configured in `firestore.rules`.
* **Firebase Storage**:
  * Folder: `/hero-videos` (Stores the raw `.mp4` files)
  * *Rules*: Currently configured in `storage.rules`.

*Note: Both Storage and Firestore currently have open read/write access (`allow read, write: if true;`) to facilitate testing and uploading. For a strict production environment, these rules should be tightened (e.g., `allow write: if request.auth != null;`).*

## Known Issues / Technical Debt
* **Dead Routes**: There are no dead routes, but `OrderSuccess` and `Shop` components were previously deprecated in favor of `RequestSuccess` and `Marketplace`. These obsolete files have been removed to keep the repository clean.
* **Firebase Config**: Keys are hardcoded in `src/firebase.ts`. This ensures a seamless one-click run experience, but can be extracted to `.env` if desired.

## Handoff Notes
* To manage the background video on the homepage, log in at `/admin/login`.
* If Firebase Storage uploads hang or fail with permission errors, verify that `storage.rules` has been deployed successfully to your Firebase Project (`firebase deploy --only storage`).
