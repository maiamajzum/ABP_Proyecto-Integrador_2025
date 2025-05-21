function ProductList({ products }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <div
                    key={p.id}
                    className="border-2 border-black rounded-lg p-4 shadow-lg bg-white transition transform hover:scale-105 duration-300 ease-in-out"
                >
                    {/* Título del producto */}
                    <h3 className="text-xl font-semibold mt-4">{p.title}</h3>

                    {/* Precio del producto */}
                    <p className="text-gray-600 mt-2">${p.price}</p>

                    {/* Descripción del producto */}
                    <p className="text-sm text-gray-500 mt-2">{p.description.slice(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
