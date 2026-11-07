import { useEffect, useState } from "react";

// Waits until the user stops typing before returning the new value,
// so we don't call the API on every single key press.
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
