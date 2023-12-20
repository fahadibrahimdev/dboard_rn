
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import AppHeader from '../../uiHelpers/AppHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import { ENV } from '../../../system/networking/NetworkingConstants';
import { useAppSelector } from '../../../system/redux/store/hooks';




const PolicyScreen = ({ }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);

  // const handleImagePicker = () => {
  //   ImagePicker.launchImageLibrary({}, (response) => {
  //     if (response.uri) {
  //       setSelectedImage(response);
  //     }
  //   });
  // };



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
          Policy Screen
        </Text>
      </View>
      <SafeAreaView
        style={{ flex: 1 }}>
        <View style={{ height: 400, width: "100%" }}></View>
        {/* 
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedImage ? (
        <Image source={{ uri: ENV.BASEURL + '/' + RedAuthUser.actualPayload.data.user.image  }} style={{ width: 200, height: 200, borderRadius: 100 }} />
      ) : (
        <Text>Select an image</Text>
      )}

      <TouchableOpacity onPress={handleImagePicker} style={{ marginTop: 20, padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Choose Image</Text>
      </TouchableOpacity>
    </View> */}
      </SafeAreaView>
    </View>
  )
}
export default PolicyScreen;