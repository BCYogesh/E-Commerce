import React from "react";

const Product = ({ product }) => {
  return (
    <div className="card mx-2 my-4 rounded-lg p-2 bg-white shadow-lg cursor-pointer hover:bg-gray-100 relative">
      <span class="absolute top-3 inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-500 inset-ring inset-ring-red-400/20">
        {product?.category}
      </span>
      <img className="h-60" src={product?.thumbnail} alt={product?.title} />
      <div className="detail">
        <p>
          Brand : <b>{product?.brand || "N/A"}</b>
        </p>
        <p className="text-sm line-clamp-2 mt-2">{product?.title}</p>
        <p className="mt-2 text-center">$ {product?.price}</p>
      </div>
    </div>
  );
};

export default Product;
