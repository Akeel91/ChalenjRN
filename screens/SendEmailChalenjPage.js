import React from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithIcon from '../components/ButtonWithIconComponent';

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(' ' + msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert('' + msg);
  }
}
const SendEmailChalenj = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
              Chalenj Title
            </Text>
            <Text
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 14,
                color: 'white',
              }}>
              Send Email Chalenj Description.
            </Text>

            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/ic_email.png')}
                bgColor="#e06e34"
                btnTitle="Send Email"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  Linking.openURL('mailto:support@example.com');
                }}
              />
            </View>

            <Text
              style={{
                alignSelf: 'center',
                marginTop: 15,
                fontSize: 13,
                color: 'white',
              }}>
              abc@gmail.com
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  InputStyle: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#171b26',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 14,
    color: 'white',
  },
});

export default SendEmailChalenj;
