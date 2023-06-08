import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
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

const storeProfilePic = async value => {
  try {
    console.log('uri--- ' + value);
    await AsyncStorage.setItem('ProfilePic', value);
  } catch (e) {
    // saving error
  }
};

const ProfilePage = ({navigation}) => {
  // const profilePic = useSelector(state => state.userProfile);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [showImageOpt, setShowImageOpt] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '1x day',
      value: '1x',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 18},
    },
    {
      id: '2',
      label: '2x day',
      value: '2x',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 18},
    },
    {
      id: '3',
      label: '3x day',
      value: '3x',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 18},
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
    setRadioButtons(radioButtonsArray);
  }
  return (
    console.log('IP-- ' + filePath),
    (
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
              navigation.navigate('HelpPage');
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
                  onPressCallback={() => navigation.goBack()}
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
            Alert.alert('Modal has been closed.');
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
      </SafeAreaView>
    )
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
