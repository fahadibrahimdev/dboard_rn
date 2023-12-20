// import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
// import { height as h, width as w } from 'react-native-dimension';
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { w, h } from '../../helpers/Dimensions';
import { Strings } from './Strings';

const FullScreenLoader = props => {
  const { loading, title, ...attributes } = props;
  const { colors, styles } = useTheme();

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={stylesLocal.modalBackground}>
        <View
          style={[
            stylesLocal.activityIndicatorWrapper,
            { width: w(80), height: h(50) },
          ]}>
          {/* <LottieView
            style={{width: w(40), height: h(10), alignSelf: 'center'}}
            source={require('../../assets/animations/loading-dots-with-changing-color.json')}
            loop={true}
            autoPlay={true}
          /> */}

          <ActivityIndicator />

          <Text
            // variant={styles.Text.Headings}
            style={{
              color: '#FFF',
            }}>
            {!!title ? title : Strings.LoaderTitle}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const stylesLocal = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFFCC',
  },
  activityIndicatorWrapper: {
    // backgroundColor: "#FFFFFFCC",
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLoader;
