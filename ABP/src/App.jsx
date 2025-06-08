import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
// Importamos los componentes
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import AdvancedStatsPanel from "./components/AdvancedStatsPanel";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import * as XLSX from "xlsx";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState("");

  const containerRef = useRef(null);
  const limit = 30;

  // Obtener categorías
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error al obtener categorías", err));
  }, []);

  // Obtener todos los productos una sola vez
  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then((res) => {
      setAllProducts(res.data.products);
    });
  }, []);

  // Obtener productos paginados o por categoría
  useEffect(() => {
    let url =
      categoryFilter === "all"
        ? `https://dummyjson.com/products?limit=${limit}&skip=${
            (page - 1) * limit
          }`
        : `https://dummyjson.com/products/category/${categoryFilter}?limit=${limit}&skip=${
            (page - 1) * limit
          }`;

    axios.get(url).then((res) => setProducts(res.data.products));
  }, [page, categoryFilter]);

  const handleCategoryChange = (newCategory) => {
    setPage(1);
    setCategoryFilter(newCategory);
  };

  // Filtrar y ordenar
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) =>
      categoryFilter === "all" ? true : p.category === categoryFilter
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "rating-asc") return a.rating - b.rating;
      if (sortOption === "rating-desc") return b.rating - a.rating;
      return 0;
    });

  // Estadísticas sobre productos filtrados
  const totalProducts = filteredProducts.length;
  const maxProduct =
    filteredProducts.length > 0
      ? filteredProducts.reduce((max, p) =>
          p.price > max.price ? p : max
        )
      : null;
  const minProduct =
    filteredProducts.length > 0
      ? filteredProducts.reduce((min, p) =>
          p.price < min.price ? p : min
        )
      : null;
  const longTitleCount = filteredProducts.filter(
    (p) => p.title.length > 20
  ).length;
  const totalPrice = filteredProducts.reduce(
    (total, p) => total + p.price,
    0
  );
  const averageDiscount =
    filteredProducts.length > 0
      ? filteredProducts.reduce((acc, p) => acc + p.discountPercentage, 0) /
        filteredProducts.length
      : 0;

  // 📊 Estadísticas detalladas sobre todos los productos
  const productsOverStock50 = allProducts.filter((p) => p.stock > 50).length;
  const productsHighRating = allProducts.filter((p) => p.rating > 4.5).length;
  const averageRatingGeneral =
    allProducts.length > 0
      ? allProducts.reduce((acc, p) => acc + p.rating, 0) / allProducts.length
      : 0;

  const maxGeneral =
    allProducts.length > 0
      ? allProducts.reduce((max, p) => (p.price > max.price ? p : max))
      : null;
  const minGeneral =
    allProducts.length > 0
      ? allProducts.reduce((min, p) => (p.price < min.price ? p : min))
      : null;
  const averagePriceGeneral =
    allProducts.length > 0
      ? allProducts.reduce((acc, p) => acc + p.price, 0) / allProducts.length
      : 0;

  const statsByCategory = {};
  allProducts.forEach((product) => {
    const cat = product.category;
    if (!statsByCategory[cat]) {
      statsByCategory[cat] = {
        totalPrice: 0,
        count: 0,
        maxProduct: product,
        minProduct: product,
        totalRating: 0,
      };
    }
    statsByCategory[cat].totalPrice += product.price;
    statsByCategory[cat].totalRating += product.rating;
    statsByCategory[cat].count += 1;
    if (product.price > statsByCategory[cat].maxProduct.price) {
      statsByCategory[cat].maxProduct = product;
    }
    if (product.price < statsByCategory[cat].minProduct.price) {
      statsByCategory[cat].minProduct = product;
    }
  });

  // Exportar
  const handleExport = () => {
    if (format === "json") {
      const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
        type: "application/json",
      });
      triggerDownload(URL.createObjectURL(blob), "productos.json");
    } else if (format === "csv") {
      const headers = Object.keys(filteredProducts[0]).join(",");
      const rows = filteredProducts
        .map((p) =>
          Object.values(p)
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");
      const blob = new Blob([`${headers}\n${rows}`], {
        type: "text/csv;charset=utf-8;",
      });
      triggerDownload(URL.createObjectURL(blob), "productos.csv");
    } else if (format === "xls") {
      const ws = XLSX.utils.json_to_sheet(filteredProducts);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Productos");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      triggerDownload(URL.createObjectURL(blob), "productos.xlsx");
    }
  };

  const triggerDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  return (
    <div ref={containerRef}>
      <h1 className="text-3xl text-blue-600 font-bold mb-4 border-b-2 border-gray-300">Lista de productos:</h1>

      {/* Botón modo oscuro */}
      <div className="mb-4">
        <button onClick={toggleDarkMode} className="px-4 py-2 border-2 border-gray-700 rounded-md shadow-md">
          {darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"}
        </button>
      </div>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <FilterBar
        category={categoryFilter}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <ProductList products={filteredProducts} />

      {/* Exportación */}
      <div className="my-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <select
          onChange={(e) => setFormat(e.target.value)}
          value={format}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="">Seleccionar formato para exportar productos filtrados</option>
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="xls">Excel</option>
        </select>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Exportar archivo
        </button>
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Página anterior
        </button>
        <span className="text-gray-700 font-medium">{page}</span>
        <button
          disabled={products.length < limit}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Página siguiente
        </button>
      </div>

      {/* Estadísticas */}
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4"
      >
        {show ? "Ocultar Estadísticas" : "Mostrar Estadísticas"}
      </button>

      {show && filteredProducts.length > 0 && (
        <>
          <StatsPanel
            total={totalProducts}
            max={maxProduct}
            min={minProduct}
            longTitleCount={longTitleCount}
            totalPrice={totalPrice}
            averageDiscount={averageDiscount}
          />
          <AdvancedStatsPanel
            productsOverStock50={productsOverStock50}
            productsHighRating={productsHighRating}
            averageRatingGeneral={averageRatingGeneral}
            averagePriceGeneral={averagePriceGeneral}
            maxGeneral={maxGeneral}
            minGeneral={minGeneral}
            statsByCategory={statsByCategory}
          />
        </>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-gray-500 mt-4">No se encontraron productos</div>
      )}
    </div>
  );
}

export default App;
