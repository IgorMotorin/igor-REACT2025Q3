import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './URL';

interface Post {
  page: string;
  search: string;
}

interface Results {
  count: number;
  next: string;
  results: { id: string; title: string; authors: [{ name: string }] }[];
}

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBooks: builder.query<Results, Post, Post>({
      query: (post: Post) => `?page=${post.page}&search=${post.search}`,
    }),
    getBook: builder.query({ query: (id) => `${id}/` }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = booksApi;
