import { Book } from '../store/useBookstore';
import Image from 'next/image';
import { ImSpinner6 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  book: Book
}

const BookCard = ({ book }: {book: Book}) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : '/placeholder.png'

  const workId = book.key?.split('/').pop();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
  if (!workId) return;
  setIsLoading(true);
  router.push(`/book/${workId}`);
  };

  
  return (
    <div onClick={handleClick} className={`cursor-pointer`}>
      {isLoading && <div className={`flex bg-[#000000c6] h-[100vh] fixed top-0 bottom-0 right-0 left-0 justify-center items-center`}>
        <div className={`w-[100px] h-[100px] rounded-[10px] bg-[#fff] flex justify-center items-center text-[40px]`}>
          {<ImSpinner6 className={` text-[#000] animate-spin`} />}
        </div>
      </div>}
      <div className={`mb-4 cursor-pointer`}>
        <Image
          width={300} 
          height={450} 
          quality={100}
          src={coverUrl}
          alt={book.title}
          className={`w-full h-[243px] object-cover mb-3`}
          loading="lazy"
        />
        <div>
          <h3 className={`font-[600] text-[10px] md:text-[20px] md:leading-[22px] md:mb-6 leading-[16px] text-center text-[#000] mb-4`}>{book.title}</h3>
          <div className={`flex justify-center items-center`}>
            <p className={`text-[10px] font-[400] md:text-[20px] md:leading-[22px] leading-[16px] text-center text-[#000] `}>{book.author_name?.join(', ')}</p>
            {/* <p className="text-xs text-gray-400">{book.first_publish_year}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard;
