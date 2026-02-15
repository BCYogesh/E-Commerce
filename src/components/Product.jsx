import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="group mx-2 my-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
      <Link to={`/product/${product?.id}`}>
        <span className="absolute top-3 left-3 z-10 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-500">
          {product?.category}
        </span>

        <div className="bg-gray-50 p-4 flex justify-center">
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className="h-56 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-2">
          {product?.brand && (
            <p className="text-xs text-gray-500 font-medium">
              Brand · {product?.brand}
            </p>
          )}
          <p className="text-sm font-semibold line-clamp-2">{product?.title}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between px-4 pb-4">
        <p className="text-lg font-bold text-orange-600">${product?.price}</p>

        <button
          onClick={() => addToCart(product, 1)}
          className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
