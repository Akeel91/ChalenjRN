import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import SimpleButton from '../components/simpleButtonComponent';

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
} from 'react-native';
import ButtonComponent from '../components/buttonComponent';

const RegisterPage = ({navigation}) => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  marginHorizontal: 20,
                }}></View>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginTop: 15,
                alignSelf: 'center',
              }}>
              It looks like you're new to Chalenj.
            </Text>

            <View style={{marginHorizontal: 20}}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="Register for free"
                showIcon={false}
                onPressCallback={() => navigation.navigate('NewUserRegister')}
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
            <View style={{marginHorizontal: 20}}>
              <ButtonComponent
                bgColor="#ffffff"
                textColor="#000000"
                title="COUNTINUE WITH FACEBOOK"
                showIcon={true}
                onPressCallback={() => console.log('Pressed')}
              />
              <ButtonComponent
                bgColor="#ffffff"
                textColor="#000000"
                title="COUNTINUE WITH GOOGLE"
                showIcon={true}
                onPressCallback={() => console.log('Pressed')}
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
                  navigation.navigate('Login', {fromClick: 'RegisterPage'})
                }
                buttonWidth="20%"
                bgColor="#fff"
                btnTextColor="#e06e34"
              />
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                textAlign: 'center',
                alignSelf: 'center',
                marginHorizontal: 20,
                color: 'white',
                marginTop: 15,
              }}>
              What is Chalenj? A new way to learn, experience, entertain and
              more!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
export default RegisterPage;
