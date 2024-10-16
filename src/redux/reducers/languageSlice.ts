import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: 'en', // Ngôn ngữ mặc định là tiếng Anh
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18next.changeLanguage(action.payload); // Cập nhật ngôn ngữ trong i18next
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
