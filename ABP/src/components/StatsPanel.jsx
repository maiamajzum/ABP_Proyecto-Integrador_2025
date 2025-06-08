function StatsPanel(props) {
  const {
    total,
    max,
    min,
    longTitleCount,
    totalPrice,
    averagePrice,
    averageDiscount,
    productsStockOver50,
    productsRatingOver45,
    averageRating
  } = props;

  return (
    <div className="bg-blue-500 p-6 rounded-lg shadow-xl mt-6 border-2 border-blue-600 text-black">
      <h2 className="text-xl font-bold mb-4">ESTADÍSTICAS DE PRODUCTOS FILTRADOS</h2>
      <p><strong>Productos totales:</strong> {total}</p>
      <p><strong>Producto más caro:</strong> {max ? `${max.title} - $${max.price}` : "N/A"}</p>
      <p><strong>Producto más barato:</strong> {min ? `${min.title} - $${min.price}` : "N/A"}</p>
      <p><strong>Cantidad de productos con título largo (más de 20 caracteres):</strong> {longTitleCount}</p>
      <p><strong>Precio total de productos:</strong> ${Number(totalPrice).toFixed(2)}</p>
      <p><strong>Promedio de precio:</strong> {total > 0 ? `$${(Number(totalPrice) / total).toFixed(2)}` : "N/A"}</p>
      <p><strong>Promedio de descuento:</strong> {averageDiscount ? `${averageDiscount.toFixed(2)}%` : "N/A"}</p>
      <p><strong>Productos con stock &gt; 50:</strong> {productsStockOver50}</p>
      <p><strong>Productos con rating &gt; 4.5:</strong> {productsRatingOver45}</p>
      <p><strong>Promedio de rating general:</strong> {averageRating ? averageRating.toFixed(2) : "N/A"}</p>
    </div>
  );
}

export default StatsPanel;
