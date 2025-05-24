import ProductItem from "./ProductItem";

function ProductList({ products }) {
  return (
    <ul className="pl-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
      {products.map((product) => (
        <li key={product.id}>
          <div className="product-card border border-gray-400 rounded-md p-4 shadow-sm flex gap-2 items-start">
            <span className="text-xl leading-6">•</span>
            <div className="flex flex-col">
              <ProductItem product={product} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;