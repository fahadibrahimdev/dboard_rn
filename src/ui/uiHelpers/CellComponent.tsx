import React from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Divider, IconButton, Text } from 'react-native-paper';
import { Card } from "react-native-paper";
import { bdLogo } from '../../assets/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { w } from '../../helpers/Dimensions';



// import Logo from './Logo';
const CellComponent  = ({item, index, myUserID, onClick }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();



  return (
   
   
    <View style={{
      width: '50%',
      alignItems: 'center',
      marginTop: 25,
      // paddingHorizontal: 9,
      
      // backgroundColor: '#990022'
      
    }}>
      <TouchableOpacity style={{
        width: w(45),
        height: w(45),
        
        // backgroundColor: "#898922"
      }}
      onPress={() => {
        onClick(
          
        )
      }}>
      <View style={{
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius:30/2,
        borderColor:colors.appTextPrimaryColor,
        // paddingVertical: 40,       
        justifyContent: 'center',
      alignItems: 'center',
      }}>

      
      
        <Icon
        style={{
          
        }}
        color={colors.appTextPrimaryColor }
        name={!!item.icons ? item.icons: 'help'}
        size={40}
      />
        
      <Text variant='labelLarge' style={{
        color:colors.appTextPrimaryColor,
        marginTop: 20
      }}>{item.title}</Text>
    </View>
    </TouchableOpacity>
    </View>
  


  )};
export default CellComponent;
