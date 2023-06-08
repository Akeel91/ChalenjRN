import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  console.log(navigation);
  useEffect(() => {
    setTimeout(async () => {
      var isLogin = await AsyncStorage.getItem('isLogin');
      console.log('isLogin - ', isLogin);
      if (isLogin == 'yes') {
        navigation.replace('Home');
      } else {
        navigation.replace('WelCome');
      }
    }, 3000);
  }, []);

  return (
    <View style={style.rootStyle}>
      <Image
        source={require('../assets/images/logo.png')}
        style={style.ImageStyle}
      />
    </View>
  );
};

const style = StyleSheet.create({
  rootStyle: {
    flex: 1,
    backgroundColor: '#232739',
    justifyContent: 'center',
  },
  ImageStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

export default SplashScreen;
