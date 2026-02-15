import { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { BASE_URL } from "../utils/apiURL";
import { SearchContext } from "../context/SearchContext";
import { CategoryContext } from "../context/CategoryContext";
import ProductShimmer from "../components/ProductShimmer";
import useFetch from "../customHook/useFetch";
import getCategoriesItems from "../utils/getCategories";
import useOnlineStatus from "../customHook/useOnlineStatus";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    data: products,
    isLoading,
    isError,
  } = useFetch(BASE_URL + "/products?limit=50");

  const { searchQuery } = useContext(SearchContext);
  const { categories } = useContext(CategoryContext);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    setFilteredProducts(products?.products);
  }, [products?.products]);

  useEffect(() => {
    getFilterProducts();
  }, [searchQuery]);

  const getFilterProducts = function () {
    if (!searchQuery) {
      setFilteredProducts(products?.products);
    } else {
      const filteredPds = products?.products.filter(
        (product) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.brand?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filteredPds);
    }
  };

  const categoryBeauty =
    categories?.length > 0
      ? getCategoriesItems(products?.products, categories[0]?.slug)
      : [];

  const categoryFragrance =
    categories?.length > 0
      ? getCategoriesItems(products?.products, categories[1]?.slug)
      : [];

  const categoryFurniture =
    categories?.length > 0
      ? getCategoriesItems(products?.products, categories[2]?.slug)
      : [];

  const categoryGrocery =
    categories?.length > 0
      ? getCategoriesItems(products?.products, categories[3]?.slug)
      : [];

  if (onlineStatus === false)
    return (
      <h1 className="text-center text-2xl p-8">
        OOPS! Offline please check your internet connection.
      </h1>
    );
  if ((!filteredProducts || filteredProducts?.length == 0) && !isLoading)
    return (
      <>
        <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
          SEE OUR PRODUCTS
        </h1>
        <div className="text-center text-2xl p-8">No items found!</div>;
      </>
    );

  return (
    <>
      <div>
        <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
          SEE OUR PRODUCTS
        </h1>
        {isLoading ? (
          <ProductShimmer />
        ) : (
          <>
            <ProductList filteredProducts={filteredProducts} />
            {!searchQuery && categories && (
              <>
                <div>
                  <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
                    SEE OUR {categories[0]?.slug}
                  </h1>
                  <ProductList filteredProducts={categoryBeauty} />
                </div>
                <div>
                  <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
                    SEE OUR {categories[1]?.slug}
                  </h1>
                  <ProductList filteredProducts={categoryFragrance} />;
                </div>
                <div>
                  <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
                    SEE OUR {categories[2]?.slug}
                  </h1>
                  <ProductList filteredProducts={categoryFurniture} />;
                </div>
                <div>
                  <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
                    SEE OUR {categories[3]?.slug}
                  </h1>
                  <ProductList filteredProducts={categoryGrocery} />;
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
