import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { ScreenNames } from './ScreenNames';
import { Screens } from './Screens';

import { RFValue } from 'react-native-responsive-fontsize';
import AppDrawer from '../../ui/screens/drawer/AppDrawer';

export default function DrawerNavigator({navigation, route}) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.DashboardScreen}
      drawerContent={props => <AppDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: RFValue(200),
        },
      }}>
      <Drawer.Screen
        name={ScreenNames.DashboardScreen}
        component={Screens.DashboardScreen}
        options={{headerShown: false}}
        initialParams={route.params}
      />


<Drawer.Screen
        name={ScreenNames.ChangePasswordScreen}
        component={Screens.ChangePasswordScreen}
        options={{headerShown: false}}
        initialParams={route.params}
      />
       <Drawer.Screen
        name={ScreenNames.PolicyScreen}
        component={Screens.PolicyScreen}
        options={{headerShown: false}}
        initialParams={route.params}
      />
       <Drawer.Screen
      name={ScreenNames.ContactUsScreen}
      component={Screens.ContactUsScreen}
      options={{headerShown: false}}
      initialParams={route.params}
    />
    </Drawer.Navigator>
  );
}
