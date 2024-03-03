import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
export const IS_IOS = Platform.OS === "ios";

export function isIphoneX() {
  const dim = Dimensions.get("window");
  return (
    (Platform.OS === "ios" && (isIPhoneXSize(dim) || isIPhoneXrSize(dim))) ||
    isIPhone11Size(dim) ||
    dim.height > 812
  );
}

export function isIPhoneXSize(dim: any) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim: any) {
  return dim.height == 896 || dim.width == 896;
}

export function isIPhone11Size(dim: any) {
  return dim.height == 926 || dim.width == 926;
}

const deviceId = () => DeviceInfo.getDeviceId();
const userDeviceName = () => DeviceInfo.getDeviceName();
const osName = () => DeviceInfo.getSystemName(); // iOS: "iOS" on newer iOS devices "iPhone OS" on older devices, including older iPad's.
const osVersion = () => DeviceInfo.getSystemVersion();
const uniqueDeviceId = () => DeviceInfo.getUniqueId();
const isEmulator = () => DeviceInfo.isEmulator(); // false
const isTablet = () => DeviceInfo.isTablet(); // true
const isLandscape = () => DeviceInfo.isLandscape(); // true
const isLocationAvailable = async () =>
  await DeviceInfo.isLocationEnabled().then((enabled) => {
    return enabled;
  });
const deviceIPAdress = async () =>
  await DeviceInfo.getIpAddress().then((ip) => {
    return ip;
  });
const deviceMacAddress = async () =>
  await DeviceInfo.getMacAddress().then((mac) => {
    return mac;
  });

export const getDeviceInfo = async () => {
  return {
    deviceId: deviceId(),
    userDeviceName: userDeviceName(),
    deviceIPAdress: await deviceIPAdress(),
    deviceMacAddress: await deviceMacAddress(),
    osName: osName(),
    osVersion: osVersion(),
    uniqueDeviceId: uniqueDeviceId(),
    isEmulator: isEmulator(),
    isLocationAvailable: await isLocationAvailable(),
  };
};

const getDeviceName = async () => {
  return userDeviceName();
};
const appVersion = () => DeviceInfo.getVersion();
const appBuildNumber = () => DeviceInfo.getBuildNumber();

export default {
  deviceId,
  userDeviceName,
  deviceIPAdress,
  deviceMacAddress,
  osName,
  osVersion,
  uniqueDeviceId,
  isEmulator,
  isTablet,
  isLandscape,
  isLocationAvailable,
  isIphoneX,
  getDeviceName,
  appVersion,
  appBuildNumber,
};
