import Link from 'next/link';

export default function CategoryList({ categories }) {
  // Convert category name to URL-safe slug using encodeURIComponent
  const categoryToSlug = (category) => {
    return encodeURIComponent(category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/category/${categoryToSlug(category)}`}
          className="badge badge-primary badge-lg hover:badge-secondary transition-colors cursor-pointer"
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
