import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { dBoardAppIcon } from '../../assets/Images';


// import Logo from './Logo';

const AppHeader = props => {
  const { colors } = useTheme();

  const {
    flexSize,
    showLeftButton,
    onLeftItemClick,
    leftButtonTitle,
    leftButtonIcon,
    showRightButton,
    rightMenuOptions,
    onRightItemClick,
    rightButtonTitle,
    rightButtonIcon,
    rightButtonIconColor,
    showDivider
  } = props;

  return (
    <View style={{
      height: RFValue(50),
      marginBottom: RFValue(5)
    }}>
      <View
        style={[
          { backgroundColor: colors.appBackground },
          styles.container_portrait
        ]}>


        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#907877"
          }}>
          {showLeftButton && (

            <IconButton
              icon={(!!leftButtonIcon) ? (leftButtonIcon) : ('arrow-left')}
              iconColor={colors.appdrawerIconTextColor}
              size={25}
              onPress={() => {
                onLeftItemClick()
              }}
            />



          )}
        </View>

        <View style={{
          width: '60%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingVertical: RFValue(2),
          paddingHorizontal: RFValue(2)
          // backgroundColor: "#001122"
        }}>
          <Image source={dBoardAppIcon}
            style={{ height: '100%', width: '100%', resizeMode: 'contain' }}

          />
        </View>

        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#907877"
          }}>
          {showRightButton && (


            <IconButton
              icon={(!!rightButtonIcon) ? (rightButtonIcon) : ("logout")}
              iconColor={(!!rightButtonIconColor) ? (rightButtonIconColor) : (colors.appdrawerIconTextColor)}
              size={25}
              onPress={() => {
                onRightItemClick()
              }}
            />



          )}
        </View>

      </View>

      {showDivider && <Divider style={{
        backgroundColor: 'gray'
      }} />}

    </View>
  );
};

const styles = StyleSheet.create({
  container_portrait: {
    flexDirection: 'row',
    // justifyContent: 'center',
    width: '100%',
  },
});

export default AppHeader;
