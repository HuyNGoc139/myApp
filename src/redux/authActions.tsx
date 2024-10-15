import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Đăng nhập

GoogleSignin.configure({
  webClientId: '1038930635348-91umttq1d40pt74uj7dbbsuthdq40igt.apps.googleusercontent.com', // Client ID từ Firebase console
});

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('https://httpbin.org/post', {
        username,
        password,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Login failed: Unexpected response status.');
      }
    } catch (error) {
      return rejectWithValue('Login failed!');
    }
  }
);

// Đăng ký
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      firstName,
      lastName,
      email,
      password,
    }: { firstName: string; lastName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('https://httpbin.org/post', {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          'Registration failed: Unexpected response status.'
        );
      }
    } catch (error) {
      return rejectWithValue('Registration failed!');
    }
  }
);
export const loginggUser = createAsyncThunk(
  'auth/loginggUser',
  async (_, { rejectWithValue }) => {
    try {
        // Nếu không có token, tiến hành đăng nhập thủ công
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        await AsyncStorage.setItem('token', response.data?.idToken ?? '');

        if (response.data?.user) {
          return response.data?.user; // Trả về thông tin người dùng sau khi đăng nhập
        } else {
          return rejectWithValue('Login failed: Unexpected response status.');
        }
      
    } catch (error) {
      return rejectWithValue('Login failed!');
    }
  }
);
export const loginggUserAuto = createAsyncThunk(
  'auth/loginggUserAuto',
  async (_, { rejectWithValue }) => {
    try {
      // Kiểm tra nếu có token trong AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (token) {
        // Nếu có token, thực hiện đăng nhập tự động
        const userInfo = await GoogleSignin.signInSilently(); 
        
        if (userInfo && userInfo.data?.user) {
          return userInfo.data?.user;
        } else {
          return rejectWithValue('Auto-login failed: User info not found.');
        }
      } else {
        // Nếu không có token, trả về lỗi hoặc null
        return rejectWithValue('No token found, cannot auto-login.');
      }
    } catch (error) {
      return rejectWithValue('Auto-login failed due to an error.');
    }
  }
);

// Đăng xuất
// export const logoutUser = createAsyncThunk('auth/logout', async () => {
//   return {};
// });
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    GoogleSignin.signOut();
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem('token');
  } catch (error) {
    return rejectWithValue('Logout failed!');
  }
});