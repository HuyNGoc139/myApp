// store.ts
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Sử dụng AsyncStorage
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Sử dụng AsyncStorage cho React Native
  whitelist: ['todos', 'auth', 'language', 'theme'], // Chỉ lưu todos va auth trong Redux store
};

// Tạo reducer đã được persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với reducer đã được persist
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
