import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import moment from 'moment-timezone';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


const DateTimeSelector = (props: any) => {

  const { colors } = useTheme();
  var refTI = useRef(null);


  const { placeholder, value, onChange, disable } = props;

  const [currentDateTime, setCurrentDateTime] = useState((!!value) ? (value) : (''));
  const [dateModalOpen, setDateModalOpen] = useState(false)

  const [myDate, setMyDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const [myStartDate, setMyStartDate] = useState(null);

  return (
    <View style={{

      marginTop: RFValue(20),
      width: '90%',

 
    }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {

          if(!!!disable) {
            setDateModalOpen(true)
          }
          
        }}>

        <View pointerEvents="none">
          <TextInput
            ref={refTI}
            mode="outlined"
            style={[{
              width: '100%',
              backgroundColor: colors.appBackground,
            }]}
            editable={false}
            outlineColor={colors.appTextPrimaryColor}
            textColor={colors.appTextPrimaryColor}
            placeholderTextColor={colors.appTextPlaceHolderColor}
            onChangeText={(val) => {
              setCurrentDateTime(val);

            }}
            
            value={(!!value) ? (moment(value).format('DD-MMM-YYYY hh:mm:ss A')) : ('')}
            placeholder={!!placeholder ? placeholder : '-'}

            left={
              <TextInput.Icon
                icon={'calendar-range'}
                iconColor={colors.appIconColor}
                size={RFValue(15)}
              />
            }

            returnKeyType="done"
          />
        </View>

      </TouchableOpacity>

      <DatePicker

        modal
        
        date={myDate}
        minimumDate={new Date(myDate.getTime() - (7 * 24 * 60 * 60 * 1000))} // 7 days before today
        mode={'datetime'}
        open={dateModalOpen}
        is24Hour={true}
        textColor={colors.appTextPrimaryColor}
        onConfirm={(newdate) => {
          setDateModalOpen(false);
          setMyDate(newdate);
          onChange(newdate)
        }}
        onCancel={() => {
          setDateModalOpen(false);
        }}

      /> 
          

    </View>
  )
};
export default DateTimeSelector;
