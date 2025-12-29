import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // To fetch product
  useEffect(() => {
    GetSingleProduct();
  }, []);

  const GetSingleProduct = async function () {
    try {
      const res = await fetch("https://dummyjson.com/products/" + id);
      const data = await res.json();
      setProductData(data);
    } catch (err) {
      console.error(err);
    }
  };

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
  console.log(productData);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="product-detail flex   px-2 bg-gray-200 h-96 w-[90%] rounded-lg">
        <img
          className="h-full w-full object-contain"
          src={productData?.images ? productData?.images[0] : ""}
          alt={productData?.title}
        />
        <div className="product-detail-r">
          <div className="title pt-8">
            <b>{productData?.title}</b>
          </div>
          <div className="desc pt-4">
            <p>{productData?.description}</p>
          </div>
          <div className="rating pt-4 inline-grid gap-5">
            <p className="">
              <span className="text-orange-400 font-bold"> Rating :</span>{" "}
              {productData?.rating} |{" "}
              <span className="text-orange-400 font-bold">Brand : </span>
              {productData?.brand} |
              <span className="text-orange-400 font-bold">Category : </span>{" "}
              {productData?.category}
            </p>
            <p>
              <span className="text-orange-400 font-bold">Price : </span>${" "}
              {productData?.price}
            </p>
          </div>
          <div className="quantity flex gap-5 pt-4 text-center">
            <button
              className="border border-black px-4 cursor-pointer"
              onClick={() => decreaseQuantity()}
            >
              -
            </button>
            <p className="border border-black px-4">{quantity}</p>
            <button
              className="border border-black px-4 cursor-pointer"
              onClick={() => increaseQuantity()}
            >
              +
            </button>
          </div>
          <div className="actions flex gap-5 pt-4">
            <button className="px-4 py-2 bg-orange-300 text-black cursor-pointer">
              Add to cart
            </button>
            <button className="px-4 py-2 bg-orange-400 text-black cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
