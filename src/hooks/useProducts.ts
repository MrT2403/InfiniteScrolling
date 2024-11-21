import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types/Product";

const BASE_URL = "https://dummyjson.com/products";

export const useProducts = (query: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (reset = false) => {
    try {
      setIsLoading(true);
      const url = query
        ? `${BASE_URL}/search?q=${query}`
        : `${BASE_URL}?limit=20&skip=${(page - 1) * 20}`;
      const { data } = await axios.get(url);

      const fetchedProducts = query ? data.products : data.products;

      setProducts(reset ? fetchedProducts : [...products, ...fetchedProducts]);
      setHasMore(fetchedProducts.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, [query]);

  useEffect(() => {
    if (!query) {
      fetchProducts();
    }
  }, [page]);

  return {
    products,
    hasMore,
    isLoading,
    loadMore: () => setPage((prev) => prev + 1),
  };
};
