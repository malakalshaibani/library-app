import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      const msg = response.data.msg;
      // Return user data, including the role (e.g., 'admin' or 'user')
      return { user, msg };
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed";
      return rejectWithValue({ msg });
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      const msg = error.response?.data?.msg || "Registration failed";
      return rejectWithValue({ msg });
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      const msg = response.data.msg;
      return { msg };
    } catch (err) {
      return { msg: "Logout failed" };
    }
  }
);

const initialState = {
  user: null,
  msg: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "users", // name of the state
  initialState, // initial value of the state
  reducers: {
    // Reset error message and state
    clearError: (state) => {
      state.isError = false;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register actions
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload.msg;
      })

      // Login actions
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload.user; // Store the user data, including role
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })

      // Logout actions
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload?.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = "Logout failed";
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
