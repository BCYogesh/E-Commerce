import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/apiURL";
import Product from "./Product";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  console.log("Hello");

  return (
    <>
      <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2">
        SEE OUR PRODUCTS
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
