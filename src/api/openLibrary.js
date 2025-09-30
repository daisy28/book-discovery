import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

export const SearchBooks = async (query) => {
  const response = await axios.get(`${BASE_URL}/search.json`, {
    params: { q: query }
  });
  return response.data;
};

export const GetBookDetails = async (olid) => {
  const response = await axios.get(`${BASE_URL}/works/${olid}.json`);
  return response.data;
};

export const GetAuthorDetails = async (authorKey) => {
  const response = await axios.get(`${BASE_URL}${authorKey}.json`);
  return response.data;
};
