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
import { mess } from '../model/model';
import { formatDate } from '../Utils/formateDate';
import { handleDateTime } from '../Utils/handleDateTime';

// Định nghĩa type cho props của MessageItem
interface MessageItemProps {
  mess: mess;
  currenUser: any;
  type?: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  mess,
  currenUser,
  type,
}) => {
  if (currenUser.id == mess.userId) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 12,
          marginRight: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 12, marginRight: 4 }}>
          {handleDateTime.convertFirestoreTimestamp(mess.createdAt)}
        </Text>
        <View
          style={{ backgroundColor: '#a4dede', borderRadius: 25, padding: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
    );
  } else {
    return (
      <View style={{ marginLeft: 12 }}>
        {type == 'group' ? (
          <Text
            style={{
              marginBottom: 4,
              fontSize: 16,
              color: '#000',
              fontWeight: '700',
            }}
          >
            {mess.senderName}
          </Text>
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 12,
            marginRight: 12,
            alignItems: 'center',
          }}
        >
          {type == 'group' ? (
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 100,
                marginRight: 6,
              }}
              source={require('../assets/avatar.png')}
            />
          ) : (
            <></>
          )}

          <View
            style={{
              backgroundColor: '#a4dede',
              borderRadius: 25,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
          <Text style={{ fontSize: 12, marginLeft: 4 }}>
            {handleDateTime.convertFirestoreTimestamp(mess.createdAt)}
          </Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
