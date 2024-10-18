import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import {
  ArrowSquareLeft,
  Back,
  Call,
  Camera,
  MessageRemove,
  Send2,
  Video,
  VideoAdd,
} from 'iconsax-react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SpaceComponent from '../Components/SpaceComponent';
import MessageList from '../Components/MessageList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import MessageList from './components/MessageList';

const RoomGroupScreen = ({ navigation, route }: any) => {
  const group = route.params;
  const [message, setMessage] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const [textRef, setTextRef] = useState('');
  useEffect(() => {
    getAllMessage();
  }, [user?.id]);

  const handleSendMessage = async () => {
    let message = textRef.trim();
    if (!message) return;
    try {
      const docRef = firestore().collection('Group').doc(group.id);
      const messagesRef = docRef.collection('messages');
      await messagesRef.add({
        userId: user?.id,
        text: message,
        senderName: user?.userName,
        // createdAt: firestore.FieldValue.serverTimestamp(),
        createdAt: new Date(),
      });
      await docRef.update({
        lastMessageAt: firestore.FieldValue.serverTimestamp(),
        lastMessage: message, // Lưu nội dung tin nhắn cuối cùng (tuỳ chọn)
      });
      console.log('Message sent successfully');
      setTextRef(''); // Xóa nội dung input sau khi gửi
    } catch (err) {
      console.log('Error sending message:', err);
    }
  };

  const getAllMessage = () => {
    const messagesRef = firestore()
      .collection('Group')
      .doc(group.id)
      .collection('messages');

    // Tạo query để sắp xếp các tin nhắn theo thời gian tạo
    const q = messagesRef.orderBy('createdAt', 'asc');

    // Lắng nghe thay đổi trên collection 'messages'
    const unsubscribe = q.onSnapshot(
      (snapshot) => {
        // Lấy tất cả các tin nhắn từ snapshot
        let allMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          groupId: group.id,
          ...doc.data(),
        }));

        setMessage(allMessages);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );

    return unsubscribe;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          borderBottomWidth: 1,
          alignItems: 'center',
          height: 68,
          flexDirection: 'row',
          padding: 12,
          marginBottom: 12,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeft size={28} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {group?.photo ? (
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 100,
                marginLeft: 12,
              }}
              source={{ uri: group.photo }}
            />
          ) : (
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 100,
                marginLeft: 12,
              }}
              source={require('../assets/avatargroup.png')}
            />
          )}
          <Text
            numberOfLines={1}
            style={{
              lineHeight: 56,
              fontSize: 20,
              color: 'black',
              marginLeft: 10,
            }}
          >
            {group.groupName}
          </Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
        >
          <Call size="28" color="black" />
          <SpaceComponent width={20} />
          <Video size="28" color="black" />
          <SpaceComponent width={20} />
          {/* <TouchableOpacity onPress={confirmDeleteMessages}> */}
          <TouchableOpacity>
            <MessageRemove size="28" color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1 }}>
          <MessageList messages={message} currenUser={user} type="group" />
        </View>
      </View>
      <View style={{ marginBottom: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 50,
          }}
        >
          <TextInput
            value={textRef}
            placeholder="Type Message..."
            style={{ flex: 1, fontSize: 16 }}
            onChangeText={(val) => setTextRef(val)}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={{ marginRight: 10 }}
          >
            <Send2 size="28" color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default RoomGroupScreen;
