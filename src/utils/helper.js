// helper.js
export const filterProducts = (
  products,
  category,
  priceRange,
  searchTerm,
  rating
) => {
  let filtered = [...products];

  // Filter by category
  if (category !== "all") {
    filtered = filtered.filter((product) => product.category === category);
  }

  // Filter by price range
  filtered = filtered.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Filter by product name (search term)
  if (searchTerm) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by rating
  if (rating) {
    filtered = filtered.filter((product) => product.rating >= rating);
  }

  return filtered;
};

export const getDiscountedPrice = (product) => {
  const discountMap = {
    "men's clothing": 0.3,
    jewelry: 0.1,
  };
  const discount = discountMap[product.category] || 0;
  return product.price * (1 - discount);
};
