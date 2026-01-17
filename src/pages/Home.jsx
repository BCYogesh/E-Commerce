import { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { BASE_URL } from "../utils/apiURL";
import { SearchContext } from "../context/SearchContext";
import { CategoryContext } from "../context/CategoryContext";
import ProductShimmer from "../components/ProductShimmer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchQuery } = useContext(SearchContext);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getFilterProducts();
  }, [searchQuery]);

  const getFilterProducts = function () {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filteredPds = products.filter(
        (product) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.brand?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filteredPds);
    }
  };

  const getAllProducts = async function () {
    try {
      const res = await fetch(BASE_URL + "/products?limit=50");
      const data = await res.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryBeauty = products.filter(
    (product) => product.category === categories[0]?.slug,
  );

  const categoryFragrance = products.filter(
    (product) => product.category === categories[1]?.slug,
  );

  const categoryFurniture = products.filter(
    (product) => product.category === categories[2]?.slug,
  );

  const categoryGrocery = products.filter(
    (product) => product.category === categories[3]?.slug,
  );

  if ((!filteredProducts || filteredProducts.length == 0) && !isLoading)
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
        {filteredProducts.length === 0 && isLoading ? (
          <ProductShimmer />
        ) : (
          <>
            <ProductList filteredProducts={filteredProducts} />
            {!searchQuery && (
              <>
                <div>
                  <h1 className="font-medium text-2xl text-center bg-white shadow-lg p-2 uppercase">
                    SEE OUR {categories[0]?.slug}
                  </h1>
                  <ProductList filteredProducts={categoryBeauty} />;
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
