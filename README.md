# Cat-alog 🐱

A delightful cat image collection application built for the Angel Studios Senior Front End Engineer interview. Fetch, collect, and explore random cat images with custom text overlays and tag-based filtering.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.3-38bdf8)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6e9f18)

## ✨ Features

- **🎲 Random Cat Fetching** - Get random cat images instantly
- **✍️ Text Overlay** - Add custom text to cat images
- **🏷️ Tag Filtering** - Browse cats by categories (cute, fluffy, funny, etc.)
- **🖼️ Detail View** - Click any cat card to open an accessible modal dialog with full-size image, ID, and tags
- **📱 Mobile-First Design** - Fully responsive across all devices
- **♿ Accessible** - WCAG 2.1 Level AA compliant with keyboard navigation
- **🎨 Beautiful UI** - Custom color palette with smooth animations
- **🧪 Comprehensive Tests** - Full test coverage with React Testing Library

## 🚀 Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with custom theme
- **TanStack Query** - Efficient data fetching and caching
- **Vite** - Lightning-fast build tool
- **Vitest** - Modern testing framework
- **MSW** - API mocking for tests
- **Cat as a Service API** - Cat image provider

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd angel-studios-test

# Install dependencies
npm install
```

## 🏃 Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 🎨 Customization

### Color Palette

The application uses a custom Tailwind theme with these brand colors:

- **Primary**: `#7A5D58` - Warm brown
- **Accent**: `#EF5A50` - Vibrant coral
- **Background**: `#D2AC92` - Soft beige

### API Configuration

The app uses the [Cat as a Service API](https://cataas.com/doc.html):
- Base URL: `https://cataas.com`
- Endpoints: `/cat?json=true`, `/cat/says/:text?json=true`, `/cat/:tag?json=true`, `/api/tags`

## 📁 Project Structure

```
src/
├── components/
│   ├── CatCard.tsx            # Reusable cat image card with hover effects
│   ├── CatList.tsx            # Grid container with animation stagger
│   ├── Controls.tsx           # Random cat, text overlay, and tag filter controls
│   ├── DetailView.tsx         # Accessible modal dialog for cat details
│   ├── Footer.tsx             # App footer
│   └── Header.tsx             # App header with back button
├── services/
│   └── catApi.ts              # Cat as a Service API client
├── providers/
│   └── QueryProvider.tsx      # TanStack Query setup with devtools
├── test/
│   ├── setup.ts               # Global test configuration
│   ├── utils/
│   │   └── testHelpers.tsx    # Test utilities and data factories
│   └── mocks/
│       └── handlers.ts        # MSW API handlers
├── App.tsx                    # Main application component
├── main.tsx                   # React entry point with QueryClientProvider
└── input.css                  # Tailwind v4 with custom theme
```

## 🎯 User Stories Implemented

✅ As a user, I can see all of the cats I have retrieved within this session  
✅ As a user, I can retrieve a random cat and see it's picture  
✅ As a user, I can retrieve a random cat with a text phrase  
✅ As a user, I can retrieve a random cat using the tags provided by the API  
✅ As a user, I am delighted by an animation as the new images enter my screen  
✅ As a user, I can navigate to a "detail" page for a single image  

## ♿ Accessibility

- Semantic HTML structure with proper heading hierarchy
- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Space)
- Focus indicators for all interactive elements
- Skip to main content link
- Reduced motion support for animations
- Proper form labels and associations
- Alt text on all images
- Touch-friendly targets (minimum 44x44px)

## 📱 Responsive Design

- **Mobile**: 1 column grid, optimized touch targets
- **Small Tablets**: 2 columns
- **Tablets**: 3 columns  
- **Desktop**: 4 columns
- Progressive enhancement from mobile to desktop

## 🔧 Development

### Linting

```bash
npm run lint
```

### Type Checking

```bash
tsc --noEmit
```

## 📝 Documentation

- [INTERVIEW_NOTES.md](./INTERVIEW_NOTES.md) - Technical implementation details
- [TESTING.md](./TESTING.md) - Comprehensive testing documentation
- [Angel Studios Test.md](./Angel%20Studios%20Test.md) - Original interview requirements

## 🚧 Roadmap

- [x] **DetailView Modal** - Convert inline detail view to an accessible Tailwind CSS modal dialog with focus trap and ESC-to-close
- [ ] **Image Optimization** - Add `next/image` or equivalent for responsive image loading

## 🤝 Contributing

This project was built as an interview exercise. For contributions or questions, please contact the original author.

## 📄 License

This project is provided as-is for interview purposes.

## 👨‍💻 Author

**Built with ❤️ by Che' J. Holloway**

Created for the Angel Studios Senior Front End Engineer interview.

---

**Note**: This application demonstrates modern React patterns, TypeScript best practices, accessible design, and comprehensive testing suitable for production applications.
