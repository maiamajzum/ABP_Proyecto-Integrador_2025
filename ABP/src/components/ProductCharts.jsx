import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

function ProductCharts({ filteredProducts }) {
  // Datos: cantidad de productos por categoría
  const countByCategory = {};
  filteredProducts.forEach(p => {
    countByCategory[p.category] = (countByCategory[p.category] || 0) + 1;
  });
  const categoryData = Object.entries(countByCategory).map(([category, cantidad]) => ({
    category,
    cantidad,
  }));

  // Datos: evolución simulada de precios con 2 decimales
  const simulatedPriceData = filteredProducts.map((p, i) => ({
    name: `Día ${i + 1}`,
    precio: +(p.price + (Math.random() * 10 - 5)).toFixed(2),
  }));

  // Datos: proporción por stock con nombres de productos
  const stockData = [
    {
      name: "Stock bajo (menos de  50)",
      value: filteredProducts.filter(p => p.stock < 50).length,
      products: filteredProducts.filter(p => p.stock < 50).map(p => p.title),
    },
    {
      name: "Stock alto (mas de  50)",
      value: filteredProducts.filter(p => p.stock >= 50).length,
      products: filteredProducts.filter(p => p.stock >= 50).map(p => p.title),
    },
  ];

  const pieColors = ["#8884d8", "#82ca9d"];

  return (
    <div className="mt-8 space-y-10">
      {/* Gráfico de barras: productos por categoría */}
      <div className="w-full h-72">
        <h3 className="text-lg font-semibold mb-2">Cantidad de productos por categoría</h3>
        <ResponsiveContainer>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fill: "gray" }} />
            <YAxis tick={{ fill: "gray" }} />
            <Tooltip               
              labelStyle={{ color: "gray" }}
            />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de líneas: evolución simulada de precios */}
      <div className="w-full h-72">
        <h3 className="text-lg font-semibold mb-2">Evolución simulada de precios</h3>
        <ResponsiveContainer>
          <LineChart data={simulatedPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              labelStyle={{ color: "gray" }}
            />
            <Line type="monotone" dataKey="precio" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de torta: proporción por stock */}
      <div className="w-full h-72">
        <h3 className="text-lg font-semibold mb-2">Proporción según stock</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={stockData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {stockData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Listado de productos por grupo de stock */}
      <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        <h4 className="font-semibold">Productos con stock bajo:</h4>
        <ul className="list-disc ml-5 mb-4 max-h-40 overflow-y-auto pr-2">
          {stockData[0].products.map((title, i) => (
            <li key={i}>{title}</li>
          ))}
        </ul>

        <h4 className="font-semibold">Productos con stock alto:</h4>
        <ul className="list-disc ml-5 max-h-40 overflow-y-auto pr-2">
          {stockData[1].products.map((title, i) => (
            <li key={i}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductCharts;
