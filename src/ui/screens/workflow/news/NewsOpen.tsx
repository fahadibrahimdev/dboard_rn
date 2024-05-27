
/**
  
 *
 * @format
 */

import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../../helpers/enum';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import CardCell from '../../../helperComponents/CardCell';
import AppHeader from '../../../uiHelpers/AppHeader';

import { APIHeartBeat } from '../../../../system/networking/AppAPICalls ';
import { ScreenNames } from '../../../../system/navigation/ScreenNames';





const NewsOpen = ({ route }) => {


  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);


  const [newsData, setNewsData] = useState([]);

  const [item, setItem] = useState(null);

  useEffect(() => {

    setNewsData(RedHeartBeat.actualPayload.data.system_lookups.news);

    if (!!route && !!route.params && !!route.params.item) {

      setItem(route.params.item);
    }
  }, []);


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

      <ScrollView>
        <View
          style={[styles.container, {
            margin: 20
          }]}>

          <Text
            style={{
              color: colors.appTextPrimaryColor,

            }}
          >
            {(!!item?.news) ? (item.news) : ("--")}
          </Text>


        </View>
      </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

});

export default NewsOpen;
