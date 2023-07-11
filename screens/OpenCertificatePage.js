import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');
import WebView from 'react-native-webview';

const OpenCertificatePage = () => {
  const navigation = useNavigation();
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse[0].name, options);
  const descText = convert(apiResp.apiResponse[0].description, options);
  const certificateUrl = apiResp.apiResponse[0].certificate_data.url;
  const name = nameText.trim();
  const description = descText.trim();

  console.log('acertificate---', certificateUrl);
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
              style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
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

            <View
              style={{
                marginTop: 20,
                width: '100%',
                backgroundColor: 'white',
                height: 270,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
                source={require('../assets/images/certificate_bg.jpg')}
                resizeMode="cover">
                <View
                  style={{
                    width: '85%',

                    height: '70%',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, color: 'black'}}>
                    Certificate of Completion
                  </Text>
                  <Text style={{fontSize: 12, marginTop: 5, color: 'black'}}>
                    This is to certify that
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{fontSize: 20, marginTop: 10, color: 'black'}}>
                    {apiResp.apiResponse[0].certificate_data.name}
                  </Text>
                  <Text style={{fontSize: 12, marginTop: 5, color: 'black'}}>
                    Has successfully completed
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      width: '90%',
                      marginTop: 10,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            fontSize: 12,
                            alignSelf: 'center',
                            color: 'black',
                          }}>
                          {apiResp.apiResponse[0].certificate_data.date}
                        </Text>
                        <Text style={{color: 'black', marginTop: -10}}>
                          ______________
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            fontSize: 12,
                            alignSelf: 'center',
                            color: 'black',
                          }}>
                          Date
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                      }}>
                      <View>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            fontSize: 12,
                            alignSelf: 'center',
                            color: 'black',
                          }}>
                          {apiResp.apiResponse[0].certificate_data.author}
                        </Text>
                        <Text style={{color: 'black', marginTop: -10}}>
                          ______________
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            fontSize: 12,
                            alignSelf: 'center',
                            color: 'black',
                          }}>
                          Organization
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/ic_certificate.png')}
                bgColor="#e06e34"
                btnTitle="Open Certificate"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  navigation.navigate('CertificatePage');
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

export default OpenCertificatePage;
