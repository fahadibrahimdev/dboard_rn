
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from 'react-redux';
import { adjustSystemShiftDataRed, adjustTeamDataRed } from '../../../../helpers/Utils';
import { CALL_STATE } from '../../../../helpers/enum';
import { createFinanceIdle } from '../../../../system/redux/slice/financeSlice';
import { useAppSelector } from '../../../../system/redux/store/hooks';

const CreateFinanceScreen = ({ route }) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const [type, setType] = useState(null);
  const [lead_user_id, setlead_user_id] = useState(null);
  const [game, setgame] = useState(null);
  const [platform, setplatform] = useState(null);
  const [is_active, setis_active] = useState(null);
  const [client_info, setclient_info] = useState(null);
  const [fb_page, setfb_page] = useState(null);
  const [backend, setbackend] = useState(null);
  const [amount, setamount] = useState(null);

  const [approved, setApproved] = useState(false);

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedCreateFinance = useAppSelector(state => state.finance.createFinance);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();

  const [Shift_idData, setShift_idData] = useState([]);
  const [Shift_idValue, setShift_idValue] = useState(null);
  const [isShift_idFocus, setIsShift_idFocus] = useState(false);

  const [team_idData, setTeam_idData] = useState([]);
  const [team_idValue, setTeam_idValue] = useState(null);
  const [isteam_idFocus, setIsTeam_idFocus] = useState(false);

  useEffect(() => {

    setTeam_idData(adjustTeamDataRed(RedHeartBeat.actualPayload))
    setShift_idData(adjustSystemShiftDataRed(RedHeartBeat.actualPayload));

  }, []);

  useEffect(() => {

    if (
      RedCreateFinance.state !== CALL_STATE.IDLE &&
      RedCreateFinance.state !== CALL_STATE.FETCHING
    ) {

      dispatch(createFinanceIdle());
      if (RedCreateFinance.state === CALL_STATE.SUCCESS) {
        Alert.alert('Success', 'Finance created succussfully!', [{
          onPress: () => {

            if (!!route && !!route.params && !!route.params.onBack) {
              route.params.onBack()
            }

            navigation.goBack()
          }
        }])


        // setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedCreateFinance.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedCreateFinance.error);
      }

    }
  }, [RedCreateFinance.state]);

  const validateForm = (): boolean => {
  }
}
// var flag = true;


//     if (!!!team_idValue) {
//       Alert.alert("Validation Error", " team_id is mandatory");
//       return false;
//     }

//     if (!!!Shift_idValue) {
//       Alert.alert("Validation Error", "shift_id selection is mandatory");
//       return false;
//     }

//     if (!!!lead_user_id) {
//       Alert.alert("Validation Error", "lead_user_id selection is mandatory");
//       return false;
//     }

//     if (!!!type) {
//       Alert.alert("Validation Error", "type selection is mandatory");
//       return false;
//     }


//     if (!!!game) {
//       Alert.alert("Validation Error", "game selection is mandatory");
//       return false;
//     }


//     if (!!!platform) {
//       Alert.alert("Validation Error", "platform selection is mandatory");
//       return false;
//     }

//     if (!!!is_active) {
//       Alert.alert("Validation Error", "is_active selection is mandatory");
//       return false;
//     }

//     if (!!!client_info) {
//       Alert.alert("Validation Error", "client_info selection is mandatory");
//       return false;
//     }
//     if (!!!fb_page) {
//       Alert.alert("Validation Error", "fb_page selection is mandatory");
//       return false;
//     }
//     if (!!!backend) {
//       Alert.alert("Validation Error", "backend selection is mandatory");
//       return false;
//     }
//     if (!!!amount) {
//       Alert.alert("Validation Error", "amount selection is mandatory");
//       return false;
//     }


//     return true;
//   }

//   const renderShiftItem = item => {
//     return (
//       <View style={styles.item}>
//         <Text style={styles.textItem}>{item.label}</Text>
//         {item.value === Shift_idValue && (
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

//       <View style={[styles.item,


//       ]}>
//         <Text style={styles.textItem}>{item.label}</Text>
//         {item.value === team_idValue && (
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

//     <ScrollView>
//         <View style={{
//       flex: 1,
//       backgroundColor: colors.appBackground,
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

//           <Text
//             variant='displaySmall'
//             style={{
//               color: colors.appTextPrimaryColor,
//               marginBottom: RFValue(20)

//             }}>Create Finance</Text>

//           <DateTimeSelector
//             value={type} 
//             placeholder='Start DateTime*'
//             onChange={(newValue: any) => {
//               setType(newValue);
//             }}
//           />

//           <DateTimeSelector
//             value={lead_user_id}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setlead_user_id(newValue);
//             }}
//           />


// <DateTimeSelector
//             value={game}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setgame(newValue);
//             }}
//           />

//           <DateTimeSelector
//             value={platform}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setplatform(newValue);
//             }}
//           />

//           <DateTimeSelector
//             value={is_active}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setis_active(newValue);
//             }}
//           />

//           <DateTimeSelector
//             value={client_info}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setclient_info(newValue);
//             }}
//           />

//           <DateTimeSelector
//             value={fb_page}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setfb_page(newValue);
//             }}
//           />


// <DateTimeSelector
//             value={backend}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setbackend(newValue);
//             }}
//           />


// <DateTimeSelector
//             value={amount}
//             placeholder='End DateTime'
//             onChange={(newValue: any) => {
//               setamount(newValue);
//             }}
//           />
//           <View style={styles.container}>
//             {/* {renderLabel()} */}
//             <Dropdown
//               style={[styles.dropdown, {
//                 borderColor: colors.appTextPrimaryColor,
//               }, isShift_idFocus && { borderWidth: 3, borderColor: '#007AFF' }]}
//               placeholderStyle={[styles.placeholderStyle, {
//                 color: colors.appTextPlaceHolderColor
//               }]}
//               selectedTextStyle={[styles.selectedTextStyle, {
//                 color: colors.appTextPrimaryColor,

//               }]}


//               inputSearchStyle={styles.inputSearchStyle}
//               iconStyle={styles.iconStyle}
//               data={Shift_idData}

//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={!isShift_idFocus ? 'Shift*' : 'Shift*'}
//               searchPlaceholder="Search..."
//               value={Shift_idValue}

//               onFocus={() => setIsShift_idFocus(true)}
//               onBlur={() => setIsShift_idFocus(false)}
//               onChange={item => {
//                 setShift_idValue(item.value);
//                 setIsShift_idFocus(false);
//               }}
//               renderLeftIcon={() => (
//                 <Icon
//                   style={styles.icon}
//                   color={isShift_idFocus ? '#007AFF' : colors.appTextPrimaryColor}
//                   name="web-clock"
//                   size={20}
//                 />
//               )}
//               renderItem={renderShiftItem}

//             />
//             <Dropdown
//               style={[styles.dropdown, {
//                 borderColor: colors.appTextPrimaryColor,
//               }, isteam_idFocus && { borderWidth: 3, borderColor: '#007AFF', marginTop: 10 }]}
//               placeholderStyle={[styles.placeholderStyle, {
//                 color: colors.appTextPlaceHolderColor,


//               }]}
//               selectedTextStyle={[styles.selectedTextStyle, {
//                 color: colors.appTextPrimaryColor,


//               }]}

//               inputSearchStyle={styles.inputSearchStyle}
//               iconStyle={styles.iconStyle}
//               data={team_idData}
//               search
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={!isteam_idFocus ? 'Team*' : 'Team*'}
//               searchPlaceholder="Search..."
//               value={team_idValue}

//               onFocus={() => setIsTeam_idFocus(true)}
//               onBlur={() => setIsTeam_idFocus(false)}
//               onChange={item => {
//                 setTeam_idValue(item.value);
//                 setIsTeam_idFocus(false);
//               }}
//               renderLeftIcon={() => (
//                 <Icon
//                   style={styles.icon}
//                   color={isteam_idFocus ? '#007AFF' : colors.appTextPrimaryColor}
//                   name="account-multiple-outline"

//                   size={20}
//                 />
//               )}
//               renderItem={renderTeamItem}

//             />




//             {false &&
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop: 20,
//                   // justifyContent: 'center',
//                   alignItems: 'center',
//                   // backgroundColor: '#901122'
//                 }}

//               >
//                 <Text style={{
//                   color: colors.appTextPrimaryColor,

//                 }}>Approved</Text>
//                 <Switch
//                   style={{
//                     marginLeft: 5,

//                   }}
//                   value={isSwitchOn} onValueChange={(val) => {
//                     setIsSwitchOn(val);

//                   }}
//                 />


//               </View>
//             }
//           </View>


//           <Button style={{
//             justifyContent: 'center',
//             marginTop: RFValue(30),
//             width: '40%',


//           }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
//             onPress={() => {
//               if (validateForm()) {
//                 dispatch(APIcreateFinance(RedAuthUser.accessToken,team_idValue,Shift_idValue,lead_user_id,type,game,platform,is_active,client_info,fb_page,backend,amount));
//               }
//             }}
//           >
//             Submit

//           </Button>
//         </View>
//       </View>

//       <FullScreenLoader
//         loading={RedCreateFinance.state === CALL_STATE.FETCHING}
//       />
//     </View>

// </ScrollView>


//   )
// }

// const styles = StyleSheet.create({
//   containerO: {
//     flex: 1,
//     alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   input: {
//     width: '100%',

//   },
//   displayText: {
//     fontSize: 9,
//     color: 'blue',
//   },
//   labelO: {
//     fontSize: 50,
//     marginBottom: 10,
//   },
//   text1: {

//   },
//   container: {
//     width: '90%',
//   },
//   dropdown: {
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 3,
//     paddingHorizontal: 8,
//     marginTop: RFValue(20)
//   },
//   icon: {
//     marginHorizontal: 10,
//   },

//   item: {
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textItem: {
//     flex: 1,
//     fontSize: 16,
//     color: 'black'
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: 'gray'
//   },
//   selectedTextStyle: {
//     marginLeft: 7,
//     fontSize: 16,
//     color: 'white'
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     color: 'black'
//   },
// });
export default CreateFinanceScreen;