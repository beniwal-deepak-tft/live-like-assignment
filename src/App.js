// App.js
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Pagination from "./components/Pagination/Pagination";
import { fetchCategories, fetchProducts } from "./utils/api";
import { filterProducts, getDiscountedPrice } from "./utils/helper";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterChange, setFilterChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedCategories = await fetchCategories();
      const fetchedProducts = await fetchProducts();
      setCategories(fetchedCategories);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setFilterChange(true);
    setSelectedCategory(category);
    const filtered = filterProducts(
      products,
      category,
      priceRange,
      searchTerm,
      rating
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePriceFilter = (min, max) => {
    setPriceRange([min, max]);
    const filtered = filterProducts(
      products,
      selectedCategory,
      [min, max],
      searchTerm,
      rating
    );
    setFilteredProducts(filtered);
    setFilterChange(true);
    setCurrentPage(1);
  };

const handleSortByPrice = (order) => {
  let sorted = [...filteredProducts];
  if (order === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (order === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }
  setFilteredProducts(sorted);
};

const handleSortByDiscount = (order) => {
  let sorted = [...filteredProducts];
  if (order === "asc") {
    sorted.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
  } else if (order === "desc") {
    sorted.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
  }
  setFilteredProducts(sorted);
};

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    const filtered = filterProducts(
      products,
      selectedCategory,
      priceRange,
      term,
      rating
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    const filtered = filterProducts(
      products,
      selectedCategory,
      priceRange,
      searchTerm,
      newRating
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const getPaginatedProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const filtered = filterProducts(
      products,
      selectedCategory,
      priceRange,
      searchTerm,
      rating
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchTerm, rating]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          isLoading={isLoading}
        />
        <main className="col-10">
          <Header
            isLoading={isLoading}
            onSortByPrice={handleSortByPrice}
            onSortByDiscount={handleSortByDiscount}
            priceRange={priceRange}
            onPriceFilter={handlePriceFilter}
            filterChange={filterChange}
            selectedCategory={selectedCategory}
            onSearchChange={handleSearchChange}
            onRatingChange={handleRatingChange}
          />
          <div className="product-info">
            {isLoading ? (
              <div className="skeleton-total-products"></div> // Skeleton placeholder
            ) : (
              <p>Total Products: {filteredProducts.length}</p>
            )}
          </div>
          <ProductGrid
            products={getPaginatedProducts()}
            isLoading={isLoading}
          />
          {filteredProducts.length > productsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
