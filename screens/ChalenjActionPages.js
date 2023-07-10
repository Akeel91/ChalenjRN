import React, {useEffect, useState} from 'react';

import {
  Image,
  SafeAreaView,
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

const ChalenjActionPage = ({route, navigation, props}) => {
  const [authToken, setAuthToken] = useState('');
  const [actionTaskList, setActionTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(0);

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
    'aactionlistnavigation--',
    actionId,
    chalenjId,
    isPreviewChalenj,
    subAction,
    numberOfAction,
    actionNum,
  );
  const [pageCount, setPageCount] = useState(actionNum);

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  function callActionTaskList() {
    setActionTaskList([]);
    callChalenjActionListApi();
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('called');
    // Call only when screen open or when back on screen
    if (isFocused) {
      {
        callActionTaskList();
      }
    } else {
      setActionTaskList([]);
    }
  }, [props, isFocused]);

  //This Api is for action details by id
  const callChalenjActionListApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    var previewChalenj = 0;
    {
      isPreviewChalenj == true ? (previewChalenj = 1) : (previewChalenj = 0);
    }
    console.log(
      'actiondetailsparama--',
      token,
      chalenjId,
      isPreviewChalenj,
      actionId,
    );
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-action-detail',
        {
          chalenj_id: chalenjId,
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
      console.log('nsetActionTaskList--- ', response.data.data[0].type);
      dispatch({type: 'apiResponse', payload: response.data.data});
      setLoading(false);
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
              pageCount < numberOfAction
                ? setPageCount(pageCount + 1)
                : setPageCount(numberOfAction);
            }}>
            <Image
              style={{
                alignSelf: 'center',
                width: 30,
                height: 30,
                transform: [{rotate: '180deg'}],
              }}
              source={require('../assets/icons/ic_back.png')}
            />
          </TouchableOpacity>
        </View>

        {loading == false &&
        actionTaskList[0].type == 10 &&
        actionTaskList[0].question.question_type == 1 ? (
          <QuizChalengPage />
        ) : loading == false &&
          actionTaskList[0].type == 10 &&
          actionTaskList[0].question.question_type == 2 ? (
          <PollChalenjPage />
        ) : loading == false &&
          actionTaskList[0].type == 10 &&
          actionTaskList[0].question.question_type == 3 ? (
          <HorizoltalRatingPage />
        ) : loading == false &&
          actionTaskList[0].type == 10 &&
          actionTaskList[0].question.question_type == 4 ? (
          <RatingStarChalenj />
        ) : loading == false &&
          actionTaskList[0].type == 10 &&
          actionTaskList[0].question.question_type == 5 &&
          actionTaskList[0].question.choice_feature == 0 ? (
          <SingleChoiceVerticalPage />
        ) : loading == false &&
          actionTaskList[0].type == 10 &&
          actionTaskList[0].question.question_type == 5 &&
          actionTaskList[0].question.choice_feature == 2 ? (
          <MultiChoiceVerticalPage />
        ) : null}

        {/* {actionTaskList.type == 10 ? (
          
        ) : (
          <SingleChoiceVerticalPage />
        )} */}

        {/* {pageCount == 1 && <QuizChalengPage />}
        {pageCount == 2 && <SingleChoiceVerticalPage />}
        {pageCount == 3 && <MultiChoiceVerticalPage />}
        {pageCount == 4 && <AddNoteChalenj />}
        {pageCount == 5 && <UploadDocChalenj />}
        {pageCount == 6 && <OpenLinkChalenj />}
        {pageCount == 7 && <OpenPDFChalenj />}
        {pageCount == 8 && <FormChalenjPage />}
        {pageCount == 9 && <QRScanChalenj />}
        {pageCount == 10 && <VideoChalenjPage />}
        {pageCount == 11 && <UploadImageChalenj />}
        {pageCount == 12 && <SendEmailChalenj />}
        {pageCount == 13 && <HorizoltalRatingPage />}
        {pageCount == 14 && <RatingStarChalenj />}
        {pageCount == 15 && <PollChalenjPage />}
        {pageCount == 16 && <OpenCertificatePage />} */}
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
