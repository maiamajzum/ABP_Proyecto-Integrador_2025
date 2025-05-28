import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
// Importamos los componentes
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";

function App() {
    //Estados
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortOption, setSortOption] = useState("");
    //Referencias
    const containerRef = useRef(null);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=100").then((res) => {
            setProducts(res.data.products);
        });
    }, []);
    // Obtener lista unica de categorias
    const categories = [...new Set(products.map((p) => p.category))];
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
           onCategoryChange={setCategoryFilter}
           categories={categories}
           sortOption={sortOption}
           onSortChange={setSortOption}
        />
        {/*Lista de productos*/}
            <ProductList products={filteredProducts} />
        {/*Botón de estadísticas*/}
            <button
                onClick={() => setShow(!show)}
                className="px-6 py-2 bg-blue-500 
                text-white rounded-lg border-2 
                border-blue-600 
                hover:bg-blue-600 
                hover:border-blue-700 
                transition-all duration-300 ease-in-out shadow-md mt-6"
            >
                {show ? "Ocultar" : "Mostrar"}
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