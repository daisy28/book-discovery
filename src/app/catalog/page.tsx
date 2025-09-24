'use client'
import { useBookStore } from '../../store/useBookstore';
import BookCard from '@/components/BookCard';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ImSpinner6 } from "react-icons/im";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const { fetchBooks, books, loading, error, setQuery, sortBooks, resetBooks } = useBookStore();
  const [activeSort, setActiveSort] = useState<"year" | "ratings" | "author" | "all" | null>(null);

  useEffect(() => {
    if (query) {
      setQuery(query);
      fetchBooks();
    }
  }, [query]);


  return (
    <section className={`my-8 p-4 md:p-8 md:mb-[6rem]`}>
        <h1 className={`font-[700] text-[20px] md:text-[60px] md:leading-[22px] mb-4 md:mb-8 leading-[16px] text-center text-[#000]`}>Books</h1>
        <p className={`capitalize font-[400] text-[10px] text-[#D9D9D9] leading-[16px] text-center `}>Home / Collections / Books</p>
        {/* <div className={`flex justify-center`}>
          <input className={`w-full border border-[#d9d9d9] px-4 py-1 outline-none text-[#000] font-[400] leading-[16px] text-[10px] my-4`} type="text" name="" id="" placeholder="Date, new to old" />
        </div> */}

        <div className={`flex flex-wrap gap-2 justify-center my-6`}>
          <button 
            onClick={() => 
             {
              resetBooks();
              setActiveSort("all");
             }} 
            className={`${activeSort === "all" ? 'bg-[#1D7B84] cursor-pointer text-white' : 'bg-black text-white'} capitalize text-[10px] px-4 py-2 rounded hover:bg-gray-800 transition`}
          >
            all books
          </button>
          <button 
            onClick={() => 
             {
              sortBooks("year");
              setActiveSort("year");
             }} 
            className={`${activeSort === "year" ? 'bg-[#1D7B84] cursor-pointer text-white' : 'bg-black text-white'} capitalize text-[10px] px-4 py-2 rounded hover:bg-gray-800 transition`}
          >
           Year
          </button>
          <button 
            onClick={() => 
             {
              sortBooks("ratings");
              setActiveSort("ratings");
             }} 
            className={`${activeSort === "ratings" ? 'bg-[#1D7B84] cursor-pointer text-white' : 'bg-black text-white'} capitalize text-[10px] px-4 py-2 rounded hover:bg-gray-800 transition`}
          >
           Ratings
          </button>
          <button 
            onClick={() => 
             {
              sortBooks("author");
              setActiveSort("author");
             }} 
            className={`${activeSort === "author" ? 'bg-[#1D7B84] cursor-pointer text-white' : 'bg-black text-white'} capitalize text-[10px] px-4 py-2 rounded hover:bg-gray-800 transition`}
          >
           Author
          </button>
        </div>

        <section>
          {loading ?(<div className={`flex bg-[#000000c6] h-[100vh] fixed top-0 bottom-0 right-0 left-0 justify-center items-center`}>
        <div className={`w-[100px] h-[100px] rounded-[10px] bg-[#fff] flex justify-center items-center text-[40px]`}>
          {<ImSpinner6 className={` text-[#000] animate-spin`} />}
        </div>
      </div>): error ? (<div className={`flex bg-[#000000c6] h-[100vh] fixed top-0 bottom-0 right-0 left-0 justify-center items-center`}>
                    <div className={`p-4 rounded-[10px] bg-[#fff] flex justify-center items-center text-[40px]`}>
                      <p>{error}</p>
                    </div>
                  </div>) : books ? (<div className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-12`}>
            {books.map(book => {
              return <div key={book.key} className={``}>
                <BookCard book={book} />
              </div>
            })}
          </div>): (
          <div><p className={`text-red-600 text-center font-[700] text-[20px] leading-[16px]`}>Not found!</p></div>
        )}
        </section>
        
    </section>
  )
}

export default SearchPage;

