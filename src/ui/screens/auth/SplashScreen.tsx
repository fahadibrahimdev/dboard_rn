
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { dBoardAppIcon } from '../../../assets/Images';
import { AsyncStorageConstants } from '../../../helpers/AsyncStorageConstants';
import { CALL_STATE } from '../../../helpers/enum';
import { ScreenNames } from '../../../system/navigation/ScreenNames';
import { signInIdle, signInSetData } from '../../../system/redux/slice/authSlice';
import { useAppSelector } from '../../../system/redux/store/hooks';

const SplashScreen = () => {

  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const RedAuthUser = useAppSelector(state => state.auth.authUser);

  const checkAuth = async () => {
    const userData = await AsyncStorage.getItem(AsyncStorageConstants.SIGN_IN);

    if (!!userData) {

      const jsonData = JSON.parse(userData);
      const apiAccessToken = (!!jsonData && !!jsonData.data && !!jsonData.data.token) ?
        (jsonData.data.token) : ('');

      dispatch(signInSetData({
        accessToken: apiAccessToken,
        data: jsonData
      }));

    } else {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: ScreenNames.SignInScreen as never,
              params: {
                heading: "From Splash Screen",
                subHeading: "SubHeading Ahmad"
              },
            },
          ],
        });
      }, 2000);
    }
  };

  useEffect(() => {

    checkAuth()

  }, []);

  useEffect(() => {

    if (
      RedAuthUser.state !== CALL_STATE.IDLE &&
      RedAuthUser.state !== CALL_STATE.FETCHING
    ) {

      dispatch(signInIdle());
      if (RedAuthUser.state === CALL_STATE.UPDATED) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: ScreenNames.DrawerNavigator as never,
                params: {
                },
              },
            ],
          });
        }, 2000);
      } else if (RedAuthUser.state === CALL_STATE.ERROR) {

      }
    }
  }, [RedAuthUser.state])


  return (
    <View style={[styles.container, {
      backgroundColor: colors.appBackground
    }]}>

      <Image source={dBoardAppIcon}
        style={{ width: "90%", marginTop: 10, resizeMode: 'contain' }}

      />

      <View style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <Text
          variant='labelLarge'
          style={{
            color: colors.appTextPrimaryColor
          }}>Powered by Dev Dock</Text>

        {<Text
          variant='labelSmall'
          style={{
            color: colors.appTextPrimaryColor
          }}>Developed by Ahmad Mustafah</Text>}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;