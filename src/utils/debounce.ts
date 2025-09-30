// src/utils/debounce.ts
export default function debounce<T extends (...args: never[]) => void | Promise<void>>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      void func(...args); 
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debounced;
}
