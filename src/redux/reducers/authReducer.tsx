import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  loginggUser,
  loginggUserAuto,
  logoutUser,
  registerUser,
} from '../authActions';

const initialState = {
  isAuthenticated: false,
  user: null as {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  } | null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as null;
      })

      // Xử lý đăng ký
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as null;
      })
      //xu lu dang nhap bang google

      .addCase(loginggUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginggUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload || null;
        state.loading = false;
      })
      .addCase(loginggUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as null;
      })
      //xu ly auto dang nhap
      .addCase(loginggUserAuto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginggUserAuto.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload || null;
        state.loading = false;
      })
      .addCase(loginggUserAuto.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as null;
      })
      // Xử lý đăng xuất
      .addCase(logoutUser.pending, (state) => {
        state.loading = true; // Hiển thị trạng thái loading khi đang đăng xuất
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.loading = false; // Xóa trạng thái loading khi đăng xuất thành công
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null; // Lưu lỗi nếu có lỗi khi đăng xuất
      });
  },
});

export default authSlice.reducer;
