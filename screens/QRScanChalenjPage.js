import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');

const QRScanChalenj = () => {
  const navigation = useNavigation();
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse[0].name, options);
  const descText = convert(apiResp.apiResponse[0].description, options);
  const name = nameText.trim();
  const description = descText.trim();

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 20}}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
              {name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 14,
                color: 'white',
              }}>
              {description}
            </Text>

            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/ic_qr_code.png')}
                bgColor="#e06e34"
                btnTitle="Scan QR Code"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  navigation.navigate('QRScanPage');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default QRScanChalenj;
