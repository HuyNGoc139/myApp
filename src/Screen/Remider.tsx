import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import TodoComponent from '../Components/Todocomponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  setFilter,
  setFilterText, // Import thêm action này
  selectFilteredTodos,
} from '../redux/reducers/todoReducer';
import CheckBox from '@react-native-community/checkbox';
import { getTodosFromStorage, saveTodosToStorage } from '../Utils/todoStorage';
import { AppDispatch, RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAddTodo from '../Components/modalADd';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface ReminderScreenProps {
  navigation: any;
}

const ReminderScreen: React.FC<ReminderScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // Đây là giá trị tìm kiếm
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const filteredTodos = useSelector(selectFilteredTodos); // Dùng selector để lấy todos đã lọc
  const { filter } = useSelector((state: any) => state.todos);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSearch = useCallback(() => {
    dispatch(setFilterText(searchQuery)); // Cập nhật văn bản cần tìm
  }, [dispatch, searchQuery]);

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <HeaderComponent title="TodoList" />
      {/* search */}
      <View style={{ marginLeft: 20, marginRight: 20, alignItems: 'center' }}>
        <View
          style={[
            styles.inputContainer,
            {
              flexDirection: 'row',
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: 'center',
            },
          ]}
        >
          <TextInput
            placeholder="Title"
            placeholderTextColor="#rgba(130, 129, 135, 1)"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery} // Cập nhật giá trị searchQuery
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter By Status:</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filter === 'all'}
            onValueChange={() => dispatch(setFilter('all'))}
          />
          <Text style={styles.checkboxLabel}>All</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filter === 'completed'}
            onValueChange={() => dispatch(setFilter('completed'))}
          />
          <Text style={styles.checkboxLabel}>Completed</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filter === 'todo'}
            onValueChange={() => dispatch(setFilter('todo'))}
          />
          <Text style={styles.checkboxLabel}>To do</Text>
        </View>
      </View>
      <View style={{ flex: 1, margin: 20 }}>
        <FlatList
          data={filteredTodos} // Dùng dữ liệu đã lọc
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TodoComponent item={item} />}
          ListEmptyComponent={<Text>No Todos Available</Text>}
        />
      </View>
      <View style={{ margin: 20 }}>
        <ButtonComponent
          title="Add"
          colors={['#FF5789', '#FF9B9C']}
          // onPress={handleAddTodo}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <ModalAddTodo
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterText: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: 'white',
    marginLeft: 8,
  },
  input: {
    color: '#fff',
    // textAlignVertical: 'top',
    flex: 1,
  },
});

export default ReminderScreen;