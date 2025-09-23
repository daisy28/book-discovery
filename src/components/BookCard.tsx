// src/components/BookCard.tsx
import { Book } from '../store/useBookstore';
import Image from 'next/image';

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : '/placeholder.png'

    // console.log()
  
  return (
    <div className={`mb-4 cursor-pointer`}>
      <Image
        width={100}
        height={100}
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
  )
}
