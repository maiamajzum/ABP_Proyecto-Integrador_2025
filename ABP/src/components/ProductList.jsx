function ProductList({ products }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {products.map((p) => (
        <li key={p.id}>
          <strong>{p.title}</strong> - ${p.price}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;