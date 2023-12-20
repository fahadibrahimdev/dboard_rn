
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';

import moment from 'moment-timezone';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { adjustShiftDataRed, adjustSystemShiftDataRed, adjustTeamDataRed, getStatusNameFromIdRed } from '../../../../helpers/Utils';
import { CALL_STATE, USER_ROLES } from '../../../../helpers/enum';
import { ApiApproveAttendance } from '../../../../system/networking/AttendanceAPICalls';
import { approveAttendanceIdle } from '../../../../system/redux/slice/attendanceSlice';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import AppHeader from '../../../uiHelpers/AppHeader';
import ApproveComponent from '../../../uiHelpers/ApproveComponent';
import DateTimeSelector from '../../../uiHelpers/DateTimeSelector';
import FullScreenLoader from '../../../uiHelpers/FullScreenLoader';


const EditAttendanceScreen = ({ route }) => {

  const { onBack, selectedItem } = route.params;

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [approved, setApproved] = useState(false);

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedApproveAttendance = useAppSelector(state => state.attendance.approveAttendance);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();

  const [item, setItem] = useState(null);

  const [shiftData, setShiftData] = useState([]);
  const [shiftValue, setShiftValue] = useState(null);
  const [isShiftFocus, setIsShiftFocus] = useState(false);

  const [teamData, setTeamData] = useState([]);
  const [teamValue, setTeamValue] = useState(null);
  const [isTeamFocus, setIsTeamFocus] = useState(false);


  const [attendanceStatus, setAttendanceStatus] = useState(null);

  useEffect(() => {

    if (!!selectedItem) {
      setItem(selectedItem);

      setAttendanceStatus(getStatusNameFromIdRed(selectedItem.status, []));
    }

    setTeamData(adjustTeamDataRed(RedHeartBeat.actualPayload));

    const shiftData = adjustSystemShiftDataRed(RedHeartBeat.actualPayload);
    setShiftData(shiftData);

  }, []);

  useEffect(() => {

    if (!!item) {
      setStartDate(moment(item.start_time))

      if (!!item.end_time) {
        setEndDate(moment(item.end_time))
      }

      const myShiftData = adjustSystemShiftDataRed(RedHeartBeat.actualPayload);
      const myShift = myShiftData.find((x) => parseInt(x.value) === item.shift_id);
      setShiftValue((!!myShift && !!myShift.value) ? (myShift.value) : ('0'));

      const myTeamData = adjustTeamDataRed(RedHeartBeat.actualPayload);
      const myTeam = myTeamData.find((x) => parseInt(x.value) === item.team_id);
      setTeamValue((!!myTeam && !!myTeam.value) ? (myTeam.value) : ('0'));


    }
  }, [item])



  useEffect(() => {

    if (
      RedApproveAttendance.state !== CALL_STATE.IDLE &&
      RedApproveAttendance.state !== CALL_STATE.FETCHING
    ) {

      dispatch(approveAttendanceIdle());
      if (RedApproveAttendance.state === CALL_STATE.SUCCESS) {
        Alert.alert('Success', 'Attendance approve succussfully!', [{
          onPress: () => {



            if (!!onBack) {
              onBack();
            }

            navigation.goBack()
          }
        }])


        // setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedApproveAttendance.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedApproveAttendance.error);
      }

    }
  }, [RedApproveAttendance.state]);

  const validateForm = (): boolean => {


    // var flag = true;


    if (!!!endDate) {
      Alert.alert("Validation Error", "End Date Time is mandatory");
      return false;
    }


    return true;
  }



  const renderShiftItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === shiftValue && (
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

  const renderTeamItem = item => {
    return (

      <View style={[styles.item,


      ]}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === teamValue && (
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


  return (
    <View style={{
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
      <View style={{
        flex: 1,
        marginTop: 20,
        // alignItems: 'center'
      }}>


        <View style={{
          flex: 1,
          alignItems: 'center',
          // backgroundColor: "#889922"
        }}>

          <Text
            variant='displaySmall'
            style={{
              color: colors.appTextPrimaryColor,
              marginBottom: RFValue(20)

            }}>Edit Attendance</Text>

          <DateTimeSelector
            value={startDate}
            placeholder='Start DateTime'
            disable={true}

          />

          <DateTimeSelector
            value={endDate}
            disable={!!endDate}
            placeholder='End DateTime'
            onChange={(newValue: any) => {
              setEndDate(newValue);
            }}
          />

          <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
              disable={true}
              style={[styles.dropdown, {
                borderColor: colors.appTextPrimaryColor,
              }, isShiftFocus && { borderWidth: 3, borderColor: '#007AFF' }]}
              placeholderStyle={[styles.placeholderStyle, {
                color: colors.appTextPlaceHolderColor
              }]}

              selectedTextStyle={[styles.selectedTextStyle, {
                color: colors.appTextPrimaryColor,

              }]}


              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={shiftData}

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isShiftFocus ? 'Shift' : 'Shift'}
              searchPlaceholder="Search..."
              value={shiftValue}

              onFocus={() => setIsShiftFocus(true)}
              onBlur={() => setIsShiftFocus(false)}
              onChange={item => {
                setShiftValue(item.value);
                setIsShiftFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isShiftFocus ? '#007AFF' : colors.appTextPrimaryColor}
                  name="web-clock"
                  size={20}
                />
              )}
              renderItem={renderShiftItem}

            />
            <Dropdown
              disable={true}
              style={[styles.dropdown, {
                borderColor: colors.appTextPrimaryColor,
              }, isTeamFocus && { borderWidth: 3, borderColor: '#007AFF', marginTop: 10 }]}
              placeholderStyle={[styles.placeholderStyle, {
                color: colors.appTextPlaceHolderColor,


              }]}
              selectedTextStyle={[styles.selectedTextStyle, {
                color: colors.appTextPrimaryColor,


              }]}

              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={teamData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isTeamFocus ? 'Team' : 'Team'}
              searchPlaceholder="Search..."
              value={teamValue}

              onFocus={() => setIsTeamFocus(true)}
              onBlur={() => setIsTeamFocus(false)}
              onChange={item => {
                // setTeamValue(item.value);
                setIsTeamFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isTeamFocus ? '#007AFF' : colors.appTextPrimaryColor}
                  name="account-multiple-outline"

                  size={20}
                />
              )}
              renderItem={renderTeamItem}

            />

            {
              (RedHeartBeat.actualPayload.data.user_data[0].code === USER_ROLES.LEADER ||
                RedHeartBeat.actualPayload.data.user_data[0].code === USER_ROLES.SUPER_USER) &&
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                }}
              >
                <ApproveComponent
                  currentSelectedState={attendanceStatus}
                  onChange={(newState) => {
                    setAttendanceStatus(newState);
                  }}
                />
              </View>
            }


          </View>
          <Button style={{
            justifyContent: 'center',
            marginTop: RFValue(30),
            width: '40%',


          }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
            onPress={() => {
              if (validateForm()) {
                dispatch(ApiApproveAttendance(RedAuthUser.accessToken, endDate, item.id, attendanceStatus));
              }


            }}

          >
            Submit

          </Button>
        </View>
      </View>

      <FullScreenLoader
        loading={RedApproveAttendance.state === CALL_STATE.FETCHING}
      />
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
    width: '90%',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    marginTop: RFValue(20)
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
export default EditAttendanceScreen;