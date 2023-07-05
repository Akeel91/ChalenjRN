import React, {useEffect, useState} from 'react';
import CheckBox from 'react-native-check-box';
import SimpleButton from '../components/simpleButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal} from 'react-native-paper';

import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ButtonComponent from '../components/buttonComponent';
import Inputcomponent from '../components/InputTypeComponent';
import PasswordInputcomponent from '../components/passwordInputComponent';
import {color, log} from 'react-native-reanimated';
import ApiConfig from '../AppNetwork/ApiConfig';

const LoginPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [loginType, setLoginType] = useState('');
  const [socialId, setSocialId] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loginResult, setLoginResult] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [loading, setLoading] = useState(false);

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
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

  const checkIsRememberMe = async () => {
    var isLoginRemember = await AsyncStorage.getItem('isRememberMe');
    var emailId = await AsyncStorage.getItem('saveEmail');
    var password = await AsyncStorage.getItem('savePassword');
    if (isLoginRemember == 'yes') {
      console.log('isremember - ', emailId, password, isLoginRemember);
      setEmailId(emailId);
      setPassword(password);
      setToggleCheckBox(true);
    }
  };
  useEffect(() => {
    checkIsRememberMe();
  }, []);

  const callLoginApi = async typeLogin => {
    console.log('Params - ', validateEmail, typeLogin, emailId, password);
    if (emailId == '') {
      notifyMessage('Please enter your email Id');
    } else if (validateEmail(emailId) == false) {
      notifyMessage('Please enter a valid email id');
    } else if (password == '') {
      notifyMessage('Please enter your password');
    } else {
      setLoading(true);
      try {
        const response = await ApiConfig.post('/auth/login', headers, {
          params: {
            name: 'Akki',
            email: emailId,
            password: password,
            type: typeLogin,
            social_id: socialId,
          },
        });
        if (toggleCheckBox) {
          AsyncStorage.setItem('saveEmail', emailId);
          AsyncStorage.setItem('savePassword', password);
          AsyncStorage.setItem('isRememberMe', 'yes');
        } else {
          AsyncStorage.setItem('saveEmail', '');
          AsyncStorage.setItem('savePassword', '');
          AsyncStorage.setItem('isRememberMe', 'no');
        }

        AsyncStorage.setItem('AuthToken', response.data.data.token);
        AsyncStorage.setItem('isLogin', 'yes');
        setLoginResult(response.data.data);
        var token = await AsyncStorage.getItem('AuthToken');
        console.log('newtoken- ', token);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } catch (err) {
        setLoading(false);
        console.log(err.message);
        if (String(err.message).includes('Network')) {
          notifyMessage(err.message);
        } else {
          notifyMessage('Validation Error.');
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
          {/* {loading ? (
            <View style={{position: 'absolute', justifyContent: 'center'}}>
              <ActivityIndicator
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
              />
            </View>
          ) : (
            <View></View>
          )} */}

          <View>
            <Image
              source={require('../assets/images/logo.png')}
              style={style.ImageStyle}
            />
            <Text style={style.TextStyle}>Chalenj</Text>
            <View style={{marginHorizontal: 20}}>
              <ButtonComponent
                bgColor="#ffffff"
                textColor="#000000"
                title="COUNTINUE WITH FACEBOOK"
                showIcon={true}
                btnIcon={require('../assets/icons/ic_right_tick.png')}
                onPressCallback={() => console.log('Pressed')}
              />
              <ButtonComponent
                bgColor="#ffffff"
                textColor="#000000"
                title="COUNTINUE WITH GOOGLE"
                showIcon={true}
                btnIcon={require('../assets/icons/ic_right_tick.png')}
                onPressCallback={() => console.log('Pressed')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <View
                style={{
                  height: 2,
                  flex: 1,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  marginHorizontal: 20,
                }}></View>

              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                OR
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  height: 2,
                  flex: 1,
                  backgroundColor: 'white',
                  marginHorizontal: 20,
                }}></View>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Inputcomponent
                hideInput={false}
                placeHolderText="Enter your email"
                inputValue={emailId}
                onInputChange={newEmail => setEmailId(newEmail)}
              />
            </View>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <PasswordInputcomponent
                hideInput={true}
                placeHolderText="Enter your password"
                inputValue={password}
                onInputChange={newPassword => setPassword(newPassword)}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{flex: 1, padding: 20}}
                onClick={() => {
                  toggleCheckBox
                    ? setToggleCheckBox(false)
                    : setToggleCheckBox(true);
                  console.log('Yes' + toggleCheckBox);
                }}
                rightText={'Remember Me'}
                isChecked={toggleCheckBox}
                disabled={false}
                checkBoxColor="white"
                rightTextStyle={{color: 'white', fontSize: 11}}
              />

              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginEnd: 20,
                }}
                onPress={() => {
                  navigation.navigate('ForgorPassword', {
                    fromClick: 'LoginPage',
                  });
                }}>
                Forgot Password?
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="LOGIN"
                showIcon={false}
                onPressCallback={() => callLoginApi('normal')}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginEnd: 15,
                }}>
                Don't have an account?
              </Text>

              <SimpleButton
                titleText="SIGN UP"
                onPressCallback={() =>
                  navigation.navigate('Register', {fromClick: 'LoginPage'})
                }
                buttonWidth="20%"
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
    marginTop: 10,
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
  container: {
    flex: 1,
  },
});
export default LoginPage;
