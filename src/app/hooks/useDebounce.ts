import { useState, useEffect } from "react";

// This custom hook takes a value and a delay, and only returns the latest value
// after the specified time has passed without the value changing.
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function. It clears the timer if the user
    // types again before the delay is over.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if the value or delay changes

  return debouncedValue;
}

export default useDebounce;
