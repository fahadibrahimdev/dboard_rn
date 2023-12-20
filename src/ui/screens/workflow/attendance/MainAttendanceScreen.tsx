
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { } from 'react-native-gesture-handler';
import { FAB, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../../helpers/enum';
import { ScreenNames } from '../../../../system/navigation/ScreenNames';
import { APIGetAttendance } from '../../../../system/networking/AttendanceAPICalls';
import { getAttendanceIdle } from '../../../../system/redux/slice/attendanceSlice';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import AttendanceCell from '../../../helperComponents/AttendanceCell';
import AppHeader from '../../../uiHelpers/AppHeader';


const MainAttendanceScreen = ({ }) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [myUserID, setMyUserID] = useState(1);

  const [filteredListData, setFilteredListData] = useState([]);
  const RedGetAttendance = useAppSelector(state => state.attendance.getAttendance);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();


  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]); // Your data source




  useEffect(() => {

    onRefresh();

  }, []);

  useEffect(() => {

    if (
      RedGetAttendance.state !== CALL_STATE.IDLE &&
      RedGetAttendance.state !== CALL_STATE.FETCHING
    ) {

      dispatch(getAttendanceIdle());
      if (RedGetAttendance.state === CALL_STATE.SUCCESS) {


        setFilteredListData(RedGetAttendance.actualPayload.data)


        // setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedGetAttendance.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedGetAttendance.error);
      }

    }
  }, [RedGetAttendance.state])

  const onRefresh = () => {

    dispatch(APIGetAttendance(RedAuthUser.accessToken));
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
        showRightButton={true}
        rightButtonIcon={'filter-variant'}
        onRightItemClick={() => {

        }}
        showDivider={true}
      />
      <FlatList
        style={{
          // width: '100%',
          // backgroundColor: "#998899"
          // margin: 30
        }}
        contentContainerStyle={{
          paddingBottom: RFValue(70)
        }}
        data={filteredListData} // Your data source
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item, index }) => {
          return (
            <AttendanceCell
              item={item}
              index={index}
              myUserID={myUserID}
              showArrowBtn={(!!item && !!item.end_time) ? (false) : (true)}
              onArrowclick={() => {
                navigation.navigate(ScreenNames.EditAttendanceScreen, {
                  selectedItem: item,
                  onBack: () => {
                    onRefresh()
                  }
                });
              }
              }
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

        refreshControl={
          <RefreshControl
            tintColor={colors.appTextPrimaryColor}
            title={'Refreshing...'}
            titleColor={colors.appTextPrimaryColor}
            refreshing={RedGetAttendance.state === CALL_STATE.FETCHING}
            onRefresh={onRefresh}
          />
        }

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
          navigation.navigate(ScreenNames.CreateAttendanceScreen, {
            onBack: () => {
              onRefresh();
            }
          });


        }}
      />

    </View>


  )
}

export default MainAttendanceScreen;
