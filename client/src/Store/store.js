import { configureStore } from '@reduxjs/toolkit'
import booksReducer from "../Features/UserSlice";
import usersReducer from "../Features/UserSlice";
import postReducer from "../Features/PostSlice";

export const store = configureStore({
  reducer: {
    books:booksReducer,
    users:usersReducer,
    posts: postReducer,
   
  },
})
