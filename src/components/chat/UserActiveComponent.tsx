import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface User {
  id: string;
  familyName: string;
  status: string;
  photo?: string;
  givenName: string;
}
interface Props {
  onPress: () => void;
}
const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('User')
      .where('status', '==', 'online') // Truy vấn những người dùng có trạng thái 'online'
      .onSnapshot((snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setOnlineUsers(users); // Lưu danh sách người dùng online
      });

    return () => unsubscribe(); // Hủy bỏ lắng nghe khi component bị unmount
  }, []);
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 18, color: 'white' }}>Active User</Text>
      {onlineUsers.length > 0 ? (
        <FlatList
          horizontal
          data={onlineUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => console.log(item)}
              style={{
                marginVertical: 10,
                alignItems: 'center',
                marginRight: 8,
                justifyContent: 'center',
              }}
            >
              {item.photo ? (
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    marginRight: 10,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/avatar.png')}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    marginRight: 10,
                  }}
                />
              )}
              <Image
                source={require('../../assets/active.png')}
                tintColor={'green'}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 24,
                  position: 'absolute',
                  right: 10,
                  top: 32,
                }}
              />
              <Text style={{ fontSize: 16, color: 'white' }}>
                {item.givenName}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No users online.</Text>
      )}
    </View>
  );
};

export default OnlineUsers;
