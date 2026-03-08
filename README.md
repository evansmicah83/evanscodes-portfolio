# Evans Micah Portfolio

This is a personal portfolio website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. The design is mobile-first and makes heavy use of responsive utilities.

## Features

- Responsive layout with a fixed header and mobile navigation drawer
- Smooth scrolling to sections
- Contact form with serverless API endpoint
- Animated hero section using Framer Motion
- Light/dark theme toggling and math-enabled code examples

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. The project uses the App Router (`/app` directory) and includes a viewport meta tag for proper mobile scaling.

## Notes on Responsiveness

- The header now includes a hamburger menu on screens smaller than `lg` and renders a full-screen overlay when opened.
- A `useEffect` hook prevents background scrolling while the mobile menu is visible.
- The layout exports a `viewport` constant to ensure the correct meta tag is injected by Next.js.
- All components utilise Tailwind's responsive utilities (`sm:`, `md:`, `lg:` prefixes).

## Deploy

This application can be deployed to platforms like Vercel or Netlify.
