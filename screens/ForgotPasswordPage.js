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
} from 'react-native';
import ButtonComponent from '../components/buttonComponent';
import Inputcomponent from '../components/InputTypeComponent';

const ForgorPasswordPage = ({navigation}) => {
  const [emailId, setEmailId] = useState('');

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
                onPressCallback={() => console.log('Pressed')}
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
