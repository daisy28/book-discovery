// /app/dashboard/page.tsx
'use client';

import { useBookStore } from "../../store/useBookstore";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const {
    readingLists,
    recentSearches,
    recentlyViewedBooks,
  } = useBookStore();

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 Your Reading Dashboard</h1>

      {/* 📊 Reading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {["wantToRead", "currentlyReading", "read"].map((listType) => (
          <div key={listType} className="bg-white border shadow p-4 rounded">
            <p className="text-gray-500 uppercase text-sm">{listType}</p>
            <p className="text-2xl font-bold text-black">
              {readingLists[listType as keyof typeof readingLists].length}
            </p>
          </div>
        ))}
      </div>

      {/* 🔍 Recently Searched */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🔍 Recently Searched</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          {recentSearches.length > 0 ? (
            recentSearches.map((query, i) => (
              <li key={i}>{query}</li>
            ))
          ) : (
            <li>No recent searches</li>
          )}
        </ul>
      </div>

      {/* 👁️ Recently Viewed */}
      <div>
        <h2 className="text-xl font-semibold mb-4">👁️ Recently Viewed Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {recentlyViewedBooks.length > 0 ? (
            recentlyViewedBooks.map((book, index) => {
              const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "/no-cover.jpg";

              return (
                <Link
                  key={index}
                  href={`/books/${book.key.replace("/works/", "")}`}
                  className="block border rounded shadow hover:shadow-md transition"
                >
                  <Image
                    src={coverUrl}
                    alt={book.title}
                    width={120}
                    height={180}
                    className="w-full h-auto object-cover rounded-t"
                  />
                  <div className="p-2">
                    <p className="text-sm font-semibold">{book.title}</p>
                    {book.author_name?.length > 0 && (
                      <p className="text-xs text-gray-500">
                        {book.author_name[0]}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No books viewed yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
