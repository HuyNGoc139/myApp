import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ChatItem from '../Components/ChatItem';
import { Edit } from 'iconsax-react-native';
import ModalAddGroup from '../Components/ModalAddGroup';
import GroupItem from '../Components/GroupItem';
export interface SelectModel {
  userName: string;
  id: string;
  lastmesage?: any;
  photo?: string;
}

const SendScreen = ({ navigation }: any) => {
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchKey, setSearchKey] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      handleGetAllUsers(user.id);
      listenToGroups(user.id);
    }
  }, [user]);

  // Lắng nghe thay đổi trong nhóm
  const listenToGroups = (currentUserId: string) => {
    const unsubscribe = firestore()
      .collection('Group')
      .where('members', 'array-contains', currentUserId)
      .onSnapshot(snapshot => {
        const updatedGroups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(updatedGroups);
      });

    return () => unsubscribe(); // Hủy lắng nghe khi component bị unmount
  };

  const handleGetAllUsers = async (currentUserId: string) => {
    try {
      const snapshot = await firestore().collection('User').get();
      if (snapshot.empty) {
        console.log('User not found');
      } else {
        const items: SelectModel[] = [];
        snapshot.forEach(item => {
          if (item.id !== currentUserId) {
            items.push({
              userName: `${item.data().familyName} ${item.data().givenName}`,
              id: item.id,
              photo: item.data().photo,
            });
          }
        });
        setUserSelect(items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1 }}>
        <HeaderComponent title='ChatScreen' />
        <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Group</Text>
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setModalVisible(true)}>
            <Edit size="32" color="#FF8A65" />
          </TouchableOpacity>
        </View>

        {/* Hiển thị danh sách Group */}
        {groups.length>0?<FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GroupItem
              onPress={() => navigation.navigate('RoomGroup', { ...item })}
              key={item.id}
              currentuser={user}
              userName={item.groupName} // Hiển thị tên nhóm
              groupid={item.id}
              url={item.photo}
            />
          )}
        />: <Text style={{textAlign:'center',color:'white'}}>Do you want to create Group?</Text>}

        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <Text style={{ fontSize: 18, color: 'white' }}>User</Text>
        </View>
        {userSelect.length > 0 ? (
          <FlatList
            data={userSelect.filter(ele =>
              ele.userName.toLowerCase().includes(searchKey.toLowerCase())
            )}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ChatItem
                onPress={() => navigation.navigate('RoomScreen', { ...item })}
                key={item.id}
                currentuser={user}
                userName={item.userName}
                uid={item.id}
              />
            )}
          />
        ) : (
          <Text>No Users</Text>
        )}
      </View>
      <ModalAddGroup
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        users={userSelect} // Danh sách người dùng từ SendScreen
        currentuser={user}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#50c7c7',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: 80,
    flexDirection: 'row',
  },
  searchContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  userItem: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});
export default SendScreen;
