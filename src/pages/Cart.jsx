import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, cartCount } = useContext(CartContext);

  const removeCartItem = function (id) {
    let filterCart = cartItems.filter((item) => item.id !== id);
    setCartItems(filterCart);
  };

  let totalPrice = 0;
  if (cartItems) {
    cartItems.map((item) => {
      totalPrice += item.quantity * item.price;
    });
  }
  if (cartItems.length === 0) {
    return (
      <div className="bg-white flex justify-center flex-col gap-4 items-center overflow-hidden min-h-screen">
        <h2>Your shopping cart is Empty ☹!</h2>
        <Link to={"/"} className="bg-orange-200 p-4 font-semibold rounded-lg">
          Go shopping now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-6 gap-4 bg-amber-200 px-6 py-4 font-semibold">
          <span>#</span>
          <span>Product</span>
          <span>Price</span>
          <span>Qty</span>
          <span>Total</span>
          <span>Action</span>
        </div>

        {/* CART ITEMS */}
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-6 gap-4 items-center px-6 py-4 border-b hover:bg-gray-50 transition"
          >
            <span>{index + 1}</span>

            <span className="font-medium">{item.title}</span>

            <span>${item.price}</span>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <span>{item.quantity}</span>
            </div>

            <span className="font-semibold text-orange-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeCartItem(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-gray-50">
          <button
            onClick={() => setCartItems([])}
            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Clear Cart
          </button>

          <div className="text-lg font-semibold">
            Total ({cartCount} items):{" "}
            <span className="text-orange-600 text-xl">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
