/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { h } from '../../../helpers/Dimensions';
import { CALL_STATE } from '../../../helpers/enum';
import { ScreenNames } from "../../../system/navigation/ScreenNames";
import { APIDELETEUSER, API_LOGOUT } from '../../../system/networking/AuthAPICalls';
import { deleteuserIdle } from '../../../system/redux/slice/authSlice';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from "../../uiHelpers/AppHeader";
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';


const DeleteUser = ({ route }) => {

  var refPasswordTI = useRef(null);

  const [emailInp, setEmailInp] = useState('');
  const [emailError, setEmailError] = useState('');

  const [passwordInp, setPasswordInp] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [securePassword, setSecurePassword] = useState(true);

  const navigation = useNavigation();
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const RedDeleteUser = useAppSelector(state => state.auth.deleteUser);
  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);



  useEffect(() => {

    if (
      RedDeleteUser.state !== CALL_STATE.IDLE &&
      RedDeleteUser.state !== CALL_STATE.FETCHING
    ) {

      dispatch(deleteuserIdle());
      if (RedDeleteUser.state === CALL_STATE.SUCCESS) {

        Alert.alert('Success', "User deleted successfully!");
        dispatch(API_LOGOUT(RedHeartBeat.actualPayload.data.user.id, Platform.OS));
        
                  // onPress: () => {

        //     navigation.reset({
        //       index: 0,
        //       routes: [
        //         {
        //           name: ScreenNames.SignInScreen as never,
        //           params: {
        //           },
        //         },
        //       ],
        //     });
        //   }
        // }]);


      } else if (RedDeleteUser.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedDeleteUser.error);
      }
    }
  }, [RedDeleteUser.state])

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
        showLeftButton={true}
        leftButtonIcon={'arrow-left'}
        onLeftItemClick={() => {
          navigation.goBack();
        }}
        showRightButton={false}
        rightButtonIcon={'logout'}
        onRightItemClick={() => {

        }}
        showDivider={false}
      />
      <Text
        variant='displayMedium'
        style={{
          color: colors.appTextPrimaryColor,
        }}
      >
        Delete User!
      </Text>



      <View style={{
        marginTop: h(13),
        width: '80%',
        justifyContent: 'center'
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
          alignSelf: 'center',

        }} buttonColor={colors.appLogout_ButtonBGColor} textColor={colors.appDelete_ButtonTextColor} mode="contained"
          onPress={() => {
            if (validateForm()) {
              dispatch(APIDELETEUSER(emailInp, passwordInp));
            }
          }}
        >
          Submit
        </Button>

      </View>
{/* 
      <FullScreenLoader
        loading={RedDeleteUser.state === CALL_STATE.FETCHING}
      /> */}
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
export default DeleteUser;