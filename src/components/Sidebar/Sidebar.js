import React from "react";
import { ListGroup } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryClick,
  isLoading,
}) => {
  return (
    <aside className="sidebar">
      <ListGroup >
        {isLoading
          ? // Render skeleton placeholders while loading
            Array.from({ length: 5 }).map((_, index) => (
              <ListGroup.Item key={index} className="category-item skeleton">
                <div className="skeleton-placeholder"></div>
              </ListGroup.Item>
            ))
          : // Render categories after loading
            categories.map((category) => (
              <ListGroup.Item
                key={category}
                className={`category-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => onCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </ListGroup.Item>
            ))}
      </ListGroup>
    </aside>
  );
};

export default Sidebar;
