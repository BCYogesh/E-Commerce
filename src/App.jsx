import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CartContext } from "./context/CartContext";
import { SearchContext } from "./context/SearchContext";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { CategoryContext } from "./context/CategoryContext";
import Category from "./pages/Category";
import useLocalStorage from "./customHook/useLocalStorage";
import useFetch from "./customHook/useFetch";
import { BASE_URL } from "./utils/apiURL";

function App() {
  const [searchProduct, setSearchProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebar, setIsSidebar] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const {
    data: categories,
    isLoading,
    isError,
  } = useFetch(BASE_URL + "/products/categories");

  const handleSearch = function () {
    setSearchQuery(searchProduct);
  };

  const cartCount = cartItems.length ?? 0;

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount }}>
      <CategoryContext.Provider value={{ categories }}>
        <SearchContext.Provider
          value={{ searchProduct, setSearchProduct, handleSearch, searchQuery }}
        >
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
              <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
              <ToastContainer position="top-right" autoClose={2000} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </SearchContext.Provider>
      </CategoryContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
