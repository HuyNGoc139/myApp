import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import SpaceComponent from '../../components/common/SpaceComponent';
import MessageList from '../../components/chat/MessageList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import MessageList from './components/MessageList';
export interface User {
  email: string;
  id?: string;
  username: string;
  photo?: string;
}

const RoomScreen = ({ navigation, route }: any) => {
  const userSelect = route.params;
  const [message, setMessage] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const [textRef, setTextRef] = useState('');

  useEffect(() => {
    createRoom(); // Chỉ gọi createRoom sau khi getUser hoàn tất
    getAllMessage();
  }, [user?.id]);

  const getRoomId = useCallback((userId1: string, userId2: string) => {
    const sortedIds = [userId1, userId2].sort();
    return sortedIds.join('-');
  }, []);

  const createRoom = useCallback(async () => {
    if (!user || !userSelect) {
      console.error('User information is missing.');
      return;
    }

    const roomId = getRoomId(user?.id ?? '', userSelect.id);
    console.log('Room ID:', roomId);

    if (!roomId || roomId.includes('undefined')) {
      console.error('Invalid room ID:', roomId);
      return;
    }

    const roomRef = firestore().collection('Rooms').doc(roomId);
    const roomSnapshot = await roomRef.get();

    if (!roomSnapshot.exists) {
      await roomRef.set({
        userIds: [user?.id, userSelect.id],
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log('Room created with ID:', roomId);
    } else {
      console.log('Room already exists with ID:', roomId);
    }
  }, [getRoomId, user, userSelect]);

  const handleSendMessage = useCallback(async () => {
    let message = textRef.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.id ?? '', userSelect.id);
      const docRef = firestore().collection('Rooms').doc(roomId);
      const messagesRef = docRef.collection('messages');
      await messagesRef.add({
        userId: user?.id,
        text: message,
        senderName: user?.familyName + ' ' + user?.givenName,
        createdAt: new Date(),
      });
      await docRef.update({
        lastMessageAt: firestore.FieldValue.serverTimestamp(),
        lastMessage: message,
      });
      console.log('Message sent successfully');
      setTextRef('');
    } catch (err) {
      console.log('Error sending message:', err);
    }
  }, [getRoomId, textRef, user, userSelect]);

  const getAllMessage = useCallback(() => {
    let roomId = getRoomId(user?.id ?? '', userSelect.id);
    const messagesRef = firestore()
      .collection('Rooms')
      .doc(roomId)
      .collection('messages');
    const q = messagesRef.orderBy('createdAt', 'asc');
    const unsubscribe = q.onSnapshot(
      (snapshot) => {
        let allMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          roomId: roomId,
          ...doc.data(),
        }));

        setMessage(allMessages);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );

    return unsubscribe;
  }, [getRoomId, user, userSelect]);

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
          {userSelect?.photo ? (
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 100,
                marginLeft: 12,
              }}
              source={{ uri: userSelect.photo }}
            />
          ) : (
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 100,
                marginLeft: 12,
              }}
              source={require('../../assets/avatar.png')}
            />
          )}
          <Text
            style={{
              lineHeight: 56,
              fontSize: 20,
              color: 'black',
              marginLeft: 10,
            }}
          >
            {userSelect.userName}
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
          <MessageList messages={message} currenUser={user} />
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
export default RoomScreen;
