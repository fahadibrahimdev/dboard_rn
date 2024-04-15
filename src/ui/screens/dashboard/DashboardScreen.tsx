
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../helpers/enum';
import { ScreenNames } from '../../../system/navigation/ScreenNames';
import { APIHeartBeat, APIUpdateNews } from '../../../system/networking/AppAPICalls ';
import { heartbeatIdle, heartbeatUpdate, resetAll, updatenewsIdle } from '../../../system/redux/slice/appSlice ';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from '../../uiHelpers/AppHeader';
import CellComponent from '../../uiHelpers/CellComponent';
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';
import { AsyncStorageConstants } from '../../../helpers/AsyncStorageConstants';

const DashboardScreen = ({ route }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  const [permissions, setPermissions] = useState([]);

  const data = [


    { id: 1, title: 'Attendance', icons: 'account-clock', code: 'ATTENDANCE' },
    { id: 2, title: 'Team Attendance', icons: 'account-supervisor', code: 'TEAM_ATTENDANCE' },
    { id: 3, title: 'News', icons: 'newspaper', code: 'NEWS' },
    { id: 4, title: 'Finance', icons: 'finance', code: 'FINANCES' },
    // { id: 5, title: 'Report', icons: 'file-chart', code: 'REPORTS' },

  ];

  const [filteredData, setFilteredData] = useState([]);
  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const RedUpdateNews = useAppSelector(state => state.app.updateNews);
  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(APIHeartBeat(RedAuthUser.accessToken));

    const filteredWorkflows = data.filter((obj) => permissions.some((permObj) => permObj.code === obj.code));

    setFilteredData(filteredWorkflows);
  }, []);

  useEffect(() => {

    if (
      RedHeartBeat.state !== CALL_STATE.IDLE &&
      RedHeartBeat.state !== CALL_STATE.FETCHING
    ) {

      dispatch(heartbeatIdle());
      if (RedHeartBeat.state === CALL_STATE.SUCCESS) {

        setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedHeartBeat.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedHeartBeat.error, [{
          onPress: () => {

            clearAll();
          }
        }]);
      }

    }
  }, [RedHeartBeat.state])

  useEffect(() => {


    if (
      RedUpdateNews.state !== CALL_STATE.IDLE &&
      RedUpdateNews.state !== CALL_STATE.FETCHING
    ) {

      dispatch(updatenewsIdle());
      if (RedUpdateNews.state === CALL_STATE.SUCCESS) {

        const updatedHeartBeatPayload = JSON.parse(JSON.stringify(RedHeartBeat.actualPayload));
        updatedHeartBeatPayload.data.all_notifications_seen = false;

        console.log("fahad updated data: ", updatedHeartBeatPayload);
        dispatch(heartbeatUpdate({
          data: updatedHeartBeatPayload,

        }));
      } else if (RedUpdateNews.state === CALL_STATE.ERROR) {

      }
    }

  }, [RedUpdateNews.state])


  useEffect(() => {

    const filteredWorkflows = data.filter((obj) => permissions.some((permObj) => permObj.code === obj.code));
    setFilteredData(filteredWorkflows);
  }, [permissions])

  const clearAll = async () => {
    try {
      const deviceToken = await AsyncStorage.getItem(AsyncStorageConstants.DEVICE_TOKEN);
      await AsyncStorage.clear();
      if (!!deviceToken) {
        AsyncStorage.multiSet([
          [AsyncStorageConstants.DEVICE_TOKEN, deviceToken],
        ])
          .then(data => {
            console.log('Local Storage Updated: ', AsyncStorageConstants.DEVICE_TOKEN);
          })
          .catch(err => {
            console.log(err);
            console.log('Local Storage Error : ', AsyncStorageConstants.DEVICE_TOKEN);
          });
      }
    } catch (e) {
      // clear error
    }

    dispatch(resetAll());

    navigation.reset({
      index: 0,
      routes: [
        {
          name: ScreenNames.SignInScreen as never,
          params: {
          },
        },
      ],
    });
  };

  return (
    <View
      style={{
        backgroundColor: colors.appBackground,
        // backgroundColor: "#889922",
        flex: 1

      }}

    >


      {/* <Button onPress={() => {

navigation.openDrawer();
    }}>Click me</Button> */}

      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'menu'}
        onLeftItemClick={() => {

          navigation.openDrawer();
          // props.navigation.openDrawer();
        }}

        showRightButton={true}
        rightButtonIcon={'bell'}
        onRightItemClick={() => {
          navigation.navigate(ScreenNames.NotificationScreen)

        }}

        showDivider={true}
      />
      <View
        style={{
          flex: 1,
          // backgroundColor:'#787833'
        }}

      >
        <Text
          variant='bodyLarge'
          style={{
            color: colors.appTextPrimaryColor,
            marginTop: 30,
            width: '100%',
            textAlign: 'center'
          }
          }>
          {
            'Welcome ' + ((!!RedHeartBeat?.actualPayload?.data && !!RedHeartBeat?.actualPayload?.data?.user_data) ? (RedHeartBeat?.actualPayload?.data?.user_data?.name) : ('--'))
          }
        </Text>



        <FlatList

          style={{
            width: '100%',
            height: '100%',

            // backgroundColor:'black'
            //  margin: 30
          }}
          contentContainerStyle={{
            // alignItems: 'center'
            // alignItems: 'center'

          }}

          data={filteredData} // Your data source
          numColumns={2}


          renderItem={({ item, index }) => {
            return (

              <CellComponent

                item={item}
                index={index}
                myUserID={0}
                showDot={item.code === "NEWS" && !!RedHeartBeat?.actualPayload?.data?.all_notifications_seen}
                onClick={() => {

                  if (item.code === "ATTENDANCE") {
                    navigation.navigate(ScreenNames.MainAttendanceScreen);
                  } else if (item.code === "TEAM_ATTENDANCE") {
                    navigation.navigate(ScreenNames.MainTeamAttendanceScreen);

                  } else if (item.code === "NEWS") {

                    if (item.code === "NEWS" && !!RedHeartBeat?.actualPayload?.data?.all_notifications_seen) {
                      dispatch(APIUpdateNews(RedAuthUser.accessToken));
                    }


                    navigation.navigate(ScreenNames.NewsScreen);
                  }
                  else if (item.code === "REPORTS") {
                    navigation.navigate(ScreenNames.ReportScreen);
                  }
                  else if (item.code === "FINANCES") {
                    navigation.navigate(ScreenNames.FinanceScreen);
                  } else {
                    Alert.alert("Error", "Invalid Code Provided!");
                  }
                }}
              />
            )
          }}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          refreshControl={
            <RefreshControl
              tintColor={colors.appTextPrimaryColor}
              title={'Refreshing...'}
              titleColor={colors.appTextPrimaryColor}
              refreshing={RedHeartBeat.state === CALL_STATE.FETCHING}
              onRefresh={() => {
                dispatch(APIHeartBeat(RedAuthUser.accessToken));
              }}
            />
          }

        ></FlatList>
      </View>

      <FullScreenLoader
        loading={RedHeartBeat.state === CALL_STATE.FETCHING}
      />
    </View>

  )
}

export default DashboardScreen;
