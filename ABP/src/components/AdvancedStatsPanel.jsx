function AdvancedStatsPanel({ statsByCategory, countByCategory }) {
  return (
    <div
     className="
      p-6 
      rounded-lg 
      shadow-md 
      mt-6 
      border 
      bg-white 
      border-gray-300 
      text-black   
      
     "
>
      <h2 className="text-xl font-bold mb-4">Estadísticas por Categoría</h2>

      {Object.entries(statsByCategory).map(([cat, stats]) => (
        <div key={cat} className="mb-4">
          <h4 className="font-semibold text-md text-blue-700 dark:text-blue-300">{cat}</h4>
          <p><strong>Cantidad de productos:</strong> {countByCategory?.[cat] ?? 0}</p>
          <p><strong>Promedio de precio:</strong> ${stats.count > 0 ? (stats.totalPrice / stats.count).toFixed(2) : "N/A"}</p>
          <p><strong>Producto más caro:</strong> {stats.maxProduct?.title ?? "N/A"} - ${stats.maxProduct?.price ?? "N/A"}</p>
          <p><strong>Producto más barato:</strong> {stats.minProduct?.title ?? "N/A"} - ${stats.minProduct?.price ?? "N/A"}</p>
          <p><strong>Promedio de rating:</strong> {stats.count > 0 ? (stats.totalRating / stats.count).toFixed(2) : "N/A"}</p>
        </div>
      ))}
    </div>
  );
}

export default AdvancedStatsPanel;