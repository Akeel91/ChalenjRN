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
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import FormComponents from '../components/FormComponent';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import {Modal} from 'react-native-paper';

const FormChalenjPage = ({navigation}) => {
  const [myTextInput, setMyTextInput] = useState([]);
  const inputValues = [];
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const name = nameText.trim();
  const description = descText.trim();
  const [showMessage, setShowMessage] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completeAction, setCompleteAction] = useState([]);

  const taskStatus = apiResp.apiResponse.task_status;
  const taskcompleteDate = apiResp.apiResponse.task_completed;
  const actionId = apiResp.apiResponse.id;
  const chalenjId = apiResp.apiResponse.chalenj_id;
  const actionType = apiResp.apiResponse.type;

  function addInputText(numberOfInputs) {
    let cloneArray = [...myTextInput];
    for (let i = 0; i < numberOfInputs; i++) {
      cloneArray.push({text: ''});
      console.log('cloneArray ' + cloneArray);
    }
    setMyTextInput(cloneArray);
  }
  useEffect(() => {
    addInputText(apiResp.apiResponse.form_filed_data.length);
  }, []);

  const onChangeText = (text, index) => {
    let updateInput = myTextInput.map((item, i) => {
      if (index == i) {
        return {...item, text: text};
      }
      return item;
    });

    setMyTextInput(updateInput);
  };

  console.log('aaaa - ' + JSON.stringify(myTextInput));
  for (let i = 0; i < myTextInput.length; i++) {
    if (myTextInput[i].text != '') {
      inputValues.push({text: myTextInput[i].text});
    } else {
      console.log('empty');
    }
  }
  const getInputData = () => {
    console.log('formparamsize-- ' + chalenjId + ' ' + actionId);
    const questionsId = [];
    const inputAnswer = [];
    for (let i = 0; i < myTextInput.length; i++) {
      if (myTextInput[i].text == '') {
        Alert.alert('Fill all answers');
      } else {
        inputAnswer.push(myTextInput[i].text);
        questionsId.push(apiResp.apiResponse.form_filed_data[i].id);
      }
    }
    console.log('ansinputs--', inputAnswer, questionsId);
    callActionCompleteApi(inputAnswer, questionsId);
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
    navigation.navigate('Actions', {
      chalenjPriority: completeAction.chalenj_priority,
      chalenjId: completeAction.chalenj_id,
      isPreviewChalenj: completeAction.isPreviewchalenj,
    });
  }
  const callActionCompleteApi = async (inputAnswer, questionsId) => {
    console.log('completAct-- ' + actionId, chalenjId, actionType);
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
        '/action-complete',
        {
          chalenj_id: chalenjId,
          action_id: actionId,
          type: actionType,
          preview: isPreviewValue,
          form_field_id: JSON.stringify(questionsId),
          user_response: JSON.stringify(inputAnswer),
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
              style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
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

            {myTextInput.map((val, i) => {
              return (
                <View style={{marginTop: 15}}>
                  <FormComponents
                    QuestionTitle={
                      apiResp.apiResponse.form_filed_data[i].field_text
                    }
                  />
                  <TextInput
                    value={
                      taskStatus == 1
                        ? apiResp.apiResponse.form_filed_data[i].user_form_data
                            .user_ans
                        : val.text
                    }
                    key={String(i)}
                    placeholder="Your Answer"
                    editable={taskStatus == 1 ? false : true}
                    style={{
                      height: 45,
                      borderWidth: 1,
                      borderRadius: 50,
                      marginTop: 20,
                      paddingHorizontal: 15,
                      borderColor: 'white',
                    }}
                    onChangeText={text => onChangeText(text, i)}
                  />
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
              ) : inputValues.length == myTextInput.length ? (
                <ButtonComponent
                  bgColor="#563410"
                  textColor="#fff"
                  title="Tap To Complete"
                  showIcon={true}
                  btnIcon={require('../assets/icons/ic_right_tick.png')}
                  onPressCallback={() => getInputData()}
                />
              ) : (
                <View></View>
              )}
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
                  }}>
                  <View style={{}}>
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

export default FormChalenjPage;
