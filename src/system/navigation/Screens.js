import SignInScreen from "../../ui/screens/auth/SignInScreen";
import SignUpScreen from "../../ui/screens/auth/SignUpScreen";
import SplashScreen from "../../ui/screens/auth/SplashScreen";
import DashboardScreen from "../../ui/screens/dashboard/DashboardScreen";
import NotificationScreen from "../../ui/screens/dashboard/NotificationScreen";
import ChangePasswordScreen from "../../ui/screens/drawer/ChangePasswordScreen";
import ContactUsScreen from "../../ui/screens/drawer/ContactUsScreen";
import PolicyScreen from "../../ui/screens/drawer/PolicyScreen";


import Settings from "../../ui/screens/drawer/Settings";
import CreateAttendanceScreen from "../../ui/screens/workflow/attendance/CreateAttendanceScreen";
import MainAttendanceScreen from "../../ui/screens/workflow/attendance/MainAttendanceScreen";
import CreateFinanceScreen from "../../ui/screens/workflow/finance/CreateFinanceScreen";

import ViewAttendanceScreen from "../../ui/screens/workflow/attendance/ViewAttendanceScreen";
import FinanceScreen from "../../ui/screens/workflow/finance/FinanceScreen";
import TransactionsScreen from "../../ui/screens/workflow/finance/TransactionsScreen";
import ViewFinanceScreen from "../../ui/screens/workflow/finance/ViewFinanceScreen";
import ReportScreen from "../../ui/screens/workflow/report/ReportScreen";

import EditPlayerEntryScreen from "../../ui/screens/workflow/finance/EditPlayerEntryScreen";
import EditAttendanceScreen from "../../ui/screens/workflow/attendance/EditAttendanceScreen";
import NewsScreen from "../../ui/screens/workflow/news/NewsScreen";

import FiltersAttendanceScreen from "../../ui/screens/workflow/attendance/FiltersAttendanceScreen";
import NewsOpen from "../../ui/screens/workflow/news/NewsOpen";
import FiltersTeamAttendanceScreen from "../../ui/screens/workflow/teamAttendance/FiltersTeamAttendanceScreen";
import MainTeamAttendanceScreen from "../../ui/screens/workflow/teamAttendance/MainTeamAttendanceScreen";
import DrawerNavigator from "./DrawerNavigator";
import DeleteUser from "../../ui/screens/drawer/DeleteUser";

import RemarksScreen from "../../ui/screens/workflow//remarks//RemarksScreen";


export const Screens = {
  SplashScreen: SplashScreen,

  SignInScreen: SignInScreen,
  SignUpScreen: SignUpScreen,
  MainAttendanceScreen: MainAttendanceScreen,
  FiltersAttendanceScreen: FiltersAttendanceScreen,
  MainTeamAttendanceScreen: MainTeamAttendanceScreen,
  FiltersTeamAttendanceScreen: FiltersTeamAttendanceScreen,
  TransactionsScreen: TransactionsScreen,
  FinanceScreen: FinanceScreen,
  ReportScreen: ReportScreen,
  NewsScreen: NewsScreen,
  NewsOpen: NewsOpen,
  Settings: Settings,
  ViewAttendanceScreen: ViewAttendanceScreen,
  CreateAttendanceScreen: CreateAttendanceScreen,
  CreateFinanceScreen: CreateFinanceScreen,
  EditPlayerEntryScreen:EditPlayerEntryScreen,
  EditAttendanceScreen: EditAttendanceScreen,
  ViewFinanceScreen: ViewFinanceScreen,

  DrawerNavigator: DrawerNavigator,
  DashboardScreen: DashboardScreen,
  NotificationScreen: NotificationScreen,
  PolicyScreen: PolicyScreen,
  DeleteUser:DeleteUser,
  ContactUsScreen: ContactUsScreen,
  ChangePasswordScreen: ChangePasswordScreen,

  RemarksScreen:RemarksScreen,
};
