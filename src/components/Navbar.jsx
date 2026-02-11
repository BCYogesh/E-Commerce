import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../assets/logo.png";

const Navbar = ({ isSidebar, setIsSidebar }) => {
  const { cartCount } = useContext(CartContext);
  const { searchProduct, setSearchProduct, handleSearch } =
    useContext(SearchContext);
  const location = useLocation();

  const searchBar = location.pathname == "/";

  return (
    <nav className="bg-orange-500 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => setIsSidebar(!isSidebar)}
            className="text-2xl hover:scale-110 transition"
          >
            <RxHamburgerMenu />
          </button>

          <Link to="/" className="text-2xl font-bold tracking-wide">
            <img
              className="h-10 max-h-full object-contain"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>

        {/* CENTER SEARCH */}
        {searchBar && (
          <div className="hidden md:flex items-center bg-white rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="px-4 py-2 w-72 outline-none text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-800 text-white px-5 py-2 hover:bg-gray-900 transition"
            >
              Search
            </button>
          </div>
        )}

        {/* RIGHT CART */}
        <Link to="/cart" className="relative text-white font-semibold">
          🛒 Cart
          <span className="absolute -top-2 -right-4 bg-black text-white text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
