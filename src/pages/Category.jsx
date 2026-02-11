import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductShimmer from "../components/ProductShimmer";
import useFetch from "../customHook/useFetch";
import { BASE_URL } from "../utils/apiURL";

const Category = () => {
  const { category } = useParams();

  const {
    data: products,
    isLoading,
    isError,
  } = useFetch(BASE_URL + "/products/category/" + category);

  const categoryProducts = products?.products;

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
