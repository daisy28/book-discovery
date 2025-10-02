import axios from 'axios';
import { ParamValue } from 'next/dist/server/request/params';

const BASE_URL = 'https://openlibrary.org';

export const SearchBooks = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search.json`, {
    params: { q: query }
  });
  return response.data;
};

export const GetBookDetails = async (olid: ParamValue) => {
  const response = await axios.get(`${BASE_URL}/works/${olid}.json`);
  return response.data;
};

export const GetAuthorDetails = async (authorKey: string) => {
  const response = await axios.get(`${BASE_URL}${authorKey}.json`);
  return response.data;
};
