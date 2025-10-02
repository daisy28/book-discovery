import { useBookStore } from '../store/useBookstore';
import { useEffect, useMemo, useRef, useState } from 'react';
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
const debouncedRoute = useMemo(() => {
  const cleanupDebounce = debounce(async (query: string) => {

    await router.push(`/catalog?q=${encodeURIComponent(query)}`);

    setTimeout(() => {
      setIsTyping(false);
      setSearch(false);
      setInput('');
      setQuery('');
    }, 1000);
  }, 1000);

  return cleanupDebounce;
}, []);

useEffect(() => {
  return () => {
    debouncedRoute.cancel(); // Clean up on unmount
  };
}, [debouncedRoute]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setInput(query);
    setIsTyping(true);
    setQuery(query);          
    debouncedRoute(query);   
  }

  const handleBlur = () => {
    setTimeout(() => {
    if (!isTyping) {
      setSearch(false);
      setInput('');
      setQuery('');
    }
  }, 1000); 
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
