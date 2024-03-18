import { useNavigation, useTheme } from '@react-navigation/native';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import AppHeader from '../../../uiHelpers/AppHeader';
import { IconButton, Text } from 'react-native-paper';


const RemarksScreen = ({ }) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [myUserID, setMyUserID] = useState(1);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


  return (





    <KeyboardAvoidingView
      style={styles.container}
      // backgroundColor={colors.appBackground}
      behavior={Platform.OS === 'ios' ? 'padding' : null} // Adjust behavior for iOS
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust vertical offset for iOS

    >
      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'arrow-left'}
        onLeftItemClick={() => {
          navigation.goBack();

        }}
        showRightButton={false}
        rightButtonIcon={'bell'}
        onRightItemClick={() => {


        }}
        showDivider={true}
      />
      <View style={{
        flex: 1,
        backgroundColor: "#122215"
        // backgroundColor: colors.appBackground,
      }}>

      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: "#445544"
        }}>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          borderRadius: 33,
          backgroundColor: "pink",
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 2,
          paddingBottom: 2
        }}>
          <TextInput
            // mode='flat'
            style={{
              width: '100%',
              fontSize: 20,
              maxHeight: 200
              // backgroundColor: "#996698"
            }}
            // value={message}
            // onChangeText={setMessage}
            placeholder={'Message...'}
            multiline // Enable multiple lines
            returnKeyType="send" // Use "Send" button on keyboard
          // onSubmitEditing={handleSendMessage} // Trigger send on "Send" button
          />
        </View>

        <IconButton
          icon={'send'}
          iconColor={colors.appdrawerIconTextColor}
          containerColor='grey'
          size={28}

        />


      </View>
    </KeyboardAvoidingView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
    backgroundColor: "#987654"


  },
  input: {



  },

})

export default RemarksScreen;
