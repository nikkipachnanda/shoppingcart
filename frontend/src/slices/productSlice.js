import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apliSlice";

export const ProductsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:({keyword, pageNumber})=> ({
                url:PRODUCTS_URL,
                params:{
                  pageNumber,
                  keyword
                }
            }),
            keepUnusedDataFor:5,
            providesTags: ['Products'],           
        }),
        getProductDetails:builder.query({
            query:(productId)=> ({
                url:`${PRODUCTS_URL}/${productId}`,
                keepUnusedDataFor:5
            })
        }),
        createProduct: builder.mutation({
            query: () => ({
              url: `${PRODUCTS_URL}`,
              method: 'POST',
            }),
            invalidatesTags: ['Product'],
          }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
              method: 'DELETE',
            }),
            providesTags: ['Product'],
          }),

          updateProduct: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}`,
              method: 'PUT',
              body:data,
            }),
            invalidatesTags: ['Products'],
          }),
          uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOADS_URL}`,
              method: 'POST',
              body: data,
            }),
          }),
          createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
          getTopProducts:builder.query({
            query:()=> ({
                url:`${PRODUCTS_URL}/top`
            }),
            keepUnusedDataFor:5
        }),  
    })
}) 

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, 
     useDeleteProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useCreateReviewMutation
    , useGetTopProductsQuery
    } = ProductsApiSlice;