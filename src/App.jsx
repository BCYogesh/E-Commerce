import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [searchProduct, setSearchProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = function () {
    setSearchQuery(searchProduct);
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar
          searchProduct={searchProduct}
          setSearchProduct={setSearchProduct}
          handleSearch={handleSearch}
        />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
