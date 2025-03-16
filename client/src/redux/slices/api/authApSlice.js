const AUTH_URL = "/user";
import { apiSlice } from "../apiSlice";

export const authApSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_URL + "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    faceLogin: builder.mutation({
      query: (faceData) => ({
        url: AUTH_URL + '/face-login',
        method: 'POST',
        body: faceData,
      }),
    }),
    updateFaceData: builder.mutation({
      query: (faceData) => ({
        url: AUTH_URL + '/face-data',
        method: 'PUT',
        body: { faceData },
      }),
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation,useRegisterMutation,useFaceLoginMutation,useUpdateFaceDataMutation} = authApSlice;
