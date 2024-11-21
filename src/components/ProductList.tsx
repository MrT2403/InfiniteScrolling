import React from "react";
import { Product } from "../types/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="product-list">
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
);

export default ProductList;
