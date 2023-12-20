import { useTheme } from '@react-navigation/native';
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";


const CardCell = ({ index, item, onClick }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={{
      paddingVertical: 5
    }} onPress={onClick}
      activeOpacity={0.5}>
      <View
        style={{
          width: '100%',
          padding: 10,
          flexDirection: 'row',
          backgroundColor: colors.appBackground,
          borderWidth: 1.5,
          borderColor: colors.bordercolor,
          borderRadius: 5
          // marginTop: 10,
        }}>



        <View style={{
          flex: 0.15,
          // height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.appBackground,
        }}>
          <Text style={{
            color: colors.appTextPrimaryColor,
            fontSize: 22,
            fontWeight: 'bold'
          }}>
            {index + 1}
          </Text>
        </View>

        <View style={{

          flex: 0.75,
          
          justifyContent: 'center',

          // backgroundColor: "#445544"
        }}>
          <Text
          numberOfLines={3}
            style={{
              color: colors.appTextPrimaryColor,
              
            }}>
            {item.news}
          </Text>

        </View>

      </View>
    </TouchableOpacity>
  );
}

export default CardCell;