import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Đăng nhập

import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { updateUserStatus } from '../Utils/updateUserStatus';

GoogleSignin.configure({
  webClientId:
    '1038930635348-91umttq1d40pt74uj7dbbsuthdq40igt.apps.googleusercontent.com', // Client ID từ Firebase console
});
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { username, password,token }: { username: string; password: string,token:string },
    { rejectWithValue }
  ) => {
    try {
      // Thực hiện đăng nhập với email và password
      const userCredential = await auth().signInWithEmailAndPassword(username, password);
      updateUserStatus('online')
      // Trả về thông tin người dùng sau khi đăng nhập thành công
      const { user } = userCredential;
      const userDoc = await firestore().collection('User').doc(user.uid).get();
      if (!userDoc.exists) {
        return rejectWithValue('Người dùng không tồn tại trong cơ sở dữ liệu.');
      }
      return {
        id: user.uid,
  email: user.email,
  familyName: userDoc.data()?.familyName, // Hoặc lấy thuộc tính nào khác mà bạn muốn
  givenName:userDoc.data()?.givenName,
  photo: userDoc.data()?.photo || null,
      }
        
      
    } catch (error: any) {
      console.error('Firebase Login Error:', error);

      // Xử lý lỗi đăng nhập
      if (error.code === 'auth/user-not-found') {
        return rejectWithValue('Người dùng không tồn tại.');
      } else if (error.code === 'auth/wrong-password') {
        return rejectWithValue('Mật khẩu không đúng.');
      } else if (error.code === 'auth/invalid-email') {
        return rejectWithValue('Email không hợp lệ.');
      } else {
        return rejectWithValue('Đăng nhập thất bại!');
      }
    }
  }
);
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (
//     { username, password,token }: { username: string; password: string,token:string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post('https://httpbin.org/post', {
//         username,
//         password,
//         token,
//       });
//       if (response.status === 200) {
//         return response.data.json;
//       } else {
//         return rejectWithValue('Login failed: Unexpected response status.');
//       }
//     } catch (error) {
//       return rejectWithValue('Login failed!');
//     }
//   }
// );

// Đăng ký
// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (
//     {
//       firstName,
//       lastName,
//       email,
//       password,
//     }: { firstName: string; lastName: string; email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post('https://httpbin.org/post', {
//         firstName,
//         lastName,
//         email,
//         password,
//       });
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         return rejectWithValue(
//           'Registration failed: Unexpected response status.'
//         );
//       }
//     } catch (error) {
//       return rejectWithValue('Registration failed!');
//     }
//   }
// );
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
      // Tạo tài khoản người dùng với email và password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Lấy thông tin người dùng sau khi đăng ký thành công
      const { user } = userCredential;

      // Lưu thông tin người dùng vào Firestore
      await firestore().collection('User').doc(user.uid).set({
        id: user.uid,
        familyName:firstName,
        givenName:lastName,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        token:email+password,
        status: 'online',
      });
      // Trả về thông tin người dùng
      return {
        id: user.uid,
        email: user.email,
        familyName: firstName,
        givenName: lastName,
      };
    } catch (error: any) {
      // Xử lý lỗi đăng ký và in ra chi tiết lỗi
      console.error('Firebase Registration Error:', error);

      if (error.code === 'auth/email-already-in-use') {
        return rejectWithValue('Email này đã được sử dụng.');
      } else if (error.code === 'auth/invalid-email') {
        return rejectWithValue('Email không hợp lệ.');
      } else if (error.code === 'auth/weak-password') {
        return rejectWithValue('Mật khẩu quá yếu.');
      } else {
        // Trả về chi tiết lỗi
        return rejectWithValue(`Đăng ký thất bại: ${error.message}`);
      }
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
      const  idToken  = response.data?.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken||'');
      const userCredential = await auth().signInWithCredential(googleCredential);

      const { user } = userCredential;
      updateUserStatus('online')
      // Kiểm tra xem người dùng đã tồn tại trong Firestore hay chưa
      const userDoc = await firestore().collection('User').doc(user.uid).get();
      if (!userDoc.exists) {
        // Nếu người dùng chưa tồn tại, tạo tài khoản mới
        await firestore().collection('User').doc(user.uid).set({
          id: user.uid,
          email: user.email,
          photo: user.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: 'online',
          familyName:response.data?.user.familyName,
        givenName:response.data?.user.givenName,
        token:idToken,
        });
      }
      await AsyncStorage.setItem('token', response.data?.idToken ?? '');

      if (response.data?.user) {
        return response.data; // Trả về thông tin người dùng sau khi đăng nhập
      } else {
        return rejectWithValue('Login failed: Unexpected response status.');
      }
    } catch (error) {
      return rejectWithValue('Login failed!');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      auth()
      .signOut()
      .then(() => {
        Alert.alert('Đăng xuất thành công!');
      })
      .catch(error => {
        // Alert.alert('Đăng xuất thất bại!', error.message);
      });
      GoogleSignin.signOut();
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue('Logout failed!');
    }
  }
);
