import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import ProductDetailShimmer from "../components/ProductDetailShimmer";
import useFetch from "../customHook/useFetch";
import { BASE_URL } from "../utils/apiURL";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { setCartItems } = useContext(CartContext);

  const {
    data: productData,
    isLoading,
    isError,
  } = useFetch(BASE_URL + "/products/" + id);

  const decreaseQuantity = function () {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const increaseQuantity = function () {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > productData?.stock) tempQty = productData?.stock;
      return tempQty;
    });
  };

  const addToCart = function () {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productData.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productData.id ? { ...item, quantity: quantity } : item,
        );
      }
      return [
        ...prevItems,
        {
          id: productData.id,
          quantity: quantity,
          price: productData.price,
          title: productData.title,
          image: productData.images[0],
        },
      ];
    });
    toast.success("Adding to shopping cart");
  };

  return isLoading ? (
    <ProductDetailShimmer />
  ) : (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-6xl w-full rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT : IMAGE */}
        <div className="bg-gray-50 rounded-xl flex items-center justify-center p-6">
          {productData?.images && (
            <img
              src={productData.images[0]}
              alt={productData.title}
              className="h-80 object-contain hover:scale-105 transition-transform"
            />
          )}
        </div>

        {/* RIGHT : DETAILS */}
        <div className="space-y-5">
          {/* TITLE */}
          <h1 className="text-2xl font-bold">{productData?.title}</h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            {productData?.description}
          </p>

          {/* META */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span>
              <b className="text-orange-500">Rating:</b> ⭐{" "}
              {productData?.rating}
            </span>
            <span>
              <b className="text-orange-500">Brand:</b> {productData?.brand}
            </span>
            <span>
              <b className="text-orange-500">Category:</b>{" "}
              {productData?.category}
            </span>
          </div>

          {/* PRICE */}
          <p className="text-3xl font-bold text-orange-600">
            ${productData?.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>

            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                className="px-4 py-1 hover:bg-gray-200"
                onClick={decreaseQuantity}
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-4 py-1 hover:bg-gray-200"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>

            <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
