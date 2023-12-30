// import { DefaultTheme } from "react-native-paper";
import { DefaultTheme } from '@react-navigation/native';
import DarkColors from './DarkColors';
import LightColors from './LightColors';

export const LightTheme = {
  ...DefaultTheme,
  dark: false,

  colors: {
    ...DefaultTheme.colors,

    appStatusBarColor: LightColors.APP_STATUS_BAR,
    appBackground: LightColors.APP_BACKGROUND,
    cellBackground: LightColors.CELL_BACKGROUND,
    bordercolor: LightColors.BORDER_color,

    appTextPrimaryColor: LightColors.TEXT.PRIMARY,
    appTextSecondaryColor: LightColors.TEXT.SECONDARY,
    appTextPlaceHolderColor: LightColors.TEXT.PLACEHOLDER,

    appButtonTextColor: LightColors.BUTTON.TEXT_COLOR,
    appButtonBGColor: LightColors.BUTTON.BG_COLOR,
    appButtonIconColor: LightColors.BUTTON.ICON_COLOR,

    appLogout_ButtonTextColor: LightColors.Logout_BUTTON.TEXT_COLOR,
    appLogout_ButtonBGColor: LightColors.Logout_BUTTON.BG_COLOR,
    appLogout_ButtonIconColor: LightColors.Logout_BUTTON.ICON_COLOR,


    appDelete_ButtonTextColor: LightColors.Delete_BUTTON.TEXT_COLOR,
    appDelete_ButtonBGColor: LightColors.Delete_BUTTON.BG_COLOR,
    appDelete_ButtonIconColor: LightColors.Delete_BUTTON.ICON_COLOR,



    appdrawerIconTextColor: LightColors.APPdrawer_ICON.TEXT_COLOR,
    appdrawerIconBGColor: LightColors.APPdrawer_ICON.BG_COLOR,
    appdrawer_IconColor: LightColors.APPdrawer_ICON.ICON_COLOR,

    appIconTextColor: LightColors.ICON.TEXT_COLOR,
    appIconBGColor: LightColors.ICON.BG_COLOR,
    appIconColor: LightColors.ICON.ICON_COLOR,


  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,

    appStatusBarColor: DarkColors.APP_STATUS_BAR,
    appBackground: DarkColors.APP_BACKGROUND,
    cellBackground: DarkColors.CELL_BACKGROUND,
    bordercolor: DarkColors.BORDER_color,

    appTextPrimaryColor: DarkColors.TEXT.PRIMARY,
    appTextSecondaryColor: DarkColors.TEXT.SECONDARY,
    appTextPlaceHolderColor: DarkColors.TEXT.PLACEHOLDER,

    appButtonTextColor: DarkColors.BUTTON.TEXT_COLOR,
    appButtonBGColor: DarkColors.BUTTON.BG_COLOR,
    appButtonIconColor: DarkColors.BUTTON.ICON_COLOR,

    appLogout_ButtonTextColor: DarkColors.Logout_BUTTON.TEXT_COLOR,
    appLogout_ButtonBGColor: DarkColors.Logout_BUTTON.BG_COLOR,
    appLogout_ButtonIconColor: DarkColors.Logout_BUTTON.ICON_COLOR,


    
    appDelete_ButtonTextColor: DarkColors.delete_BUTTON.TEXT_COLOR,
    appDelete_ButtonBGColor: DarkColors.delete_BUTTON.BG_COLOR,
    appDelete_ButtonIconColor: DarkColors.delete_BUTTON.ICON_COLOR,

    appdrawerIconTextColor: DarkColors.APPdrawer_ICON.TEXT_COLOR,
    appdrawer_ICONBGColor: DarkColors.APPdrawer_ICON.BG_COLOR,
    appdrawer_ICON_IconColor: DarkColors.APPdrawer_ICON.ICON_COLOR,

    appIconTextColor: DarkColors.ICON.TEXT_COLOR,
    appIconBGColor: DarkColors.ICON.BG_COLOR,
    appIconColor: DarkColors.ICON.ICON_COLOR,

    appdrawer_NavItemTextColor: DarkColors.APPdrawer_NavItem.TEXT_COLOR,
    appdrawer_NavItemBGColor: DarkColors.APPdrawer_NavItem.BG_COLOR,
    appdrawer_NavItemIconColor: DarkColors.APPdrawer_NavItem.ICON_COLOR,



  },
};
