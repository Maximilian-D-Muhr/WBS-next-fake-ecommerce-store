'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

export default function Navigation() {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Fake Store
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/cart" className="indicator">
                Cart
                {itemCount > 0 && (
                  <span className="indicator-item badge badge-primary badge-sm">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
