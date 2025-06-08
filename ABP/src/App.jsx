import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
// Importamos los componentes
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import * as XLSX from "xlsx";
function App() {
    //Estados
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(1);
    const [format, setFormat] = useState("");
    //Referencias
    const containerRef = useRef(null);
    const limit = 2;
  //Obtener categorias de productos
   useEffect(() => {
     axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        console.log("CATEGORÍAS:", res.data); 
        setCategories(res.data); 
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
   }, []);
    
    //Traemos productos paginados
  useEffect(() => {
    let url = "";

    if (categoryFilter === "all") {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
    } else {
      url = `https://dummyjson.com/products/category/${categoryFilter}?limit=${limit}&skip=${(page - 1) * limit}`;
    }

    axios.get(url).then((res) => {
      setProducts(res.data.products);
    });
  }, [page, categoryFilter]);
    const handleCategoryChange = (newCategory) => {
      setPage(1); // Para no quedar en una página vacía
      setCategoryFilter(newCategory);
    };
    // Filtramos y ordenarproductos
   const filteredProducts = products
  .filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )
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

    // Estadísticas
    const totalProducts = filteredProducts.length;
    const maxProduct = filteredProducts.length > 0
        ? filteredProducts.reduce((max, product) => (product.price > max.price ? product : max), filteredProducts[0])
        : null;
    const minProduct = filteredProducts.length > 0
        ? filteredProducts.reduce((min, product) => (product.price < min.price ? product : min), filteredProducts[0])
        : null;
    const longTitleCount = filteredProducts.filter((p) => p.title.length > 20).length;
    const totalPrice = filteredProducts.reduce((total, product) => total + product.price, 0);
    const averageDiscount = filteredProducts.length > 0
        ? filteredProducts.reduce((total, product) => total + product.discountPercentage, 0) / filteredProducts.length
        : 0;
    // Función para exportar productos filtrados a JSON, CSV y Excel (xls)
    const handleExport = () => {
      if (format === "json") {
        const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "productos.json");
      } else if (format === "csv") {
        const headers = Object.keys(filteredProducts[0]).join(",");
        const rows = filteredProducts
         .map((product) =>
          Object.values(product)
            .map((val) => `"${String(val).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");
        const csvContent = `${headers}\n${rows}`;
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
       });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.csv");
    } else if (format === "xls") {
      const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.xlsx");
    }
  };

    // Función que dispara la descarga de un archivo
    const triggerDownload = (url, filename) => {
        //crear el hipervinculo
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        //Agregamos el anchor tag en el DOM
        document.body.appendChild(link);
        //Simulas el click en el elemento
        link.click();
        //Eliminar el elemento anchor
        document.body.removeChild(link);
    };
    // Modo oscuro
    const toggleDarkMode= () => {
        
    
       setDarkMode(!darkMode);
       containerRef.current.classList.toggle("dark-mode");
    };
    return (
        <div ref={containerRef}>
            <h1 className="text-3xl text-blue-600 font-bold mb-4 border-b-2 border-gray-300">Lista de productos:</h1>
        {/*Botón de modo oscuro*/}
        <div className="mb-4">
          <button
            onClick={toggleDarkMode}
            className="
             px-4 py-2 
             border-2 border-gray-700 
             rounded-md shadow-md
            "
          >
             {darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"}
          </button>
        </div>
        {/*Búsqueda por descripción*/}
        <div className="mb-6">
         <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/*Filtro por categoría y ordenamiento*/}
        <FilterBar
           category={categoryFilter}
           onCategoryChange={handleCategoryChange}
           categories={categories}
           sortOption={sortOption}
           onSortChange={setSortOption}
         /> 
        {/*Lista de productos*/}
            <ProductList products={filteredProducts} />
        {/*Seleccion de formato y exportacion*/}
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

        {/*Paginación*/}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Página anterior
          </button>
          <span className="text-gray-700 font-medium">
             {page}
          </span>
          <button
            disabled={products.length < limit}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
       >
            Página siguiente
          </button>
        </div>
        {/*Botón de estadísticas*/}
            <button
                onClick={() => setShow(!show)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                {show ? "Ocultar Estadísticas" : "Mostrar Estadísticas"}
            </button>
            {/*Panel de estadísticas*/}
            {show && filteredProducts.length > 0 && (
                <StatsPanel
                    total={totalProducts}
                    max={maxProduct}
                    min={minProduct}
                    longTitleCount={longTitleCount}
                    totalPrice={totalPrice}
                    averageDiscount={averageDiscount}
                />
            )}
            {/*Mensaje si no hay resultados*/}
            {filteredProducts.length === 0 && <div className="text-gray-500 mt-4">No se encontraron productos</div>}
        </div>
    );
}

export default App;