// we can use ENV variables to store the API URL( didn't add it here just for demo purpose)
import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return ["all", ...response.data];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch products from the API
export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
