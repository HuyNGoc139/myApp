import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todosReducer from './todoReducer';
import languageSlice from './languageSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  language: languageSlice,
});

export default rootReducer;
