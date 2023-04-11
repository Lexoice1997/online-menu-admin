import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

// process.env.REACT_APP_API_URL
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://kvartirabar.uz',
  // credentials: 'include',
  // prepareHeaders: (headers, { getState }) => {
  //   const { token } = (getState() as RootState).auth;
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ['Categories', 'Users', 'Foods'],
});
