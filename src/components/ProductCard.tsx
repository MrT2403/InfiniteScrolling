import React from "react";
import { Product } from "../types/Product";

const ProductCard: React.FC<Product> = ({ title, price, thumbnail }) => {
  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default ProductCard;
