# Fake Store - E-Commerce Application

A modern e-commerce application built with Next.js 16 (App Router) using the FakeStoreAPI. This project demonstrates server-side rendering, client-side interactivity, state management, and smart product recommendations.

## Project Goal

This project is part of the WBS Coding School curriculum and demonstrates:
- Implementation of Next.js App Router architecture
- Server vs Client Component patterns
- State management with React Context and localStorage
- Dynamic routing and data fetching from external APIs
- Recommendation algorithms with switchable logic
- Responsive UI design with Tailwind CSS and DaisyUI

**Course Reference:** [Next.js Fake E-Commerce Site](https://learn.wbscodingschool.com/courses/software-engineering/lessons/nextjs/topic/%f0%9f%a7%a9-fake-ecommerce-site-2/)

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS 4.x + DaisyUI 5.5.14
- **Data Source:** [FakeStoreAPI](https://fakestoreapi.com/)
- **State Management:** React Context API
- **Persistence:** localStorage

## Key Features

### Server-Side Rendering
- Product data fetched server-side for optimal performance
- Category filtering with dynamic routes
- SEO-friendly page generation

### Shopping Cart
- Add/remove products with quantity controls
- Persistent cart state using localStorage
- Real-time cart badge in navigation
- Inline quantity editing on cart page

### Smart Recommendations
- Three switchable recommendation algorithms:
  - **By Category:** Matches products from same categories as cart items
  - **By Price:** Suggests products in similar price range (±30%)
  - **Popular:** Shows highest-rated products
- Skeleton loading states during algorithm switching
- Visual feedback when cart is empty

### Dynamic Category Pages
- Server-side product filtering by category
- Breadcrumb navigation
- Click-to-filter from category badges on home page

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with CartProvider
│   ├── page.js                # Home page (Server Component)
│   ├── globals.css            # Tailwind + DaisyUI configuration
│   ├── error.js               # Error boundary
│   ├── loading.js             # Loading state
│   ├── cart/
│   │   └── page.js            # Shopping cart (Client Component)
│   └── category/
│       └── [slug]/
│           └── page.js        # Dynamic category pages
├── components/
│   ├── Navigation.js          # Navbar with cart badge
│   ├── CategoryList.js        # Clickable category badges
│   ├── ProductCard.js         # Product card with cart controls
│   └── RecommendationsClient.js  # Recommendation engine
├── lib/
│   ├── cartContext.js         # Cart state management
│   ├── formatPrice.js         # Euro price formatting
│   └── recommendationAlgorithms.js  # Algorithm implementations
└── hooks/
    └── useLocalStorage.js     # localStorage synchronization
```

## Setup

### Prerequisites
- Node.js 20+ (project uses Node 24)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-fake-ecommerce-store
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Implementation Highlights

### Server vs Client Components

**Server Components (default):**
- Home page with product and category fetching
- Category pages with filtered products
- Static content rendering

**Client Components (opt-in with 'use client'):**
- Shopping cart state management
- Product cards with add-to-cart functionality
- Recommendation engine with algorithm switching
- Navigation with dynamic cart badge

### Cart Logic

- Cart stored in localStorage with key: `fakestore-cart`
- Quantity constraints: never goes below 0, auto-removes at 0
- Cart structure: `[{ ...product, quantity: number }]`
- Context API provides global access across all components

### Price Formatting

Uses `Intl.NumberFormat` with German locale for Euro currency:
```javascript
new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})
```

### Recommendation Algorithms

All algorithms are implemented in `src/lib/recommendationAlgorithms.js` and can be edited independently:
- Filters out products already in cart
- Returns maximum 3 products
- Falls back to alternative products if insufficient matches

## Deployment

This project can be deployed to Vercel with zero configuration:
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings

## Author

Maximilian D. Muhr - WBS Coding School

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [FakeStoreAPI Documentation](https://fakestoreapi.com/docs)
