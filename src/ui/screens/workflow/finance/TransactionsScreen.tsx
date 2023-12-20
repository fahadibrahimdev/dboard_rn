import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useRef, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScreenNames } from '../../../../system/navigation/ScreenNames';
import AppHeader from '../../../uiHelpers/AppHeader';


const TransactionsScreen  = ({ route }) => {

  var refURLTI = useRef(null);
  var refAmountTI = useRef(null);
  var refTIPTI = useRef(null);
  var refLeadTI = useRef(null);
  var refPageTI = useRef(null);
  var refDescTI = useRef(null);


  const [URL, setURLInp] = useState('');
  const [URLerror, setURLerror] = useState('');

  const [amountINP, setAmountInp] = useState('');
  const [amounterror, setAmounterror] = useState('');

  const [tipINP, settipInp] = useState('');
  const [tiperror, settiperror] = useState('');

  const [leadINP, setleadInp] = useState('');
  const [leaderror, setleaderror] = useState('');

  const [pageurlINP, setpageurlInp] = useState('');
  const [pageurlerror, setpageurlerror] = useState('');

  const [descriptionINP, setdescriptionInp] = useState('');
  const [descriptionerror, setdescriptionerror] = useState('');


  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const data = [
    { label: 'Orion Star', value: '1' },
    { label: 'Milky Way', value: '2' },
    { label: 'Fire kricIn', value: '3' },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="checkcircle"
            size={20}
          />

        )}
      </View>
    );
  };

  const validateForm = (): boolean => {


    var flag = true;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (URL.length < 1) {
      Alert.alert('please enter Url');
      return false;
    }
    else {
      setURLerror('')
    }

    if (amountINP.length < 1) {
      Alert.alert('please add Amount');
      return false;
    }
    else {
      setAmounterror('');
    }

    if (tipINP.length < 1) {
      Alert.alert('please add Tip');
      return false;
    }
    else {
      settiperror('');
    }

    if (leadINP.length < 1) {
      Alert.alert('please enter Lead');
      return false;
    }
    else {
      setleaderror('');
    }


    if (pageurlINP.length < 1) {
      Alert.alert('please enter Page Url');
      return false;
    }
    else {
      setpageurlerror('');
    }

    if (descriptionINP.length < 1) {
      Alert.alert('please enter Description');
      return false;
    }
    else {
      setdescriptionerror('');
    }
    return flag;
  }

  return (

    <View style={[styles.containerO, {
      backgroundColor: colors.appBackground,

    }]}>
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
          width: '70%',
          // backgroundColor: "#890099"
        }}>


          <TextInput
            ref={refURLTI}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground,
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setURLInp(val);
            }}
            left={
              <TextInput.Icon
                icon={'link'}
                iconColor="gray"
                size={RFValue(15)}
              />
            }
            value={URL}
            placeholder="FBID/URL"
            onSubmitEditing={() => refAmountTI.current.focus()}
            returnKeyType="next"
          />


          <TextInput
            ref={refAmountTI}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setAmountInp(val);
            }}
            left={
              <TextInput.Icon
                icon={'currency-usd'}
                iconColor="gray"
                size={RFValue(15)}
              />
            }
            value={amountINP}
            keyboardType='number-pad'
            placeholder="Amount"
            onSubmitEditing={() => refTIPTI.current.focus()}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          />


          <TextInput
            ref={refTIPTI}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              settipInp(val);
            }}
            left={
              <TextInput.Icon
                icon={'currency-usd'}
                iconColor="gray"
                size={RFValue(15)}
              />
            }
            value={tipINP}
            keyboardType='number-pad'
            placeholder="Tip"
            onSubmitEditing={() => refLeadTI.current.focus()}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}


          />


          <TextInput
            ref={refLeadTI}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setleadInp(val);
            }}
            left={
              <TextInput.Icon
                icon={'account'}
                iconColor="gray"
                size={RFValue(15)}
              />
            }
            value={leadINP}
            keyboardType='default'
            placeholder="Lead"
            onSubmitEditing={() => refPageTI.current.focus()}
            returnKeyType={'next'}

          />



          <TextInput
            ref={refPageTI}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}

            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setpageurlInp(val);
            }}
            left={
              <TextInput.Icon
                icon={'web'}
                iconColor="gray"
                size={RFValue(15)}
              />
            }
            value={pageurlINP}
            keyboardType='default'
            placeholder="PageUrl"
            onSubmitEditing={() => refDescTI.current.focus()}
            returnKeyType={'next'}
          />


          <TextInput
            ref={refDescTI}
            mode="outlined"
            style={[styles.input, {
              backgroundColor: colors.appBackground
            }]}
            // activeOutlineColor='#FFAAAA'
            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setdescriptionInp(val);
            }}
            left={
              <TextInput.Icon
                icon={'text'}
                iconColor="gray"
                size={RFValue(15)}
              />
            }
            value={descriptionINP}
            keyboardType='default'
            placeholder="Description"
            returnKeyType={'done'}
          />


          <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderWidth: 3, borderColor: '#007AFF' }]}
              placeholderStyle={[styles.placeholderStyle, {
                // color: colors.appTextPlaceHolderColor
              }]}
              selectedTextStyle={[styles.selectedTextStyle, {
                // color:colors.appTextPrimaryColor
              }]}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Game' : 'Game'}              
              searchPlaceholder="Search..."
              value={value}
            
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isFocus ? '#007AFF' : colors.appTextPrimaryColor}
                  name="controller-classic-outline"
                  size={20}
                />
              )}
              renderItem={renderItem}

            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              // justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#901122'
            }}

          >
            <Text style={{
              color: colors.appTextPrimaryColor,

            }}>Approved</Text>
            <Switch
              style={{
                marginLeft: 10,

              }}
              value={isSwitchOn} onValueChange={(val) => {
                setIsSwitchOn(val);

              }}
            />

          </View>

        </View>

      </KeyboardAwareScrollView>


      <View style={{
        // backgroundColor: "#FF1",
        flex: 1,
        justifyContent: 'center'
      }}>
        <Button style={{

          width: '50%',
          // alignSelf: 'flex-end',

        }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
          onPress={() => {
            if (validateForm()) {
              // navigation.navigate(ScreenNames.NewScreen);
            }

            // navigation.navigate(ScreenNames.NewScreen);
            // Toast.show('TODO!', Toast.LONG);

          }}
        >
          Submit

        </Button>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  containerO: {
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
  labelO: {
    fontSize: 50,
    marginBottom: 10,
  },
  text1: {

  },
  container: {
    // backgroundColor: 'white',
    // padding: 16,
    marginTop: 10
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 3,
    paddingHorizontal: 8,
  },
  icon: {
    marginHorizontal: 10,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray'
  },
  selectedTextStyle: {
    marginLeft: 7,
    fontSize: 16,
    color: 'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black'
  },
});

export default TransactionsScreen;
