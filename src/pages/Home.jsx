import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

const Home = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = function () {
    setSearchQuery(searchProduct);
  };
  return (
    <div>
      <Navbar
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        handleSearch={handleSearch}
      />
      <ProductList searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
