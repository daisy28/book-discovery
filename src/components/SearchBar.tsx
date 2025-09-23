// src/components/SearchBar.tsx
import { useBookStore } from '../store/useBookstore';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from '../utils/debounce';
import { IoSearchSharp } from 'react-icons/io5';
import { ImSpinner6 } from "react-icons/im";
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const { setQuery } = useBookStore();
    const router = useRouter()
    const [input, setInput] = useState('');
    const [search, setSearch] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const openSearch = () => {
      setSearch(true);
    }

// Debounced router push
  const debouncedRoute = useCallback(
    debounce((q: string) => {
      router.push(`/catalog?q=${encodeURIComponent(q)}`);
      // Simulate loading complete, then cleanup
      setTimeout(() => {
        setIsTyping(false);     // Stop spinner
        setSearch(false);       // Collapse input
        setInput('');           // Clear input field
        setQuery('');           // Clear Zustand query
      }, 300); // short delay after route change
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setInput(q);
    setIsTyping(true);
    setQuery(q);          // Store it in Zustand for global access
    debouncedRoute(q);    // Navigate to /search?q=... after 500ms
  }

  const handleBlur = () => {
     // Only collapse if not typing (to prevent blur during debounce)
    if (!isTyping) {
      setSearch(false);
      setInput('');
      setQuery('');
    }
  };

  // Focus the input when it becomes visible
  useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  return (
    <div>
        <IoSearchSharp onClick={openSearch} className={`text-[#fff] ${search ? `hidden` : `block`}`} />
        {/* <form onSubmit={handleSubmit} action="">
        </form> */}
        <div className={`relative`}>
          <input
          ref={inputRef}
          type="text"
          value={input}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Search books by title, author, or ISBN"
          className={`${search ? `block` : `hidden`} p-2 px-6 w-full border border-[#fff] outline-none text-[#fff] text-[12px] rounded-[15px]`}
          />
          {search && isTyping && <ImSpinner6 className={`absolute text-[#fff] top-[10px] right-[10px] animate-spin`} />}
        </div>

    </div>
  )
}

export default SearchBar;
