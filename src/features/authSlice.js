import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

//checking login success or failure

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;             // clear user on failure
      state.isAuthenticated = false; // clear auth flag on failure
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});


export const { loginSuccess, loginFailure, logout } = authSlice.actions;


export default authSlice.reducer;
