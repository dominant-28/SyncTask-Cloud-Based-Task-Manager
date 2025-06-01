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
        credentials: "include",
      }),
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/add-member",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updateFaceData: builder.mutation({
      query: (faceData) => ({
        url: AUTH_URL + '/face-data',
        method: 'PUT',
        body: { faceData },
        credentials: "include",
      }),
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation,useAddMemberMutation,useRegisterMutation,useFaceLoginMutation,useUpdateFaceDataMutation} = authApSlice;
