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
        <h2>Your shopping cart is Empty!</h2>
        <Link to={"/"} className="bg-orange-200 p-4 font-semibold rounded-lg">
          Go shopping now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-6 p-4 font-semibold border-b bg-amber-200 sticky top-16">
        <li>S.No</li>
        <li>Product</li>
        <li>Unit Price</li>
        <li>Quantity</li>
        <li>Total Price</li>
        <li>Actions</li>
      </ul>
      {cartItems.map((item, index) => (
        <ul
          key={item.id}
          className="grid grid-cols-6 p-4 border-b items-center"
        >
          <li>{index + 1}</li>
          <li>{item.title}</li>
          <li>${item.price}</li>
          <li>{item.quantity}</li>
          <li className="text-orange-600 font-semibold">
            ${item.quantity * item.price}
          </li>
          <li
            className="hover:text-orange-600 cursor-pointer"
            onClick={() => removeCartItem(item.id)}
          >
            Delete
          </li>
        </ul>
      ))}

      <div className="flex justify-between p-8">
        <button
          onClick={() => setCartItems([])}
          className="bg-orange-200 p-2 px-4 border cursor-pointer border-black font-semibold rounded-lg"
        >
          Clear cart
        </button>
        <h3>
          Total Items {cartCount} :{" "}
          <span className="text-orange-600 font-semibold">${totalPrice} </span>
        </h3>
      </div>
    </div>
  );
};

export default Cart;
