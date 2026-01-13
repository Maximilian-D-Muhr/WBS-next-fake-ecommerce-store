export default function CategoryList({ categories }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <div key={category} className="badge badge-primary badge-lg">
          {category}
        </div>
      ))}
    </div>
  );
}
