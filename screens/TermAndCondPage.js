import React, {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SimpleButton from '../components/simpleButtonComponent';

const TermAndCondition = ({navigation}) => {
  const [clickedBtn, setclickedBtn] = useState('tnc');
  const [buttonColorTnC, setButtonColorTnC] = useState('#e06e34');
  const [buttonColorPP, setButtonColorPP] = useState('#fff');
  const [buttonColorDP, setButtonColorDP] = useState('#fff');
  const [buttonColorTextTnC, setButtonColorTextTnC] = useState('#fff');
  const [buttonColorTextPP, setButtonColorTextPP] = useState('#e06e34');
  const [buttonColorTextDP, setButtonColorTextDP] = useState('#e06e34');

  const handleClick = value => {
    setclickedBtn(value);

    console.log('click ' + clickedBtn);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.HeaderStyle}>
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
            style={{alignSelf: 'center', width: 40, height: 40}}
            source={require('../assets/images/help_icon.png')}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={styles.linearGradient}>
        <View style={{height: 50, marginTop: 10}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 20,
              }}>
              <SimpleButton
                titleText="TERM OF SERVICE"
                onPressCallback={() => {
                  setclickedBtn('tnc'),
                    setButtonColorDP('#fff'),
                    setButtonColorPP('#fff'),
                    setButtonColorTnC('#e06e34'),
                    setButtonColorTextDP('#e06e34'),
                    setButtonColorTextPP('#e06e34'),
                    setButtonColorTextTnC('#fff');
                  console.log('TnC : ' + clickedBtn + ' ' + buttonColorTnC);
                }}
                buttonWidth="100%"
                bgColor={buttonColorTnC}
                btnTextColor={buttonColorTextTnC}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 10,
              }}>
              <SimpleButton
                titleText="PRIVACY POLICY"
                onPressCallback={() => {
                  setclickedBtn('pp'),
                    setButtonColorDP('#fff'),
                    setButtonColorPP('#e06e34'),
                    setButtonColorTnC('#fff'),
                    setButtonColorTextDP('#e06e34'),
                    setButtonColorTextPP('#fff'),
                    setButtonColorTextTnC('#e06e34');
                  console.log('Privacy : ' + clickedBtn);
                }}
                buttonWidth="100%"
                bgColor={buttonColorPP}
                btnTextColor={buttonColorTextPP}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 10,
                paddingEnd: 20,
              }}>
              <SimpleButton
                titleText="DATA POLICY"
                onPressCallback={() => {
                  setclickedBtn('dp'),
                    setButtonColorDP('#e06e34'),
                    setButtonColorPP('#fff'),
                    setButtonColorTnC('#fff'),
                    setButtonColorTextDP('#fff'),
                    setButtonColorTextPP('#e06e34'),
                    setButtonColorTextTnC('#e06e34');
                  console.log('Data : ' + clickedBtn);
                }}
                buttonWidth="100%"
                bgColor={buttonColorDP}
                btnTextColor={buttonColorTextDP}
              />
            </View>
          </ScrollView>
        </View>
        <Text style={{color: 'white', fontSize: 30}}>{clickedBtn}</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {
    height: 80,
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'center',
    elevation: 10,
  },
  linearGradient: {
    flex: 1,
  },
  ImageStyle: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default TermAndCondition;
