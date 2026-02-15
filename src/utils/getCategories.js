const getCategoriesItems = function (products, slug) {
    return products?.filter((product) => product?.category === slug)
}

export default getCategoriesItems;