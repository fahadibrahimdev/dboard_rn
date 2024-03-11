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


  
  return (

    <View style={{
      flex: 1,
      backgroundColor: colors.appBackground,
    }}>

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
  flex:1,
  backgroundColor:colors.appBackground,
  justifyContent:'flex-end'
}}>
  <View style={{
    flex:1,
    backgroundColor:colors.appBackground,
  }}>

  </View>

<View
style={{
  flexDirection:'row',
}}>
<KeyboardAvoidingView
      style={styles.container}
      backgroundColor={colors.appBackground}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TextInput
      // mode='flat'
        style={styles.input}
        // value={message}
        // onChangeText={setMessage}
        placeholder={'Message...'}
        multiline // Enable multiple lines
        returnKeyType="send" // Use "Send" button on keyboard
        // onSubmitEditing={handleSendMessage} // Trigger send on "Send" button
      >
      </TextInput>
      
      <IconButton
                icon={'send'}
                iconColor={colors.appdrawerIconTextColor}
                containerColor='grey'
                size={28}
               
              /> 
     
         </KeyboardAvoidingView>
    </View>


</View>



      </View>

  )}
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection:'row',
          padding: 12,
          
          
        
        },
        input: {
          flex: 1,
          fontSize: 20,
         borderRadius: 33,
         borderTopRightRadius:33,
         borderTopLeftRadius:33,
         backgroundColor: "pink",
         paddingLeft:16
        
                  
        },     
        
      })
      
 export default RemarksScreen;
