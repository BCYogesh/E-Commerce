import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductDetailShimmer from "../components/ProductDetailShimmer";
import useFetch from "../customHook/useFetch";
import { BASE_URL } from "../utils/apiURL";
import { toast } from "react-toastify";
import useOnlineStatus from "../customHook/useOnlineStatus";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
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
  const {
    data: productData,
    isLoading,
    isError,
  } = useFetch(BASE_URL + "/products/" + id);

  const onlineStatus = useOnlineStatus();

  console.log(onlineStatus);
  if (onlineStatus === false)
    return (
      <h1 className="text-center text-2xl p-8">
        OOPS! Offline please check your internet connection.
      </h1>
    );

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
              onClick={() => addToCart(productData, quantity)}
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
