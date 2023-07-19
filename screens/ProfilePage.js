import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Modal} from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import {useDispatch} from 'react-redux';
import ButtonComponent from '../components/buttonComponent';
import Inputcomponent from '../components/InputTypeComponent';
import LableComponent from '../components/LableTextComponent';
import PasswordInputcomponent from '../components/passwordInputComponent';
import APPLICATION_CONSTANTS from '../constant/constantsFile';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../constant/PermissionConstant';
import ApiConfig from '../AppNetwork/ApiConfig';

const storeProfilePic = async value => {
  try {
    console.log('uri--- ' + value);
    await AsyncStorage.setItem('ProfilePic', value);
  } catch (e) {
    // saving error
  }
};

const ProfilePage = ({props}) => {
  // const profilePic = useSelector(state => state.userProfile);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [showImageOpt, setShowImageOpt] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [profileResult, setProfileResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '1x day',
      value: '1x',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 18},
      selected: true,
    },
    {
      id: '2',
      label: '2x day',
      value: '2x',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 18},
      selected: false,
    },
    {
      id: '3',
      label: '3x day',
      value: '3x',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 18},
      selected: false,
    },
  ]);

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        try {
          console.log('Response = ', response.assets[0].uri);
          setFilePath(response.assets[0].uri);
          storeProfilePic(response.assets[0].uri);
          dispatch({type: 'profilePicUpdate', payload: response.assets[0].uri});
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
        } catch (err) {
          // console.warn(err);
          // alert('Write permission err', err);
        }
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      try {
        console.log('Response = ', response.assets[0].uri);
        storeProfilePic(response.assets[0].uri);
        setFilePath(response.assets[0].uri);
        dispatch({type: 'profilePicUpdate', payload: response.assets[0].uri});
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
      } catch (err) {
        // alert('Write permission err', err);
      }
    });
  };

  function onPressRadioButton(radioButtonsArray) {
    console.log('radioButtonsArray ', radioButtonsArray);
    setRadioButtons(radioButtonsArray);
  }

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }
  const callGetProfileApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.get('/auth/getuser', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('regtoken- ', response.data.data);
      setProfileResult(response.data.data);
      // setTimeout(async () => {
      //   setProfileResult(response.data.data);
      // }, 2000);
      // setTimeout(async () => {
      //   console.log('regtoken---2 ', profileResult);
      // }, 2000);
      setLoading(false);
      console.log('name ', response.data.data.email);
      setProfileName(response.data.data.name);
      setEmailId(response.data.data.email);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      if (String(err.message).includes('Network')) {
        notifyMessage(err.message);
      } else {
        notifyMessage('Something went wrong.');
      }
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('called');
    // Call only when screen open or when back on screen
    if (isFocused) {
      callGetProfileApi();
    }
  }, [props, isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.HeaderStyle}>
        <TouchableOpacity
          style={styles.ImageStyleLeft}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/ic_qr_code.png')}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.ImageStyleCenter}
        />

        <TouchableOpacity
          style={styles.ImageStyleRight}
          onPress={() => {
            props.navigation.navigate('HelpPage');
          }}>
          <Image
            style={{alignSelf: 'center', width: 40, height: 40}}
            source={require('../assets/images/help_icon.png')}
          />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={['#1f2031', '#61626c']} style={{flex: 1}}>
        <ScrollView>
          <View style={{marginHorizontal: 25}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 20,
                  borderRadius: 100,
                  alignSelf: 'center',
                  marginRight: -30,
                }}
                source={
                  filePath != null
                    ? {uri: filePath}
                    : require('../assets/images/pic_placeholder.png')
                }
              />

              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  marginLeft: -20,
                }}
                onPress={() => setShowImageOpt(true)}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 35,
                    height: 35,
                  }}
                  source={require('../assets/icons/ic_edit.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <LableComponent
                lableText="Name"
                lableColor="#fff"
                lablefontSize={18}
                lableTextFontWeight="bold"
              />
            </View>

            <View style={{marginTop: 20}}>
              <Inputcomponent
                hideInput={false}
                placeHolderText="Enter Name"
                inputValue={profileName}
                onInputChange={newName => setProfileName(newName)}
              />
            </View>

            <View style={{marginTop: 20}}>
              <LableComponent
                lableText="Email"
                lableColor="#fff"
                lablefontSize={18}
                lableTextFontWeight="bold"
              />
            </View>
            <View style={{marginTop: 20}}>
              <Inputcomponent
                hideInput={false}
                placeHolderText="Enter Email Id"
                inputValue={emailId}
                onInputChange={newEmailId => setEmailId(newEmailId)}
              />
            </View>
            <View style={{marginTop: 20}}>
              <LableComponent
                lableText="Password"
                lableColor="#fff"
                lablefontSize={18}
                lableTextFontWeight="bold"
              />
            </View>
            <View style={{marginTop: 20}}>
              <PasswordInputcomponent
                hideInput={true}
                placeHolderText="Password"
                inputValue={password}
                onInputChange={newPassword => setPassword(newPassword)}
              />
            </View>
            <View style={{marginTop: 20}}>
              <LableComponent
                lableText="Confirm Password"
                lableColor="#fff"
                lablefontSize={18}
                lableTextFontWeight="bold"
              />
            </View>
            <View style={{marginTop: 20}}>
              <PasswordInputcomponent
                hideInput={true}
                placeHolderText="Confirm Password"
                inputValue={confpassword}
                onInputChange={newConfPassword =>
                  setConfPassword(newConfPassword)
                }
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                alignSelf: 'center',
                marginTop: 20,
              }}>
              Notification Preferences
            </Text>
            <View
              style={{
                marginTop: 20,
                flex: 1,
                height: 40,
                flexDirection: 'row',
                backgroundColor: '#2b2c33',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#ababac',
                    fontWeight: 'bold',
                  }}>
                  ACTION REMINDERS
                </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#ababac',
                    fontWeight: 'bold',
                  }}>
                  EMAIL FREQUENCY
                </Text>
              </View>
            </View>
            <View
              style={{
                marginBottom: 20,
                flex: 1,
                paddingVertical: 15,
                flexDirection: 'row',
                backgroundColor: '#3e3f48',
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Nudge Me
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 8,
                    }}>
                    Help Me
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 8,
                    }}>
                    Nag Me
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={onPressRadioButton}
                />
              </View>
            </View>

            <View style={{marginBottom: 20}}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="Save"
                showIcon={false}
                onPressCallback={() => props.navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* For QR pop up */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: 20,
              right: 20,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image
              style={{
                alignSelf: 'center',
                width: 30,
                height: 30,
                tintColor: 'black',
              }}
              source={require('../assets/icons/cross.png')}
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50}}
                source={require('../assets/images/pic_placeholder.png')}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginTop: 15,
                }}>
                Profile Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                }}>
                Chalenj Contact
              </Text>

              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  marginTop: 15,
                }}
                source={require('../assets/images/qr_placeholder.png')}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {APPLICATION_CONSTANTS.QRPAGE_DETAILS}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* For image picker options */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showImageOpt}
        onRequestClose={() => {
          setShowImageOpt(!showImageOpt);
        }}>
        <View style={styles.modalViewOpt}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                marginTop: 15,
                marginEnd: 50,
                marginStart: 18,
                marginTop: 20,
              }}>
              Select your option
            </Text>

            <TouchableOpacity
              style={{marginHorizontal: 23}}
              onPress={() => {
                chooseFile('photo'), setShowImageOpt(!showImageOpt);
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginTop: 25,
                }}>
                Select your image from gallary.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginHorizontal: 23, marginBottom: 20}}
              onPress={() => {
                captureImage('photo'), setShowImageOpt(!showImageOpt);
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginTop: 15,
                }}>
                Capture your image.
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: '60%',
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="Cancel"
                showIcon={false}
                onPressCallback={() => setShowImageOpt(!showImageOpt)}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* </View> */}

      {/* For progressbar pop up */}
      <Modal
        style={{alignItems: 'center'}}
        animationType="slide"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
        <View style={styles.progressViewStyle}>
          <Image
            source={require('../assets/icons/loader.gif')}
            style={{width: 40, height: 40}}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  HeaderStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'center',
    elevation: 10,
    height: 70,
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  ImageStyleRight: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  ImageStyleLeft: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },

  //for modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    maxHeight: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewOpt: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProfilePage;
