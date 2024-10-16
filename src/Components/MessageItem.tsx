import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

// import { formatDate } from '../funtion/formatDate';

import { More, Save2 } from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Định nghĩa type cho props của MessageItem
interface MessageItemProps {
  mess: any; // Thay 'any' bằng type cụ thể cho tin nhắn nếu có
  currenUser: any; // Thay 'any' bằng type cụ thể cho người dùng hiện tại nếu có
}

const MessageItem: React.FC<MessageItemProps> = ({ mess, currenUser }) => {
  
    if(currenUser.id==mess.userId){
      return(
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 12,
          marginRight: 12,
        }}>
          <View style={{ backgroundColor: '#a4dede', borderRadius: 25, padding: 20 }}>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                      }}
                    >
                      {mess.text}
                    </Text>
          </View>
          </View>
        </View>
      )
    }else{
      return(
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 12,
          marginRight: 12,
        }}>
          <View style={{ backgroundColor: '#a4dede', borderRadius: 25, padding: 20 }}>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                      }}
                    >
                      {mess.text}
                    </Text>
          </View>
          </View>
        </View>
      )
    }


  
  
};

export default MessageItem;
