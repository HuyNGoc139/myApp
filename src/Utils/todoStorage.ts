import AsyncStorage from '@react-native-async-storage/async-storage';
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TODOS_KEY = '@todos';

export const saveTodosToStorage = async (todos: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save todos to storage:', e);
  }
};

// Lấy danh sách todos từ AsyncStorage
export const getTodosFromStorage = async (): Promise<Todo[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch todos from storage:', e);
    return [];
  }
};
