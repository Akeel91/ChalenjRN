import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ButtonComponent from '../components/buttonComponent';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={style.rootStyle}>
      <View>
        <Text style={style.TextStyle}>WELCOME</Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={style.ImageStyle}
        />
        <Text style={style.descriptionTextStyle}>
          If this is your first time on Chalenj, you will need to create an
          account. If you already have an account you can login.
        </Text>
        <View style={{marginHorizontal: 20}}>
          <ButtonComponent
            bgColor="#e06e34"
            textColor="#ffffff"
            title="Register Now"
            showIcon={false}
            onPressCallback={() =>
              navigation.navigate('Register', {fromClick: 'WelcomePage'})
            }
          />
        </View>
        <Text style={{alignSelf: 'center', marginTop: 20}}>
          <Text>Already have an account?</Text>
          <Text
            style={{color: '#0c56b3'}}
            onPress={() => navigation.navigate('Login')}>
            {' '}
            LOGIN
          </Text>
        </Text>
      </View>

      <Text
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          alignSelf: 'flex-end',
          right: 20,
          bottom: 20,
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        Version : 2.3
      </Text>
    </View>
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
    color: 'white',
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
    width: 50,
    height: 50,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default WelcomeScreen;
