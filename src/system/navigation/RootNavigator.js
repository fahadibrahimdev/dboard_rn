import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ScreenNames } from "./ScreenNames";
import { Screens } from "./Screens";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.SplashScreen}>
      <Stack.Screen
        name={ScreenNames.SplashScreen}
        component={Screens.SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.SignInScreen}
        component={Screens.SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.SignUpScreen}
        component={Screens.SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.DrawerNavigator}
        component={Screens.DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.MainAttendanceScreen}
        component={Screens.MainAttendanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.FiltersAttendanceScreen}
        component={Screens.FiltersAttendanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.NewsOpen}
        component={Screens.NewsOpen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.MainTeamAttendanceScreen}
        component={Screens.MainTeamAttendanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.FiltersTeamAttendanceScreen}
        component={Screens.FiltersTeamAttendanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.TransactionsScreen}
        component={Screens.TransactionsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.FinanceScreen}
        component={Screens.FinanceScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={ScreenNames.CreateFinanceScreen}
        component={Screens.CreateFinanceScreen}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen
        name={ScreenNames.ReportScreen}
        component={Screens.ReportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.NotificationScreen}
        component={Screens.NotificationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.NewsScreen}
        component={Screens.NewsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Settings}
        component={Screens.Settings}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.DeleteUser}
        component={Screens.DeleteUser}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name={ScreenNames.CreateAttendanceScreen}
        component={Screens.CreateAttendanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.ViewAttendanceScreen}
        component={Screens.ViewAttendanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.EditAttendanceScreen}
        component={Screens.EditAttendanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.ViewFinanceScreen}
        component={Screens.ViewFinanceScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name={ScreenNames.EditPlayerEntryScreen}
        component={Screens.EditPlayerEntryScreen}
        options={{ headerShown: false }}
      />

      
<Stack.Screen
        name={ScreenNames.RemarksScreen}
        component={Screens.RemarksScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
