# Cat-alog - Angel Studios Interview Implementation

## Overview
A cat image collection application built for the Angel Studios Senior Front End Engineer interview.

## Tech Stack
- **React 19** with TypeScript
- **Tailwind CSS v4** with custom theme
- **TanStack Query** for data fetching
- **Vite** for build tooling

## Features Implemented

### User Stories Completed
✅ **As a user, I can see all of the cats I have retrieved within this session**
- Session-based cat collection stored in component state
- Grid layout with responsive design (2-4 columns based on screen size)

✅ **As a user, I can retrieve a random cat and see it's picture**
- "Get Random Cat" button fetches a random cat from the Cat as a Service API
- Images displayed in a responsive card grid

✅ **As a user, I can retrieve a random cat with a text phrase**
- Text input field allows adding custom text to cat images
- Uses the `/cat/says/:text` API endpoint

✅ **As a user, I can retrieve a random cat using the tags provided by the API**
- Dropdown selector with available tags from the API
- Limited to top 20 tags for performance
- Uses the `/cat/:tag` API endpoint

✅ **As a user, I am delighted by an animation as the new images enter my screen**
- Staggered fade-in-up animation for new cat cards
- 50ms delay between each card for visual cascade effect
- Respects `prefers-reduced-motion` for accessibility

✅ **As a user, I can navigate to a "detail" page for a single image**
- Click on any cat card to open an accessible modal dialog
- Shows full-size image with cat ID and tags
- Close via X button, Escape key, backdrop click, or Header back button
- Focus trap and focus restoration implemented
- Modal enter/exit animations with reduced-motion support

### Design Requirements
✅ **Semantic HTML**
- Proper use of `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Logical heading hierarchy (h1, h2)
- ARIA labels for interactive elements
- Skip to main content link for keyboard navigation

✅ **Meta Data for SEO**
- Updated title tag
- Meta description
- Keywords
- Open Graph tags for social sharing
- Author meta tag

✅ **Color Palette**
- PRIMARY: #7A5D58
- ACCENT: #EF5A50
- BACKGROUND: #D2AC92
- Custom Tailwind theme configuration

## Accessibility Features
- Keyboard navigation support
- ARIA labels on all interactive elements
- Focus indicators on buttons and inputs
- Form labels with proper associations
- Alt text on all images
- Reduced motion support
- Skip to main content link
- Semantic HTML structure
- Accessible modal dialog with focus trap
- Escape key closes modal
- Backdrop click closes modal
- Focus returns to triggering element on close
- Background content marked inert when modal is open

## Project Structure
```
src/
├── components/
│   ├── CatCard.tsx          # Reusable cat image card component
│   ├── CatList.tsx          # Grid container with animation stagger
│   ├── Controls.tsx         # Random cat, text overlay, and tag filter controls
│   ├── DetailView.tsx       # Accessible modal dialog for cat details
│   ├── Footer.tsx           # App footer
│   └── Header.tsx           # App header with back button
├── services/
│   └── catApi.ts            # Cat as a Service API client
├── providers/
│   └── QueryProvider.tsx    # TanStack Query provider
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── input.css                # Tailwind v4 with custom theme
```

## API Integration
Uses the Cat as a Service API (https://cataas.com/doc.html):
- `/cat?json=true` - Random cat
- `/cat/says/:text?json=true` - Cat with text overlay
- `/cat/:tag?json=true` - Cat by tag
- `/api/tags` - Available tags

## Running the Application
```bash
npm install
npm run dev
```
The application will be available at http://localhost:3000

## Build for Production
```bash
npm run build
```

## Notes for Interview
- State management: React useState for cat collection
- Data fetching: TanStack Query for tags, direct fetch for cats
- Styling: Tailwind v4 utility classes with custom theme
- Animations: CSS keyframes with staggered delays and modal transitions
- Accessibility: WCAG 2.1 Level AA compliant patterns including accessible modal dialog
- Error handling: Try-catch blocks with console logging
- Type safety: Full TypeScript coverage with interfaces
- Modal: Portal-based with focus trap, Escape/backdrop close, focus restoration, and reduced-motion support
