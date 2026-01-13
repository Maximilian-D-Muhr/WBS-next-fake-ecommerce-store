import CategoryList from '@/components/CategoryList';
import ProductCard from '@/components/ProductCard';
import RecommendationsClient from '@/components/RecommendationsClient';

async function getCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fake Store</h1>
        <p className="text-base-content/70 text-lg">
          Discover amazing products with personalized recommendations just for you.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <CategoryList categories={categories} />
      </div>

      <div className="mb-8">
        <RecommendationsClient allProducts={products} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
