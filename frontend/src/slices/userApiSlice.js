import { USERS_URL } from "../constants";
import { apiSlice } from "./apliSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/login`,
              method: 'POST',
              body: data,
            }),
          }),

          register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
              method: 'POST',
              body: data,
            }),
          }), 

          logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout`,
              method: 'POST'
            }),
          }),
          profile: builder.mutation({
            query: (data, params) => ({
              url: `${USERS_URL}/profile`,
              method: 'put',
              body: data,
            }),
          }),  
        getUsers:builder.query({
            query:()=> ({
                url:`${USERS_URL}`
            }),
            providesTags:['Users'],
            keepUnusedDataFor:0
        }),
        deleteUser:builder.mutation({
          query:(userId)=> ({
              url:`${USERS_URL}/${userId}`,
              method:'DELETE'
          }),      
      }),
       getUserDetails: builder.query({
        query: (id) => ({
          url: `${USERS_URL}/${id}`,
        }),
        keepUnusedDataFor: 5,
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/${data.userId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['User'],
      }),
    })
}) 

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = userApiSlice;