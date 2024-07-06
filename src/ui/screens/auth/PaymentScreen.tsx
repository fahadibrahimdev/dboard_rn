import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View,Image } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { CALL_STATE } from '../../../helpers/enum';
import { signUPIdle } from '../../../system/redux/slice/authSlice';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from '../../uiHelpers/AppHeader';

import { useDispatch } from 'react-redux';
import { APISignUp } from '../../../system/networking/AuthAPICalls';
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';

import { mastercard, visa } from '../../../assets/Images';


const PaymentScreen = ({ }) => {

    const { colors } = useTheme();

    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (

        <View style={[styles.container, {
            backgroundColor:colors.appBackground,

        }]}>

            <Text
            style={{
                color: colors.appTextPrimaryColor,
                marginTop:40,
                fontSize:36
            }}>Pay Invoice</Text>
            

                 {/* 
                 Images View
                 
                 */}
    

            <View
            style={{
                flexDirection:'row',
                backgroundColor:colors.appBackground,
                // flex:1,
                width:'70%',
                height:50,
                marginTop:40
            }}
            >

<Image

source={mastercard}
style={{
    alignSelf:'flex-start',
width:50,
height:50
}}

/>

<Image

source={visa}
style={{
marginLeft:10,
width:'50%',
height:50
}}

/>   
         </View>

{/* 

View for Text 
*/}

<View 
style={{
    backgroundColor:colors.appBackground,
    width:'70%',
                height:70,
                marginTop:5
}}

>

    <Text
    style={{
        color: colors.appTextPrimaryColor,
        fontSize:20

    }} >Payment amount</Text>
    {/* 
    
View for 
            Amount 

    */}
    
<View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
  
  <Text style={{ color: colors.appTextPrimaryColor, fontSize: 20, marginTop: 10 }}>$500</Text>
  
  <Button
  style={{
    backgroundColor:colors.appBackground,  
    borderColor: colors.appTextPrimaryColor, 
    borderWidth: 1, 
    borderRadius: 5,
    
  }}
>
  Edit
</Button>

</View>

 
</View>


{/* 
View for Inputs 

*/}

<View
style={{
backgroundColor:colors.appBackground,
marginTop:5,
width:'70%',
height:'44%',

}}

>
    <Text
    style={{ color: colors.appTextPrimaryColor, fontSize: 20, marginTop: 2,marginLeft:3}}
    >Name of a card</Text>

<TextInput
          
          mode="outlined"
          style={[styles.input, {
                }]}

     />

<Text
    style={{color: colors.appTextPrimaryColor, fontSize: 20, marginTop:7 ,marginLeft:3}}
    >Card Number</Text>

<TextInput
          
          mode="outlined"
          style={[styles.input, {
           
            
          }]}
/>

{/* 
        View For 
                    Expiry And Security code


*/}

<View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
    <View>
<Text
    style={{ color: colors.appTextPrimaryColor, fontSize: 20, marginTop:7 ,marginLeft:3}}
    >Expiry date</Text>



<TextInput
          
          mode="outlined"
          style={[styles.input, {
            
             width:"120%"
          }]}
          placeholderTextColor={colors.appTextPlaceHolderColor}
          placeholder='MM / YY'
/>
</View>
<View>
<Text
    style={{ color: colors.appTextPrimaryColor, fontSize: 20, marginTop:7 }}
    >Security code</Text>



<TextInput
          
          mode="outlined"
          style={[styles.input, {
            
             width:"100%"
          }]}
/>
</View>



</View>

<Text
    style={{ color: colors.appTextPrimaryColor, fontSize: 20, marginTop:7 ,marginLeft:3}}
    >ZIP/Postal code</Text>

<TextInput
          
          mode="outlined"
          style={[styles.input, {
           
            
          }]}
/>


</View>


<Button 

style={{
    marginTop:7,
    backgroundColor:'teal',
}}
icon="lock" mode="contained" onPress={() => console.log('Pressed')}>
    Pay $500
  </Button>





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

export default PaymentScreen;