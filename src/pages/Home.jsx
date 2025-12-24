import ProductList from "../components/ProductList";

const Home = ({ searchQuery }) => {
  return (
    <div className="bg-gray-200">
      <ProductList searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
