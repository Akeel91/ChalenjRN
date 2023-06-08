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
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Easing,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SimpleButton from '../components/simpleButtonComponent';
import APPLICATION_CONSTANTS from '../constant/constantsFile';
import Inputcomponent from '../components/InputTypeComponent';
import ButtonComponent from '../components/buttonComponent';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [message, setmessage] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
  const [expanded6, setExpanded6] = useState(false);
  const [clickedBtn, setclickedBtn] = useState('faq');
  const [buttonColorFAQ, setButtonColorFAQ] = useState('#e06e34');
  const [buttonColorContactUs, setButtonColorContactUs] = useState('#fff');
  const [buttonColorTextFAQ, setButtonColorTextFAQ] = useState('#fff');
  const [buttonColorTextContactUs, setButtonColorTextContactUs] =
    useState('#e06e34');

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
            navigation.goBack();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/cross.png')}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={styles.linearGradient}>
        <View style={{height: 50, marginTop: 10}}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <SimpleButton
                titleText="FAQ"
                onPressCallback={() => {
                  setclickedBtn('faq'),
                    setButtonColorContactUs('#fff'),
                    setButtonColorFAQ('#e06e34'),
                    setButtonColorTextContactUs('#e06e34'),
                    setButtonColorTextFAQ('#fff');
                }}
                buttonWidth="100%"
                bgColor={buttonColorFAQ}
                btnTextColor={buttonColorTextFAQ}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 10,
                flex: 1,
              }}>
              <SimpleButton
                titleText="CONTACT US"
                onPressCallback={() => {
                  setclickedBtn('contact'),
                    setButtonColorContactUs('#e06e34'),
                    setButtonColorFAQ('#fff'),
                    setButtonColorTextContactUs('#fff'),
                    setButtonColorTextFAQ('#e06e34');
                  console.log('Privacy : ' + clickedBtn);
                }}
                buttonWidth="100%"
                bgColor={buttonColorContactUs}
                btnTextColor={buttonColorTextContactUs}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{paddingBottom: 20}}>
            {clickedBtn == 'faq' ? (
              <View style={{paddingBottom: 20}}>
                <TouchableOpacity
                  style={styles.helpMenuHead}
                  onPress={() => {
                    setImage1('180deg');
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setExpanded(!expanded);
                  }}>
                  <Text style={styles.optionsTextStyle}>
                    {APPLICATION_CONSTANTS.HELP_MENU1}
                  </Text>

                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'flex-end',
                      transform: [
                        expanded ? {rotate: '180deg'} : {rotate: '0deg'},
                      ],
                    }}
                    source={require('../assets/icons/down_arrow.png')}
                  />
                </TouchableOpacity>
                {expanded && (
                  <View style={styles.menuContainer}>
                    <Text style={styles.menuDetailsStyle}>
                      {APPLICATION_CONSTANTS.HELP_MENU1_DETAILS}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.helpMenuHead}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setExpanded2(!expanded2);
                  }}>
                  <Text style={styles.optionsTextStyle}>
                    {APPLICATION_CONSTANTS.HELP_MENU2}
                  </Text>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'flex-end',
                      transform: [
                        expanded2 ? {rotate: '180deg'} : {rotate: '0deg'},
                      ],
                    }}
                    source={require('../assets/icons/down_arrow.png')}
                  />
                </TouchableOpacity>
                {expanded2 && (
                  <View style={styles.menuContainer}>
                    <Text style={styles.menuDetailsStyle}>
                      {APPLICATION_CONSTANTS.HELP_MENU2_DETAILS}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.helpMenuHead}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setExpanded3(!expanded3);
                  }}>
                  <Text style={styles.optionsTextStyle}>
                    {APPLICATION_CONSTANTS.HELP_MENU3}
                  </Text>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'flex-end',
                      transform: [
                        expanded3 ? {rotate: '180deg'} : {rotate: '0deg'},
                      ],
                    }}
                    source={require('../assets/icons/down_arrow.png')}
                  />
                </TouchableOpacity>
                {expanded3 && (
                  <View style={styles.menuContainer}>
                    <Text style={styles.menuDetailsStyle}>
                      {APPLICATION_CONSTANTS.HELP_MENU3_DETAILS}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.helpMenuHead}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setExpanded4(!expanded4);
                  }}>
                  <Text style={styles.optionsTextStyle}>
                    {APPLICATION_CONSTANTS.HELP_MENU4}
                  </Text>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'flex-end',
                      transform: [
                        expanded4 ? {rotate: '180deg'} : {rotate: '0deg'},
                      ],
                    }}
                    source={require('../assets/icons/down_arrow.png')}
                  />
                </TouchableOpacity>
                {expanded4 && (
                  <View style={styles.menuContainer}>
                    <Text style={styles.menuDetailsStyle}>
                      {APPLICATION_CONSTANTS.HELP_MENU4_DETAILS}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.helpMenuHead}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setExpanded5(!expanded5);
                  }}>
                  <Text style={styles.optionsTextStyle}>
                    {APPLICATION_CONSTANTS.HELP_MENU5}
                  </Text>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'flex-end',
                      transform: [
                        expanded5 ? {rotate: '180deg'} : {rotate: '0deg'},
                      ],
                    }}
                    source={require('../assets/icons/down_arrow.png')}
                  />
                </TouchableOpacity>
                {expanded5 && (
                  <View style={styles.menuContainer}>
                    <Text style={styles.menuDetailsStyle}>
                      {APPLICATION_CONSTANTS.HELP_MENU5_DETAILS}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.helpMenuHead}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setExpanded6(!expanded6);
                  }}>
                  <Text style={styles.optionsTextStyle}>
                    {APPLICATION_CONSTANTS.HELP_MENU6}
                  </Text>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'flex-end',
                      transform: [
                        expanded6 ? {rotate: '180deg'} : {rotate: '0deg'},
                      ],
                    }}
                    source={require('../assets/icons/down_arrow.png')}
                  />
                </TouchableOpacity>
                {expanded6 && (
                  <View style={styles.menuContainer}>
                    <Text style={styles.menuDetailsStyle}>
                      {APPLICATION_CONSTANTS.HELP_MENU6_DETAILS}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <Inputcomponent
                    hideInput={false}
                    placeHolderText="Enter your name"
                    inputValue={name}
                    onInputChange={newValue => setName(newValue)}
                  />
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <Inputcomponent
                    hideInput={false}
                    placeHolderText="Enter your email"
                    inputValue={emailId}
                    onInputChange={newemail => setEmailId(newemail)}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.InputStyle}
                    placeholder="Enter your message"
                    value={message}
                    onChangeText={newmessage => setmessage(newmessage)}
                    placeholderTextColor="#8f9392"
                    numberOfLines={5}
                    textAlignVertical="top"
                    multiline={true}
                  />
                </View>
                <View style={{marginHorizontal: 20}}>
                  <ButtonComponent
                    bgColor="#e06e34"
                    textColor="#ffffff"
                    title="Submit"
                    showIcon={false}
                    onPressCallback={() => console.log('Pressed')}
                  />
                </View>
              </View>
            )}
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
    justifyContent: 'center',
    elevation: 10,
    height: 70,
  },
  InputStyle: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#171b26',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    fontSize: 14,
    color: 'white',
  },
  linearGradient: {
    flex: 1,
  },
  menuDetailsStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  helpMenuHead: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  ImageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  optionsTextStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  ImageStyleArrow: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
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

export default HelpPage;
