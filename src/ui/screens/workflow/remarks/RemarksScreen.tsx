import { useNavigation, useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import AppHeader from '../../../uiHelpers/AppHeader';


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
      </View>


  )

 }

 export default RemarksScreen;
