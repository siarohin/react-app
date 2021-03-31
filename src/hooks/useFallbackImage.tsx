import { useState } from "react";

/**
 * Change image src
 */
export function useFallbackImage(img: string, fallback: string): { src: string; onError: () => void } {
  const [src, setImg] = useState(img);
  const onError = () => setImg(fallback);
  return { src, onError };
}
