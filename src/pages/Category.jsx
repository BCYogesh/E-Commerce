import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductShimmer from "../components/ProductShimmer";

const Category = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategoryProducts();
  }, [category]);

  const getCategoryProducts = async function () {
    try {
      const res = await fetch(
        "https://dummyjson.com/products/category/" + category,
      );
      const data = await res.json();
      setCategoryProducts(data?.products);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!categoryProducts || (categoryProducts.length == 0 && !isLoading))
    return (
      <>
        <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
          SEE OUR {category}
        </h1>
        <div className="text-center text-2xl p-8">No items found!</div>;
      </>
    );
  return (
    <div>
      <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
        SEE OUR {category}
      </h1>
      {categoryProducts.length === 0 && isLoading ? (
        <ProductShimmer />
      ) : (
        <>
          <ProductList filteredProducts={categoryProducts} />
        </>
      )}
    </div>
  );
};

export default Category;
