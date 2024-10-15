import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';

import HeaderComponent from '../Components/HeaderComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { toggleTodo, updateTodo } from '../redux/reducers/todoReducer';
import { useNavigation } from '@react-navigation/native';
import { getTodosFromStorage, saveTodosToStorage } from '../Utils/todoStorage';
import { TextInput } from 'react-native-gesture-handler';
// Define the Todo item type
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Define props for TodoScreen
interface TodoScreenProps {
  route: {
    params: {
      item: Todo;
    };
  };
}

const TodoScreen: React.FC<TodoScreenProps> = ({ route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newDescription, setNewDescription] = useState<string>(
    item.description
  );
  const navigation = useNavigation();

  useEffect(() => {
    setNewTitle(item.title);
    setNewDescription(item.description);
  }, [item]);

  const handleSave = useCallback(async () => {
    if (newTitle.trim() === '' || newDescription.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề và mô tả.');
      return;
    }
    dispatch(
      updateTodo({
        id: item.id,
        title: newTitle,
        description: newDescription,
        completed: item.completed,
      })
    );
    Alert.alert('Thông báo', 'Đã lưu thay đổi!');
    navigation.goBack();
  }, [dispatch, newTitle, newDescription, item.id, navigation]);

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <HeaderComponent title="Todo Details" />
      <View style={{ margin: 20 }}>
        <Text style={styles.textTitle}>Title</Text>
        <InputComponent
          placeholder="Title"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Text style={styles.textTitle}>Description</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Desciption"
            placeholderTextColor="#rgba(130, 129, 135, 1)"
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <ButtonComponent
          title="Save"
          colors={['#FF5789', '#FF9B9C']}
          onPress={handleSave}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeText: {
    fontSize: 20,
    color: 'green',
    marginTop: 5,
    textAlign: 'left',
    flex: 1,
  },
  checkbox: {
    alignSelf: 'center',
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    height: 100,
    color: '#fff',
    paddingHorizontal: 15,
    paddingTop: 10,
    textAlignVertical: 'top',
    flex: 1,
  },
});

export default TodoScreen;
