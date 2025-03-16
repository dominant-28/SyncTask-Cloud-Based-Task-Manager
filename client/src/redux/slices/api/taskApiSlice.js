const TASK_URL = "/task";
import { apiSlice } from "../apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASK_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllTask: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/update/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    trashedTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    createSubTask: builder.mutation({
      query: ({data,id}) => ({
        url: `${TASK_URL}/create-subtask/${id}`,
        method: "PUT",
        body : data,
        credentials: "include",
      }),
    }),
    getSingleTask: builder.query({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    postTaskActivity:builder.mutation({
      query:(data)=>({
        url:`${TASK_URL}/activity/${data.id}`,
        method:"POST",
        body:data.data,
        credentials:"include",
      }),
    }),
    deleteRestoreTask:builder.mutation({
      query:({id,actionType})=>({
        url:`${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,
        method:"DELETE",
        credentials:"include",
      }),
    }),
    updateTaskAssets: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/updateAssets/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useGetDashboardStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useTrashedTaskMutation,
  useCreateSubTaskMutation,
  useGetSingleTaskQuery,
  usePostTaskActivityMutation,
  useDeleteRestoreTaskMutation,
  useUpdateTaskAssetsMutation
} = taskApiSlice;
