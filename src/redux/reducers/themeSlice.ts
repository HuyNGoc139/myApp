import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  color: string;
}

const initialState: ThemeState = {
  color: '#FF5789', // Màu mặc định
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = themeSlice.actions;
export default themeSlice.reducer;
