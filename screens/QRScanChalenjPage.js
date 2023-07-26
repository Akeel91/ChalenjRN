import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import {Modal} from 'react-native-paper';
import ButtonComponent from '../components/buttonComponent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const QRScanChalenj = ({navigation}) => {
  // const navigation = useNavigation();
  const apiResp = useSelector(state => state.apiRes);
  // const qrScanResult = useSelector(state => state.qrScan);

  // console.log('qrScanResult==', qrScanResult);

  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const name = nameText.trim();
  const description = descText.trim();
  const [showMessage, setShowMessage] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [scaninfoModalVisible, setScanInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeAction, setCompleteAction] = useState([]);
  const qrCode_type = apiResp.apiResponse.qr_code_type;
  const compareQrData = apiResp.apiResponse.qrcode_data.compare_str;
  const taskStatus = apiResp.apiResponse.task_status;
  const taskcompleteDate = apiResp.apiResponse.task_completed;
  const actionId = apiResp.apiResponse.id;
  const chalenjId = apiResp.apiResponse.chalenj_id;
  const actionType = apiResp.apiResponse.type;

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
    navigation.navigate('Actions', {
      chalenjPriority: completeAction.chalenj_priority,
      chalenjId: completeAction.chalenj_id,
      isPreviewChalenj: completeAction.isPreviewchalenj,
    });
  }
  function check() {
    //qr_code_type == 1 - Any QR, qr_code_type==2 - Specific QR, qr_code_type == 3 - Generated QR
    console.log('qrparam--', chalenjId, actionId);
  }

  const OpenCertificate = async () => {
    console.log('ts_content---', certificateUrl);
    await Linking.openURL(certificateUrl); // It will open the URL on browser.

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
    {
      taskStatus == 1 ? null : callActionCompleteApi();
    }
  };

  const callActionCompleteApi = async () => {
    setLoading(true);
    console.log('completAct-- ' + actionId, chalenjId, actionType);
    var isPreview = await AsyncStorage.getItem('savePreviewType');
    var isPreviewValue = 0;
    {
      isPreview == true ? (isPreviewValue = 1) : (isPreviewValue = 0);
    }
    console.log('isPreview--', isPreview, isPreviewValue);
    var token = await AsyncStorage.getItem('AuthToken');
    try {
      const response = await ApiConfig.post(
        '/action-complete',
        {
          chalenj_id: chalenjId,
          action_id: actionId,
          type: actionType,
          preview: isPreviewValue,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  moment.locale();

  function onSuccess(e) {
    setShowScanner(false);
    {
      qrCode_type == 3
        ? callCompareQRData(e.data)
        : callCheckScanDataApi(e.data);
    }
  }

  function callCompareQRData(qrData) {
    {
      compareQrData == qrData
        ? callActionCompleteApi()
        : setScanInfoModalVisible(true);
    }
  }

  const callCheckScanDataApi = async data => {
    console.log('myscanData--', data);
    var isPreview = await AsyncStorage.getItem('savePreviewType');
    var isPreviewValue = 0;
    {
      isPreview == true ? (isPreviewValue = 1) : (isPreviewValue = 0);
    }
    console.log('isPreview--', isPreview, isPreviewValue);
    var token = await AsyncStorage.getItem('AuthToken');
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/qrcode-scan',
        {
          // chalenj_id: chalenjId,
          // action_id: actionId,
          // type: actionType,
          // preview: isPreviewValue,
          email: data,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      setLoading(false);
      console.log('scanresult_data--', response.data.success);
      {
        response.data.success == true
          ? callActionCompleteApi()
          : setScanInfoModalVisible(true);
      }
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
        {showScanner == true ? (
          <View>
            <QRCodeScanner
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.torch}
            />
          </View>
        ) : (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            <View style={{marginVertical: 20}}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
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
                  btnIcon={require('../assets/icons/ic_qr_code.png')}
                  bgColor="#e06e34"
                  btnTitle="Scan QR Code"
                  btnTitleColor="#fff"
                  onPressCallback={() => {
                    // navigation.navigate('QRScanPage', {navigation: navigation});
                    // check();
                    {
                      taskStatus == 1 ? null : setShowScanner(true);
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
                          {moment(taskcompleteDate).format(
                            'MM-DD-YYYY hh:mm a',
                          )}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </LinearGradient>
      {/* add modal here */}
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
                    flex: 1,
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

      {/* rescan info popup */}
      <Modal
        style={{marginTop: -50}}
        animationType="slide"
        transparent={true}
        visible={scaninfoModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setScanInfoModalVisible(!scaninfoModalVisible);
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
              setScanInfoModalVisible(!scaninfoModalVisible);
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
                style={{width: 80, height: 80, borderRadius: 50}}
                source={require('../assets/icons/info_icon.png')}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#e06e34',
                  marginTop: 15,
                  textAlign: 'center',
                }}>
                Incorrect QR Code
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  marginTop: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {"You've scanned the incorrect" + '\n' + 'QR Code'}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  marginTop: 15,
                  textAlign: 'center',
                }}>
                {'Please find the individual or code' +
                  '\n' +
                  'with the correct QR Code' +
                  '\n' +
                  'and scan again.'}
              </Text>

              <View
                style={{
                  marginBottom: 20,
                  marginTop: 10,
                  width: 250,
                }}>
                <ButtonWithIcon
                  btnIcon={require('../assets/icons/ic_qr_code.png')}
                  bgColor="#e06e34"
                  btnTitle="Scan QR Code"
                  btnTitleColor="#fff"
                  onPressCallback={() => {
                    // navigation.navigate('QRScanPage', {navigation: navigation});
                    // check();
                    setShowScanner(true);
                    setScanInfoModalVisible(!scaninfoModalVisible);
                  }}
                />
              </View>
            </View>
          </ScrollView>
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

export default QRScanChalenj;
