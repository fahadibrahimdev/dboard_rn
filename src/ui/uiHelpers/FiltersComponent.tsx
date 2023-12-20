import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { adjustTeamDataRed } from '../../helpers/Utils';
import { useAppSelector } from '../../system/redux/store/hooks';
import { FILTER_DATE_CODES } from '../../helpers/enum';


const FiltersComponent = ({ onItemSelection, isBusy = false }) => {

  var filtersRef = useRef(null);

  const [data, setData] = useState([
    { label: 'Today', value: FILTER_DATE_CODES.TODAY, selected: true },
    { label: '3 Days', value: FILTER_DATE_CODES.DAYS_3, selected: false },
    { label: '7 Days', value: FILTER_DATE_CODES.DAYS_7, selected: false },
    { label: '30 Days', value: FILTER_DATE_CODES.DAYS_30, selected: false },
  ]);

  const { colors } = useTheme();

  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);

  useEffect(() => {


    // const filtersData = adjustTeamDataRed(RedHeartBeat.actualPayload);
    // const commaSeperatedIds = filtersData.map(({ value }) => value).join(",");
    // // console.log("Fahad Ids: ", commaSeperatedIds);
    // const allObject = { label: 'All', value: commaSeperatedIds, selected: true }
    // setData([allObject].concat(filtersData));

    onItemSelection(data[0]);
  }, [])



  return (
    <FlatList
      ref={filtersRef}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      renderItem={({ item, index }) => (
        <TouchableOpacity style={[styles.item, {
          backgroundColor: (!!item.selected) ? ('#007AFF') : ("#dbd2ca"),
        }]}
          onPress={() => {
            if (!isBusy) {

              filtersRef?.current?.scrollToIndex({
                animated: true,
                index: index,
              });

              var selectedItem = null;
              var updatedData = JSON.parse(JSON.stringify(data));
              updatedData.map((obj) => {
                if (obj.value === item.value) {
                  selectedItem = JSON.parse(JSON.stringify(item));
                  obj.selected = true;
                } else {
                  obj.selected = false;
                }
              });

              setData(updatedData);
              onItemSelection(selectedItem);
            }


          }}
          activeOpacity={0.5}>

          <Text
            style={{
              color: (!!item.selected) ? ('white') : ('black')
            }}>{item.label}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.value}
    />
  );
};
const styles = StyleSheet.create({
  item: {
    width: 100,
    height: 40,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});


export default FiltersComponent;