import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { w } from '../../helpers/Dimensions';



// import Logo from './Logo';
const CellComponent = ({ item, index, myUserID, onClick, showDot }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();


  const [bounceValue, setBounceValue] = useState(new Animated.Value(1));

  useEffect(() => {
    if (showDot) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1.5,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(bounceValue, {
            toValue: 1,
            friction: 1,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

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
          borderRadius: 30 / 2,
          borderColor: colors.appTextPrimaryColor,
          // paddingVertical: 40,       
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'yellow'
        }}>



          <Icon
            style={{

            }}
            color={colors.appTextPrimaryColor}
            name={!!item.icons ? item.icons : 'help'}
            size={40}
          />

          <Text variant='labelLarge' style={{
            color: colors.appTextPrimaryColor,
            marginTop: 9
          }}>{item.title}</Text>

          {showDot && (

            <View style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              paddingTop: 9,
              // backgroundColor: '#998899',
              height: '100%'
            }}>
              <Animated.View style={[{


                backgroundColor: 'red',
                width: 20,
                height: 20,
                marginRight: 9,
                borderRadius: 30,
                transform: [{ scale: bounceValue }]
              }]}>



              </Animated.View>
            </View>


          )}
        </View>
      </TouchableOpacity>
    </View>

  )
};
export default CellComponent;
