import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useDispatch} from 'react-redux';
// var backnavigation = '';

const callBackToMain = () => {
  // console.log('navigation---', navigation);
};

const QRScanPage = ({navigation}) => {
  const dispatch = useDispatch();
  function onSuccess(e) {
    console.log('scandata--', e.data);
    dispatch({type: 'qrScanResponse', payload: e.data});
    console.log('navigation---', navigation);
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRScanPage;
