
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  View
} from 'react-native';
import { WebView } from 'react-native-webview';

import AppHeader from '../../uiHelpers/AppHeader';


const PolicyScreen = ({ }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();





  return (
    <View
      style={{
        flex: 1
      }}
    >

      <AppHeader
        showLogo={false}
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

      <WebView
        style={{
          flex: 1
        }}
        source={{ uri: 'https://mab.thundertechsol.com/policy/' }}

      />

    </View>
  )
}
export default PolicyScreen;