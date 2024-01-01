import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NavItem = props => {
  const { bgColor, onPress, title, isSelected, tint, hideIcon, tintIconColor, iconName } = props;
  const { colors } = useTheme();

  return (
    <React.Fragment>
      <TouchableOpacity
        style={[
          styles.row,
          {
            backgroundColor: (!!bgColor) ? (bgColor) : (isSelected
              ? "#999"
              : "transparent"),

            // backgroundColor: "#445544"
          },
        ]}
        onPress={onPress}>
        <Text
          style={[
            styles.row_text,
            {
              color: !!tint
                ? tint
                : '#000000',
            },
          ]}>
          {title}
        </Text>
        {!!!hideIcon && (

          <Icon
            style={{}}
            color={(!!tintIconColor) ? (tintIconColor) : ("#000")}
            name={(!!iconName) ? (iconName) : ("chevron-right")}
            size={RFValue(20)}
          />

        )}
      </TouchableOpacity>
      <Divider
        style={{
          backgroundColor: '#000000',
        }}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingLeft: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: RFValue(32),
    flexDirection: 'row',
    paddingVertical: 9,
    paddingRight: RFValue(20),
  },
  right_icon: { width: RFValue(15), height: RFValue(15), resizeMode: 'contain' },
  row_text: {
    // color: theme.WHITE_COLOR,
    color: '#FFFFFF',
    paddingHorizontal: RFValue(5),
    fontSize: RFValue(16),
    // fontWeight: theme.FONT_WEIGHT_MEDIUM,
    // fontFamily: theme.FONT_FAMILY
  },
});

export default NavItem;
