import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//roomapi for    canuserreview  and postreview  end poins
export const roomApi = createApi({

  reducerPath: "roomApi",

  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

  endpoints: (builder) => ({

    //1.
    canUserReview: builder.query({
      query(id) {
        return {
          url: `/reviews/can_review?roomId=${id}`,
        };
      },
    }),

    //2.
    postReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { usePostReviewMutation, useCanUserReviewQuery } = roomApi;
