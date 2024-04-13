import { useNavigation, useTheme } from '@react-navigation/native';
import moment from 'moment-timezone';
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { } from 'react-native-gesture-handler';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { adjustTeamDataRed, getStatusNameFromIdRed } from '../../../../helpers/Utils';
import { CALL_STATE, FILTER_DATE_CODES } from '../../../../helpers/enum';
import { ScreenNames } from '../../../../system/navigation/ScreenNames';
import { filterPlayerEntry } from '../../../../system/networking/FinanceAPICalls';
import { filterPlayerEntryIdle } from '../../../../system/redux/slice/financeSlice';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import PlayerEntryCell from '../../../helperComponents/PlayerEntryCell';
import AppHeader from '../../../uiHelpers/AppHeader';
import FiltersComponent from '../../../uiHelpers/FiltersComponent';


const FinanceScreen = ({ }) => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [myUserID, setMyUserID] = useState(1);

  const [mySelectedTimeDuration, setMySelectedTimeDuration] = useState(null);
  const [filteredListData, setFilteredListData] = useState([]);

  const [myAllFilters, setMyAllFilters] = useState(null);

  const [myCommaSeperatedTeams, setMyCommaSeperatedTeams] = useState('');

  const RedGetAttendance = useAppSelector(state => state.attendance.getAttendance);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();


  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]); // Your data source

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedGetAttendanceByPagination = useAppSelector(state => state.attendance.getAttendanceByPagination);
  const RedFilterPlayerEntry = useAppSelector(state => state.finance.filterPlayerEntry);

  const RedGetWorkingTime = useAppSelector(state => state.attendance.getWorkingTime);


  useEffect(() => {

    const filtersData = adjustTeamDataRed(RedHeartBeat.actualPayload);
    const commaSeperatedIds = filtersData.map(({ value }) => value).join(",");

    setMyCommaSeperatedTeams(commaSeperatedIds);

  }, []);

  useEffect(() => {

    if (
      RedFilterPlayerEntry.state !== CALL_STATE.IDLE &&
      RedFilterPlayerEntry.state !== CALL_STATE.FETCHING
    ) {

      dispatch(filterPlayerEntryIdle());
      if (RedFilterPlayerEntry.state === CALL_STATE.SUCCESS) {


        setFilteredListData(RedFilterPlayerEntry.actualPayload.data.transactions)


        // setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedFilterPlayerEntry.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedFilterPlayerEntry.error);
      }

    }
  }, [RedFilterPlayerEntry.state])

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

    // dispatch(APIGetAttendance(RedAuthUser.accessToken));

    // const userId = RedHeartBeat.actualPayload.data.user_data?.id;

    // var startDate = '';
    // var endDate = '';

    // var shiftValue = '';
    // var teamIds = '';

    // var status = '';

    // if (!!myAllFilters) {


    //   if (!!myAllFilters.) {
    //     shiftValue = myAllFilters.shift
    //   }

    //   if (!!myAllFilters.team) {
    //     teamIds = myAllFilters.team
    //   } else {
    //     teamIds = myCommaSeperatedTeams;
    //   }

    //   if (!!myAllFilters.status) {
    //     status = myAllFilters.status
    //   }

    // } else if (!!mySelectedTimeDuration) {
    //   const quickFilterDates = getStartEndDateFromQuickFilters();

    //   startDate = quickFilterDates.start_day;
    //   endDate = quickFilterDates.end_day;

    //   teamIds = myCommaSeperatedTeams;
    // }


    dispatch(filterPlayerEntry({
      token: RedAuthUser.accessToken,

      callState: CALL_STATE.REFRESHING,
      page: '1',
      limit: '20',
      sortBy: 'user_id',
      sortDirection: 'ASC',
      callState: CALL_STATE.REFRESHING,
      // shift_id: 'shift_id',
      // team_id: 'team_id',
      // user_id: 'user_id',
      // clientInfo:'clientInfo',
      // isActive:'isActive',
    }));


    // dispatch(APIGetWorkingTime(
    //   {
    //     token: RedAuthUser.accessToken,
    //     start_day: startDate,
    //     end_day: endDate,
    //     shift: shiftValue,
    //     teamId: teamIds,
    //     userId: userId,

    //     status: status
    //   }));
  };

  const onPageChange = () => {
    const newPageNumber = RedFilterPlayerEntry.actualPayload.data.transactions.pagination.currentPage + 1;

    const userId = RedHeartBeat.actualPayload.data.user_data?.id;

    var startDate = '';
    var endDate = '';

    var shift_id = '';
    var team_id = '';

    if (!!myAllFilters) {

      // startDate = (!!myAllFilters.startDate) ? (myAllFilters.startDate) : ("");
      // endDate = (!!myAllFilters.endDate) ? (myAllFilters.endDate) : ("");

      if (!!myAllFilters.shift_id) {
        shift_id = myAllFilters.shift_id
      }

      if (!!myAllFilters.team_id) {
        team_id = myAllFilters.team_id
      } else {
        team_id = myCommaSeperatedTeams;
      }
    } else if (!!mySelectedTimeDuration) {
      const quickFilterDates = getStartEndDateFromQuickFilters();

      // startDate = quickFilterDates.start_day;
      // endDate = quickFilterDates.end_day;

      team_id = myCommaSeperatedTeams
    }



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
        rightButtonIcon={(!!myAllFilters) ? ('filter-check') : ('filter-variant')}
        rightButtonIconColor={(!!myAllFilters) ? ("#007AFF") : (colors.appdrawerIconTextColor)}
        onRightItemClick={() => {
          navigation.navigate(ScreenNames.FiltersAttendanceScreen, {
            myAllFilters: myAllFilters,

            onApply: (filtersObj) => {

              setMySelectedTimeDuration(null);
              setMyAllFilters(filtersObj)
            },

            onReset: () => {

              setMyAllFilters(null);
            }
          });
        }}
        showDivider={true}
      />

      {!!myAllFilters === false &&
        <View
          style={{
            width: '100%',
            height: '8%',

          }}>
          <FiltersComponent
            isBusy={RedFilterPlayerEntry.state !== CALL_STATE.IDLE}
            onItemSelection={(selectedItem) => {

              setMySelectedTimeDuration(selectedItem);
            }} />


        </View>


      }

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12
      }}>
        <Text
          variant='bodyLarge'
          style={{

            color: colors.appTextPrimaryColor,
            fontWeight: 'bold'
          }}
        >Total Players: </Text>
        <View style={{
          minWidth: RFValue(100),
          borderWidth: 2,
          borderColor: colors.bordercolor,
          borderRadius: 20,

          paddingHorizontal: 12,
          paddingVertical: 4,
          alignItems: 'center',

        }}>


          <Text
            variant='bodyLarge'
            style={{

              color: colors.appTextPrimaryColor,
              fontWeight: 'bold'
            }}>

            {/* {(
              !!RedGetWorkingTime.actualPayload?.data &&
              RedGetWorkingTime.actualPayload?.data.length > 0 &&
              !!RedGetWorkingTime.actualPayload?.data[0]?.total_time_spent) ?
              (formatTime(RedGetWorkingTime.actualPayload?.data[0]?.total_time_spent)) : ('--')}
               */}

          </Text>
        </View>
      </View>

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
            <PlayerEntryCell
              item={item}
              index={index}
              myUserID={myUserID}
              highlightBorder={!!myAllFilters}
              showArrowBtn={(getStatusNameFromIdRed(item.status, []) === 'Pending') ? (true) : (false)}
              onArrowclick={() => {
                navigation.navigate(ScreenNames.ViewFinanceScreen, {
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
            refreshing={RedFilterPlayerEntry.state === CALL_STATE.REFRESHING}
            onRefresh={onRefresh}
          />
        }

        ListFooterComponent={() => {
          const myFlag = RedFilterPlayerEntry.state !== CALL_STATE.REFRESHING &&
            !!RedFilterPlayerEntry.actualPayload &&
            !!RedFilterPlayerEntry.actualPayload.data &&
            !!RedFilterPlayerEntry.actualPayload.data.transactions &&
            RedFilterPlayerEntry.actualPayload.data.transactions.length > 0 &&
            !!RedFilterPlayerEntry.actualPayload.data.pagination &&
            RedFilterPlayerEntry.actualPayload.data.pagination.currentPage !== RedFilterPlayerEntry.actualPayload.data.pagination.totalPages;

          // RedGetAttendanceByPagination.actualPayload.data.attendances.length <
          // RedLoads.payload.Data.TotalRows,

          return renderFooter(myFlag);
        }}

        onEndReached={() => {

          const myFlag = RedFilterPlayerEntry.state !== CALL_STATE.REFRESHING &&
            !!RedFilterPlayerEntry.actualPayload &&
            !!RedFilterPlayerEntry.actualPayload.data &&
            !!RedFilterPlayerEntry.actualPayload.data.transactions &&
            RedFilterPlayerEntry.actualPayload.data.transactions.length > 0 &&
            !!RedFilterPlayerEntry.actualPayload.data.pagination &&
            RedFilterPlayerEntry.actualPayload.data.pagination.currentPage !== RedFilterPlayerEntry.actualPayload.data.pagination.totalPages;

          if (myFlag) {
            onPageChange();
          }
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
          navigation.navigate(ScreenNames.TransactionsScreen, {
            onBack: () => {
              onRefresh();
            }
          });

        }}
      />

    </View>


  )
}
export default FinanceScreen;
