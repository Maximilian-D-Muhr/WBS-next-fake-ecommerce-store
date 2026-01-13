# Fake Store - E-Commerce Demo

A modern e-commerce application built with Next.js 16 (App Router), featuring smart product recommendations, shopping cart functionality, and a clean UI powered by DaisyUI.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse all products from FakeStoreAPI
- **Category Display**: Visual category badges for easy navigation
- **Shopping Cart**: Full cart management with localStorage persistence
- **Smart Recommendations**: 3 AI-powered recommendation algorithms
- **Real-time Updates**: Cart badge updates instantly across the app

### Smart Recommendations Engine
The app features a sophisticated recommendation system with three switchable algorithms:

1. **By Category**: Matches products from the same categories as items in your cart
2. **By Price**: Suggests products in similar price ranges (±30% of cart average)
3. **Popular**: Shows highest-rated products not already in your cart

- Shows skeleton loaders during algorithm switching
- Displays personalized message when cart is empty
- Auto-refreshes when cart contents change

### Shopping Cart Features
- Add/remove items with quantity controls
- Inline quantity editing in cart table
- Line totals and grand total calculations
- LocalStorage persistence (cart survives page refresh)
- Clear cart functionality
- Empty cart state with helpful message

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| DaisyUI | 5.5.14 | Component library for Tailwind |
| FakeStoreAPI | - | Product data API |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with Navigation + CartProvider
│   ├── page.js                # Home page (Server Component)
│   ├── error.js               # Error boundary
│   ├── loading.js             # Loading state
│   ├── globals.css            # Tailwind + DaisyUI imports
│   └── cart/
│       └── page.js            # Cart page (Client Component)
├── components/
│   ├── Navigation.js          # Navbar with cart badge (Client)
│   ├── CategoryList.js        # Category badges (Server)
│   ├── ProductCard.js         # Product card with cart controls (Client)
│   └── RecommendationsClient.js  # Recommendations with algorithms (Client)
├── lib/
│   ├── cartContext.js         # Cart state management (Context API)
│   ├── formatPrice.js         # Euro price formatting utility
│   └── recommendationAlgorithms.js  # 3 recommendation algorithms
└── hooks/
    └── useLocalStorage.js     # LocalStorage sync hook
```

## 🎯 Architecture Highlights

### Server vs Client Components
- **Server Components** (default): Home page, categories, product fetching
- **Client Components** (opt-in): Cart, product cards, recommendations, navigation
- Data fetched server-side for instant page loads
- Cart state managed client-side with Context API

### State Management
- **Cart State**: React Context + localStorage for persistence
- **Recommendations**: Client-side computation based on cart contents
- **URL State**: File-based routing with Next.js App Router

### Key Patterns Used
- Server-first rendering for optimal performance
- Client boundaries for interactivity
- Error boundaries for graceful error handling
- Suspense boundaries for loading states
- localStorage hydration without hydration mismatches

## 🚦 Getting Started

### Prerequisites
- Node.js 20+ (project uses Node 24)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
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

## 🎨 Design System

### DaisyUI Components Used
- `navbar` - Navigation bar
- `card` - Product cards
- `badge` - Categories and cart count
- `table` - Cart table
- `btn` - All buttons with variants
- `skeleton` - Loading placeholders
- `indicator` - Cart badge indicator
- `loading-spinner` - Loading animation

### Color Scheme
- Primary: Blue (used for actions and highlights)
- Error: Red (remove/decrease actions)
- Success: Green (add/increase actions)
- Base: Neutral grays (backgrounds and text)

### Responsive Breakpoints
- Mobile: 1 column product grid
- Tablet (md): 2-3 columns
- Desktop (lg): 3 columns
- Large Desktop (xl): 4 columns

## 🧪 Testing the App

### Manual Test Checklist

1. **Home Page**
   - [ ] Products load and display correctly
   - [ ] Categories show as badges
   - [ ] Prices formatted in Euros (€)
   - [ ] Add to cart button appears on products

2. **Cart Functionality**
   - [ ] Add product → shows quantity controls
   - [ ] Increase/decrease quantity works
   - [ ] Remove button removes item
   - [ ] Cart badge updates in navigation
   - [ ] LocalStorage persists on refresh

3. **Recommendations**
   - [ ] Shows message when cart is empty
   - [ ] Displays 3 products when cart has items
   - [ ] Algorithm toggle buttons work
   - [ ] Skeleton loaders appear during switch
   - [ ] Doesn't show products already in cart

4. **Cart Page**
   - [ ] Table displays all cart items
   - [ ] Line totals calculate correctly
   - [ ] Grand total is accurate
   - [ ] Quantity controls work inline
   - [ ] Empty cart shows helpful message

5. **Edge Cases**
   - [ ] Decreasing quantity to 0 removes item
   - [ ] Clear cart empties everything
   - [ ] Page refresh preserves cart
   - [ ] Error boundary shows on API failure

## 🔧 Configuration

### Environment Variables
No environment variables required - API is public and unauthenticated.

### Tailwind Configuration
Configured in `postcss.config.mjs` with DaisyUI plugin imported in `globals.css`:
```css
@import "tailwindcss";
@plugin "daisyui";
```

## 📝 Key Implementation Details

### Cart Logic
- Quantity never goes below 0
- Item automatically removed when quantity reaches 0
- Cart stored in localStorage with key: `fakestore-cart`
- Cart structure: `[{ ...product, quantity: number }]`

### Price Formatting
Uses `Intl.NumberFormat` with German locale (de-DE) for Euro formatting:
```javascript
new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})
```

### Recommendation Algorithms
All algorithms are editable in `src/lib/recommendationAlgorithms.js`:
- **Category Match**: Filters products by matching cart categories
- **Price Match**: Finds products within ±30% of average cart price
- **Popularity**: Sorts by rating (highest first)

## 🚀 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings
4. No build configuration needed

### Build Optimization
- Next.js automatically optimizes images
- Server Components reduce JavaScript bundle
- Static generation where possible
- API routes cached appropriately

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [FakeStoreAPI](https://fakestoreapi.com/)

## 🎓 Educational Value

This project demonstrates:
- Next.js App Router architecture
- Server vs Client Component decisions
- State management with Context API
- LocalStorage persistence patterns
- Recommendation algorithm implementation
- Error handling and loading states
- Responsive design with Tailwind/DaisyUI

## 📄 License

This project is for educational purposes as part of WBS Coding School curriculum.

## 🙏 Acknowledgments

- **FakeStoreAPI** for providing free product data
- **Vercel** for Next.js framework
- **DaisyUI** for beautiful Tailwind components
- **WBS Coding School** for the learning opportunity

---

**Built with ❤️ using Next.js and DaisyUI**
