import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [items, setItems] = useState(() => {
    let currentValue;

    try {
      const cartItems = localStorage.getItem(key);

      if (!cartItems) currentValue = defaultValue;
      else {
        currentValue = JSON.parse(cartItems);
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      currentValue = defaultValue;
    }
    return currentValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(items));
    } catch (err) {
      console.error(`Something is wrong in local storage ${key}`, err);
    }
  }, [items, setItems]);

  return [items, setItems];
};

export default useLocalStorage;
