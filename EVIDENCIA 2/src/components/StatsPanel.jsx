function StatsPanel(props) {  

    return (
   
       <div className="bg-blue-200 p-6 rounded-lg shadow-xl mt-6 border-2 border-blue-300">
            <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
            <p>Productos totales: {props.total}</p>
            <p>Producto más caro: {props.max ? `${props.max.title} - $${props.max.price}` : "N/A"}</p>
            <p>Producto más barato: {props.min ? `${props.min.title} - $${props.min.price}` : "N/A"}</p>
            <p>Cantidad de productos con título largo (más de 20 caracteres): {props.longTitleCount}</p>
            <p>Precio total de productos: ${props.totalPrice.toFixed(2)}</p>
            <p>Promedio de descuento: {props.averageDiscount.toFixed(2)}%</p>
            </div>
    );
}
export default StatsPanel;
