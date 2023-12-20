
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Switch, Text } from 'react-native-paper';
import AppHeader from '../../../uiHelpers/AppHeader';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-paper';
import DateTimeSelector from '../../../uiHelpers/DateTimeSelector';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dropdown } from 'react-native-element-dropdown';

const ViewAttendanceScreen = () => {

//   const { colors } = useTheme();
//   const navigation = useNavigation();
//   const [isSwitchOn, setIsSwitchOn] = React.useState(false);

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [approved, setApproved] = useState(false);

//   const shiftData = [
//     { label: 'Morning', value: '1' },
//     { label: 'Evening', value: '2' },
//     { label: 'Night', value: '3' },
//   ];

//   const [shiftValue, setShiftValue] = useState(null);
//   const [isShiftFocus, setIsShiftFocus] = useState(false);

  
//   const teamdata = [
//     { label: 'Simba', value: '1' },
//     { label: 'Bunny', value: '2' },
//     { label: 'Alladin', value: '3' },
//   ];

//   const [teamname, setteamname] = useState(null);
//   const [isTeamFocus, setIsTeamFocus] = useState(false);

//   const renderShiftItem = item => {
//     return (
//       <View style={styles.item}>
//         <Text style={styles.textItem}>{item.label}</Text>
//         {item.value === shiftValue && (
//           <AntDesign
//             style={styles.icon}
//             color="black"
//             name="checkcircle"
//             size={20}
//           />

//         )}
//       </View>
//     );
//   };

//   const renderTeamItem = item => {
//     return (
      
//     <View style={[styles.item, 
    

//   ]}>
//         <Text style={styles.textItem}>{item.label}</Text>
//         {item.value === teamname && (
//           <AntDesign
//             style={styles.icon}
//             color="black"
//             name="checkcircle"
//             size={20}
//           />

//         )}
//       </View>
//     );
//   };


//   return (
//     <View style={{
//       flex: 1,
//       backgroundColor:colors.appBackground,
//     }}>

//       <AppHeader
//         showLeftButton={true}
//         leftButtonIcon={'arrow-left'}
//         onLeftItemClick={() => {
//           navigation.goBack();

//         }}
//         showRightButton={false}
//         rightButtonIcon={'bell'}
//         onRightItemClick={() => {


//         }}
//         showDivider={true}
//       />
//       <View style={{
//         flex: 1,
//         marginTop: 20,
//         // alignItems: 'center'
//       }}>


//         <View style={{
//           flex: 1,
//           alignItems: 'center',
//           // backgroundColor: "#889922"
//         }}>

//           <DateTimeSelector
//             value={startDate}
//             placeholder='Start DateTime'
//             onChange={(newValue: any) => {
//               setStartDate(newValue);
//             }}
//           />

//           <DateTimeSelector
//             value={endDate}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setEndDate(newValue);
//             }}
//             />

// <View style={styles.container}>
//             {/* {renderLabel()} */}
//             <Dropdown
//               style={[styles.dropdown, isShiftFocus && { borderWidth: 3, borderColor: '#007AFF' }]}
//               placeholderStyle={[styles.placeholderStyle, {
//                 color: colors.appTextPlaceHolderColor
//               }]}
//               selectedTextStyle={[styles.selectedTextStyle, {
//                 color:colors.appTextPrimaryColor,
                
//               }]}
              
              
//               inputSearchStyle={styles.inputSearchStyle}
//               iconStyle={styles.iconStyle}
//               data={shiftData}
              
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={!isShiftFocus ? 'Shift' : 'Shift'}              
//               searchPlaceholder="Search..."
//               value={shiftValue}
            
//               onFocus={() => setIsShiftFocus(true)}
//               onBlur={() => setIsShiftFocus(false)}
//               onChange={item => {
//                 setShiftValue(item.value);
//                 setIsShiftFocus(false);
//               }}
//               renderLeftIcon={() => (
//                 <Icon
//                   style={styles.icon}
//                   color={isShiftFocus ? '#007AFF' : colors.appTextPrimaryColor}
//                   name="web-clock"
//                   size={20}
//                 />
//               )}
//               renderItem={renderShiftItem}

//             />
//             <Dropdown
//               style={[styles.dropdown, isTeamFocus && { borderWidth: 3, borderColor: '#007AFF', marginTop:10 }]}
//               placeholderStyle={[styles.placeholderStyle, {
//                 color: colors.appTextPlaceHolderColor,
                
                
//               }]}
//               selectedTextStyle={[styles.selectedTextStyle, {
//                 color:colors.appTextPrimaryColor,
              
                
//               }]}
              
//               inputSearchStyle={styles.inputSearchStyle}
//               iconStyle={styles.iconStyle}
//               data={teamdata}
//               search
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={!isTeamFocus ? 'Team' : 'Team'}              
//               searchPlaceholder="Search..."
//               value={teamname}
            
//               onFocus={() => setIsTeamFocus(true)}
//               onBlur={() => setIsTeamFocus(false)}
//               onChange={item => {
//                 setteamname(item.value);
//                 setIsTeamFocus(false);
//               }}
//               renderLeftIcon={() => (
//                 <Icon
//                   style={styles.icon}
//                   color={isTeamFocus ? '#007AFF' : colors.appTextPrimaryColor}
//                   name="account-multiple-outline"
                  
//                   size={20}
//                 />
//               )}
//               renderItem={renderTeamItem}

//             />

            
//           <View
//             style={{
//               flexDirection: 'row',
//               marginTop: 20,
//               // justifyContent: 'center',
//               alignItems: 'center',
//               // backgroundColor: '#901122'
//             }}

//           >
//             <Text style={{
//               color: colors.appTextPrimaryColor,

//             }}>Approved</Text>
//             <Switch
//               style={{
//                 marginLeft:5,

//               }}
//               value={isSwitchOn} onValueChange={(val) => {
//                 setIsSwitchOn(val);

//               }}
//             />
         

//           </View>
//           </View>
//           <Button style={{
//               justifyContent:'center',
//               marginTop:20,
//               width: '40%',
              

// }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
// onPress={() => {
  
// }}
// >
// Submit

// </Button>  
//         </View> 
//       </View>
//     </View>



  
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
    width: '90%',
    marginTop: 10
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 3,
    paddingHorizontal: 8,
    marginTop:10
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
export default ViewAttendanceScreen;