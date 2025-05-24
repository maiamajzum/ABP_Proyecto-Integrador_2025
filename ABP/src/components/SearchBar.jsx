function SearchBar({ value, onChange }) {
  return (
   <input
     type="text"
     placeholder="Buscar producto"
     value={value}
     onChange={onChange}
     className="border border-gray-400 rounded-md p-2 w-full max-w-md mb-6"
   />
  );
}

export default SearchBar;