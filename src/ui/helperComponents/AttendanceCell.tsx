import { useNavigation, useTheme } from '@react-navigation/native';
import moment from 'moment-timezone';
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getShiftFromIdRed, getStatusColorBGFromName, getStatusColorFromName, getStatusNameFromIdRed, getTeamFromIdRed } from '../../helpers/Utils';
import { useAppSelector } from '../../system/redux/store/hooks';


const AttendanceCell = ({ item, index = 0, showArrowBtn, onArrowclick, highlightBorder,onRemarksclick }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [maxFullNameLength, setMaxFullNameLength] = useState<number>(20)

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);

  return (
    <View style={{
      padding: 5,
      backgroundColor: colors.Background,

    }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          marginTop: 5,
          backgroundColor: colors.cellBackground,
          borderWidth: (!!highlightBorder) ? (3) : (1.5),
          borderColor: (!!highlightBorder) ? ('#007AFF') : (colors.bordercolor),
          borderRadius: 5
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
          // backgroundColor: "#455534"
        }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#455588"
          }}>
            <Icon
              style={{
                marginHorizontal: 6,
              }}
              color={'#007AFF'}
              name="account"
              size={20}
            />
            <Text
              style={{
                color: colors.appTextPrimaryColor,
              }}
            >{((item.full_name).length > maxFullNameLength) ?
              (((item.full_name).substring(0, maxFullNameLength - 3)) + '...') :
              item.full_name}</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#876544"
          }}>
            <Icon
              style={{
                marginHorizontal: 6,
              }}
              color={'#007AFF'}
              name="clock"
              size={20}
            />
            <Text
              style={{
                color: colors.appTextPrimaryColor,
                marginRight: 6
              }}
            >{moment(item.start_time).format('DD-MMM-YYYY')}</Text>


            <Icon
              style={{
                marginHorizontal: 6,
              }}
              color={'#007AFF'}
              name="information-outline"
              size={20}
              onPress={() => {

                var alertString = "Created on: ";
                if (!!item.created_time) {
                  alertString = alertString + moment(item.created_time).format('DD-MMM-YYYY hh:mm:ss A')
                } else {
                  alertString = alertString + " -- "
                }

                Alert.alert("Info", alertString);
              }}
            />
          </View>

        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            borderTopWidth: 1,
            borderColor: colors.bordercolor,

          }}
        >
          <View style={{
            flexDirection: 'column',
            flex: 0.3,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderColor: colors.bordercolor,
            // backgroundColor: "#778877"
          }}>

            <Text
              style={{
                color: colors.appTextPrimaryColor,
              }}
            >{moment(item.start_time).format('hh:mm A')}</Text>
            <Text
              style={{
                color: colors.appTextPrimaryColor,

              }}>{(!!item && !!item.end_time) ? (moment(item.end_time).format('hh:mm A')) : ('--')}</Text>

          </View>

          <View
            style={{
              flexDirection: 'column',
              flex: 0.7,
              paddingHorizontal: 10,
              // marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              // backgroundColor: "#897877"
            }}
          >

            <View style={{

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 5,
              // backgroundColor: "#786756"
            }}>
              <View style={{
                // flexDirection: 'row',
                // justifyContent: "center",
                alignItems: 'center'

              }}>
                <Text
                  style={{


                    color: colors.appTextPrimaryColor,

                  }}
                >
                  {getTeamFromIdRed(item.team_id, RedHeartBeat.actualPayload)}
                </Text>

                <View style={{
                  borderWidth: 2,
                  borderColor: colors.bordercolor,
                  borderRadius: 20,
                  marginTop: 5,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  justifyContent: 'center',
                  // backgroundColor: '#009900'
                }}>
                  <Text
                    style={{
                      color: colors.appTextPrimaryColor,

                    }}>{getShiftFromIdRed(item.shift_id, RedHeartBeat.actualPayload)}

                  </Text>
                </View>
              </View>



              <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 3,

                marginBottom: 5,
                backgroundColor: getStatusColorBGFromName(getStatusNameFromIdRed(item.status, [])),

                borderRadius: 10
              }}>
                <View style={{
                  width: 10,
                  height: 10,
                  marginRight: 5,
                  borderRadius: 20,
                  backgroundColor: getStatusColorFromName(getStatusNameFromIdRed(item.status, []))
                }}></View>
                <Text


                  style={{
                    // backgroundColor: "#887755",
                    paddingRight: 5,
                    fontWeight: 'bold',
                    color: getStatusColorFromName(getStatusNameFromIdRed(item.status, []))
                  }}
                >{getStatusNameFromIdRed(item.status, [])}</Text>


              </View>
            </View>

            {!!showArrowBtn && 
            <View style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              justifyContent: 'center',
              marginBottom: 5,
              borderRadius: 10,
          
            }}>
              <View
              style={{
                
                
                marginRight:10
                
              }}
              >
                 <IconButton
                icon={'chat'}
                iconColor={colors.appdrawerIconTextColor}
                containerColor='grey'
                size={17}
                onPress={() => {

                  if (!!onRemarksclick) {
                    onRemarksclick()
                  }

                }}
              />

              </View>
                
              <IconButton
                icon={'arrow-right-bold'}
                iconColor={colors.appdrawerIconTextColor}
                containerColor='grey'
                size={17}
                onPress={() => {

                  if (!!onArrowclick) {
                    onArrowclick()
                  }

                }}
              />


            </View>}


          </View>

        </View>
      </View>
    </View>

  );
}

export default AttendanceCell;