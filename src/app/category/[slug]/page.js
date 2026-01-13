import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

async function getCategoryProducts(category) {
  // Decode the URL-encoded category name
  const decodedCategory = decodeURIComponent(category);

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${decodedCategory}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch category products');
  return res.json();
}

// Format category name for display
function formatCategoryName(slug) {
  const decoded = decodeURIComponent(slug);
  // Capitalize first letter of each word
  return decoded
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const products = await getCategoryProducts(slug);
  const categoryName = formatCategoryName(slug);

  return (
    <div>
      <div className="mb-8">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>{categoryName}</li>
          </ul>
        </div>
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-base-content/70">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-base-content/70 text-lg">
            No products found in this category.
          </p>
          <Link href="/" className="btn btn-primary mt-4">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
