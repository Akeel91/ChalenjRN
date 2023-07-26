import React, {useEffect, useState} from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddNoteChalenj from './AddNoteChalenjPage';
import FormChalenjPage from './FormChalenjPage';
import OpenCertificatePage from './OpenCertificatePage';
import OpenLinkChalenj from './OpenLinkChalenjPage';
import OpenPDFChalenj from './OpenPDFChalenjPage';
import PollChalenjPage from './PollChalenjPage';
import QRScanChalenj from './QRScanChalenjPage';
import QuizChalengPage from './QuizChalenjPage';
import HorizoltalRatingPage from './RatingNumberHorizontal';
import RatingStarChalenj from './RatingStarChalenjPage';
import SendEmailChalenj from './SendEmailChalenjPage';
import UploadDocChalenj from './UploadDocChalenjPage';
import UploadImageChalenj from './UploadImageChalenjPage';
import MultiChoiceVerticalPage from './VerticalMultiChoice';
import SingleChoiceVerticalPage from './VerticalSingleChoicePage';
import VideoChalenjPage from './VideoChalenjPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import {Modal} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CertificatePage from './certificatePage';
import CompleteAction from './CompleteActionPage';

const ChalenjActionPage = ({route, navigation, props}) => {
  const [authToken, setAuthToken] = useState('');
  const [actionTaskList, setActionTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [myCheckBox, setMyCheckBoxChecked] = useState([]);
  const [showFisrtSelected, setShowFisrtSelected] = useState(true);

  const dispatch = useDispatch();
  const {
    actionId,
    chalenjId,
    isPreviewChalenj,
    subAction,
    numberOfAction,
    actionNum,
  } = route.params;
  console.log(
    'listactionlistnavigation--',
    actionId,
    chalenjId,
    isPreviewChalenj,
    subAction,
    numberOfAction,
    actionNum,
  );
  const [openchalenjId, setChalenjId] = useState(chalenjId);
  const [nxtactionId, setNxtActionId] = useState(actionId);
  const [callApi, setCallApi] = useState(false);

  const [pageCount, setPageCount] = useState(actionNum);

  function addCheckBox(numberOfInputs) {
    let cloneArray = [...myCheckBox];
    for (let i = 0; i < numberOfInputs; i++) {
      cloneArray.push({checked: false});
      console.log('cloneArray ' + JSON.stringify(cloneArray));
    }
    setMyCheckBoxChecked(cloneArray);
  }

  // useEffect(() => {
  //   addCheckBox(response.data.data.action_array.length);
  // }, []);

  const toggleCheckBox = (checked, index) => {
    console.log('cccc= ' + checked, index);
    let updateInput = myCheckBox.map((item, i) => {
      if (index == i) {
        return {...item, checked: checked};
      } else {
        return {...item, checked: false};
      }
      return item;
    });

    setMyCheckBoxChecked(updateInput);
  };

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  function callSubActionClicked(val, i) {
    setChalenjId(actionTaskList.chalenj_id);
    setNxtActionId(actionTaskList.action_array[i].id);
    callNxtActionTaskList(actionTaskList.action_array[i].id);
    setShowFisrtSelected(false);
    val.checked ? toggleCheckBox(false, i) : toggleCheckBox(true, i);
  }
  const callNxtActionTaskList = actionId => {
    setCallApi(false);
    setActionTaskList([]);
    callChalenjActionListApi(actionId);
  };

  const callActionTaskList = actionId => {
    setActionTaskList([]);
    callChalenjActionListApi(actionId);
  };

  useEffect(() => {
    callActionTaskList(actionId);
    console.log('callingqr--', 'yes');
  }, []);

  //This Api is for action details by id
  const callChalenjActionListApi = async actionId => {
    var token = await AsyncStorage.getItem('AuthToken');
    var previewChalenj = 0;
    {
      isPreviewChalenj == true ? (previewChalenj = 1) : (previewChalenj = 0);
    }
    console.log('Detailsparam-', openchalenjId, previewChalenj, actionId);
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-action-detail',
        {
          chalenj_id: openchalenjId,
          preview: previewChalenj,
          action_id: actionId,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      setActionTaskList(response.data.data);
      setShowSubMenu(subAction);
      console.log('myCheckBox--', myCheckBox.length);
      {
        myCheckBox.length == 0
          ? addCheckBox(response.data.data.action_array.length)
          : null;
      }

      // console.log('instRespoId--- ', response.data.data.action_array[0].id);
      dispatch({type: 'apiResponse', payload: response.data.data});
      setLoading(false);
      setCallApi(true);
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#61626c'}}>
      <View style={{flex: 1}}>
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

        <View style={styles.PaginationStyle}>
          <TouchableOpacity
            style={styles.ImageStyle}
            onPress={() => {
              pageCount > 1 ? setPageCount(pageCount - 1) : setPageCount(1);
            }}>
            <Image
              style={{alignSelf: 'center', width: 30, height: 30}}
              source={require('../assets/icons/ic_back.png')}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={styles.PaginationTextStyle}>{pageCount}</Text>
            <Text style={styles.PaginationTextStyle}>/</Text>
            <Text style={styles.PaginationTextStyle}>{numberOfAction}</Text>
          </View>
          <TouchableOpacity
            style={styles.ImageStyle}
            onPress={() => {
              callApi == true && actionTaskList.advance_arrow.next_id != ''
                ? pageCount < numberOfAction
                  ? setPageCount(pageCount + 1)
                  : setPageCount(numberOfAction)
                : null;
            }}>
            <Image
              style={{
                alignSelf: 'center',
                width: 30,
                height: 30,
                transform: [{rotate: '180deg'}],
                opacity:
                  callApi == true && actionTaskList.advance_arrow.next_id == ''
                    ? 0.2
                    : null,
              }}
              source={require('../assets/icons/ic_back.png')}
            />
          </TouchableOpacity>
        </View>

        {callApi == true &&
        actionTaskList.type == 10 &&
        actionTaskList.question.question_type == 1 ? (
          <QuizChalengPage navigation={navigation} />
        ) : callApi == true &&
          actionTaskList.type == 10 &&
          actionTaskList.question.question_type == 2 ? (
          <PollChalenjPage navigation={navigation} />
        ) : callApi == true &&
          actionTaskList.type == 10 &&
          actionTaskList.question.question_type == 3 ? (
          <HorizoltalRatingPage navigation={navigation} />
        ) : callApi == true &&
          actionTaskList.type == 10 &&
          actionTaskList.question.question_type == 4 ? (
          <RatingStarChalenj navigation={navigation} />
        ) : callApi == true &&
          actionTaskList.type == 10 &&
          actionTaskList.question.question_type == 5 &&
          actionTaskList.question.choice_feature == 0 ? (
          <SingleChoiceVerticalPage navigation={navigation} />
        ) : callApi == true &&
          actionTaskList.type == 10 &&
          actionTaskList.question.question_type == 5 &&
          actionTaskList.question.choice_feature == 2 ? (
          <MultiChoiceVerticalPage navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 1 ? (
          <VideoChalenjPage navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 2 ? (
          <AddNoteChalenj navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 3 ? (
          <UploadDocChalenj navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 4 ? (
          <OpenPDFChalenj navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 5 ? (
          <UploadImageChalenj navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 6 ? (
          <OpenLinkChalenj navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 7 ? (
          <SendEmailChalenj /> //remaining to implement also 8,9
        ) : callApi == true && actionTaskList.type == 8 ? (
          <CompleteAction navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 11 ? (
          <FormChalenjPage navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 12 ? (
          <OpenCertificatePage navigation={navigation} />
        ) : callApi == true && actionTaskList.type == 13 ? (
          <QRScanChalenj navigation={navigation} />
        ) : null}

        {showSubMenu == true && callApi == true ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#61626c',
              alignContent: 'space-around',
            }}>
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'center',
                marginBottom: 30,
                flexGrow: 1,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {myCheckBox.map((val, i) => {
                return (
                  <View
                    style={{
                      marginTop: 5,
                      marginEnd: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        {
                          actionTaskList.action_array[i].task_status == 1 ||
                          actionTaskList.action_array[i].task_status == 0
                            ? callSubActionClicked(val, i)
                            : null;
                        }
                      }}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        backgroundColor:
                          i == 0 && showFisrtSelected == true
                            ? '#e06e34'
                            : val.checked
                            ? '#e06e34'
                            : '#808080',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          key={String(i)}
                          style={{
                            width: 20,
                            borderWidth: 1,

                            height: 20,
                          }}
                          source={
                            actionTaskList.action_array[i].task_status == 1
                              ? require('../assets/icons/whitetick.png')
                              : actionTaskList.action_array[i].task_status == 0
                              ? require('../assets/icons/whiteunlock.png')
                              : require('../assets/icons/whitelock.png')
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
      </View>
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
});

export default ChalenjActionPage;
