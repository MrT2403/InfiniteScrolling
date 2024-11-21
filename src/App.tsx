import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { Product } from "./types/Product";

const BASE_URL = "https://dummyjson.com/products";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(
    async (skip: number) => {
      const endpoint = isSearching
        ? `${BASE_URL}/search?q=${searchQuery}`
        : `${BASE_URL}?limit=20&skip=${skip}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      setProducts((prev) => {
        const uniqueProducts = new Map(prev.map((p) => [p.id, p])); // Ensure uniqueness
        data.products.forEach((product: Product) => {
          uniqueProducts.set(product.id, product);
        });
        return Array.from(uniqueProducts.values());
      });
    },
    [isSearching, searchQuery]
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();

    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts(0);
  }, [fetchProducts]);

  useInfiniteScroll({ fetchMore: fetchProducts, limit: 20 });

  return (
    <div className="app">
      <h1>Product List</h1>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={products} />
    </div>
  );
};

export default App;
