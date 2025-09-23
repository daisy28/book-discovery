'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBookStore } from "../../../store/useBookstore"; 
import { useParams } from "next/navigation";
import { FaBook, FaBookOpen, FaRegHeart } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";

interface Book {
  title: string;
  covers?: number[];
  description?: string | { value: string };
  authors?: { author: { key: string } }[];
  first_publish_date?: string;
  subjects?: string[];
  revision?: number
}

interface Author {
  name: string;
  bio?: string | { value: string };
  photos: string[];
}

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading, loading, addToList, addRecentlyViewedBook } = useBookStore();
  const [add, setAdd] = useState(false);
  const [currentlyReading, setCurrentlyReading] = useState(false);
  const [alreadyRead, setAlreadyRead] = useState(false);

  const handleAdd = (listType: "wantToRead" | "currentlyReading" | "read") => {
    if (book) addToList(book, listType);
    listType === "wantToRead" ? setAdd(!add) : null;
    listType === "currentlyReading" ? setCurrentlyReading(!currentlyReading) : null;
    listType === "read" ? setAlreadyRead(!alreadyRead) : null;
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const bookRes = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!bookRes.ok) throw new Error("Failed to fetch book details");
        const bookData = await bookRes.json();
        console.log(bookData)
        setBook(bookData);

        const authorKey = bookData?.authors?.[0]?.author?.key;
        if (authorKey) {
          const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
          if (authorRes.ok) {
            const authorData = await authorRes.json();
            console.log(authorData)
            setAuthor(authorData);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookDetails();
  }, [id, setLoading]);

useEffect(() => {
  if (book) {
    addRecentlyViewedBook({
      key: `/works/${id}`, // Make sure it matches your book keys
      title: book.title,
      author_name: author?.name ? [author.name] : [],
      cover_i: book.covers?.[0],
      first_publish_year: book.first_publish_date ? parseInt(book.first_publish_date) : undefined,
    });
  }
}, [book]);



  const coverId = book?.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "/no-cover.jpg";

  const authorId = author?.photos ? author.photos[0] : "12919462";
  console.log(authorId)
  const authorUrl = authorId ? `https://covers.openlibrary.org/b/id/${authorId}-M.jpg`
    : "/no-cover.jpg";

  return (
    <section className={`p-6 my-8 md:w-[80%] mx-auto`}>
      {loading ? (<div className={`flex bg-[#000000c6] h-[100vh] fixed top-0 bottom-0 right-0 left-0 justify-center items-center`}>
              <div className={`w-[100px] h-[100px] rounded-[10px] bg-[#fff] flex justify-center items-center text-[40px]`}>
                {<ImSpinner6 className={` text-[#000] animate-spin`} />}
              </div>
            </div>) : error ? (<div className={`flex bg-[#000000c6] h-[100vh] fixed top-0 bottom-0 right-0 left-0 justify-center items-center`}>
                    <div className={`p-4 rounded-[10px] bg-[#fff] flex justify-center items-center text-[40px]`}>
                      <p>{error}</p>
                    </div>
                  </div>) : book ? (
                    <div>
            <h1 className={`mb-6 font-[400] text-[10px] text-center text-[#d9d9d9] leading-[16px]`}>Home / Collections / Books / {book?.title}</h1>
            <div className={`md:grid grid-cols-2 gap-8`}>
              <div className={`mb-6 flex justify-center items-center`}>
                  <Image
                  src={coverUrl}
                  alt={book?.title ? book!.title : ""}
                  className={`w-[254px] h-[353px] object-cover`} 
                  width={100}
                  height={100}
                  />
              </div>

              <div>
                <div className={`flex justify-between items-center mb-4`}>
                  <h2 className={`font-[700] text-[12px] md:text-[30px] md:leading-[34px] md:mb-2 leading-[16px] text-[#000]`}>{book?.title}</h2>
                  <p className={`font-[700] text-[12px] leading-[16px] text-[#000] md:hidden`}>${book?.revision}.00</p>
                </div>
                <div className={`mb-6 md:mb-8`}>
                  <p className={`uppercase font-[400] text-[10px] md:text-[16px] md:leading-[22px] leading-[16px] text-[#000]`}>author: <span className={`capitalize`}>{author?.name}</span></p>
                  <p className={`uppercase font-[400] text-[10px] md:text-[16px] md:leading-[22px] leading-[16px] text-[#000]`}>editor: <span className={`capitalize`}>{author?.name}</span></p>
                </div>
                <div className={`mb-8`}>
                  <h4 className={`font-[600] text-[10px] md:text-[16px] md:leading-[22px] leading-[16px] text-[#000] mb-4`}>Shipping and Delivery Time</h4>
                  <div className={`relative`}>
                    <input className={`w-full outline-none border border-[#000] p-1 pl-3 md:p-2 text-[10px] font-[400] leading-[16px] text-[#0000008a]`} type="text" placeholder="ZIP CODE" />
                    <button className={`absolute right-0 w-[43px] top-0 bottom-0 bg-[#090909] flex justify-center items-center font-[700] text-[10px] leading-[16px] text-[#fff]`}>OK</button>
                  </div>
                </div>

                <div className={`hidden md:block my-8`}>
                  <p className={`font-[700] text-[24px] leading-[22px] text-[#000]`}>${book?.revision}.00</p>
                </div>

                <div className={`flex gap-4 items-center mb-6`}>
                  <div className={`md:order-1 flex gap-1 items-start`}>
                    <FaRegHeart className={`w-[30px] h-[26px] md:w-[40px] md:h-[35px]`} /> 
                    <p className={`hidden md:block uppercase font-[700] text-[16px] leading-[22px] text-[#000] `}>add to wishlist</p>
                  </div>
                  <button className={`md:order-0 bg-[#000] rounded-[35px] w-full md:w-[50%] p-2 uppercase font-[700] text-[10px] leading-[16px] text-center text-[#fff] `}>add to cart</button>
                </div>

                
              </div>
            </div>


            <div className={`md:grid grid-cols-2 gap-8`}>
              <div className={`mb-4 md:w-[80%]`}>
                <div className={`md:mb-6`}>
                  <h5 className={`uppercase font-[700] text-[#000] text-[10px] md:text-[20px] md:leading-[24px] leading-[16px] mb-2 `}>details</h5>
                  <p className={`uppercase font-[500] text-[10px] md:text-[16px] md:leading-[24px] leading-[16px] text-[#000]`}>isbn: <span className={`lowercase`}>{id}</span></p>
                  <p className={`uppercase font-[500] text-[10px] md:text-[16px] md:leading-[24px] leading-[16px] text-[#000]`}>hardcover: <span className={`lowercase`}>{book?.covers?.length} pages</span></p>
                  <p className={`uppercase font-[500] text-[10px] md:text-[16px] md:leading-[24px] leading-[16px] text-[#000]`}>size: <span className={`lowercase`}>9.4&quot; X 8.1&quot;</span></p>
                  <p className={`font-[500] text-[10px] md:text-[16px] md:leading-[24px] leading-[16px] text-[#000]`}>font size: <span className={``}>12 pt Arial</span></p>
                </div>

                <div>
                  <div className={`flex flex-col gap-4 my-8`}>
                    <button onClick={() => handleAdd("wantToRead")} className={`flex justify-between items-center`}>
                      📚 Want to Read
                      {add ? <IoIosAddCircle className={`w-[20px] h-[20px] `} /> : <IoIosAddCircleOutline  className={`w-[20px] h-[20px]`} />}
                    </button>
                    <button onClick={() => handleAdd("currentlyReading")} className={`flex justify-between items-center`}>
                      📖 Currently Reading
                      {currentlyReading ? <FaBookOpen className={`w-[20px] h-[20px]`} /> : <FaBook className={`w-[20px] h-[20px]`} />}
                    </button>
                    <button onClick={() => handleAdd("read")} className={`flex justify-between items-center`}>
                      ✅ Mark as Read
                      {alreadyRead ? <FaCircleCheck className={`w-[20px] h-[20px]`} /> : <FaRegCircleCheck className={`w-[20px] h-[20px]`} />}
                    </button>
                  </div>
                </div>

              </div>
              <div className={`md:flex flex-col gap-8`}>
                <div className={`mb-4`}>
                  <h5 className={`uppercase font-[700] text-[#000] text-[10px] leading-[16px] mb-2`}>overview</h5>
                  <p className={`font-[500] text-[10px] leading-[16px] text-[#000]`}>{typeof book?.description === "string" ? book?.description?.toString() : book?.description?.value}</p>
                </div>

                <div className={`mb-4 md:w-full`}>
                  <h5 className={`uppercase font-[700] text-[#000] text-[10px] leading-[16px] mb-4`}>about the author</h5>
                  <div className={`flex gap-4 items-center`}>
                    <div className={`w-[40%] md:w-[50%]`}>
                      <Image 
                      src={authorUrl} 
                      alt={author?.name ? author!.name : ""} 
                      className={`w-[100px] h-[100px] rounded-full object-cover md:rounded-[20px]`} 
                      width={100}
                      height={100}/>
                    </div>
                    <p className={`w-[50%] md:w-[50%] font-[500] text-[10px] leading-[16px] text-[#000]`}>{typeof author?.bio === "string" ? author?.bio.toString() : author?.bio?.value}</p>
                  </div>
                </div>
              </div>
              
            </div>
        </div>) : (
          <div><p className={`text-red-600 text-center font-[700] text-[20px] leading-[16px]`}>Not found!</p></div>
        )}
        
    </section>
   
  );
}



