import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for saving a post
export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/savePost`, {
        postMsg: postData.postMsg,
        email: postData.email,
      });
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk for fetching posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getPosts`);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk for liking a post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/likePost/${postData.postId}`,
        { userId: postData.userId }
      );
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deletePost/${postId}`);
      return { postId, msg: response.data.msg };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk for updating a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postMsg }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updatePost/${postId}`,
        { postMsg }
      );
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Initial state
const initialState = {
  status: "idle",
  posts: [],
  error: null,
  cart: [],
};

// Slice definition
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (state.cart[index]) {
        state.cart[index].quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Post
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to save the post.";
      })

      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch posts.";
      })

      // Like Post
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index].likes = action.payload.likes;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to like the post.";
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload.postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete the post.";
      })

      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update the post.";
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity } = postSlice.actions;
export default postSlice.reducer;
