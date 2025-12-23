const Navbar = ({ searchProduct, setSearchProduct, handleSearch }) => {
  return (
    <nav className="bg-orange-400 p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl cursor-pointer">
          <a href="/">LOGO</a>
        </h2>
        <div>
          <input
            type="text"
            className="p-1 px-2 w-80 border border-black bg-white"
            placeholder="Search Product here..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button
            className="ml-2 p-1 border border-black px-4 bg-gray-600 text-white cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <h2 className="font-bold">CART</h2>
      </div>
    </nav>
  );
};

export default Navbar;
