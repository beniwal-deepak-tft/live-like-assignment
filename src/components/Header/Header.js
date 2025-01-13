import React, { useEffect, useState } from "react";
import { Button, InputGroup, Form, FormControl } from "react-bootstrap";
import "./Header.css";

const Header = ({
  onSortByPrice,
  onSortByDiscount,
  priceRange,
  onPriceFilter,
  selectedCategory,
  isLoading,
  onSearchChange,
}) => {
  const [activeButton, setActiveButton] = useState(null);
  const [priceSortOrder, setPriceSortOrder] = useState(null); // Tracks price sorting order (asc, desc, null)
  const [discountSortOrder, setDiscountSortOrder] = useState(null); // Tracks discount sorting order (asc, desc, null)

  useEffect(() => {
    setActiveButton(null);
  }, [selectedCategory]);

  useEffect(() => {
    setActiveButton(null);
  }, [priceRange]);

  const handleSortByPrice = () => {
    if (priceSortOrder === "asc") {
      setPriceSortOrder("desc");
      onSortByPrice("desc");
    } else if (priceSortOrder === "desc") {
      setPriceSortOrder(null);
      onSortByPrice(true); // Reset sorting
    } else {
      setPriceSortOrder("asc");
      onSortByPrice("asc");
    }
  };

  const handleSortByDiscount = () => {
    if (discountSortOrder === "asc") {
      setDiscountSortOrder("desc");
      onSortByDiscount("desc");
    } else if (discountSortOrder === "desc") {
      setDiscountSortOrder(null);
      onSortByDiscount(true); // Reset sorting
    } else {
      setDiscountSortOrder("asc");
      onSortByDiscount("asc");
    }
  };

  return (
    <div className="header-container">
      <div className="d-flex align-items-center justify-content-between my-3 header-content">
        {isLoading ? (
          <div className="header-skeleton">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
            <div className="skeleton-range"></div>
          </div>
        ) : (
          <>
            <div className="filter-buttons">
              <Button
                variant="outline-primary"
                onClick={handleSortByPrice}
                className={`button ${
                  activeButton === "price" ? "button-active" : ""
                }`}
              >
                Sort by Price {priceSortOrder && `(${priceSortOrder})`}
              </Button>
              <Button
                variant="outline-primary"
                onClick={handleSortByDiscount}
                disabled={selectedCategory !== "all"}
                className={`button ${
                  activeButton === "discount" ? "button-active" : ""
                }`}
              >
                Sort by Discount {discountSortOrder && `(${discountSortOrder})`}
              </Button>
            </div>

            <InputGroup className="search-bar">
              <FormControl
                placeholder="Search Products"
                aria-label="Search Products"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="range-input">
              <Form.Label className="me-2">Price Range:</Form.Label>
              <Form.Range
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => onPriceFilter(priceRange[0], e.target.value)}
                className="custom-range"
              />
              <span className="ms-2">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </InputGroup>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
