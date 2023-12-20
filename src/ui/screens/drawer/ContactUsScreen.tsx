
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  View
} from 'react-native';
import { Text } from 'react-native-paper';
import AppHeader from '../../uiHelpers/AppHeader';


const ContactUsScreen = ({ }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
      }}

    >

      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'menu'}
        onLeftItemClick={() => {
          navigation.openDrawer();
        }}
        showRightButton={false}
        rightButtonIcon={'bell'}
        onRightItemClick={() => {
          Alert.alert('Bell rings');

        }}
        showDivider={true}


      />

      {/* <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Text
          variant='displayLarge'
          style={{
            color: 'black'
          }}
        >
          Contact Us!
        </Text>
      </View>

    </View> */}
</View>
  )

}


export default ContactUsScreen;
