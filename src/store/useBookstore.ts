import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  first_publish_year?: number;
  ratings_average?: number; // Add if needed for sorting
}

type ReadingListType = "wantToRead" | "currentlyReading" | "read";

interface BookStore {
  query: string;
  books: Book[];
  originalBooks: Book[];
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
  sortBooks: (type: 'year' | 'ratings' | 'author') => void;

  addToList: (book: Book, listType: ReadingListType) => void;
  removeFromList: (bookKey: string, listType: ReadingListType) => void;
  addRecentlyViewedBook: (book: Book) => void;
  resetBooks: () => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      query: '',
      books: [],
      originalBooks: [],
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

      // fetchBooks: async () => {
      //   const { query, recentSearches } = get();
      //   if (!query.trim()) return;

      //   set({ loading: true, error: null });

      //   try {
      //     const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      //     const data = await res.json();

      //     set({
      //       books: data.docs,
      //       loading: false,
      //       recentSearches: [query, ...recentSearches.filter(q => q !== query)].slice(0, 5),
      //     });
      //   } catch (e) {
      //     set({ error: "Failed to fetch books", loading: false });
      //   }
      // },

      fetchBooks: async () => {
        const { query, recentSearches } = get();
        if (!query.trim()) return;

        set({ loading: true, error: null });

        try {
          const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
          const data = await res.json();

          set({
            books: data.docs,
            originalBooks: data.docs, // 🔥 Save a copy
            loading: false,
            recentSearches: [query, ...recentSearches.filter(q => q !== query)].slice(0, 5),
          });
        } catch (e) {
          set({ error: "Failed to fetch books", loading: false });
        }
},

      sortBooks: (type) => {
        const books = [...get().books];
        let sorted = [];

        switch (type) {
          case 'year':
            sorted = books.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
            break;
          case 'ratings':
            sorted = books.sort((a, b) => (b.ratings_average || 0) - (a.ratings_average || 0));
            break;
          case 'author':
            sorted = books.sort((a, b) => {
              const aName = a.author_name?.[0] || '';
              const bName = b.author_name?.[0] || '';
              return aName.localeCompare(bName);
            });
            break;
          default:
            sorted = books;
        }

        set({ books: sorted });
      },

      resetBooks: () => {
  const { originalBooks } = get();
  set({ books: originalBooks });
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
      name: "book-store",
      partialize: (state) => ({
        readingLists: state.readingLists,
        recentSearches: state.recentSearches,
        recentlyViewedBooks: state.recentlyViewedBooks,
      }),
    }
  )
);
