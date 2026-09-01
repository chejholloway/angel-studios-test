# Testing Documentation

## Overview
Comprehensive test suite for the Cat-alog application using React Testing Library best practices.

## Test Stack
- **Vitest**: Fast unit test framework
- **React Testing Library**: Component testing with user-centric approach
- **MSW (Mock Service Worker)**: API mocking
- **jsdom**: DOM environment for Node.js
- **@testing-library/user-event**: Realistic user interaction simulation

## Installation

Run these commands in your terminal:

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest @vitest/ui msw jsdom
```

## Test Scripts

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI interface
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
```

## Test Structure

```
src/
├── test/
│   ├── setup.ts                    # Global test configuration
│   ├── utils/
│   │   └── testHelpers.ts          # Reusable test utilities
│   └── mocks/
│       └── handlers.ts             # MSW API handlers
├── services/
│   └── catApi.test.ts              # API service tests
├── components/
│   └── CatCard.test.tsx            # Component tests
└── App.test.tsx                    # Integration tests
```

## Test Coverage

### API Service Tests (`catApi.test.ts`)
- ✅ Random cat fetching
- ✅ Cat with text overlay
- ✅ Cat by tag filtering
- ✅ Available tags retrieval
- ✅ Error handling
- ✅ URL encoding
- ✅ Missing ID fallback

### Component Tests (`CatCard.test.tsx`)
- ✅ Image rendering
- ✅ Tags display (hover state)
- ✅ Click interactions
- ✅ Keyboard navigation (Enter/Space)
- ✅ ARIA attributes
- ✅ Lazy loading
- ✅ Accessibility

### Integration Tests (`App.test.tsx`)
- ✅ Initial render and layout
- ✅ Random cat feature
- ✅ Text overlay feature
- ✅ Tag filtering feature
- ✅ Cat collection display
- ✅ Detail view navigation
- ✅ Form interactions
- ✅ Error handling
- ✅ Accessibility features

## Testing Best Practices Applied

### 1. User-Centric Testing
Tests focus on what users see and interact with, not implementation details:
```tsx
// ✅ GOOD - Test user behavior
expect(screen.getByRole('button', { name: /get a random cat/i })).toBeInTheDocument()

// ❌ BAD - Test implementation
expect(component.state.isLoading).toBe(false)
```

### 2. Factory Functions
Reusable test utilities for consistent setup:
```tsx
export const mockCat = (overrides = {}) => ({
  id: 'cat-123',
  url: 'https://cataas.com/cat/cat-123',
  tags: ['cute', 'fluffy'],
  ...overrides,
})
```

### 3. Proper Mocking
MSW for API mocking at network level:
```tsx
http.get('https://cataas.com/cat', () => {
  return HttpResponse.json({ _id: 'cat-123', url: '/cat/cat-123' })
})
```

### 4. Accessibility Testing
Tests verify ARIA attributes, keyboard navigation, and semantic HTML:
```tsx
expect(screen.getByRole('button', { name: /get a random cat/i })).toBeInTheDocument()
expect(screen.getByLabelText(/add text to cat/i)).toBeInTheDocument()
```

### 5. User Event Simulation
Realistic user interactions with `@testing-library/user-event`:
```tsx
const user = userEvent.setup()
await user.type(input, 'hello')
await user.click(button)
```

### 6. Async Testing
Proper handling of async operations with `waitFor`:
```tsx
await waitFor(() => {
  expect(screen.getByText(/your collection \(1\)/i)).toBeInTheDocument()
})
```

## Running Tests

### Watch Mode (Development)
```bash
npm test
```
Tests run in watch mode, re-running on file changes.

### Single Run (CI/CD)
```bash
npm run test:run
```
Run tests once and exit.

### UI Mode
```bash
npm run test:ui
```
Interactive test UI with file filtering and test results visualization.

### Coverage Report
```bash
npm run test:coverage
```
Generate code coverage report showing test coverage percentages.

## Test Configuration

### Vitest Config (`vitest.config.ts`)
- jsdom environment for DOM testing
- Global test functions (describe, it, expect)
- Custom setup file for global mocks
- CSS support for Tailwind classes

### Test Setup (`src/test/setup.ts`)
- Jest-DOM custom matchers
- Automatic cleanup after each test
- IntersectionObserver mock
- matchMedia mock for responsive testing

## Mock Data

### Cat Image Factory
```tsx
export const mockCat = (overrides = {}) => ({
  id: 'cat-123',
  url: 'https://cataas.com/cat/cat-123',
  tags: ['cute', 'fluffy'],
  ...overrides,
})
```

### Collection Factory
```tsx
export const mockCatCollection = (count = 3) =>
  Array.from({ length: count }, (_, i) =>
    mockCat({
      id: `cat-${i}`,
      url: `https://cataas.com/cat/cat-${i}`,
      tags: [`tag-${i}`],
    })
  )
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Run tests
  run: npm run test:run

- name: Generate coverage
  run: npm run test:coverage
```

## Troubleshooting

### Tests timing out
- Increase timeout in vitest config
- Check for infinite loops in components
- Verify async operations complete

### MSW not intercepting requests
- Ensure server is started with `server.listen()`
- Check URL patterns match exactly
- Verify handlers are defined before test runs

### Component not rendering
- Check QueryClient wrapper is applied
- Verify all required props are provided
- Ensure no runtime errors in component

## Future Test Additions

Consider adding:
- E2E tests with Playwright
- Visual regression tests
- Performance benchmarks
- Component snapshot tests
- Integration tests with real API (staging)
