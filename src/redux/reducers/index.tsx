import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todosReducer from './todoReducer';
import languageSlice from './languageSlice';
import themeSlice from './themeSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  language: languageSlice,
  theme: themeSlice,
});

export default rootReducer;
