import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  loginggUser,
  logoutUser,
  registerUser,
} from '../authActions';
import { Timestamp } from '@react-native-firebase/firestore';

const initialState = {
  isAuthenticated: false,
  user: null as {
    id: string;
    name?: string | null;
    email: string;
    photo?: string | null;
    familyName: string | null;
    givenName: string | null;
    userName?: string | null;
  } | null,
  // create_At:Timestamp,
  error: null,
  loading: false,
  token: null,
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
        state.user = {
          id: action.payload.id,
          email: action.payload.email || '',
          familyName: action.payload.familyName || null,
          givenName: action.payload.givenName || null,
          userName: action.payload.familyName + ' ' + action.payload.givenName,
        };
        state.loading = false;
        // state.token=action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as null;
        state.token = null;
      })

      // Xử lý đăng ký
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          email: action.payload.email || '',
          familyName: action.payload.familyName || null,
          givenName: action.payload.givenName || null,
          userName: action.payload.familyName + ' ' + action.payload.givenName,
        };
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
        state.user = action.payload.user || null;
        state.loading = false;
        state.token = action.payload.idToken as null;
      })
      .addCase(loginggUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as null;
        state.token = null;
      })

      // Xử lý đăng xuất
      .addCase(logoutUser.pending, (state) => {
        state.loading = true; // Hiển thị trạng thái loading khi đang đăng xuất
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.loading = false;
        state.token = null;
        // Xóa trạng thái loading khi đăng xuất thành công
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null; // Lưu lỗi nếu có lỗi khi đăng xuất
      });
  },
});

export default authSlice.reducer;
