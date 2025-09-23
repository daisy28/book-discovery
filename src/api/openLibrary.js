import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query) => {
  const response = await axios.get(`${BASE_URL}/search.json`, {
    params: { q: query }
  });
  return response.data;
};

export const getBookDetails = async (olid) => {
  const response = await axios.get(`${BASE_URL}/works/${olid}.json`);
  return response.data;
};
