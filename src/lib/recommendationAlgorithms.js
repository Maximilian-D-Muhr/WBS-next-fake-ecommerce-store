const MAX_RECOMMENDATIONS = 3;

/**
 * Get product recommendations based on cart items
 * @param {Array} cart - Current cart items
 * @param {Array} allProducts - All available products
 * @param {string} algorithm - Algorithm type: 'category', 'price', or 'popular'
 * @returns {Array} Array of recommended products (max 3)
 */
export function getRecommendations(cart, allProducts, algorithm = 'category') {
  // If cart is empty, return empty array
  if (!cart || cart.length === 0) {
    return [];
  }

  // Get IDs of products already in cart
  const cartProductIds = cart.map((item) => item.id);

  // Filter out products already in cart
  const availableProducts = allProducts.filter(
    (product) => !cartProductIds.includes(product.id)
  );

  let recommendations = [];

  switch (algorithm) {
    case 'category':
      recommendations = matchByCategory(cart, availableProducts);
      break;
    case 'price':
      recommendations = matchByPrice(cart, availableProducts);
      break;
    case 'popular':
      recommendations = matchByPopularity(cart, availableProducts);
      break;
    default:
      recommendations = matchByCategory(cart, availableProducts);
  }

  return recommendations.slice(0, MAX_RECOMMENDATIONS);
}

/**
 * Algorithm 1: Match by Category
 * Returns products from same categories as items in cart
 */
function matchByCategory(cart, availableProducts) {
  // Get unique categories from cart
  const cartCategories = [...new Set(cart.map((item) => item.category))];

  // Filter products that match cart categories
  const matchingProducts = availableProducts.filter((product) =>
    cartCategories.includes(product.category)
  );

  // If not enough matches, add random products
  if (matchingProducts.length < MAX_RECOMMENDATIONS) {
    const remaining = availableProducts.filter(
      (p) => !matchingProducts.includes(p)
    );
    return [...matchingProducts, ...remaining].slice(0, MAX_RECOMMENDATIONS);
  }

  return matchingProducts;
}

/**
 * Algorithm 2: Match by Price Range
 * Returns products in similar price range as cart items
 */
function matchByPrice(cart, availableProducts) {
  // Calculate average price in cart
  const avgPrice = cart.reduce((sum, item) => sum + item.price, 0) / cart.length;

  // Define price range (±30% of average)
  const priceRange = avgPrice * 0.3;
  const minPrice = avgPrice - priceRange;
  const maxPrice = avgPrice + priceRange;

  // Filter products within price range
  const matchingProducts = availableProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  // Sort by how close to average price
  matchingProducts.sort(
    (a, b) => Math.abs(a.price - avgPrice) - Math.abs(b.price - avgPrice)
  );

  // If not enough matches, add random products
  if (matchingProducts.length < MAX_RECOMMENDATIONS) {
    const remaining = availableProducts.filter(
      (p) => !matchingProducts.includes(p)
    );
    return [...matchingProducts, ...remaining].slice(0, MAX_RECOMMENDATIONS);
  }

  return matchingProducts;
}

/**
 * Algorithm 3: Match by Popularity (Rating)
 * Returns highest rated products not in cart
 */
function matchByPopularity(cart, availableProducts) {
  // Sort by rating (highest first)
  const sortedByRating = [...availableProducts].sort((a, b) => {
    const ratingA = a.rating?.rate || 0;
    const ratingB = b.rating?.rate || 0;
    return ratingB - ratingA;
  });

  return sortedByRating;
}
