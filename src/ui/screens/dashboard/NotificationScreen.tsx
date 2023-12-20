
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../system/redux/store/hooks';
import { APIHeartBeat } from '../../../system/networking/AppAPICalls ';
import AppHeader from '../../uiHelpers/AppHeader';
import CardCell from '../../helperComponents/CardCell';
import { CALL_STATE } from '../../../helpers/enum';
// import { useDispatch } from 'react-redux';
// import { CALL_STATE } from '../../../../helpers/enum';
// import { useAppSelector } from '../../../../system/redux/store/hooks';
// import CardCell from '../../../helperComponents/CardCell';
// import AppHeader from '../../../uiHelpers/AppHeader';

// import { APIHeartBeat } from '../../../../system/networking/AppAPICalls ';
// import { ScreenNames } from '../../../../system/navigation/ScreenNames';


const NotificationScreen = () => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);


  const [newsData, setNewsData] = useState([]);

  useEffect(() => {

    setNewsData(RedHeartBeat.actualPayload.data.system_lookups.news);
  }, []);

  const onRefresh = () => {

    dispatch(APIHeartBeat(RedAuthUser.accessToken));
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
      <View
        style={[styles.container, {

        }]}>
        <FlatList

          style={{
            width: '95%',
            // backgroundColor: "#898999",
            // margin: 30
          }}

          data={newsData} // Your data source
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          renderItem={({ item, index }) => {
            return (
              <CardCell
                item={item}
                index={index}
                onClick={() => {
                  navigation.navigate(ScreenNames.NewsOpen)


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

          refreshControl={
            <RefreshControl
              tintColor={colors.appTextPrimaryColor}
              title={'Refreshing...'}
              titleColor={colors.appTextPrimaryColor}
              refreshing={RedHeartBeat.state === CALL_STATE.FETCHING}
              onRefresh={onRefresh}
            />
          }
        />

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

});


export default NotificationScreen;
