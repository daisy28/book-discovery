// src/store/useBookStore.ts
import { create } from 'zustand'

export interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface BookStore {
  query: string;
  books: Book[];
  loading: boolean;
  error: string | null;
  recentSearches: string[];
  readingLists: {
    wantToRead: Book[];
    currentlyReading: Book[];
    read: Book[];
  };
  setQuery: (query: string) => void;
  fetchBooks: () => void;
  addToList: (list: keyof BookStore['readingLists'], book: Book) => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  query: '',
  books: [],
  loading: false,
  error: null,
  recentSearches: [],
  readingLists: {
    wantToRead: [],
    currentlyReading: [],
    read: [],
  },
  setQuery: (query) => set({ query }),
  fetchBooks: async () => {
    const { query, recentSearches } = get()
    set({ loading: true, error: null })

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        console.log(res)
      const data = await res.json();
        console.log(data)

      set({
        books: data.docs,
        loading: false,
        recentSearches: [query, ...recentSearches.slice(0, 4)]
      })
    } catch (e) {
      set({ error: "Failed to fetch books", loading: false })
    }
  },
  addToList: (list, book) => {
    const lists = get().readingLists
    if (!lists[list].some((b) => b.key === book.key)) {
      lists[list].push(book)
      set({ readingLists: { ...lists } })
    }
  }
}))
