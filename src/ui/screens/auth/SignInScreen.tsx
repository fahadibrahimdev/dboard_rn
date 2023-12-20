/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { AsyncStorageConstants } from '../../../helpers/AsyncStorageConstants';
import { CALL_STATE } from '../../../helpers/enum';
import { ScreenNames } from "../../../system/navigation/ScreenNames";
import { APISignIn } from '../../../system/networking/AuthAPICalls';
import { signInIdle } from '../../../system/redux/slice/authSlice';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from "../../uiHelpers/AppHeader";
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';
import { h } from '../../../helpers/Dimensions';


const SignInScreen = ({ route }) => {

  var refPasswordTI = useRef(null);

  const [emailInp, setEmailInp] = useState('');
  const [emailError, setEmailError] = useState('');

  const [passwordInp, setPasswordInp] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [securePassword, setSecurePassword] = useState(true);

  const navigation = useNavigation();
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const RedAuthUser = useAppSelector(state => state.auth.authUser);


  useEffect(() => {

    if (
      RedAuthUser.state !== CALL_STATE.IDLE &&
      RedAuthUser.state !== CALL_STATE.FETCHING
    ) {

      dispatch(signInIdle());
      if (RedAuthUser.state === CALL_STATE.SUCCESS) {

        AsyncStorage.multiSet([
          [AsyncStorageConstants.SIGN_IN, JSON.stringify(RedAuthUser.actualPayload)],
        ])
          .then(data => {
            console.log('Local Storage Updated: ', AsyncStorageConstants.SIGN_IN);
          })
          .catch(err => {
            console.log(err);
            console.log('Local Storage Error : ', AsyncStorageConstants.SIGN_IN);
          });

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
      } else if (RedAuthUser.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedAuthUser.error);
      }
    }
  }, [RedAuthUser.state])

  const validateForm = (): boolean => {


    var flag = true;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (emailInp.length < 1) {
      setEmailError('Please enter email!');
      flag = false;
    }
    // else if(reg.test(emailInp) === false) {
    //   setEmailError('Email is invalid!');
    //   flag = false;
    // }
    else {
      setEmailError('')
    }

    if (passwordInp.length < 1) {
      setPasswordError('Please enter Password');
      flag = false;
    } else if (passwordInp.length < 6) {
      setPasswordError('Can\'t be less that 6 charactors!')
      flag = false;
    } else {
      setPasswordError('');
    }

    return flag;
  }



  return (
    <View style={[styles.container, {
      backgroundColor: colors.appBackground

    }]}>
      <AppHeader
        showLeftButton={false}
        leftButtonIcon={'arrow-left'}


        onLeftItemClick={() => {
          navigation.goBack();
        }}
        showRightButton={false}
        rightButtonIcon={'logout'}
        onRightItemClick={() => {
          navigation.goBack();
        }}
        showDivider={false}
      />



      <View style={{
        marginTop: h(13),
        width: '80%',
      }}>

        <TextInput
          // ref={refEmailTI}
          mode="outlined"
          style={[styles.input, {
            backgroundColor: colors.appBackground
          }]}

          outlineColor={colors.appTextPrimaryColor}
          textColor={colors.appTextPrimaryColor}
          placeholderTextColor={colors.appTextPlaceHolderColor}
          onChangeText={(val) => {
            setEmailInp(val);
            setEmailError('');


          }}
          value={emailInp}
          placeholder="UserName"
          autoCapitalize={'none'}
          left={
            <TextInput.Icon
              icon={'account'}
              iconColor="gray"
              size={RFValue(15)}
            />

          }
          onSubmitEditing={() => refPasswordTI.current.focus()}
          returnKeyType="next"
        />


        <Text variant='labelSmall' style={{
          color: 'red',
          marginTop: RFValue(2),
          marginBottom: RFValue(3)
        }}>{emailError}</Text>


        <TextInput
          ref={refPasswordTI}
          mode="outlined"
          style={[styles.input, {
            backgroundColor: colors.appBackground,
            marginTop: 20

          }]}
          outlineColor={colors.appTextPrimaryColor}
          textColor={colors.appTextPrimaryColor}
          placeholderTextColor={colors.appTextPlaceHolderColor}
          onChangeText={(val) => {
            setPasswordInp(val);
            setPasswordError('')
          }}

          value={passwordInp}
          placeholder="Password"
          autoCapitalize={'none'}
          secureTextEntry={securePassword}
          left={
            <TextInput.Icon
              icon={'lock'}
              iconColor="gray"
              size={RFValue(15)}
            />
          }
          right={
            <TextInput.Icon
              icon={(securePassword) ? ('eye') : ('eye-off')}
              iconColor="gray"
              size={RFValue(15)}
              onPress={() => {
                setSecurePassword(!securePassword);
              }}
            />
          }

          returnKeyType="done"
        />

        <Text
          variant='labelSmall'
          numberOfLines={1} style={{
            color: 'red',
            marginTop: RFValue(2),
            marginBottom: RFValue(3)
          }}>{passwordError}</Text>


        <Button style={{

          width: '50%',
          marginTop: 40,
          alignSelf: 'flex-end',

        }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
          onPress={() => {

            if (validateForm()) {

              dispatch(APISignIn(emailInp, passwordInp));

            }

          }}
        >
          Login

        </Button>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 60
          }}
          onPress={() => {
            navigation.navigate(ScreenNames.SignUpScreen);


          }}
          activeOpacity={0.5}>
          <Text
            variant="titleSmall"
            style={[styles.text1, {
              color: colors.appTextPrimaryColor,

            }
            ]}>
            Don't have account! <Text

              variant="titleMedium"
              style={[styles.text1, {

                color: colors.appTextPrimaryColor
              }
              ]}>Create New!</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <FullScreenLoader
        loading={RedAuthUser.state === CALL_STATE.FETCHING}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    width: '100%',

  },
  displayText: {
    fontSize: 9,
    color: 'blue',
  },
  label: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 2,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
export default SignInScreen;