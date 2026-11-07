import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toCategoryId } from "../data/categories.js";

// The selected category lives in the URL (?category=cars), so links can be
// shared and the back button works. Returns ["all", setCategory] by default.
export default function useCategoryParam() {
  const [params, setParams] = useSearchParams();
  const categoryId = toCategoryId(params.get("category"));

  const setCategory = useCallback(
    (id) => {
      const next = new URLSearchParams(params);
      if (id === "all") next.delete("category");
      else next.set("category", id);
      setParams(next);
    },
    [params, setParams]
  );

  return [categoryId, setCategory];
}
