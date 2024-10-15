import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todosReducer from './todoReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

export default rootReducer;
