import { useNavigation, useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Text, TextInput, View, RefreshControl } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../../helpers/enum';
import { APICreateRemarks, APIGetRemarks } from '../../../../system/networking/RemarksAPICalls ';
import { createRemarksIdle, getRemarksIdle } from '../../../../system/redux/slice/remarksSlice';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import AppHeader from '../../../uiHelpers/AppHeader';
import FullScreenLoader from '../../../uiHelpers/FullScreenLoader';
import moment = require('moment-timezone');
import { ScreenNames } from '../../../../system/navigation/ScreenNames';

const Message = ({ sender, content, timestamp }) => {


  return (<View style={{
    flex: 1,
    alignItems: sender === 'me' ? 'flex-end' : 'flex-start',
    marginHorizontal: 20,
  }}>
    <View style={{

      maxWidth: '80%',


      // padding: 10,
      backgroundColor: sender === 'me' ? '#DCF8C6' : '#FAF9F6',
      borderRadius: 10,
      marginVertical: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: 'column'

    }}>
      {sender !== 'me' && <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{sender}</Text>}
      <View style={{ flex: 1, }}>
        <Text style={{ paddingTop: 5, color: 'black', }}>{content} </Text>
        <Text style={{ paddingHorizontal: 5, fontSize: 11, color: 'black', textAlign: 'right' }}>{timestamp}</Text>
      </View>


    </View>
  </View>);

};

const RemarksScreen = ({ route }) => {

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);

  const [messages, setMessages] = useState([
    // { sender: 'me', content: 'Hi there2!', timestamp: '08:00 PM' },
    // { sender: 'You', content: 'Hi there3!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there2!', timestamp: '08:00 PM' },
    // { sender: 'You', content: 'Hi there3!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there2!', timestamp: '08:00 PM' },
    // { sender: 'You', content: 'Hi there3!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there2!', timestamp: '08:00 PM' },
    // { sender: 'You', content: 'Hi there3!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there2!', timestamp: '08:00 PM' },
    // { sender: 'You', content: 'Hi there3!', timestamp: '08:00 PM' },
    // { sender: 'me', content: 'Hi there4!', timestamp: '08:00 PM' },



  ]);

  const [newMessage, setNewMessage] = useState('');

  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const RedGetRemarks = useAppSelector(state => state.remarks.getRemarks);
  const RedCreateRemarks = useAppSelector(state => state.remarks.createRemarks);


  useEffect(() => {


    if (!!route && !!route.params && !!route.params.selectedItem) {

      console.log("Item: ", route.params.selectedItem);
      setSelectedItem(route.params.selectedItem);

      onRefresh(route.params.selectedItem.id)
    }



  }, []);

  useEffect(() => {
    if (
      RedGetRemarks.state !== CALL_STATE.IDLE &&
      RedGetRemarks.state !== CALL_STATE.FETCHING
    ) {

      dispatch(getRemarksIdle());
      if (RedGetRemarks.state === CALL_STATE.SUCCESS) {

        const newMessages = RedGetRemarks.actualPayload.data.commentsData.map((obj) => {
          return ({
            sender: (obj.user_id === RedAuthUser.actualPayload.data.user?.id) ? ('me') : (obj.Full_name),
            content: obj.comments,
            timestamp: moment(obj.created_time).format("hh:mm A")
          });
        });

        console.log("My Foramted Data: ", newMessages);
        setMessages(newMessages);

      } else if (RedGetRemarks.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedGetRemarks.error);
      }

    }
  }, [RedGetRemarks.state]);


  useEffect(() => {
    if (
      RedCreateRemarks.state !== CALL_STATE.IDLE &&
      RedCreateRemarks.state !== CALL_STATE.FETCHING
    ) {

      dispatch(createRemarksIdle());
      if (RedCreateRemarks.state === CALL_STATE.SUCCESS) {

        setNewMessage('');

        onRefresh(selectedItem.id);


      } else if (RedCreateRemarks.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedCreateRemarks.error);
      }

    }
  }, [RedCreateRemarks.state]);

  const onRefresh = (itemID) => {
    dispatch(APIGetRemarks(RedAuthUser.accessToken, itemID));
  }
  const sendMessage = () => {
    const myMessage = newMessage.trim();
    if (!!myMessage) {

      dispatch(APICreateRemarks(RedAuthUser.accessToken, selectedItem.id, myMessage));
      // setMessages([{
      //   sender: 'me',
      //   content: newMessage,
      //   timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      // }, ...messages]);
      // setNewMessage('');
    } else {
      Alert.alert("Alert", "Please type your message first!");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.appBackground }}
      behavior={Platform.OS === "ios" ? "padding" : null}

      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
      {/* Chat Header (replace with your implementation) */}

      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'arrow-left'}
        onLeftItemClick={() => {
          navigation.goBack();
        }}
        showRightButton={true}
        rightButtonIcon={'information'}
        onRightItemClick={() => {
          navigation.navigate(ScreenNames.EditAttendanceScreen, {
            selectedItem: selectedItem,
            onBack: () => {
              onRefresh(selectedItem.id)
            }
          });
        }}

        showSecondRightButton={true}
        secondRightButtonIcon={'refresh'}
        onSecondRightItemClick={() => {




        }}



        showDivider={true}

      />


      {/* Chat History */}
      <View style={{ flex: 1, justifyContent: 'space-between', }}>

        <View style={{ maxHeight: "80%", }}>
          <FlatList
            style={{

            }}
            contentContainerStyle={{

            }}

            data={messages}
            renderItem={({ item }) => <Message {...item} />}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ transform: [{ scaleY: -1 }] }}><Text style={{
                    color: colors.appTextPrimaryColor
                  }}
                  >No Data to show</Text></View>
                </View>)
            }}
            inverted
          />
        </View>

        <View
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            padding: 10,
            maxHeight: "20%",
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <View>



            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 43,
              backgroundColor: '#f5785f',
              paddingLeft: 25,
              paddingRight: 0,
              paddingTop: 2,
              paddingBottom: 2,
              borderEndColor: 'black'
            }}>
              <TextInput
                style={{
                  width: '85%',
                  fontSize: 22,
                  paddingLeft: 5,
                  alignSelf: 'center',
                  color: colors.appTextPrimaryColor,
                }}
                placeholder={'Message...'}
                placeholderTextColor={colors.appTextPlaceHolderColor}
                multiline
                returnKeyType='default'
                value={newMessage}
                keyboardType='default'
                onChangeText={setNewMessage}
              />

              <View style={{
                width: '15%',
                // backgroundColor: '#665511'
              }}>
                <IconButton
                  icon='send'
                  iconColor={colors.appdrawerIconTextColor}
                  containerColor='#f5785f'
                  size={30}
                  onPress={() => {
                    // Alert.alert('Enter');
                    sendMessage(); // Uncomment this line to send message on button press
                  }}
                />
              </View>

            </View>

          </View>


        </View>
      </View>
      {/* Input Bar */}


      <FullScreenLoader
        loading={RedGetRemarks.state === CALL_STATE.FETCHING ||
          RedCreateRemarks.state === CALL_STATE.FETCHING
        }
      />
    </KeyboardAvoidingView >
  );
};

export default RemarksScreen;