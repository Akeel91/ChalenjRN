import React, {useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import HorizontalRatingComponent from '../components/horizontalRatingComponent';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';

const {convert} = require('html-to-text');

const HorizoltalRatingPage = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [completeAction, setCompleteAction] = useState([]);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [clickedRating, setClickedRating] = useState('0');
  const apiResp = useSelector(state => state.apiRes);

  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const taskStatus = apiResp.apiResponse.task_status;
  const taskcompleteDate = apiResp.apiResponse.task_completed;
  const actionId = apiResp.apiResponse.id;
  const chalenjId = apiResp.apiResponse.chalenj_id;
  const actionType = apiResp.apiResponse.type;

  const questiontext = convert(
    apiResp.apiResponse[0].question.question,
    options,
  );
  const name = nameText.trim();
  const description = descText.trim();
  const chalenjQuestion = questiontext.trim();

  console.log('clickedRating-' + clickedRating);

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(' ' + msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert('' + msg);
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
  const callActionCompleteApi = async () => {
    var isPreview = await AsyncStorage.getItem('savePreviewType');
    var isPreviewValue = 0;
    {
      isPreview == true ? (isPreviewValue = 1) : (isPreviewValue = 0);
    }
    console.log(
      'MMessage-- ' + actionId,
      chalenjId,
      actionType,
      isPreviewValue,
    );
    var token = await AsyncStorage.getItem('AuthToken');
    setLoading(true);
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
              style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
              {name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 13,
                color: 'white',
              }}>
              {description}
            </Text>

            <View style={{marginTop: 20}}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                {chalenjQuestion}
              </Text>

              <View
                style={{
                  height: 100,
                  backgroundColor: '#3e3f48',
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  justifyContent: 'space-around',
                }}>
                <HorizontalRatingComponent
                  titleText="1"
                  onPressCallback={() => {
                    setClickedRating(1);
                  }}
                  bgColor={clickedRating == '1' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '1' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="2"
                  onPressCallback={() => {
                    setClickedRating('2');
                  }}
                  bgColor={clickedRating == '2' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '2' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="3"
                  onPressCallback={() => {
                    setClickedRating('3');
                  }}
                  bgColor={clickedRating == '3' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '3' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="4"
                  onPressCallback={() => {
                    setClickedRating('4');
                  }}
                  bgColor={clickedRating == '4' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '4' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="5"
                  onPressCallback={() => {
                    setClickedRating('5');
                  }}
                  bgColor={clickedRating == '5' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '5' ? '#fff' : '#000'}
                />
              </View>

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
            </View>
          </View>
        </ScrollView>
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
                  : 'You Completed this Action'}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  marginTop: 15,
                  textAlign: 'center',
                }}>
                Would you like to go to the next Action?
              </Text>
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
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default HorizoltalRatingPage;
