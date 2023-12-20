
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  View,
  StyleSheet,

} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AppHeader from '../../uiHelpers/AppHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { API_CHANGE_PASSWORD } from '../../../system/networking/AuthAPICalls';
import { useAppSelector } from '../../../system/redux/store/hooks';
import { CALL_STATE } from '../../../helpers/enum';
import { changepasswordIdle } from '../../../system/redux/slice/authSlice';
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';
import { ScreenNames } from '../../../system/navigation/ScreenNames';



const ChangePasswordScreen = ({ }) => {


  var refOldPasswordInp = useRef(null);
  var refNewPasswordInp = useRef(null);
  var refConfirmPasswordInp = useRef(null);




  const [OldPasswordInp, setOldPasswordInp] = useState('');
  const [OldPassword_error, setOldPassword_Error] = useState('');

  const [NewPassword_Inp, setNewPassword_Inp] = useState('');
  const [NewPassword_error, setNewPassword_Error] = useState('');

  const [ConfirmPassword_Inp, setConfirmPassword_Inp] = useState('');
  const [ConfirmPassword_Error, setConfirmPassword_Error] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfPassword, setSecureConfPassword] = useState(true);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch()

  const RedChangePassword = useAppSelector(state => state.auth.changepassword);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);

  useFocusEffect(
    React.useCallback(() => {

      setOldPasswordInp('');
      setNewPassword_Inp('');
      setConfirmPassword_Inp('');

      setSecurePassword(true);
      setSecureNewPassword(true);
      setSecureConfPassword(true);

      return () => {
        // Clean up here
      };
    }, [])
  );


  useEffect(() => {

    if (
      RedChangePassword.state !== CALL_STATE.IDLE &&
      RedChangePassword.state !== CALL_STATE.FETCHING
    ) {

      dispatch(changepasswordIdle());
      if (RedChangePassword.state === CALL_STATE.SUCCESS) {

        Alert.alert('Success', 'Password Updated succussfully!', [{
          onPress: () => {

            // setCurrentScreen(ScreenNames.ChangePasswordScreen);

            navigation.navigate(ScreenNames.DashboardScreen);
            navigation.closeDrawer();
          }
        }]);

      } else if (RedChangePassword.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedChangePassword.error);
      }
    }
  }, [RedChangePassword.state])



  const validateForm = (): boolean => {


    var flag = true;
    if (OldPasswordInp.length < 1) {
      setOldPassword_Error('Please enter Old Password');
      flag = false;
    } else if (OldPasswordInp.length < 6) {
      setOldPassword_Error('Can\'t be less that 6 charactors!')
      flag = false;
    } else {
      setOldPassword_Error('');
    }

    if (NewPassword_Inp.length < 1) {
      setNewPassword_Error('Please enter Password');
      flag = false;
    } else if (NewPassword_Inp.length < 6) {
      setNewPassword_Error('Can\'t be less that 6 charactors!')
      flag = false;
    } else {
      setNewPassword_Error('');
    }

    if (ConfirmPassword_Inp !== NewPassword_Inp) {
      setConfirmPassword_Error('Please Enter Correct Password');
      flag = false;
    } else {
      setConfirmPassword_Error('');
    }

    return flag;
  }



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.appBackground,
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

      <Text
        variant='displaySmall'
        style={{
          color: colors.appTextPrimaryColor,
          textAlign: 'center',
          marginTop: 10
        }}
      >
        Change Password
      </Text>



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
          marginTop: RFValue(40),
          width: '80%',
        }}>



          <TextInput
            ref={refOldPasswordInp}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setOldPasswordInp(val);
              setOldPassword_Error('');


            }}
            value={OldPasswordInp}
            placeholder="Old Password"
            autoCapitalize={'none'}
            secureTextEntry={securePassword}
            left={
              <TextInput.Icon
                icon={'lock'}
                iconColor="gray"
                size={RFValue(15)}
                onPress={() => {
                  setSecurePassword(!securePassword);
                }}
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

            onSubmitEditing={() => refNewPasswordInp.current.focus()}
            returnKeyType="next"
          />


          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(7),
            marginBottom: RFValue(3)
          }}>
            {OldPassword_error}

          </Text>


          <TextInput
            ref={refNewPasswordInp}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setNewPassword_Inp(val);
              setNewPassword_Error('');


            }}
            value={NewPassword_Inp}
            placeholder="New Password"
            autoCapitalize={'none'}
            secureTextEntry={secureNewPassword}
            left={
              <TextInput.Icon
                icon={'lock'}
                iconColor="gray"
                size={RFValue(15)}
                onPress={() => {
                  setSecureNewPassword(!secureNewPassword);
                }}
              />

            }
            right={
              <TextInput.Icon
                icon={(secureNewPassword) ? ('eye') : ('eye-off')}
                iconColor="gray"
                size={RFValue(15)}
                onPress={() => {
                  setSecureNewPassword(!secureNewPassword);
                }}
              />
            }

            onSubmitEditing={() => refConfirmPasswordInp.current.focus()}
            returnKeyType="next"
          />


          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(7),
            marginBottom: RFValue(3)
          }}>
            {NewPassword_error}

          </Text>


          <TextInput
            ref={refConfirmPasswordInp}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setConfirmPassword_Inp(val);
              setConfirmPassword_Error('');


            }}
            value={ConfirmPassword_Inp}
            placeholder="Confirm New Password"
            autoCapitalize={'none'}
            secureTextEntry={secureConfPassword}
            left={
              <TextInput.Icon

                icon={'lock'}
                iconColor="gray"
                size={RFValue(15)}
                onPress={() => {
                  setSecureConfPassword(!secureConfPassword);
                }}
              />

            }

            right={
              <TextInput.Icon
                icon={(secureConfPassword) ? ('eye') : ('eye-off')}
                iconColor="gray"
                size={RFValue(15)}
                onPress={() => {
                  setSecureConfPassword(!secureConfPassword);
                }}
              />
            }

            returnKeyType="done"
          />


          <Text variant='labelSmall' style={{
            color: 'red',
            marginTop: RFValue(7)
          }}>
            {ConfirmPassword_Error}

          </Text>


          <Button style={{

            width: '50%',
            marginTop: 40,
            alignSelf: 'center',

          }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
            onPress={() => {



              if (validateForm()) {
                {
                  dispatch(API_CHANGE_PASSWORD(RedAuthUser.accessToken,
                    OldPasswordInp,
                    NewPassword_Inp,
                    RedAuthUser.actualPayload.data.user.user_name
                  ));
                }
              }

            }}
          >
            Update

          </Button>


        </View>

      </KeyboardAwareScrollView>
      <FullScreenLoader
        loading={RedChangePassword.state === CALL_STATE.FETCHING}
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

export default ChangePasswordScreen;
