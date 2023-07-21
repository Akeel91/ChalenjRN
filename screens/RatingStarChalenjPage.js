import React, {useState} from 'react';
import {
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
import ButtonComponent from '../components/buttonComponent';
const {convert} = require('html-to-text');
import {useSelector} from 'react-redux';
import {Modal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import moment from 'moment';
const RatingStarChalenj = ({navigation}) => {
  moment.locale();
  const apiResp = useSelector(state => state.apiRes);
  const [loading, setLoading] = useState(false);
  const [completeAction, setCompleteAction] = useState([]);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const taskStatus = apiResp.apiResponse.task_status;
  const taskcompleteDate = apiResp.apiResponse.task_completed;
  const actionId = apiResp.apiResponse.id;
  const chalenjId = apiResp.apiResponse.chalenj_id;
  const actionType = apiResp.apiResponse.type;
  const question_type = apiResp.apiResponse.question.question_type;
  const [showMessage, setShowMessage] = useState(false);
  const ratingAnswer = apiResp.apiResponse.question.horizontal_star;
  const [starRating, setStarRating] = useState(
    taskStatus == 1 ? ratingAnswer : 0,
  );

  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const questiontext = convert(apiResp.apiResponse.question.question, options);
  const name = nameText.trim();
  const description = descText.trim();
  const chalenjQuestion = questiontext.trim();

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

  function check() {
    console.log(
      'starratingParam-- ' + actionId,
      chalenjId,
      actionType,
      question_type,
      starRating,
    );
  }

  const callActionCompleteApi = async () => {
    var isPreview = await AsyncStorage.getItem('savePreviewType');
    var isPreviewValue = 0;
    {
      isPreview == true ? (isPreviewValue = 1) : (isPreviewValue = 0);
    }
    console.log(
      'ratingParam-- ' + actionId,
      chalenjId,
      actionType,
      question_type,
      isPreviewValue,
      starRating,
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
          question_type: question_type,
          preview: isPreviewValue,
          star: starRating,
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
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => (taskStatus == 1 ? null : setStarRating(1))}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 1
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => (taskStatus == 1 ? null : setStarRating(2))}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 2
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => (taskStatus == 1 ? null : setStarRating(3))}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 3
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => (taskStatus == 1 ? null : setStarRating(4))}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 4
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => (taskStatus == 1 ? null : setStarRating(5))}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 5
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
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
                ) : starRating > 0 ? (
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
                    flex: 1,
                    marginBottom: 20,
                    marginTop: 10,
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
});

export default RatingStarChalenj;
