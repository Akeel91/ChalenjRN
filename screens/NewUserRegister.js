import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import SimpleButton from '../components/simpleButtonComponent';
import APPLICATION_CONSTANTS from '../constant/constantsFile';

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
import PasswordInputcomponent from '../components/passwordInputComponent';
import {Modal} from 'react-native-paper';
import ApiConfig from '../AppNetwork/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewUserRegisterPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [regsResult, setRegsResult] = useState([]);
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
  const callRegisterApi = async () => {
    console.log('Params - ', name, emailId, password, cpassword);
    if (name == '') {
      notifyMessage('Please enter your full name');
    } else if (emailId == '') {
      notifyMessage('Please enter your email Id');
    } else if (validateEmail(emailId) == false) {
      notifyMessage('Please enter a valid email id');
    } else if (password == '') {
      notifyMessage('Please enter your password');
    } else if (cpassword == '') {
      notifyMessage('Please enter your confirm password');
    } else if (password != cpassword) {
      notifyMessage('Password not matched');
    } else if (toggleCheckBox == false) {
      notifyMessage('Please accept terms and conditions');
    } else {
      setLoading(true);
      try {
        const response = await ApiConfig.post('/auth/register', headers, {
          params: {
            name: name,
            email: emailId,
            password: password,
          },
        });
        console.log('regtoken- ', response.data.data.token);
        AsyncStorage.setItem('AuthToken', response.data.data.token);
        AsyncStorage.setItem('isLogin', 'yes');
        setRegsResult(response.data.data);
        var token = await AsyncStorage.getItem('AuthToken');
        console.log('token- ', token);
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
          notifyMessage('Something went wrong Please check your details.');
        }
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
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

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Inputcomponent
                hideInput={false}
                placeHolderText="Full Name"
                inputValue={name}
                onInputChange={newName => setName(newName)}
              />
            </View>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Inputcomponent
                hideInput={false}
                placeHolderText="Email Address"
                inputValue={emailId}
                onInputChange={newEmail => setEmailId(newEmail)}
              />
            </View>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <PasswordInputcomponent
                hideInput={true}
                placeHolderText="Password"
                inputValue={password}
                onInputChange={newPassword => setPassword(newPassword)}
              />
            </View>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <PasswordInputcomponent
                hideInput={true}
                placeHolderText="Confirm Password"
                inputValue={cpassword}
                onInputChange={newcPassword => setcPassword(newcPassword)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                marginHorizontal: 20,
              }}>
              <CheckBox
                onClick={() => {
                  toggleCheckBox
                    ? setToggleCheckBox(false)
                    : setToggleCheckBox(true);
                  console.log('Yes' + toggleCheckBox);
                }}
                isChecked={toggleCheckBox}
                disabled={false}
                checkBoxColor="white"
              />

              <Text
                style={{
                  alignSelf: 'center',
                  color: '#8f9392',
                  marginStart: 10,
                  fontWeight: 'bold',
                }}>
                <Text>By Signing Up I agree to,</Text>
                <Text
                  style={{color: '#e06e34'}}
                  onPress={() => navigation.navigate('TermAndCondition')}>
                  {' '}
                  Terms &#38; Conditions
                </Text>
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="SIGN UP"
                showIcon={false}
                onPressCallback={() => callRegisterApi()}
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
                Already have an account?
              </Text>

              <SimpleButton
                titleText="SIGN IN"
                onPressCallback={() =>
                  navigation.navigate('Login', {fromClick: 'Resigter'})
                }
                buttonWidth="20%"
                bgColor="#fff"
                btnTextColor="#e06e34"
              />
            </View>

            <Text
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: 'center',
                color: 'white',
              }}>
              {APPLICATION_CONSTANTS.REGISTER_INFO}
            </Text>
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
    paddingBottom: 20,
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
export default NewUserRegisterPage;
