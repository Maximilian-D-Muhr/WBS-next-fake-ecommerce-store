'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/formatPrice';

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10 h-48 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          className="object-contain max-h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base line-clamp-2">{product.title}</h2>
        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
        <Link
          href={`/category/${product.category}`}
          className="text-sm text-base-content/70 hover:text-primary"
        >
          {product.category}
        </Link>
        <div className="card-actions justify-end mt-4">
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary btn-block"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => removeFromCart(product.id)}
                className="btn btn-outline btn-error flex-1"
              >
                -
              </button>
              <span className="font-bold text-lg px-4">{quantity}</span>
              <button
                onClick={() => addToCart(product)}
                className="btn btn-outline btn-success flex-1"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
