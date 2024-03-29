import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppHeader from '../../../uiHelpers/AppHeader';


import { useNavigation, useTheme } from '@react-navigation/native';
// import { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   TextInput,
//   Alert,
// } from 'react-native';

const navigation = useNavigation();
const Message = ({ sender, content, timestamp }) => {

    
  return (<View style={{
    flex: 1,
    alignItems: sender === 'me' ? 'flex-end': 'flex-start',
    marginHorizontal: 20,
    
  
    
  }}>
    <View style={{

      maxWidth:'80%',
      padding: 10,
      backgroundColor: sender === 'me' ? '#DCF8C6' : '#FFFFFF', // Adjusted background color based on sender
      borderRadius: 10,
      marginVertical: 5,

    }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold',color:'black' }}>{sender}</Text>
      <View style={{ flexDirection: 'column', flex: 1, }}>
        <Text style={{ padding: 12,color:'black', textAlign: sender === 'me' ? 'left' : 'left' }}>{content}</Text>
        <Text style={{ fontSize: 12, color: 'black', textAlign: sender === 'me' ? 'right' : 'right' }}>{timestamp}</Text>
      </View>

    </View>
  </View>);

};

const RemarksScreen = () => {


  const [messages, setMessages] = useState([
    { sender: 'me', content: 'Hi there2!', timestamp: '08:00 PM' },
    { sender: 'You', content: 'Hi there3!',timestamp: '08:00 PM' },
    { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    { sender: 'me', content: 'Hi there5!', timestamp: '08:00 PM' },
    { sender: 'me', content: 'Hi there6!', timestamp: '08:00 PM' },
    { sender: 'You', content: 'Hi there7!',timestamp: '08:00 PM' },
    { sender: 'You', content: 'Hi there3!',timestamp: '08:00 PM' },
    { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    { sender: 'me', content: 'Hi there5!', timestamp: '08:00 PM' },
    { sender: 'me', content: 'Hi there6!', timestamp: '08:00 PM' },
    { sender: 'You', content: 'Hi there7!',timestamp: '08:00 PM' },
    { sender: 'You', content: 'Hi there8!',timestamp: '08:00 PM' },
    { sender: 'You', content: 'Hi there8!hahsahashjsajhsahjsahjsahjsahjsajhsahjsajhsajhsajhsajhsajh',timestamp: '08:00 PM' }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        sender: 'me',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      }]);
      setNewMessage('');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor:'grey' }}>
      {/* Chat Header (replace with your implementation) */}

      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'arrow-left'}
        onLeftItemClick={() => {
          navigation.goBack();
        }}
        showRightButton={false}
        rightButtonIcon={'bell'}
        onRightItemClick={() => { }}
        showDivider={true}
      />

      {/* Chat History */}
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message {...item} />}
        inverted
      />

      {/* Input Bar */}

      <View style={{ flexDirection: 'row', padding: 10 }}>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 43,
          backgroundColor: 'grey',
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 2,
          paddingBottom: 2,
        borderEndColor:'black'
        }}>
          <TextInput
            style={{
              width: '100%',
              fontSize: 20,
              maxHeight: 200,
              paddingLeft: 20
            }}
            placeholder={'Message...'}
            multiline
            returnKeyType='send'
          // value={newMessage}
          // onChangeText={setNewMessage}
          // onSubmitEditing={sendMessage}
          />

          <IconButton
            icon='send'
            iconColor={Colors.appdrawerIconTextColor}
            containerColor='grey'
            size={30}
            onPress={() => {
              Alert.alert('Enter');
              // sendMessage(); // Uncomment this line to send message on button press
            }}
          />

        </View>

      </View>

    </View>
  );
};

export default RemarksScreen;
