import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://lele-web-server.vercel.app/api";

export interface Greeting {
  _id?: string;
  name: string;
  description: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Greetings"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getGreetings: builder.query<Greeting[], undefined>({
      query: () => "/greetings",
      providesTags: ["Greetings"],
    }),
    createGreeting: builder.mutation<Greeting, Greeting>({
      query: (greeting) => ({
        url: "/greetings",
        method: "POST",
        body: greeting,
      }),
      invalidatesTags: ["Greetings"],
    }),
    updateGreeting: builder.mutation<Greeting, Greeting>({
      query: (greeting) => ({
        url: "/greetings",
        method: "PUT",
        body: greeting,
      }),
      invalidatesTags: ["Greetings"],
    }),
    deleteGreeting: builder.mutation<Greeting, Greeting>({
      query: (greeting) => ({
        url: "/greetings",
        method: "DELETE",
        body: greeting,
      }),
      invalidatesTags: ["Greetings"],
    }),
  }),
});

export const {
  useGetGreetingsQuery,
  useCreateGreetingMutation,
  useUpdateGreetingMutation,
  useDeleteGreetingMutation,
} = apiSlice;
