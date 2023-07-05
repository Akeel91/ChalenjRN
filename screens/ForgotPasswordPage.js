import React, {useState} from 'react';
import SimpleButton from '../components/simpleButtonComponent';

import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from 'react-native';
import ButtonComponent from '../components/buttonComponent';
import Inputcomponent from '../components/InputTypeComponent';
import {Modal} from 'react-native-paper';
import ApiConfig from '../AppNetwork/ApiConfig';

const ForgorPasswordPage = ({navigation}) => {
  const [emailId, setEmailId] = useState('');
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };
  const validateEmail = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };
  const callForgotPassApi = async () => {
    console.log('Params - ', emailId);
    if (emailId == '') {
      notifyMessage('Please enter your email Id');
    } else if (validateEmail(emailId) == false) {
      notifyMessage('Please enter a valid email id');
    } else {
      setLoading(true);
      try {
        const response = await ApiConfig.post(
          '/auth/forgot-password',
          headers,
          {
            params: {
              email: emailId,
            },
          },
        );
        notifyMessage('We have sent mail over this email, ' + emailId);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } catch (err) {
        setLoading(false);
        console.log(err.message);
        if (String(err.message).includes('Network')) {
          notifyMessage(err.message);
        } else {
          notifyMessage('Something went wrong Please check your email id.');
        }
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: '#232739'}}>
        <View style={style.rootStyle}>
          <View>
            <Image
              source={require('../assets/images/logo.png')}
              style={style.ImageStyle}
            />
            <Text style={style.TextStyle}>Chalenj</Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                marginHorizontal: 20,
                textAlign: 'center',
                color: 'white',
                marginTop: 15,
              }}>
              Enter the email address you’d like your password reset information
              sent to.
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginHorizontal: 20,
                textAlign: 'center',
                color: 'white',
                marginTop: 15,
              }}>
              Reset Password
            </Text>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Inputcomponent
                hideInput={false}
                placeHolderText="Enter your email"
                inputValue={emailId}
                onInputChange={newEmail => setEmailId(newEmail)}
              />
            </View>

            <View style={{marginHorizontal: 20}}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="SEND RESET LINK"
                showIcon={false}
                onPressCallback={() => callForgotPassApi()}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                marginHorizontal: 20,
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <SimpleButton
                titleText="SIGN UP"
                onPressCallback={() =>
                  navigation.navigate('Register', {fromClick: 'ForgotPage'})
                }
                buttonWidth="47%"
                bgColor="#fff"
                btnTextColor="#e06e34"
              />
              <SimpleButton
                titleText="LOGIN"
                onPressCallback={() =>
                  navigation.navigate('Login', {fromClick: 'ForgotPage'})
                }
                buttonWidth="47%"
                bgColor="#fff"
                btnTextColor="#e06e34"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* For progressbar pop up */}
      <Modal
        style={{alignItems: 'center'}}
        animationType="slide"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
        <View style={style.progressViewStyle}>
          <Image
            source={require('../assets/icons/loader.gif')}
            style={{width: 40, height: 40}}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  progressViewStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    width: 50,
    maxHeight: 50,
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  rootStyle: {
    flex: 1,
    backgroundColor: '#232739',
    justifyContent: 'center',
  },
  TextStyle: {
    alignSelf: 'center',
    fontSize: 35,
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionTextStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    marginHorizontal: 20,
    marginTop: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  ImageStyle: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: '20%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  inputFlex: {
    alignSelf: 'stretch',
    width: '100%',
    padding: 0,
    backgroundColor: '#ddd',
  },
  visibilityBtn: {
    position: 'absolute',
    right: 9,
    height: 25,
    width: 25,
    padding: 0,
    marginTop: 21,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
export default ForgorPasswordPage;
