import React from "react";
import { Card } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = ({ title, price, description, image }) => {
  const limitChars = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  return (
    <Card className="product-card shadow-elevation-1">
      <Card.Body>
        {/* Product Title */}
        <Card.Title className="card-title">
          {limitChars(title, 45)}
        </Card.Title>{" "}
        {/* Limit to 25 chars */}
        {/* Product Image */}
        <div className="product-image-container">
          <img src={image} alt={title} className="product-image" />
        </div>
        {/* Price and Quantity */}
        <Card.Subtitle className="card-subtitle">${price}</Card.Subtitle>
        <Card.Text>Quantity</Card.Text>
        <input
          type="number"
          min="1"
          defaultValue="1"
          className="form-control"
        />
        {/* Description */}
        <Card.Subtitle className="mt-3">Description</Card.Subtitle>
        <Card.Text className="mt-1 description">
          {limitChars(description, 100)} {/* Limit to 100 chars */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
