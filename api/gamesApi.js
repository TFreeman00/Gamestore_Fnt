import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getAllGames: builder.query({
      query: () => "/games",
    }),

    getGameById: builder.query({
      query: (id) => "/games/" + id,
    }),

    createGame: builder.mutation({
      query: ({
        title,
        genre,
        platform,
        first_release_date,
        image,
        price,
        trailer,
        description,
        token,
      }) => ({
        url: "/games",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: {
          title,
          genre,
          platform,
          first_release_date,
          image,
          price,
          trailer,
          description,
        },
      }),
    }),

    updateGame: builder.mutation({
      query: ({
        id,
        title,
        genre,
        platform,
        first_release_date,
        image,
        price,
        trailer,
        description,
        token,
      }) => ({
        url: "/games/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: {
          title,
          genre,
          platform,
          first_release_date,
          image,
          price,
          trailer,
          description,
        },
      }),
    }),

    deleteGame: builder.mutation({
      query: ({ id, token }) => ({
        url: "/games/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllGamesQuery,
  useGetGameByIdQuery,
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
} = gamesApi;
