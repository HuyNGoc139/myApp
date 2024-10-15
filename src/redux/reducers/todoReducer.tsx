import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Define the state for todos
interface TodosState {
  todos: Todo[];
  filter: 'all' | 'completed' | 'todo';
  filterText: string;
}

// Define the initial state
const initialState: TodosState = {
  todos: [],
  filter: 'all',
  filterText: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'todo'>) => {
      state.filter = action.payload; // Cập nhật filter
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload; // Cập nhật văn bản tìm kiếm
    },
    resetTodos: (state) => {
      state.todos = []; // Đặt lại todos về danh sách rỗng
    },
  },
});

// Chỉnh sửa để loại bỏ loadTodosFromStorage

export const selectFilteredTodos = createSelector(
  (state: { todos: TodosState }) => state.todos.todos,
  (state: { todos: TodosState }) => state.todos.filter,
  (state: { todos: TodosState }) => state.todos.filterText,
  (todos, filter, filterText) => {
    let filteredTodos = todos;

    // Lọc theo trạng thái completed hoặc todo
    switch (filter) {
      case 'completed':
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      case 'todo':
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    // Lọc theo đoạn văn bản trong tiêu đề hoặc mô tả
    if (filterText) {
      filteredTodos = filteredTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(filterText.toLowerCase()) ||
          todo.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    return filteredTodos;
  }
);

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  updateTodo,
  resetTodos,
  setFilterText,
} = todosSlice.actions;

export default todosSlice.reducer;
