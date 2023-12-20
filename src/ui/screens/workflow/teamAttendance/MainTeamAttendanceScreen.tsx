
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Touchable, TouchableOpacity, View } from "react-native";
import { } from 'react-native-gesture-handler';
import { ActivityIndicator, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { getStatusNameFromIdRed } from '../../../../helpers/Utils';
import { CALL_STATE, FILTER_DATE_CODES } from '../../../../helpers/enum';
import { ScreenNames } from '../../../../system/navigation/ScreenNames';
import { APIGetAttendanceByPagination } from '../../../../system/networking/AttendanceAPICalls';
import { getAttendanceByPaginationIdle, getTeamAttendanceIdle } from '../../../../system/redux/slice/attendanceSlice';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import AttendanceCell from '../../../helperComponents/AttendanceCell';
import AppHeader from '../../../uiHelpers/AppHeader';
import FiltersComponent from '../../../uiHelpers/FiltersComponent';
import FullScreenLoader from '../../../uiHelpers/FullScreenLoader';
import moment from 'moment-timezone';


const MainTeamAttendanceScreen = ({ }) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [myUserID, setMyUserID] = useState(1);

  const [mySelectedTimeDuration, setMySelectedTimeDuration] = useState(null);
  const [filteredListData, setFilteredListData] = useState([]);

  const [myAllFilters, setMyAllFilters] = useState(null);

  // const RedGetTeamAttendance = useAppSelector(state => state.attendance.getTeamAttendance);
  const RedGetAttendanceByPagination = useAppSelector(state => state.attendance.getAttendanceByPagination);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();


  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]); // Your data source




  useEffect(() => {

    // onRefresh();

  }, []);

  // useEffect(() => {

  //   if (
  //     RedGetTeamAttendance.state !== CALL_STATE.IDLE &&
  //     RedGetTeamAttendance.state !== CALL_STATE.FETCHING
  //   ) {

  //     dispatch(getTeamAttendanceIdle());
  //     if (RedGetTeamAttendance.state === CALL_STATE.SUCCESS) {


  //       setFilteredListData(RedGetTeamAttendance.actualPayload.data)


  //       // setPermissions(RedHeartBeat.actualPayload.data.permission);
  //     } else if (RedGetTeamAttendance.state === CALL_STATE.ERROR) {
  //       Alert.alert('Error', RedGetTeamAttendance.error);
  //     }

  //   }
  // }, [RedGetTeamAttendance.state])



  useEffect(() => {

    if (
      RedGetAttendanceByPagination.state !== CALL_STATE.IDLE &&
      RedGetAttendanceByPagination.state !== CALL_STATE.FETCHING
    ) {

      dispatch(getAttendanceByPaginationIdle());
      if (RedGetAttendanceByPagination.state === CALL_STATE.SUCCESS) {


        setFilteredListData(RedGetAttendanceByPagination.actualPayload.data.attendances)


        // setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedGetAttendanceByPagination.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedGetAttendanceByPagination.error);
      }

    }
  }, [RedGetAttendanceByPagination.state])

  useEffect(() => {

    if (!!mySelectedTimeDuration) {
      onRefresh();
    }

  }, [mySelectedTimeDuration]);

  useEffect(() => {

    if (!!myAllFilters) {
      onRefresh();
    }

  }, [myAllFilters]);

  const onRefresh = () => {

    // dispatch(APIGetTeamAttendance(RedAuthUser.accessToken, '4'));
    // dispatch(APIGetTeamAttendance(RedAuthUser.accessToken, (!!mySelectedTimeDuration && !!mySelectedTimeDuration.value && mySelectedTimeDuration.value !== '0') ? (mySelectedTimeDuration.value) : ('1')));


    const quickFilterDates = getStartEndDateFromQuickFilters();

    dispatch(APIGetAttendanceByPagination({
      token: RedAuthUser.accessToken,
      sortBy: 'start_time',
      sortDirection: 'desc',
      callState: CALL_STATE.REFRESHING,

      start_day: quickFilterDates.start_day,
      end_day: quickFilterDates.end_day,
    }
    ));

  };

  const onPageChange = () => {
    const newPageNumber = RedGetAttendanceByPagination.actualPayload.data.pagination.currentPage + 1;

    const quickFilterDates = getStartEndDateFromQuickFilters();

    dispatch(APIGetAttendanceByPagination({
      token: RedAuthUser.accessToken,
      sortBy: 'start_time',
      sortDirection: 'desc',
      pageNo: newPageNumber,
      callState: CALL_STATE.FETCHING,

      start_day: quickFilterDates.start_day,
      end_day: quickFilterDates.end_day,
    }
    ));

  };

  const getStartEndDateFromQuickFilters = () => {

    var start_day = '';
    var end_day = '';


    const today = moment().format('YYYY-MM-DD 00:00:00');

    if (!!mySelectedTimeDuration) {
      switch (mySelectedTimeDuration.value) {
        case FILTER_DATE_CODES.TODAY:
          start_day = today;
          // end_day = today_date.format('YYYY-MM-DD 23:59:59');

          break;

        case FILTER_DATE_CODES.DAYS_3:

          const threeDaysBack = moment().subtract(3, 'days');
          start_day = threeDaysBack.format('YYYY-MM-DD 00:00:00');
          end_day = moment().format('YYYY-MM-DD 23:59:59');
          break;

        case FILTER_DATE_CODES.DAYS_7:
          const sevenDaysBack = moment().subtract(7, 'days');
          start_day = sevenDaysBack.format('YYYY-MM-DD 00:00:00');
          end_day = moment().format('YYYY-MM-DD 23:59:59');
          break;

        case FILTER_DATE_CODES.DAYS_30:
          const thirtyDaysBack = moment().subtract(30, 'days');
          start_day = thirtyDaysBack.format('YYYY-MM-DD 00:00:00');
          end_day = moment().format('YYYY-MM-DD 23:59:59');
          break;

        default:
          break;
      }
    }

    return {
      start_day: start_day,
      end_day: end_day
    }
  }

  const renderFooter = showIndicator => {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          // backgroundColor: "#118877"
        }}>
        {showIndicator ? (
          <ActivityIndicator color="#000000" style={{ marginLeft: 8 }} />
        ) : null}

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
        showRightButton={true}
        rightButtonIcon={'filter-variant'}
        onRightItemClick={() => {
          navigation.navigate(ScreenNames.FiltersTeamAttendanceScreen, {
            myAllFilters: myAllFilters,

            onApply: (updatedFilters) => {

              setMySelectedTimeDuration(null);
              setMyAllFilters(updatedFilters)
            },

            onReset: () => {

              setMyAllFilters(null);
            }
          });

        }}
        showDivider={true}
      ></AppHeader>


      {!!myAllFilters === false &&
        <View
          style={{
            width: '100%',
            height: '8%',

          }}>
          <FiltersComponent
            isBusy={RedGetAttendanceByPagination.state !== CALL_STATE.IDLE}
            onItemSelection={(selectedItem) => {

              setMySelectedTimeDuration(selectedItem);
            }} />

        </View>

      }

      <FlatList
        style={{
          flex: 1,
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
              showArrowBtn={(getStatusNameFromIdRed(item.status, []) === 'Pending') ? (true) : (false)}
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
          return (
            <View style={{
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
            refreshing={RedGetAttendanceByPagination.state === CALL_STATE.REFRESHING}
            onRefresh={onRefresh}
          />
        }

        ListFooterComponent={() => {
          const myFlag = RedGetAttendanceByPagination.state !== CALL_STATE.REFRESHING &&
            !!RedGetAttendanceByPagination.actualPayload &&
            !!RedGetAttendanceByPagination.actualPayload.data &&
            !!RedGetAttendanceByPagination.actualPayload.data.attendances &&
            RedGetAttendanceByPagination.actualPayload.data.attendances.length > 0 &&
            !!RedGetAttendanceByPagination.actualPayload.data.pagination &&
            RedGetAttendanceByPagination.actualPayload.data.pagination.currentPage !== RedGetAttendanceByPagination.actualPayload.data.pagination.totalPages;

          // RedGetAttendanceByPagination.actualPayload.data.attendances.length <
          // RedLoads.payload.Data.TotalRows,

          return renderFooter(myFlag);
        }}

        onEndReached={() => {

          const myFlag = RedGetAttendanceByPagination.state !== CALL_STATE.REFRESHING &&
            !!RedGetAttendanceByPagination.actualPayload &&
            !!RedGetAttendanceByPagination.actualPayload.data &&
            !!RedGetAttendanceByPagination.actualPayload.data.attendances &&
            RedGetAttendanceByPagination.actualPayload.data.attendances.length > 0 &&
            !!RedGetAttendanceByPagination.actualPayload.data.pagination &&
            RedGetAttendanceByPagination.actualPayload.data.pagination.currentPage !== RedGetAttendanceByPagination.actualPayload.data.pagination.totalPages;

          if (myFlag) {
            onPageChange();
          }
        }}

      />

      {/* <FullScreenLoader
        loading={RedGetAttendanceByPagination.state === CALL_STATE.FETCHING}
      /> */}
    </View>


  )
}

export default MainTeamAttendanceScreen;
