import CheckBox from '@react-native-community/checkbox';
import React, { useCallback } from 'react';
import {StyleSheet,Alert } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  selectFilteredTodos,
} from '../../redux/reducers/todoReducer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getTodosFromStorage,
  saveTodosToStorage,
} from '../../utils/todoStorage';

// Define a type for the Todo item
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Define props for TodoComponent
interface TodoComponentProps {
  item: Todo;
}

const TodoComponent: React.FC<TodoComponentProps> = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const todos = useSelector(selectFilteredTodos);

  const onToggleCompleted = useCallback(async () => {
    dispatch(toggleTodo(item.id));

    // const existingTodos = await getTodosFromStorage();
    // const updatedTodos = existingTodos.map((todo) =>
    //   todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
    // );
    // saveTodosToStorage(updatedTodos);
  }, [dispatch, item.id]);

  const handleRemove = useCallback(() => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa việc này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            dispatch(removeTodo(item.id));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }, [dispatch, item.id]);

  return (
    <View style={styles.container}>
      <CheckBox value={item.completed} onValueChange={onToggleCompleted} />
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={{ width: 200, justifyContent: 'center' }}
          onPress={() => navigation.navigate('TodoScreen', { item })}
        >
          <Text
            style={[
              styles.title,
              { textDecorationLine: item.completed ? 'line-through' : 'none' },
            ]}
          >
            {item.title}
          </Text>
          {item.description ? (
            <Text
              style={styles.description}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <View style={styles.actionsContainer}>
          {item.completed && <Text style={styles.completeText}>Complete</Text>}
          <TouchableOpacity onPress={handleRemove}>
            <Text style={[styles.completeText, { color: 'red' }]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  completeText: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default TodoComponent;
