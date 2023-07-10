import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  Image,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../components/HeaderComponent';
import Inputcomponent from '../components/InputTypeComponent';
import ChalenjItem from '../components/rowChalenjItem';
import {useIsFocused} from '@react-navigation/native';

import {Modal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiConfig from '../AppNetwork/ApiConfig';
import ListComponent from '../components/rowListComponent';

const ChalenjDetailsPage = ({route, navigation, props}) => {
  const [clickStatas, setClickStatas] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [searchClick, setSearchClick] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionListData, setActionListData] = useState([]);
  const [actionListInstractionData, setActionListInstractionData] = useState(
    [],
  );
  const [refActionListData, setRefActionListData] = useState([]);
  const [dateSpefActionListData, setDateSpefActionListData] = useState([]);
  const [authToken, setAuthToken] = useState('');

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  const {chalenjPriority, chalenjId, isPreviewChalenj} = route.params;
  console.log('listnavigation--', chalenjPriority, chalenjId, isPreviewChalenj);

  //This Api is for chalenj details by id
  const callChalenjActionListApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    var previewChalenj = 0;
    {
      isPreviewChalenj == true ? (previewChalenj = 1) : (previewChalenj = 0);
    }
    console.log(
      'nlistactionparams---',
      isPreviewChalenj,
      chalenjId,
      previewChalenj,
    );

    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-actions-list',
        {
          chalenj_id: chalenjId,
          preview: previewChalenj,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('setActionListData--- ', response.data.data[0].id);
      setLoading(false);
      setActionListData(response.data.data);
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

  //This Api is for chalenj details by id
  const callChalenjActionListInstructionApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    var previewChalenj = 0;
    {
      isPreviewChalenj == true ? (previewChalenj = 1) : (previewChalenj = 0);
    }
    console.log(
      'instlistparams---',
      isPreviewChalenj,
      chalenjId,
      previewChalenj,
    );

    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-actions-instructions',
        {
          chalenj_id: chalenjId,
          preview: previewChalenj,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('setActionListData--- ', response.data.data[0].id);
      setLoading(false);
      setActionListInstractionData(response.data.data);
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

  //This Api is for ref. chalenj details by id
  const callRefChalenjActionApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    var previewChalenj = 0;
    {
      isPreviewChalenj == true ? (previewChalenj = 1) : (previewChalenj = 0);
    }
    console.log(
      'reflistparams---',
      isPreviewChalenj,
      chalenjId,
      previewChalenj,
    );

    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-actions-reference',
        {
          chalenj_id: chalenjId,
          preview: previewChalenj,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('setRefActionListData--- ', response.data.data[0].id);
      setLoading(false);
      setRefActionListData(response.data.data);
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

  //This Api is for date spef. chalenj details by id
  const callDateSpefChalenjActionApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    var previewChalenj = 0;
    {
      isPreviewChalenj == true ? (previewChalenj = 1) : (previewChalenj = 0);
    }
    console.log(
      'datelistparams---',
      isPreviewChalenj,
      chalenjId,
      previewChalenj,
    );

    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-actions-date-specific',
        {
          chalenj_id: chalenjId,
          preview: previewChalenj,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('setDateSpefActionListData--- ', response.data.data[0].id);
      setLoading(false);
      setDateSpefActionListData(response.data.data);
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

  function callListAction() {
    setActionListData([]);
    callChalenjActionListApi();
  }
  function callListInstructionAction() {
    setActionListInstractionData([]);
    callChalenjActionListInstructionApi();
  }
  function callRefListAction() {
    setRefActionListData([]);
    callRefChalenjActionApi();
  }
  function callDateSpefListAction() {
    setDateSpefActionListData([]);
    callDateSpefChalenjActionApi();
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('called');
    // Call only when screen open or when back on screen
    if (isFocused) {
      {
        chalenjPriority == 2
          ? callListAction()
          : chalenjPriority == 1
          ? callListInstructionAction()
          : chalenjPriority == 3
          ? callRefListAction()
          : chalenjPriority == 0
          ? callDateSpefListAction()
          : null;
      }
    } else {
      setActionListData([]);
    }
  }, [props, isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        leftIcon={require('../assets/icons/ic_back.png')}
        onMenuPressCallback={() => navigation.navigate('My Chalenj')}
        onSearchPressCallback={() =>
          searchClick ? setSearchClick(false) : setSearchClick(true)
        }
        onMsgPressCallback={() => navigation.navigate('NotificationPage')}
        onHelpPressCallback={() => navigation.navigate('HelpPage')}
      />
      <LinearGradient colors={['#1f2031', '#61626c']} style={{flex: 1}}>
        {searchClick ? (
          <View style={{marginTop: 20, marginHorizontal: 20}}>
            <Inputcomponent
              hideInput={false}
              placeHolderText="Search..."
              inputValue={searchItem}
              onInputChange={newSearchItem => setSearchItem(newSearchItem)}
            />
          </View>
        ) : (
          <View></View>
        )}

        {chalenjPriority == 2 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={id => actionListData.id}
            data={actionListData}
            renderItem={({item, index}) => {
              return (
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <ListComponent
                    type="listchalenj"
                    imageTop={
                      item.status == 0
                        ? require('../assets/images/logo.png')
                        : require('../assets/icons/correct.png')
                    }
                    title={item.name_with_tag}
                    onPressCallback={() =>
                      // call action detaion page here
                      navigation.navigate('ChalenjActionPage', {
                        actionId: item.id,
                        chalenjId: chalenjId,
                        isPreviewChalenj: isPreviewChalenj,
                        subAction: item.children_status,
                        numberOfAction: actionListData.length,
                        actionNum: index + 1,
                      })
                    }
                  />
                </View>
              );
            }}
          />
        ) : chalenjPriority == 1 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={id => actionListInstractionData.id}
            data={actionListInstractionData}
            renderItem={({item, index}) => {
              return (
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <ListComponent
                    childStatus={item.children_status}
                    instStep={item.number}
                    type="instlistchalenj"
                    imageTop={
                      item.action_lock == false
                        ? require('../assets/icons/open_lock.png')
                        : require('../assets/icons/padlock.png')
                    }
                    title={'' + item.name}
                    onPressCallback={() => console.log('listitemId--', item.id)}
                  />
                </View>
              );
            }}
          />
        ) : chalenjPriority == 3 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={id => refActionListData.id}
            data={refActionListData}
            renderItem={({item, index}) => {
              return (
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <ChalenjItem
                    instStep={item.number}
                    type="refList"
                    title={'' + item.name}
                    onPressCallback={() =>
                      console.log('listitemId--', actionListData[index].id)
                    }
                  />
                </View>
              );
            }}
          />
        ) : chalenjPriority == 0 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={id => dateSpefActionListData.id}
            data={dateSpefActionListData}
            renderItem={({item, index}) => {
              return (
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <ChalenjItem
                    taskDay={item.task_day}
                    instStep={item.number}
                    type="dateSpef"
                    title={'' + item.name}
                    imageTop={
                      item.action_lock == false
                        ? require('../assets/icons/open_lock.png')
                        : require('../assets/icons/padlock.png')
                    }
                    bgColor={item.action_lock == false ? '#e06e34' : '#573310'}
                    onPressCallback={() =>
                      console.log('listitemId--', actionListData[index].id)
                    }
                  />
                </View>
              );
            }}
          />
        ) : (
          <View></View>
        )}
      </LinearGradient>
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
});
export default ChalenjDetailsPage;
