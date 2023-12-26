
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../helpers/enum';
import { APIEditProfile } from '../../../system/networking/AuthAPICalls';
import { ENV } from '../../../system/networking/NetworkingConstants';
import { editprofileIdle } from '../../../system/redux/slice/authSlice';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from '../../uiHelpers/AppHeader';
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';
import ImagePicker from 'react-native-image-picker';
import { APIHeartBeat } from '../../../system/networking/AppAPICalls ';


const Settings = () => {

  var refUserNameInp = useRef(null);
  var refFullNameInp = useRef(null);
  var refEmailInp = useRef(null);
  var refPhoneInp = useRef(null);



  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch()


  const [fullname_Inp, setfullname_Inp] = useState('');
  const [fullname_error, setfullname_Error] = useState('');

  const [username_Inp, setusername_Inp] = useState('');
  const [username_error, setusername_Error] = useState('');

  const [emailInp, setEmailInp] = useState('');
  const [emailError, setEmailError] = useState('');


  const [PhoneNumberInp, setPhoneNumberInp] = useState('');
  const [PhoneNumberError, setPhoneNumbererror] = useState('');



  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);

  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const RedEditProfile = useAppSelector(state => state.auth.editprofile);






  useEffect(() => {

    if (
      RedEditProfile.state !== CALL_STATE.IDLE &&
      RedEditProfile.state !== CALL_STATE.FETCHING
    ) {

      dispatch(editprofileIdle());
      if (RedEditProfile.state === CALL_STATE.SUCCESS) {

        Alert.alert('Success', 'Account Updated succussfully!', [{
          onPress: () => {

            dispatch(APIHeartBeat(RedAuthUser.accessToken));
            navigation.goBack();
          }
        }]);

      } else if (RedEditProfile.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedEditProfile.error);
      }
    }
  }, [RedEditProfile.state])



  useEffect(() => {

    if (
      !!RedHeartBeat.actualPayload &&
      !!RedHeartBeat.actualPayload.data &&
      !!RedHeartBeat.actualPayload.data.user_data
    ) {
      setusername_Inp((!!RedHeartBeat.actualPayload.data.user_data?.user_name) ? (RedHeartBeat.actualPayload.data.user_data?.user_name) : (''));
      setfullname_Inp((!!RedHeartBeat.actualPayload.data.user_data?.full_name) ? (RedHeartBeat.actualPayload.data.user_data?.full_name) : (''));
      setEmailInp((!!RedHeartBeat.actualPayload.data.user_data?.email) ? (RedHeartBeat.actualPayload.data.user_data?.email) : (''));
      setPhoneNumberInp((!!RedHeartBeat.actualPayload.data.user_data?.mobile) ? (RedHeartBeat.actualPayload.data.user_data?.mobile) : (''));
    }

  }, []);


  const validateForm = (): boolean => {


    var flag = true;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (fullname_Inp.length < 1) {
      setfullname_Error('Please enter Fullname!');
      flag = false;
    }

    else {
      setfullname_Error('')
    }


    if (username_Inp.length < 1) {
      setusername_Error('Please enter Username!');
      flag = false;
    }

    else {
      setusername_Error('')
    }

    if (emailInp.length < 1) {
      setEmailError('Please enter email!');
      flag = false;
    }
    else if (reg.test(emailInp) === false) {
      setEmailError('Email is invalid!');
      flag = false;
    }
    else {
      setEmailError('')
    }


    if (PhoneNumberInp.length < 1) {
      setPhoneNumbererror('Please enter PhoneNumber!');
      flag = false;
    }

    else if (PhoneNumberInp.length < 11) {
      setPhoneNumbererror('Phone Number is invalid!');
      flag = false;
    }


    else {
      setPhoneNumbererror('')
    }



    return flag;
  }





  return (

    <View
      style={{
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

      <Text
        variant='displaySmall'
        style={{
          color: colors.appTextPrimaryColor,
          textAlign: 'center',
          marginTop: 10
        }}
      >
        Edit Profile
      </Text>

      <TouchableOpacity

      >

        {(!!RedAuthUser.actualPayload.data && !!RedAuthUser.actualPayload.data.user && !!RedAuthUser.actualPayload.data.user.image) ?
          (

            <Image
              style={{

                borderColor: colors.appTextPrimaryColor,
                borderWidth: 2,
                alignSelf: 'center',
                marginTop: 17,

                width: 100,
                height: 100,
                borderRadius: 100

              }}
              source={{ uri: ENV.BASEURL + '/' + RedAuthUser.actualPayload.data.user.image }}

            />) : (
            <IconButton
              style={{
                borderColor: colors.appTextPrimaryColor,
                alignSelf: 'center',
                marginTop: 17,
              }}
              size={40}
              icon={'account'}
              mode='outlined'
              iconColor={colors.appTextPrimaryColor}
            />
          )}
      </TouchableOpacity>
      <KeyboardAwareScrollView
        style={{
          flexGrow: 0,
          width: '100%',
          paddingVertical: 10,

        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}

      >
        <View style={{
          marginTop: RFValue(20),
          width: '80%',
        }}>


          <TextInput
            ref={refUserNameInp}
            mode="outlined"
            keyboardType='default'
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setusername_Inp(val);
              setusername_Error('');
            }}
            placeholder="Username"
            value={username_Inp}
            left={
              <TextInput.Icon
                icon={'account-edit'}
                iconColor="gray"
                size={RFValue(15)}
              />

            }
            editable={false}
            onSubmitEditing={() => refFullNameInp.current.focus()}
            returnKeyType="next"
          />

          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(7),
            marginBottom: RFValue(2),
          }}>{username_error}</Text>


          <TextInput
            ref={refFullNameInp}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}
            autoCapitalize='words'
            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setfullname_Inp(val);
              setfullname_Error('');
            }}
            placeholder="Fullname"
            value={fullname_Inp}
            left={
              <TextInput.Icon
                icon={'account-edit'}
                iconColor="gray"
                size={RFValue(15)}
              />

            }
            onSubmitEditing={() => refEmailInp.current.focus()}
            returnKeyType="next"
          />

          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(2)
          }}>{fullname_error}</Text>


          <TextInput
            ref={refEmailInp}
            mode="outlined"
            keyboardType='email-address'
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}
            autoCapitalize='none'
            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setEmailInp(val);
              setEmailError('');
            }}
            placeholder="Email"
            value={emailInp}
            left={
              <TextInput.Icon
                icon={'email'}
                iconColor="gray"
                size={RFValue(15)}
              />

            }
            onSubmitEditing={() => refPhoneInp.current.focus()}
            returnKeyType="next"
          />

          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(2)
          }}>{emailError}</Text>


          <TextInput
            ref={refPhoneInp}
            mode="outlined"
            keyboardType='phone-pad'
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}
            maxLength={11}
            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setPhoneNumberInp(val);
              setPhoneNumbererror('');
            }}
            placeholder="Phone Number"
            value={PhoneNumberInp}
            left={
              <TextInput.Icon
                icon={'phone'}
                iconColor="gray"
                size={RFValue(15)}
              />

            }

            returnKeyType="done"
          />

          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(2)
          }}>{PhoneNumberError}</Text>



          <Button style={{

            width: '50%',
            marginTop: 40,
            alignSelf: 'center',

          }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
            onPress={() => {

              if (validateForm()) {

                {
                  dispatch(APIEditProfile(RedAuthUser.accessToken, emailInp, fullname_Inp, PhoneNumberInp));
                }
              }

            }}
          >Update
          </Button>


        </View>
      </KeyboardAwareScrollView>
      <FullScreenLoader
        loading={RedEditProfile.state === CALL_STATE.FETCHING}
      />

    </View>


  )
}


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

  title: {
    fontSize: 2,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default Settings;