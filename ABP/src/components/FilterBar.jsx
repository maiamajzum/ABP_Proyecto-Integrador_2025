function FilterBar({ category, onCategoryChange, categories, sortOption, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Selector de categoría */}
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md"
      >
        <option value="all">Todas</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
      </select>

      {/* Selector de ordenamiento */}
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md"
      >
        <option value="">Ordenar por</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="rating-asc">Rating: menor a mayor</option>
        <option value="rating-desc">Rating: mayor a menor</option>
      </select>
    </div>
  );
}

export default FilterBar;