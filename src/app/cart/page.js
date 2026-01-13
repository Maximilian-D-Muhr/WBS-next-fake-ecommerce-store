'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/formatPrice';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  // Calculate line total for a cart item
  const getLineTotal = (item) => {
    return item.price * item.quantity;
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-base-content/70 mb-6">
          Add some products to get started!
        </p>
        <Link href="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>
        <button onClick={clearCart} className="btn btn-outline btn-error btn-sm">
          Clear Cart
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Line Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm opacity-50">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{formatPrice(item.price)}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = parseInt(e.target.value) || 1;
                        updateQuantity(item.id, newQty);
                      }}
                      className="input input-bordered input-xs w-16 text-center"
                    />
                    <button
                      onClick={() => addToCart(item)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="font-bold text-primary">
                  {formatPrice(getLineTotal(item))}
                </td>
                <td>
                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right font-bold text-lg">
                Grand Total:
              </td>
              <td className="font-bold text-2xl text-primary">
                {formatPrice(getTotalPrice())}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/" className="btn btn-outline">
          Continue Shopping
        </Link>
        <button className="btn btn-primary">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
