const ProductShimmer = () => {
  const cardSize = new Array(20).fill(0);
  return (
    <div className="px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cardSize.map((_, index) => (
          <div
            key={index}
            className="h-60 mx-2 my-4 rounded-lg p-2 bg-white shadow-lg shimmer-card"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductShimmer;
