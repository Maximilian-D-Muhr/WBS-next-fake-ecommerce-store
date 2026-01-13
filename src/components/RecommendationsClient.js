'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';
import { getRecommendations } from '@/lib/recommendationAlgorithms';
import ProductCard from './ProductCard';

const ALGORITHMS = [
  { id: 'category', label: 'By Category' },
  { id: 'price', label: 'By Price' },
  { id: 'popular', label: 'Popular' },
];

export default function RecommendationsClient({ allProducts }) {
  const { cart, isInitialized } = useCart();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('category');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Generate recommendations whenever cart or algorithm changes
  useEffect(() => {
    if (!isInitialized) return;

    setIsLoading(true);

    // Simulate loading delay for skeleton demo
    const timeout = setTimeout(() => {
      const results = getRecommendations(cart, allProducts, selectedAlgorithm);
      setRecommendations(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [cart, allProducts, selectedAlgorithm, isInitialized]);

  // Show nothing until cart is initialized
  if (!isInitialized) {
    return null;
  }

  // Show message if cart is empty
  if (cart.length === 0) {
    return (
      <div className="bg-base-200 rounded-lg p-8 text-center">
        <p className="text-base-content/70 text-lg">
          Add items to your cart to see personalized recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Recommended for You</h2>
        <div className="flex gap-2">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgorithm(algo.id)}
              className={`btn btn-sm ${
                selectedAlgorithm === algo.id ? 'btn-primary' : 'btn-outline'
              }`}
            >
              {algo.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow-xl">
              <div className="skeleton h-48 w-full rounded-t-2xl"></div>
              <div className="card-body">
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-4 w-2/3 mb-4"></div>
                <div className="skeleton h-8 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-base-content/70">
          No recommendations available at the moment.
        </div>
      )}
    </div>
  );
}
