import React, {useEffect, useState} from 'react';

import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import CheckBox from 'react-native-check-box';
const {convert} = require('html-to-text');
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import {Modal} from 'react-native-paper';
import moment from 'moment';
const MultiChoiceVerticalPage = ({navigation}) => {
  moment.locale();
  const [myCheckBox, setMyCheckBoxChecked] = useState([]);
  const [getSelectedAnswerId, setGetSelectedAnswerId] = useState([]);
  const apiResp = useSelector(state => state.apiRes);
  const inputChecked = [];
  const options = {
    wordwrap: false,
    // ...
  };
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeAction, setCompleteAction] = useState([]);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const taskStatus = apiResp.apiResponse.task_status;
  const taskcompleteDate = apiResp.apiResponse.task_completed;
  const actionId = apiResp.apiResponse.id;
  const chalenjId = apiResp.apiResponse.chalenj_id;
  const actionType = apiResp.apiResponse.type;
  const question_type = apiResp.apiResponse.question.question_type;

  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const questiontext = convert(apiResp.apiResponse.question.question, options);
  const name = nameText.trim();
  const description = descText.trim();
  const chalenjQuestion = questiontext.trim();

  function addCheckBox(numberOfInputs) {
    let cloneArray = [...myCheckBox];
    for (let i = 0; i < numberOfInputs; i++) {
      {
        taskStatus == 1 &&
        apiResp.apiResponse.question.answer[i].selected_answer == 1
          ? cloneArray.push({checked: true})
          : cloneArray.push({checked: false});
      }
    }
    setMyCheckBoxChecked(cloneArray);
  }
  useEffect(() => {
    addCheckBox(apiResp.apiResponse.question.answer.length);
  }, []);

  const toggleCheckBox = (checked, index) => {
    console.log('cccc= ' + checked, index);
    let updateInput = myCheckBox.map((item, i) => {
      if (index == i) {
        return {...item, checked: checked};
      }
      return item;
    });

    setMyCheckBoxChecked(updateInput);
  };

  for (let i = 0; i < myCheckBox.length; i++) {
    if (myCheckBox[i].checked == true) {
      inputChecked.push({checked: true});
    } else {
      console.log('empty');
    }
  }
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

  function check() {
    console.log(
      'ffffff ' + JSON.stringify(inputChecked),
      JSON.stringify(myCheckBox),
    );
    var selectedAnsID = [];

    for (let i = 0; i < myCheckBox.length; i++) {
      console.log('fffff-', myCheckBox[i].checked);
      {
        myCheckBox[i].checked == true
          ? selectedAnsID.push({
              selectedID: apiResp.apiResponse.question.answer[i].id,
            })
          : selectedAnsID.filter(
              item =>
                item.selectedID == apiResp.apiResponse.question.answer[i].id,
            );
      }
    }
    callApi(selectedAnsID);
  }
  function callApi(selectedAnsID) {
    console.log('Sample---', selectedAnsID);
    var mySelectedAnswerId = [];
    for (let index = 0; index < selectedAnsID.length; index++) {
      mySelectedAnswerId.push(selectedAnsID[index].selectedID);
    }
    console.log('mySelectedAnswerId-', mySelectedAnswerId);
    callActionCompleteApi(mySelectedAnswerId);
  }

  const callActionCompleteApi = async mySelectedAnswerId => {
    var isPreview = await AsyncStorage.getItem('savePreviewType');
    var isPreviewValue = 0;
    {
      isPreview == true ? (isPreviewValue = 1) : (isPreviewValue = 0);
    }
    // var mm = JSON.stringify(nameList);
    // console.log('gfg--', mm);
    console.log(
      'MCparamAction-- ' + actionId,
      chalenjId,
      actionType,
      question_type,
      isPreviewValue,
      mySelectedAnswerId,
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
          options1: JSON.stringify(mySelectedAnswerId),
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
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
                marginTop: 15,
              }}>
              {chalenjQuestion}
            </Text>
            {myCheckBox.map((val, i) => {
              return (
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      height: 50,
                      borderRadius: 5,
                      backgroundColor: '#d6d6d6',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <CheckBox
                      key={String(i)}
                      onClick={() => {
                        val.checked
                          ? toggleCheckBox(false, i)
                          : toggleCheckBox(true, i);
                      }}
                      rightText={apiResp.apiResponse.question.answer[i].answer}
                      isChecked={val.checked}
                      disabled={taskStatus ? true : false}
                      checkBoxColor="white"
                      checkedCheckBoxColor="#e06e34"
                      rightTextStyle={{
                        color: 'black',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                  {val.checked ? (
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginTop: 3,
                        justifyContent: 'center',
                        padding: 15,
                      }}>
                      <Text
                        key={String(i)}
                        style={{
                          fontSize: 13,
                          color: 'black',
                        }}>
                        {apiResp.apiResponse.question.answer[i].answer_note}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              );
            })}

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
              ) : inputChecked.length > 0 ? (
                <View style={{marginTop: 20}}>
                  <ButtonComponent
                    bgColor="#563410"
                    textColor="#fff"
                    title="Tap To Complete"
                    showIcon={true}
                    btnIcon={require('../assets/icons/ic_right_tick.png')}
                    onPressCallback={() => check()}
                  />
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
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
});

export default MultiChoiceVerticalPage;
