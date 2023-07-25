import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../constant/PermissionConstant';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import {Modal} from 'react-native-paper';

const UploadImageChalenj = ({navigation}) => {
  // const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);
  const [fileResponse, setFileResponse] = useState([]);
  const [showImageOpt, setShowImageOpt] = useState(false);
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const name = nameText.trim();
  const description = descText.trim();
  const [loading, setLoading] = useState(false);
  const [completeAction, setCompleteAction] = useState([]);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const taskStatus = apiResp.apiResponse.task_status;
  const ts_content = apiResp.apiResponse.ts_content;
  const taskcompleteDate = apiResp.apiResponse.task_completed;
  const actionId = apiResp.apiResponse.id;
  const chalenjId = apiResp.apiResponse.chalenj_id;
  const actionType = apiResp.apiResponse.type;

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
          console.log('Response == ', response.assets[0].uri);
          setFileResponse(response.assets);
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
        console.log('ResponseC-- ', chalenjId, actionId, response.assets);
        setFileResponse(response.assets);
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
  };

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }
  function callBackToMain() {
    console.log(
      'backparam--',
      completeAction.chalenj_id,
      completeAction.chalenj_priority,
      completeAction.isPreviewchalenj,
    );
    setInfoModalVisible(!infoModalVisible);
    console.log('navi---', navigation);
    navigation.navigate('Actions', {
      chalenjPriority: completeAction.chalenj_priority,
      chalenjId: completeAction.chalenj_id,
      isPreviewChalenj: completeAction.isPreviewchalenj,
    });
  }
  const openDoc = async () => {
    console.log('ts_content---', ts_content);
    await Linking.openURL(
      'https://api.chalenj.com/storage/app/public/' + ts_content,
    ); // It will open the URL on browser.

    // // Put your url here -----
    // const url = ts_content;

    // // this will split the whole url.
    // const f2 = url.split('/');

    // // then get the file name with extention.
    // const fileName = f2[f2.length - 1];
    // // const fileExtention = url.split(".")[3];

    // // create a local file path from url
    // const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    // const options = {
    //   fromUrl: url,
    //   toFile: localFile,
    // };

    // // last step it will download open it with fileviewer.
    // RNFS.downloadFile(options)
    //   .promise.then(() => FileViewer.open(localFile))
    //   .then(() => {
    //     // success
    //     // Here you can perform any of your completion tasks
    //   })
    //   .catch(error => {
    //     // error
    //   });
  };
  const callActionCompleteApi = async () => {
    var isPreview = await AsyncStorage.getItem('savePreviewType');
    var isPreviewValue = 0;
    {
      isPreview == true ? (isPreviewValue = 1) : (isPreviewValue = 0);
    }
    console.log(
      'SCparamAction-- ' + actionId,
      chalenjId,
      actionType,
      isPreviewValue,
    );

    let formData = new FormData();
    formData.append('image_upload', {
      uri: fileResponse[0].uri,
      name: fileResponse[0].fileName,
      type: fileResponse[0].type,
    });
    formData.append('chalenj_id', chalenjId);
    formData.append('action_id', actionId);
    formData.append('type', actionType);
    formData.append('preview', isPreviewValue);

    var token = await AsyncStorage.getItem('AuthToken');
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/action-complete',
        formData,
        // {
        //   chalenj_id: chalenjId,
        //   action_id: actionId,
        //   type: actionType,
        //   preview: isPreviewValue,
        // }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data; ',
          },
        }, //Send header config hear
        {},
      );
      console.log('comp_resp--', response.data.data);
      setCompleteAction(response.data.data);
      setLoading(false);
      setInfoModalVisible(true);
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{marginVertical: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
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

            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/ic_image_ph.png')}
                bgColor="#e06e34"
                btnTitle="Upload Image"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  {
                    taskStatus == 1 ? openDoc() : setShowImageOpt(true);
                  }
                }}
              />
            </View>

            <View style={{marginTop: 20}}>
              {taskStatus == 1 ? (
                <View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.7, marginEnd: 5}}>
                      <ButtonComponent
                        bgColor="#bebebe"
                        textColor="#000"
                        title="Action Completed"
                        showIcon={false}
                        btnIcon={require('../assets/icons/ic_right_tick.png')}
                        onPressCallback={() => console.log('completed')}
                      />
                    </View>
                    <View style={{flex: 0.3, marginTop: 15, marginStart: 5}}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#573310',
                          alignItems: 'center',
                          padding: 10,
                          borderRadius: 50,
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: 'white',
                        }}
                        onPress={() => setShowMessage(!showMessage)}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../assets/icons/info_details.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {showMessage ? (
                    <View
                      style={{
                        height: 40,
                        flex: 1,
                        backgroundColor: '#e06e34',
                        borderRadius: 10,
                        marginTop: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                        Action completed on:{' '}
                        {moment(taskcompleteDate).format('MM-DD-YYYY hh:mm a')}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : fileResponse.length > 0 && taskStatus == 0 ? (
                <View style={{marginTop: 20}}>
                  <ButtonComponent
                    bgColor="#563410"
                    textColor="#fff"
                    title="Tap To Complete"
                    showIcon={true}
                    btnIcon={require('../assets/icons/ic_right_tick.png')}
                    onPressCallback={() => callActionCompleteApi()}
                  />
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      {/* For image picker options */}
      <Modal
        style={{marginTop: -50}}
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

      {/* add modal here */}
      <Modal
        style={{alignItems: 'center', marginTop: -50}}
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

      {/* For info pop up */}
      <Modal
        style={{marginTop: -50}}
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setInfoModalVisible(!infoModalVisible);
        }}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 80, height: 80, borderRadius: 50}}
                source={require('../assets/icons/ic_right_tick.png')}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginTop: 15,
                  textAlign: 'center',
                }}>
                {completeAction.percentage > 0 &&
                completeAction.percentage < 100
                  ? 'You are ' +
                    completeAction.percentage +
                    '% through this Action!'
                  : completeAction.chalenj_complete == true
                  ? 'CONGRATULATIONS'
                  : 'You Completed this Action'}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  marginTop: 15,
                  textAlign: 'center',
                }}>
                {completeAction.chalenj_complete == true
                  ? 'You Completed \n' + completeAction.chalenj_name
                  : 'Would you like to go to the next Action?'}
              </Text>

              {completeAction.chalenj_complete == true ? (
                <View
                  style={{
                    marginBottom: 20,
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <ButtonComponent
                      borderColor="#fff"
                      bgColor="#e06e34"
                      textColor="#ffffff"
                      title="Ok"
                      showIcon={false}
                      onPressCallback={() => callBackToMain()}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    marginTop: 10,
                  }}>
                  <View style={{flex: 1, marginEnd: 5}}>
                    <ButtonComponent
                      borderColor="#fff"
                      bgColor="#e06e34"
                      textColor="#ffffff"
                      title="Yes"
                      showIcon={false}
                      onPressCallback={() => console.log('call')}
                    />
                  </View>
                  <View style={{flex: 1, marginStart: 5}}>
                    <ButtonComponent
                      borderColor="#fff"
                      bgColor="#252635"
                      textColor="#ffffff"
                      title="No"
                      showIcon={false}
                      onPressCallback={() => callBackToMain()}
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default UploadImageChalenj;
