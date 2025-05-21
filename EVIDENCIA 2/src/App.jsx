import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
// Importamos los componentes
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=50").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    // Filtramos los productos obtenidos de la API si search está vacío se muestran todos los productos
    const filteredProducts = search
        ? products.filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase())
          )
        : products;

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

    return (
        <>
            <h1 className="text-3xl text-blue-600 font-bold mb-4 border-b-2 border-gray-300">Lista de productos:</h1>

            <input
                type="text"
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-gray-300 p-2 mb-6 rounded-lg w-full"
            />

            <ProductList products={filteredProducts} />

            <button
                onClick={() => setShow(!show)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:border-blue-700 transition-all duration-300 ease-in-out shadow-md mt-6"
            >
                {show ? "Ocultar" : "Mostrar"}
            </button>

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

            {filteredProducts.length === 0 && <div className="text-gray-500 mt-4">No se encontraron productos</div>}
        </>
    );
}

export default App;