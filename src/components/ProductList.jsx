import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/apiURL";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async function () {
    try {
      const res = await fetch(BASE_URL + "/products?limit=50");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(products);

  return (
    <>
      <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2">
        SEE OUR PRODUCTS
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
