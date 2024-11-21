import { useEffect } from "react";

interface UseInfiniteScrollProps {
  fetchMore: (skip: number) => void;
  limit: number;
}

export const useInfiniteScroll = ({
  fetchMore,
  limit,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        const skip = document.querySelectorAll(".product-card").length;
        fetchMore(skip);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMore, limit]);
};
