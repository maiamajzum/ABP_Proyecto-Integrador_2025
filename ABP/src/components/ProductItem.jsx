function ProductItem({ product }) {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>Precio: ${product.price}</p>
    </div>
  );
}

export default ProductItem;