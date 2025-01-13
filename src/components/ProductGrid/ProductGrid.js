import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products, isLoading }) => {
  if (isLoading) {
    // Render skeleton placeholders while loading
    return (
      <Row xs={1} sm={2} md={3} lg={3} className="g-4 product-grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <Col key={index}>
            <div className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-description"></div>
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  if (products.length === 0) {
    // Render message when no products are available
    return (
      <div className="no-products-message">
        <div>No products available</div>
      </div>
    );
  }

  // Render actual products when loading is complete and products are available
  return (
    <Row xs={1} sm={2} md={3} lg={3} className="g-4 product-grid">
      {products.slice(0, 9).map((product) => (
        <Col key={product.id}>
          <ProductCard
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
