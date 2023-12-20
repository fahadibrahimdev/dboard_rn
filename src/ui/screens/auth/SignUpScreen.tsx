import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { CALL_STATE } from '../../../helpers/enum';
import { signUPIdle } from '../../../system/redux/slice/authSlice';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from '../../uiHelpers/AppHeader';

import { useDispatch } from 'react-redux';
import { APISignUp } from '../../../system/networking/AuthAPICalls';
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';


const SignUpScreen = ({ }) => {

    var refFullNameInp = useRef(null);
    var refUserNameInp = useRef(null);
    var refEmailInp = useRef(null);
    var refPasswordInp = useRef(null);
    var refConfirmPasswordInp = useRef(null);

    const navigation = useNavigation();
    const { colors } = useTheme();
    const dispatch = useDispatch()

    const [fullname_Inp, setfullname_Inp] = useState('');
    const [fullname_error, setfullname_Error] = useState('');

    const [username_Inp, setusername_Inp] = useState('');
    const [username_error, setusername_Error] = useState('');

    const [emailInp, setEmailInp] = useState('');
    const [emailError, setEmailError] = useState('');

    const [passwordInp, setPasswordInp] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [securePassword, setSecurePassword] = useState(true);


    const [confirm_passwordInp, setconfirm_passwordInp] = useState('');
    const [confirm_passwordError, setconfirm_passwordError] = useState('');
    const [secureconfirm_Password, setsecureconfirm_Password] = useState(true);

    const RedSignUpUser = useAppSelector(state => state.auth.signup);

    useEffect(() => {

        if (
            RedSignUpUser.state !== CALL_STATE.IDLE &&
            RedSignUpUser.state !== CALL_STATE.FETCHING
        ) {

            dispatch(signUPIdle());
            if (RedSignUpUser.state === CALL_STATE.SUCCESS) {

                Alert.alert('Success', 'Account created succussfully!', [{
                    onPress: () => {
                        navigation.goBack()
                    }
                }]);

            } else if (RedSignUpUser.state === CALL_STATE.ERROR) {
                Alert.alert('Error', RedSignUpUser.error);
            }
        }
    }, [RedSignUpUser.state])

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

        if (passwordInp.length < 1) {
            setPasswordError('Please enter Password');
            flag = false;
        } else if (passwordInp.length < 6) {
            setPasswordError('Can\'t be less that 6 charactors!')
            flag = false;
        } else {
            setPasswordError('');
        }

        if (confirm_passwordInp !== passwordInp) {
            setconfirm_passwordError('Please Confirm Password');
            flag = false;
        } else {
            setconfirm_passwordError('');
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
                    navigation.goBack();
                }}
                showDivider={false}
            />

            <KeyboardAwareScrollView
                style={{
                    flexGrow: 0,
                    width: '100%',
                    marginTop: RFValue(20),
                    paddingVertical: 10,
                    // backgroundColor: "#909011",
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
                        ref={refFullNameInp}
                        mode="outlined"
                        style={[styles.input, {
                            backgroundColor: colors.appBackground
                        }]}

                        outlineColor={colors.appTextPrimaryColor}
                        textColor={colors.appTextPrimaryColor}
                        placeholderTextColor={colors.appTextPlaceHolderColor}
                        onChangeText={(val) => {
                            setfullname_Inp(val);
                            setfullname_Error('');
                        }}
                        value={fullname_Inp}
                        placeholder="Full-Name"
                        left={
                            <TextInput.Icon
                                icon={'account-edit'}
                                iconColor="gray"
                                size={RFValue(15)}
                            />

                        }
                        onSubmitEditing={() => refUserNameInp.current.focus()}
                        returnKeyType="next"
                    />

                    <Text variant='labelSmall' style={{
                        color: 'red',
                        marginTop: RFValue(2),
                        marginBottom:RFValue(3)
                    }}>{fullname_error}</Text>


                    <TextInput
                        ref={refUserNameInp}
                        mode="outlined"
                        style={[styles.input, {
                            backgroundColor: colors.appBackground,
                            marginTop: 10
                        }]}

                        outlineColor={colors.appTextPrimaryColor}
                        textColor={colors.appTextPrimaryColor}
                        placeholderTextColor={colors.appTextPlaceHolderColor}
                        onChangeText={(val) => {
                            setusername_Inp(val);
                            setusername_Error('');
                        }}
                        value={username_Inp}
                        placeholder="UserName"
                        autoCapitalize={'none'}
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
                        marginTop: RFValue(2),
                        marginBottom:RFValue(3)
                    }}>{username_error}</Text>


                    <TextInput
                        ref={refEmailInp}
                        mode="outlined"
                        style={[styles.input, {
                            backgroundColor: colors.appBackground,
                            marginTop: 10
                        }]}

                        outlineColor={colors.appTextPrimaryColor}
                        textColor={colors.appTextPrimaryColor}
                        placeholderTextColor={colors.appTextPlaceHolderColor}
                        onChangeText={(val) => {
                            setEmailInp(val);
                            setEmailError('');
                        }}
                        value={emailInp}
                        placeholder="Email"
                        autoCapitalize={'none'}
                        left={
                            <TextInput.Icon
                                icon={'email'}
                                iconColor="gray"
                                size={RFValue(15)}
                            />
                        }
                        onSubmitEditing={() => refPasswordInp.current.focus()}
                        returnKeyType="next"
                    />


                    <Text variant='labelSmall' style={{
                        color: 'red',
                        marginTop: RFValue(2),
                        marginBottom:RFValue(3)
                    }}>{emailError}</Text>


                    <TextInput
                        ref={refPasswordInp}
                        mode="outlined"
                        style={[styles.input, {
                            backgroundColor: colors.appBackground,
                            marginTop: 10
                        }]}

                        outlineColor={colors.appTextPrimaryColor}
                        textColor={colors.appTextPrimaryColor}
                        placeholderTextColor={colors.appTextPlaceHolderColor}
                        onChangeText={(val) => {
                            setPasswordInp(val);
                            setPasswordError('');
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
                        right={<TextInput.Icon
                            icon={(securePassword) ? ('eye') : ('eye-off')}
                            iconColor="gray"
                            size={RFValue(15)}
                            onPress={() => {
                                setSecurePassword(!securePassword);
                            }}
                        />
                        }
                        onSubmitEditing={() => refConfirmPasswordInp.current.focus()}

                        returnKeyType="next"
                    />

                    <Text variant='labelSmall' style={{
                        color: 'red',
                        marginTop: RFValue(2),
                        marginBottom:RFValue(3)
                    }}>{passwordError}</Text>


                    <TextInput
                        ref={refConfirmPasswordInp}
                        mode="outlined"
                        style={[styles.input, {
                            backgroundColor: colors.appBackground,
                            marginTop: 10
                        }]}

                        outlineColor={colors.appTextPrimaryColor}
                        textColor={colors.appTextPrimaryColor}
                        placeholderTextColor={colors.appTextPlaceHolderColor}
                        onChangeText={(val) => {
                            setconfirm_passwordInp(val);
                            setconfirm_passwordError('');
                        }}
                        value={confirm_passwordInp}
                        placeholder="Confirm_Password"
                        autoCapitalize={'none'}
                        secureTextEntry={secureconfirm_Password}
                        left={
                            <TextInput.Icon
                                icon={'lock'}
                                iconColor="gray"
                                size={RFValue(15)}
                            />
                        }
                        right={
                            <TextInput.Icon
                                icon={(secureconfirm_Password) ? ('eye') : ('eye-off')}
                                iconColor="gray"
                                size={RFValue(15)}
                                onPress={() => {
                                    setsecureconfirm_Password(!secureconfirm_Password);
                                }}
                            />
                        }

                        returnKeyType="done"
                    />


                    <Text variant='labelSmall' style={{
                        color: 'red',
                        marginTop: RFValue(2),
                        marginBottom:RFValue(3)
                    }}>{confirm_passwordError}</Text>

                    <Button style={{

                        width: '50%',
                        marginTop: 40,
                        alignSelf: 'center',

                    }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
                        onPress={() => {

                            if (validateForm()) {
                                dispatch(APISignUp(fullname_Inp, username_Inp, emailInp, passwordInp));
                            }

                        }}
                    >
                        SignUp

                    </Button>


                </View>
            </KeyboardAwareScrollView>

            <FullScreenLoader
                loading={RedSignUpUser.state === CALL_STATE.FETCHING}
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

export default SignUpScreen;