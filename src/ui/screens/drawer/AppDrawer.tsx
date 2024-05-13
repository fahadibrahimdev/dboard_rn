import { DrawerContentScrollView } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Platform, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import DeviceInfo from '../../../helpers/DeviceInfo';
import { ScreenNames } from '../../../system/navigation/ScreenNames';
import { API_LOGOUT } from '../../../system/networking/AuthAPICalls';
import { ENV } from '../../../system/networking/NetworkingConstants';
import { useAppSelector } from '../../../system/redux/store/hooks';
import NavItem from '../../helperComponents/NavItem';


const AppDrawer = (props: any) => {
  const navigation = useNavigation();

  // const dispatch = useAppDispatch();

  const { colors } = useTheme();
  const route = useRoute();
  const dispatch = useDispatch();

  const [currentScreen, setCurrentScreen] = useState(
    ScreenNames.DashboardScreen,
  );
  const [myEmail, setMyemail] = useState('');
  const [myusername, setMyusername] = useState('');

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);

  useEffect(() => {

    if (
      !!RedHeartBeat.actualPayload &&
      !!RedHeartBeat.actualPayload.data &&
      !!RedHeartBeat.actualPayload.data.user_data
    ) {
      setMyemail((!!RedHeartBeat.actualPayload.data.user_data?.email) ? (RedHeartBeat.actualPayload.data.user_data?.email) : (""));
      setMyusername("(" + RedHeartBeat.actualPayload.data.user_data?.user_name + ")");

      console.log("Fahad url: ", ENV.BASEURL + '/' + RedHeartBeat.actualPayload.data.user_data?.image);
    }

  }, [RedHeartBeat.state])

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 0,
        paddingTop: 0,
        // backgroundColor: 'grey'
        backgroundColor: colors.appBackground
      }}>
      {/* <ScreenBackgroundContainer theme={colors}> */}
      <DrawerContentScrollView
        style={
          {
            // backgroundColor: colors.appPrimary,
          }
        }>
        <View
          style={{
            flex: 0.7,
            // paddingTop: Platform.OS === 'android' ? RFValue(50) : 0,
            // backgroundColor: '#991122',
          }}>



          <IconButton
            style={{

              alignSelf: 'flex-end',
              marginTop: 5


            }}
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate(ScreenNames.Settings)

            }}
            icon={'cog-outline'}
            iconColor={colors.appTextPrimaryColor}
          />


          {(!!RedHeartBeat.actualPayload.data && !!RedHeartBeat.actualPayload.data.user_data && !!RedHeartBeat.actualPayload.data.user_data?.image) ? (<Image
            style={{
              borderColor: colors.appTextPrimaryColor,
              borderWidth: 2,
              alignSelf: 'center',
              marginTop: 17,

              width: 70,
              height: 70,

              borderRadius: 100

            }}
            // source={{ uri: ENV.BASEURL + '/' + RedHeartBeat.actualPayload.data.user_data?.image }}
            source={{ uri: RedHeartBeat.actualPayload.data.user.image }}

          />) : (
            <IconButton
              style={{
                borderColor: colors.appTextPrimaryColor,
                alignSelf: 'center',
                marginTop: 17,
              }}
              size={40}
              icon={'account'}
              mode='outlined'
              iconColor={colors.appTextPrimaryColor}
            />
          )}

          <Text style={{

            alignSelf: 'center',
            color: colors.appTextPrimaryColor,

          }}>{myusername}</Text>


          <Text style={{

            alignSelf: 'center',
            color: colors.appTextPrimaryColor,

          }}>{myEmail}</Text>

          <View style={{
            marginTop: 20
          }}>

            <NavItem
              title="Dashboard"
              tint={colors.appTextPrimaryColor}
              tintIconColor={colors.appdrawer_ICON_IconColor}
              iconName={'view-dashboard'}
              isSelected={getFocusedRouteNameFromRoute(route) === ScreenNames.DashboardScreen}
              onPress={() => {

                setCurrentScreen(ScreenNames.DashboardScreen);
                navigation.navigate(ScreenNames.DashboardScreen);

                props.navigation.closeDrawer();
              }}
            />

            <NavItem
              title="Change Password"
              tint={colors.appTextPrimaryColor}
              tintIconColor={colors.appdrawer_ICON_IconColor}
              iconName={'lock'}
              isSelected={getFocusedRouteNameFromRoute(route) === ScreenNames.ChangePasswordScreen}
              onPress={() => {

                setCurrentScreen(ScreenNames.ChangePasswordScreen);

                navigation.navigate(ScreenNames.ChangePasswordScreen);

                props.navigation.closeDrawer();
              }}
            />

            <NavItem
              title="Policy"
              tint={colors.appTextPrimaryColor}
              tintIconColor={colors.appdrawer_ICON_IconColor}
              iconName={'tooltip-text'}
              isSelected={getFocusedRouteNameFromRoute(route) === ScreenNames.PolicyScreen}
              onPress={() => {

                setCurrentScreen(ScreenNames.PolicyScreen);

                navigation.navigate(ScreenNames.PolicyScreen);

                props.navigation.closeDrawer();
              }}
            />

            <NavItem
              title="Contact Us"
              tint={colors.appTextPrimaryColor}
              tintIconColor={colors.appdrawer_ICON_IconColor}
              iconName={'contacts'}
              isSelected={getFocusedRouteNameFromRoute(route) === ScreenNames.ContactUsScreen}
              onPress={() => {

                setCurrentScreen(ScreenNames.ContactUsScreen);
                navigation.navigate(ScreenNames.ContactUsScreen);

                props.navigation.closeDrawer();
              }}
            />

            <NavItem
              title="Delete User"
              bgColor={colors.appLogout_ButtonBGColor}
              tint={colors.appTextPrimaryColor}
              tintIconColor={colors.appdrawer_ICON_IconColor}
              iconName={'account-remove'}
              isSelected={getFocusedRouteNameFromRoute(route) === ScreenNames.DeleteUser}
              onPress={() => {

                props.navigation.closeDrawer();
                navigation.navigate(ScreenNames.DeleteUser)
              }}
            />
          </View>

        </View>
      </DrawerContentScrollView>

      <View
        style={{
          flex: 0.3,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: Platform.OS === 'android' ? RFValue(30) : RFValue(10),
        }}>

        {/* <Button style={{
          width: '55%',
          alignSelf: 'center',
          marginBottom: RFValue(20)

        }}
          contentStyle={{
            flexDirection: 'row-reverse'
          }}
          buttonColor={colors.appLogout_ButtonBGColor} textColor={colors.appLogout_ButtonTextColor} mode="contained-tonal"


          onPress={() => {

            props.navigation.closeDrawer();
            navigation.navigate(ScreenNames.DeleteUser)

          }}
        >
          Delete User

        </Button> */}

        <Button style={{

          width: '55%',
          alignSelf: 'center',


        }}
          contentStyle={{
            flexDirection: 'row-reverse'
          }}
          buttonColor={colors.appLogout_ButtonBGColor} textColor={colors.appLogout_ButtonTextColor} mode="contained-tonal" icon={'logout'}


          onPress={() => {

            dispatch(API_LOGOUT(RedHeartBeat.actualPayload.data.user.id, Platform.OS));

          }}
        >
          Logout

        </Button>

        <Text
          variant="titleSmall"
          style={{
            marginTop: RFValue(20),
            color: colors.appTextPrimaryColor,
          }}>
          {'Version: ' +
            DeviceInfo.appVersion() +
            '.' +
            DeviceInfo.appBuildNumber()}
        </Text>
      </View>
      {/* </ScreenBackgroundContainer> */}
    </View>
  );
};

export default AppDrawer;
