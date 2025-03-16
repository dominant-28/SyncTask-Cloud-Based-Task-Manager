
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import {apiSlice} from './slices/apiSlice'
import searchReducer from './slices/searchSlice'


const store= configureStore({
    reducer:{
        auth : authReducer,
        search:searchReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})

export default store