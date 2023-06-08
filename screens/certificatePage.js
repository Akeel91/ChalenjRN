import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import SimpleButton from '../components/simpleButtonComponent';
const CertificatePage = ({navigation}) => {
  const [message, setmessage] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.HeaderStyle}>
        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.ImageStyleCenter}
        />

        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.navigate('HelpPage');
          }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 35}}
            source={require('../assets/images/help_icon.png')}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={{}}>
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
              Chalenj Description.
            </Text>
            <Image
              style={{
                resizeMode: 'stretch',
                width: '100%',
                height: 400,
                marginTop: 20,
              }}
              source={require('../assets/images/democer.png')}
            />
            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/ic_certificate.png')}
                bgColor="#e06e34"
                btnTitle="Open Certificate"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  console.log('Pressed');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'space-between',
    elevation: 10,
    height: 70,
    flexDirection: 'row',
  },
  PaginationStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'center',
    elevation: 10,
    height: 70,
    flexDirection: 'row',
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  ImageStyle: {
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  PaginationTextStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
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

export default CertificatePage;
