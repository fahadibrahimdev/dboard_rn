
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from "react-native";
import { FAB, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../../helpers/enum';
import { ScreenNames } from '../../../../system/navigation/ScreenNames';
import { APIGetAttendance } from '../../../../system/networking/AttendanceAPICalls';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import AppHeader from '../../../uiHelpers/AppHeader';
import FullScreenLoader from '../../../uiHelpers/FullScreenLoader';
import { getAttendanceIdle } from '../../../../system/redux/slice/attendanceSlice';
import AttendanceCell from '../../../helperComponents/AttendanceCell';
import { APIGetFinance } from '../../../../system/networking/FinanceAPICalls';
import { getFinanceIdle } from '../../../../system/redux/slice/financeSlice';

const FinanceScreen = ({ }) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [myUserID, setMyUserID] = useState(1);

  const [filteredListData, setFilteredListData] = useState([]);
  const RedGetFinance = useAppSelector(state => state.finance.getFinance);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(APIGetFinance(RedAuthUser.accessToken));

  }, []);

  useEffect(() => {

    if (
      RedGetFinance.state !== CALL_STATE.IDLE &&
      RedGetFinance.state !== CALL_STATE.FETCHING
    ) {

      dispatch(getFinanceIdle());
      if (RedGetFinance.state === CALL_STATE.SUCCESS) {


        setFilteredListData(RedGetFinance.actualPayload.data.attendance)


        // setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedGetFinance.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedGetFinance.error);
      }

    }
  }, [RedGetFinance.state])

  return (

    <View style={{
      flex: 1,
      backgroundColor:colors.appBackground,
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
      <FlatList
        style={{
          width: '100%',
          // backgroundColor: "#998899"
          // margin: 30
        }}
        data={filteredListData} // Your data source
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item, index }) => {
          return (
            <AttendanceCell
              item={item}
              index={index}
              myUserID={myUserID}
              onClick={
                () => {
                  navigation.navigate(ScreenNames.ViewFinanceScreen);
                  // if (item.fullName === "Waleeed Ismael") {
                  //   navigation.navigate(ScreenNames.ViewAttendanceScreen);
                  // }else{
                  //   navigation.navigate(ScreenNames.SignInScreen);
                  // }
                }}
            />
          )
        }}

        ListEmptyComponent={() => {
          return (<View style={{
            flex: 1,
            marginTop: 90,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text
            variant='displaySmall'
            style={{
              color: 'black'
            }}>No data to show</Text>
          </View>)
        }}

      />
      <FAB
        icon="plus"


        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: 'grey'



        }}
        color={colors.appIconColor}
        onPress={() => {
          navigation.navigate(ScreenNames.ViewFinanceScreen);


        }}
      />

      <FullScreenLoader
        loading={RedGetFinance.state === CALL_STATE.FETCHING}
      />
    </View>


  )
}
export default FinanceScreen;
