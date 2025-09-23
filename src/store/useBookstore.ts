// /store/useBookStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  first_publish_year?: number;
}

type ReadingListType = "wantToRead" | "currentlyReading" | "read";

interface BookStore {
  query: string;
  books: Book[];
  loading: boolean;
  error: string | null;
  recentSearches: string[];
  recentlyViewedBooks: Book[];
  readingLists: {
    wantToRead: Book[];
    currentlyReading: Book[];
    read: Book[];
  };

  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  fetchBooks: () => Promise<void>;
  addToList: (book: Book, listType: ReadingListType) => void;
  removeFromList: (bookKey: string, listType: ReadingListType) => void;
  addRecentlyViewedBook: (book: Book) => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      query: '',
      books: [],
      loading: false,
      error: null,
      recentSearches: [],
      recentlyViewedBooks: [],
      readingLists: {
        wantToRead: [],
        currentlyReading: [],
        read: [],
      },

      setQuery: (query) => set({ query }),

      setLoading: (loading) => set({ loading }),

      fetchBooks: async () => {
        const { query, recentSearches } = get();
        set({ loading: true, error: null });

        try {
          const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
          const data = await res.json();

          set({
            books: data.docs,
            loading: false,
            recentSearches: [query, ...recentSearches.filter(q => q !== query)].slice(0, 5),
          });
        } catch (e) {
          set({ error: "Failed to fetch books", loading: false });
        }
      },

      addToList: (book, listType) => {
        const current = get().readingLists[listType];
        const exists = current.find(b => b.key === book.key);
        if (exists) return;

        set(state => ({
          readingLists: {
            ...state.readingLists,
            [listType]: [...current, book],
          },
        }));
      },

      removeFromList: (bookKey, listType) => {
        const current = get().readingLists[listType];
        set(state => ({
          readingLists: {
            ...state.readingLists,
            [listType]: current.filter(b => b.key !== bookKey),
          },
        }));
      },

      addRecentlyViewedBook: (book) => {
        const current = get().recentlyViewedBooks;
        const exists = current.find(b => b.key === book.key);
        const updated = exists
          ? [book, ...current.filter(b => b.key !== book.key)]
          : [book, ...current];

        set({
          recentlyViewedBooks: updated.slice(0, 5),
        });
      },
    }),
    {
      name: "book-store", // name in localStorage
      partialize: (state) => ({
        readingLists: state.readingLists,
        recentSearches: state.recentSearches,
        recentlyViewedBooks: state.recentlyViewedBooks,
      }),
    }
  )
);
