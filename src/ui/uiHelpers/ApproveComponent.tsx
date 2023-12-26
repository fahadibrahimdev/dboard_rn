import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusColorBGFromName, getStatusColorFromName } from '../../helpers/Utils';


const ApproveComponent = ({ currentSelectedState, onChange }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{

        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.bordercolor,

      }}
    >
      <TouchableOpacity
        style={{
          flex: 0.33,
          paddingVertical: RFValue(5),
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: 1,
          borderColor: colors.bordercolor,
          backgroundColor: (!!currentSelectedState && currentSelectedState === "Pending") ? (getStatusColorBGFromName(currentSelectedState)) : (colors.appBackground)

        }}
        activeOpacity={0.5}
        onPress={() => {
          onChange('Pending')
        }}

      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}

        >
          <Text
            style={{
              color: (!!currentSelectedState && currentSelectedState === "Pending") ? (getStatusColorFromName(currentSelectedState)) : (colors.appTextPrimaryColor)


            }}>

            Pending
          </Text>
        </View>

      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 0.34,
          paddingVertical: RFValue(5),
          paddingHorizontal: RFValue(2),
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: 1,
          borderColor: colors.bordercolor,
          backgroundColor: (!!currentSelectedState && currentSelectedState === "Approved") ? (getStatusColorBGFromName(currentSelectedState)) : (colors.appBackground)

        }}
        activeOpacity={0.5}
        onPress={() => {
          onChange('Approved')
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}

        >

          <Text style={{
            color: (!!currentSelectedState && currentSelectedState === "Approved") ? (getStatusColorFromName(currentSelectedState)) : (colors.appTextPrimaryColor)
          }}>
            Approved
          </Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 0.33,
          paddingVertical: RFValue(5),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: (!!currentSelectedState && currentSelectedState === "Denied") ? (getStatusColorBGFromName(currentSelectedState)) : (colors.appBackground)
        }}
        activeOpacity={0.5}
        onPress={() => {
          onChange('Denied');
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}

        >

          <Text style={{
            color: (!!currentSelectedState && currentSelectedState === "Denied") ? (getStatusColorFromName(currentSelectedState)) : (colors.appTextPrimaryColor)
          }}>
            Denied
          </Text>
        </View>
      </TouchableOpacity>


    </View>


  )
};
export default ApproveComponent;
