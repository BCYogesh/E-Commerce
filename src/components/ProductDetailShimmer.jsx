const ProductDetailShimmer = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT IMAGE SHIMMER */}
        <div className="flex justify-center items-center">
          <div className="w-72 h-72 rounded-lg shimmer-card-detail"></div>
        </div>

        {/* RIGHT CONTENT SHIMMER */}
        <div className="space-y-4">
          <div className="h-6 w-3/4 rounded shimmer-card-detail"></div>

          <div className="h-4 w-full rounded shimmer-card-detail"></div>
          <div className="h-4 w-full rounded shimmer-card-detail"></div>
          <div className="h-4 w-5/6 rounded shimmer-card-detail"></div>

          <div className="h-4 w-1/2 rounded shimmer-card-detail mt-4"></div>
          <div className="h-4 w-1/3 rounded shimmer-card-detail"></div>

          <div className="h-6 w-1/4 rounded shimmer-card-detail mt-4"></div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 w-32 rounded shimmer-card-detail"></div>
            <div className="h-10 w-32 rounded shimmer-card-detail"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailShimmer;
