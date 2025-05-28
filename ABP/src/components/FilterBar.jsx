function FilterBar({
  category,
  onCategoryChange,
  categories,
  sortOption,
  onSortChange
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-end">
      
      {/*Filtro por categoría*/}
      <div>
        <label className="block mb-1 text-sm font-semibold">Filtrar por categoría:</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-64"
        >
          <option value="all">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*Ordenamiento */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Ordenar por:</label>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-64"
        >
          <option value="">Sin orden</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="rating-asc">Rating: menor a mayor</option>
          <option value="rating-desc">Rating: mayor a menor</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;