import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const { cartItems, cartCount } = useContext(CartContext);
  const { searchProduct, setSearchProduct, handleSearch } =
    useContext(SearchContext);
  const location = useLocation();

  const searchBar = location.pathname === "/";

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <nav className="bg-orange-400 p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl cursor-pointer">
          <Link to="/">LOGO</Link>
        </h2>
        {searchBar && (
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
        )}
        <Link to={"/cart"}>
          <h2 className="font-bold">CART- {cartCount} </h2>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
