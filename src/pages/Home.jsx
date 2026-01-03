import { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { BASE_URL } from "../utils/apiURL";
import { SearchContext } from "../context/SearchContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { searchQuery } = useContext(SearchContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filteredPds = products.filter(
        (product) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredPds);
    }
  }, [searchQuery]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllProducts = async function () {
    try {
      const res = await fetch(BASE_URL + "/products?limit=50");
      const data = await res.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllCategories = async function () {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const categoryBeauty = products.filter(
    (product) => product.category === categories[0]?.slug
  );

  const categoryFragrance = products.filter(
    (product) => product.category === categories[1]?.slug
  );

  const categoryFurniture = products.filter(
    (product) => product.category === categories[2]?.slug
  );

  const categoryGrocery = products.filter(
    (product) => product.category === categories[3]?.slug
  );

  console.log(searchQuery);

  return (
    <>
      <div>
        <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
          SEE OUR PRODUCTS
        </h1>
        <ProductList filteredProducts={filteredProducts} />;
      </div>
      {!searchQuery && (
        <>
          <div>
            <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
              SEE OUR {categories[0]?.slug}
            </h1>
            <ProductList filteredProducts={categoryBeauty} />;
          </div>
          <div>
            <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
              SEE OUR {categories[1]?.slug}
            </h1>
            <ProductList filteredProducts={categoryFragrance} />;
          </div>
          <div>
            <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
              SEE OUR {categories[2]?.slug}
            </h1>
            <ProductList filteredProducts={categoryFurniture} />;
          </div>
          <div>
            <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
              SEE OUR {categories[3]?.slug}
            </h1>
            <ProductList filteredProducts={categoryGrocery} />;
          </div>
        </>
      )}
    </>
  );
};

export default Home;
