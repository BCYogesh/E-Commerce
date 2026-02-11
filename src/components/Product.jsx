import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product?.id}`}>
      <div className="group mx-2 my-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
        {/* Category Badge */}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-500">
          {product?.category}
        </span>

        {/* Image */}
        <div className="bg-gray-50 p-4 flex justify-center">
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className="h-56 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="p-4 space-y-2">
          {product?.brand && (
            <p className="text-xs text-gray-500 font-medium">
              Brand · {product?.brand}
            </p>
          )}

          <p className="text-sm font-semibold line-clamp-2">{product?.title}</p>

          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold text-orange-600">
              ${product?.price}
            </p>

            <button className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
