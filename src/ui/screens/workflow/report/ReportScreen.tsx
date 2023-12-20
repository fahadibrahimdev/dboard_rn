
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React from "react";
import { View } from "react-native";

import { Text } from 'react-native-paper';
import AppHeader from '../../../uiHelpers/AppHeader';


const ReportScreen = () => {

  const { colors } = useTheme();
  const navigation = useNavigation();

  return (

    <View style={{
      flex: 1
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
          Report
        </Text>
      </View>

    </View>
  )
}
export default ReportScreen;
