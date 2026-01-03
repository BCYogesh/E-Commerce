import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { CartContext } from "./context/CartContext";
import { SearchContext } from "./context/SearchContext";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

function App() {
  const [searchProduct, setSearchProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (!storedCart) return [];
    try {
      const parsed = JSON.parse(storedCart);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  });

  const handleSearch = function () {
    setSearchQuery(searchProduct);
  };

  const cartCount = cartItems.length ?? 0;

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount }}>
      <SearchContext.Provider
        value={{ searchProduct, setSearchProduct, handleSearch, searchQuery }}
      >
        <BrowserRouter>
          <Navbar />
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SearchContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
