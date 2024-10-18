import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Alert,
} from 'react-native';
import { Checkbox } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
export interface SelectModel {
  userName: string;
  id: string;
  lastmesage?: any;
  photo?: string;
}

interface ModalAddGroupProps {
  visible: boolean;
  onClose: () => void;
  users: SelectModel[];
  currentuser: any;
}

const ModalAddGroup: React.FC<ModalAddGroupProps> = ({
  visible,
  onClose,
  users,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<SelectModel[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const handleToggleUser = (user: SelectModel) => {
    const isSelected = selectedUsers.some(
      (selected) => selected.id === user.id
    );
    if (isSelected) {
      setSelectedUsers((prev) =>
        prev.filter((selected) => selected.id !== user.id)
      );
    } else {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const createGroup = async (selectedUsers: SelectModel[]) => {
    if (selectedUsers.length < 2) {
      console.log('Nhóm phải có ít nhất 2 thành viên.');
      return;
    }

    const allUsers = [...selectedUsers, user];

    // Lấy ID và tên của tất cả người dùng, bao gồm người dùng hiện tại
    const userIds = allUsers.map((user) => user?.id).sort(); // Sắp xếp để đảm bảo ID nhóm nhất quán
    const groupName = allUsers.map((user) => user?.userName).join(', '); // Tạo tên nhóm từ tên các thành viên

    // Tạo groupId bằng cách nối các id của user
    const groupId = userIds.join('-');

    try {
      const groupRef = firestore().collection('Group').doc(groupId);
      const groupDoc = await groupRef.get();

      if (groupDoc.exists) {
        Alert.alert(`Nhóm với ID ${groupId} đã tồn tại.`);
        return; // Nếu nhóm đã tồn tại thì không tạo nữa
      }

      // Nếu nhóm chưa tồn tại, tiến hành tạo nhóm mới
      await groupRef.set({
        groupName, // Lưu tên nhóm là tên các thành viên
        members: userIds, // Lưu danh sách ID của thành viên trong nhóm
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log(
        `Nhóm ${groupName} đã được tạo thành công với ID: ${groupId}`
      );
    } catch (error) {
      console.error('Lỗi khi tạo nhóm:', error);
    }
  };

  const handleCreateGroup = () => {
    if (selectedUsers.length > 1) {
      createGroup(selectedUsers);
      setSelectedUsers([]);
      onClose();
    } else {
      Alert.alert('Số thành viên phải > 1');
    }
  };

  const handleClose = () => {
    // Clear selected users when modal is closed
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Group</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Checkbox
                  status={
                    selectedUsers.some((selected) => selected.id === item.id)
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleToggleUser(item)}
                />
                {item.photo ? (
                  <Image source={{ uri: item.photo }} style={styles.avatar} />
                ) : (
                  <Image
                    source={require('../assets/avatar.png')}
                    style={styles.avatar}
                  />
                )}
                <Text style={styles.userName}>{item.userName}</Text>
              </View>
            )}
          />
          <View style={styles.modalFooter}>
            <Button title="Cancel" onPress={handleClose} />
            <Button title="Create Group" onPress={handleCreateGroup} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ModalAddGroup;
