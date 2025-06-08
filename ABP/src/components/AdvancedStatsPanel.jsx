function AdvancedStatsPanel({
  statsByCategory,
  productsOverStock50,
  productsHighRating,
  averageRatingGeneral
}) {
  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md mt-6 border border-green-300">
      <h2 className="text-xl font-bold mb-4">ESTADÍSTICAS GENERALES</h2>
      <p>Productos con stock &gt; 50: {productsOverStock50}</p>
      <p>Productos con rating &gt; 4.5: {productsHighRating}</p>
      <p>Promedio de rating general: {averageRatingGeneral.toFixed(2)}</p>
      <hr className="my-4" />
      <h3 className="font-semibold text-lg mb-2">ESTADÍSTICAS POR CATEGORÍA:</h3>
      {Object.entries(statsByCategory).map(([cat, stats]) => (
        <div key={cat} className="mb-4">
          <h4 className="font-semibold text-md text-blue-700">{cat}</h4>
          <p>Promedio de precio: ${(stats.totalPrice / stats.count).toFixed(2)}</p>
          <p>Producto más caro: {stats.maxProduct.title} - ${stats.maxProduct.price}</p>
          <p>Producto más barato: {stats.minProduct.title} - ${stats.minProduct.price}</p>
          <p>Promedio de rating: {(stats.totalRating / stats.count).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default AdvancedStatsPanel;