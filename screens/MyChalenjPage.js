import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {BottomSheet} from 'react-native-btr';
import {Dropdown} from 'react-native-element-dropdown';
import QuillEditor, {QuillToolbar} from 'react-native-cn-quill';

import {useIsFocused} from '@react-navigation/native';
import {
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Modal} from 'react-native-paper';
import ApiConfig from '../AppNetwork/ApiConfig';
import CardComponent from '../components/CardConponent';
import HeaderComponent from '../components/HeaderComponent';
import Inputcomponent from '../components/InputTypeComponent';
import SideMenuComponent from '../components/SideMenuComponent';
import ButtonComponent from '../components/buttonComponent';
import SimpleButton from '../components/simpleButtonComponent';
import WebView from 'react-native-webview';

const ChalenjPage = props => {
  const _editor = React.createRef();

  const [clickStatas, setClickStatas] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderId, setFolderId] = useState('');
  const [folderActionType, setfolderActionType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [searchClick, setSearchClick] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [manageActionView, setActionViewVisible] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [activeChalenjList, setactiveChalenjList] = useState([]);
  const [completedChalenjList, setCompletedChalenjList] = useState([]);
  const [fromFolderChalenjList, setFromFolderChalenjList] = useState([]);
  const [moveToFolder, setMoveToFolder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleFolderToMove, setVisibleFolderToMove] = useState(false);
  const [visibleFolderToEdit, setVisibleFolderToEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [c_page, setCPage] = useState(0);
  const [fc_page, setFCPage] = useState(0);
  const [clickedChalenjId, setClickedChalenjId] = useState();
  const [clickedChalenjType, setClickedChalenjType] = useState();
  const [actionForFolder, setActionForFolder] = useState();
  const [activeButton, setActiveButton] = useState('active');
  const [chalenjDetails, setChalenjDetails] = useState([]);
  const [isPreviewchalenj, setIsPreviewchalenj] = useState(false);

  const flatListRef = React.useRef();
  const flatListCompRef = React.useRef();
  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
    flatListCompRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  const toggleFolderToMoveView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisibleFolderToMove(!visibleFolderToMove);
  };
  const toggleFolderToEditView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisibleFolderToEdit(!visibleFolderToEdit);
  };

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  // This Api is for get All folder list
  const callGetFolderListApi = async () => {
    setLoading(true);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    try {
      const response = await ApiConfig.post(
        '/get-user-folders',
        '', //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('regtoken- ', activeButton, response.data.data);
      setFolderList(response.data.data);
      {
        activeButton == 'active'
          ? callActivechalenjFreash()
          : activeButton == 'completed'
          ? callCompeltedChalenjFreash()
          : null;
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

  // This Api is for get All chalenj from folder
  const callGetChlenjFromFolderApi = async saveBtnId => {
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-folder-chalenjs',
        {
          folder_id: saveBtnId,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('regtoken- ', activeButton, response.data.data);
      setFromFolderChalenjList(response.data.data);
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

  const callMoveToFolderListApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    try {
      const response = await ApiConfig.post(
        '/folder-list',
        '', //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('regtoken- ', response.data.data);
      setMoveToFolder(response.data.data);
      console.log('file_name-- ', response.data.data[0].file_name);
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

  // This Api is for get All Active chalenj with pagination
  const callCompeltedChalenjList = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-completed-chalenjs',
        {
          page: c_page,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('activechalenj- ', c_page, response.data.data);
      {
        c_page > 0
          ? setCompletedChalenjList([
              ...completedChalenjList,
              ...response.data.data,
            ])
          : setCompletedChalenjList(response.data.data);
      }
      console.log('responseactive--', response.data.data);
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

  // This Api is for get All Active chalenj with pagination
  const callActiveChalenjApi = async () => {
    setLoading(true);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);

    try {
      const response = await ApiConfig.post(
        '/get-active-chalenjs',
        {
          page: page,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('activechalenj- ', page, response.data.data);
      {
        page > 0
          ? setactiveChalenjList([...activeChalenjList, ...response.data.data])
          : setactiveChalenjList(response.data.data);
      }
      console.log('responseactive--', response.data.data);
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

  function callActivechalenjFreash() {
    setPage(0);
    setactiveChalenjList([]);
    callActiveChalenjApi();
  }
  function callCompeltedChalenjFreash() {
    setCPage(0);
    setCompletedChalenjList([]);
    callCompeltedChalenjList();
  }
  const callChalenjFromFolderFreash = async () => {
    var saveBtnId = await AsyncStorage.getItem('saveBtnId');
    console.log('activebtn_id--', saveBtnId);
    setFromFolderChalenjList([]);
    callGetChlenjFromFolderApi(saveBtnId);
  };

  //This Api is for create custom folder for chalenj
  const callCreateFolderApi = async type => {
    var token = await AsyncStorage.getItem('AuthToken');
    var folderActionType = await AsyncStorage.getItem('folderActionType');
    setAuthToken(token);
    setfolderActionType(folderActionType);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/user-folder-crud',
        {
          id: folderId,
          name: folderName,
          type: type,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('activeChaljList- ', response.data.data);
      setLoading(false);
      {
        type == 'create'
          ? toggleBottomNavigationView()
          : toggleFolderToEditView();
      }
      callMoveToFolderListApi();
      callGetFolderListApi();
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

  //This Api is for move chalenj to custom folder
  const callMoveChalenjApi = async folderId => {
    console.log(
      'movefromcomp-',
      clickedChalenjId,
      folderId,
      clickedChalenjType,
    );
    var token = await AsyncStorage.getItem('AuthToken');
    var folderActionType = await AsyncStorage.getItem('folderActionType');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/move-chalenj-to-folder',
        {
          chalenj_id: clickedChalenjId,
          folder_id: folderId,
          display_type: clickedChalenjType,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('regtoken- ', response.data.data.message);
      notifyMessage(response.data.message);
      setLoading(false);
      toggleFolderToMoveView();
      callGetFolderListApi();
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

  //This Api is for delete preview chalenj
  const callDeletePreviewChalenjApi = async chalenjId => {
    console.log('chalenjId--', chalenjId);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/delete-preview-chalenj',
        {
          chalenj_id: chalenjId,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      notifyMessage(response.data.message);
      setLoading(false);
      {
        activeButton == 'active'
          ? callActivechalenjFreash()
          : callChalenjFromFolderFreash();
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

  //This Api is for refresh preview chalenj
  const callRefreshChalenjApi = async (chalenjId, type) => {
    var previewChalenj = false;
    {
      type == 'preview' ? (previewChalenj = true) : (previewChalenj = false);
    }
    console.log('refreshchalenj--', chalenjId, type, previewChalenj);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/refresh-chalenj',
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
      console.log('chalenjIdRes- ', response.data.data);
      notifyMessage(response.data.message);
      setLoading(false);
      {
        activeButton == 'active'
          ? callActivechalenjFreash()
          : callChalenjFromFolderFreash();
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

  //This Api is for chalenj details by id
  const callChalenjDetailsApi = async (chalenjId, type) => {
    var previewChalenj = false;
    {
      type == 'preview' ? (previewChalenj = true) : (previewChalenj = false);
    }
    setIsPreviewchalenj(previewChalenj);
    console.log('refreshchalenj--', chalenjId, type, previewChalenj);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-chalenj-details',
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
      console.log('setChalenjDetails- ', response.data.data.description);
      setLoading(false);
      setChalenjDetails(response.data.data);
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

  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('called');
    // Call only when screen open or when back on screen
    if (isFocused) {
      setPage(0);
      setCPage(0);
      setactiveChalenjList([]);
      setCompletedChalenjList([]);
      setFCPage(0);
      setFromFolderChalenjList([]);
      callGetFolderListApi();
      callMoveToFolderListApi();
    } else {
      setPage(0);
      setCPage(0);
      setactiveChalenjList([]);
      setCompletedChalenjList([]);
      setFCPage(0);
      setFromFolderChalenjList([]);
    }
  }, [props, isFocused]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      setActionViewVisible(false);
    });

    return unsubscribe;
  }, [props.navigation]);

  function callMoveToFolder(id, type) {
    console.log('type1---', type);
    {
      type == 'preview'
        ? setClickedChalenjType(1)
        : type == 'accepeted'
        ? setClickedChalenjType(2)
        : type == 'completed'
        ? setClickedChalenjType(3)
        : setClickedChalenjType(0);
    }
    setClickedChalenjId(id);
    toggleFolderToMoveView();
  }
  function callNew() {
    console.log('calling');
    toggleBottomNavigationView();
    setClickStatas(false);
  }
  function callNewEdit() {
    console.log('calling');
    setActionForFolder('edit');
    toggleFolderToEditView();
    setClickStatas(false);
  }
  function callFolderDelete() {
    console.log('calling');
    setActionForFolder('delete');
    toggleFolderToEditView();
    setClickStatas(false);
  }
  function logoutCall() {
    AsyncStorage.setItem('isLogin', 'no');
    props.navigation.reset({
      index: 0,
      routes: [{name: 'WelCome'}],
    });
  }
  const fetchMoreData = () => {
    setPage(page + 1);
    callActiveChalenjApi();
  };

  const fetchMoreCompletedData = () => {
    setCPage(c_page + 1);
    callCompeltedChalenjList();
  };

  // const fetchMoreChalenjFromFolderData = () => {
  //   setFCPage(fc_page + 1);
  //   callGetChlenjFromFolderApi();
  // };

  loadInBrowser = () => {
    Linking.openURL('https://dev.chalenj.com/author/dashboard').catch(err =>
      console.error("Couldn't load page", err),
    );
    setClickStatas(false);
  };

  console.log('aaactiveButton----', activeButton);
  return (
    <SafeAreaView style={{flex: 1}}>
      {manageActionView ? (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.ActionHeaderStyle}>
            <TouchableOpacity
              style={styles.ActionImageStyle}
              onPress={() => {
                setActionViewVisible(false);
              }}>
              <Image
                style={{alignSelf: 'center', width: 30, height: 30}}
                source={require('../assets/icons/ic_back.png')}
              />
            </TouchableOpacity>

            <Image
              source={require('../assets/images/logo.png')}
              style={styles.ActionImageStyleCenter}
            />

            <TouchableOpacity
              style={styles.ActionImageStyle}
              onPress={() => {
                props.navigation.navigate('HelpPage');
              }}>
              <Image
                style={{alignSelf: 'center', width: 35, height: 35}}
                source={require('../assets/images/help_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#1f2031', '#61626c']}
            style={{flex: 1, paddingHorizontal: 20}}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}>
              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 15,
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 14,
                  }}>
                  {chalenjDetails.name}
                </Text>

                <Text
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    alignSelf: 'center',
                    marginTop: 15,
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 14,
                  }}>
                  {chalenjDetails.author_name}
                </Text>

                {/* <WebView
                  style={{width: '100%', height: 200}}
                  originWhitelist={['*']}
                  source={{
                    html: '<p> Clicking this button will save and update your Chalenj. Your work is not saved until you click this button.</p> <div data-oembed-url="https://www.youtube.com/watch?v=f4jG8BCl5s0"><div>                  <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;" allowfullscreen="" scrolling="no" src="//if-cdn.com/dTp8Rgg" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" tabindex="-1"></iframe></div></div></div>',
                  }}
                /> */}
                <QuillEditor
                  style={{
                    flex: 1,
                    padding: 0,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginHorizontal: 30,
                    marginVertical: 5,
                    height: 150,
                    backgroundColor: 'white',
                  }}
                  ref={_editor}
                  initialHtml='<p>Clicking this button will save and update your Chalenj.<br />
                  Your work is not saved until you click this button.<br />
                  <br />
                  &nbsp;</p>
                  
                   
                  
                  <div data-oembed-url="https://www.youtube.com/watch?v=f4jG8BCl5s0">
                  <div>
                  <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;" allowfullscreen="" scrolling="no" src="//if-cdn.com/dTp8Rgg" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" tabindex="-1"></iframe></div>
                  </div>
                  </div>
                  
                   
                  
                  <p>&nbsp;</p>
                  '
                />
                <View style={{marginTop: 15}}>
                  <ButtonComponent
                    bgColor="#e06e34"
                    textColor="#ffffff"
                    title="View Action"
                    showIcon={false}
                    onPressCallback={() =>
                      props.navigation.navigate('Actions', {
                        chalenjPriority: chalenjDetails.chalenj_priority,
                        chalenjId: chalenjDetails.id,
                        isPreviewChalenj: isPreviewchalenj,
                      })
                    }
                  />
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <HeaderComponent
            leftIcon={require('../assets/icons/menu.png')}
            onMenuPressCallback={() =>
              clickStatas ? setClickStatas(false) : setClickStatas(true)
            }
            onSearchPressCallback={() =>
              searchClick ? setSearchClick(false) : setSearchClick(true)
            }
            onMsgPressCallback={() =>
              props.navigation.navigate('NotificationPage')
            }
            onHelpPressCallback={() => props.navigation.navigate('HelpPage')}
          />
          <LinearGradient
            colors={['#1f2031', '#61626c']}
            style={styles.linearGradient}>
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

            <View style={{height: 50, marginTop: 10}}>
              <FlatList
                contentContainerStyle={{paddingBottom: 20}}
                keyExtractor={folderId => folderId.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={folderList}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        justifyContent: 'center',
                        paddingStart: 20,
                        paddingTop: 12,
                        minWidth: 100,
                        maxWidth: 150,
                      }}>
                      <SimpleButton
                        titleText={item.name}
                        onPressCallback={() => {
                          console.log('chid--', item.id);
                          AsyncStorage.setItem('saveBtnId', '' + item.id);
                          setActiveButton(item.name);
                          {
                            console.log('btntype-', item.name);
                            item.name == 'active'
                              ? callActivechalenjFreash()
                              : item.name == 'completed'
                              ? callCompeltedChalenjFreash()
                              : callChalenjFromFolderFreash();
                          }
                        }}
                        buttonWidth="100%"
                        bgColor={
                          item.name === activeButton ? '#e06e34' : '#fff'
                        }
                        btnTextColor={
                          item.name === activeButton ? '#fff' : '#e06e34'
                        }
                      />
                    </View>
                  );
                }}
              />
            </View>

            {activeButton == 'active' ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 20}}
                keyExtractor={chalenjId => chalenjId.id}
                ref={flatListRef}
                data={activeChalenjList}
                renderItem={({item, index}) => {
                  console.log('MyChalenjList----', index, activeChalenjList);
                  return (
                    <CardComponent
                      chalenjName={item.name}
                      chalenjRefresh={item.refresh_button}
                      chalenjLogo={item.chalenj_logo}
                      chalenjuname={item.uname}
                      chalenjDisplaytype={item.display_type}
                      chalenjProg={item.persentage}
                      onChalenjClick={() => {
                        console.log('name - ' + item.name);
                        // manage view for view actions
                        setActionViewVisible(true);
                        callChalenjDetailsApi(item.id, item.display_type);
                      }}
                      onPreviewClick={() => {
                        // manage view for view actions
                        // setActionViewVisible(true);
                      }}
                      onMoveClick={() => {
                        // manage view for view actions
                        callMoveToFolder(item.id, item.display_type);
                      }}
                      onDeletePreviewChalenj={() => {
                        // manage view for view actions
                        callDeletePreviewChalenjApi(item.id);
                      }}
                      onRefreshChalenj={() => {
                        callRefreshChalenjApi(item.id, item.display_type);
                      }}
                    />
                  );
                }}
                ListFooterComponent={this.FlatListFooter}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.1}
              />
            ) : activeButton == 'completed' ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 20}}
                keyExtractor={chalenjId => chalenjId.id}
                ref={flatListCompRef}
                data={completedChalenjList}
                renderItem={({item, index}) => {
                  console.log('MyChalenjList--', index, completedChalenjList);
                  console.log(
                    'isEnd--',
                    index,
                    completedChalenjList.length - 1,
                  );
                  return (
                    <CardComponent
                      chalenjName={item.name}
                      chalenjRefresh={''}
                      chalenjLogo={item.chalenj_logo}
                      chalenjuname={item.uname}
                      chalenjDisplaytype={'completed'}
                      chalenjProg={100}
                      onChalenjClick={() => {
                        console.log('name - ' + item.name);
                        // manage view for view actions
                        setActionViewVisible(true);
                      }}
                      onPreviewClick={() => {
                        // manage view for view actions
                        // setActionViewVisible(true);
                      }}
                      onMoveClick={() => {
                        // manage view for view actions
                        callMoveToFolder(item.id, 'completed');
                      }}
                      onDeletePreviewChalenj={() => {
                        // manage view for view actions
                        callDeletePreviewChalenjApi(item.id);
                      }}
                      onRefreshChalenj={() => {
                        callRefreshChalenjApi(item.id, 'completed');
                      }}
                    />
                  );
                }}
                ListFooterComponent={this.FlatListFooter}
                onEndReached={fetchMoreCompletedData}
                onEndReachedThreshold={0.1}
              />
            ) : (
              <FlatList
                contentContainerStyle={{paddingBottom: 20}}
                keyExtractor={chalenjId => chalenjId.id}
                data={fromFolderChalenjList}
                renderItem={({item, index}) => {
                  return (
                    <CardComponent
                      chalenjName={item.name}
                      chalenjRefresh={item.refresh_button}
                      chalenjLogo={item.chalenj_logo}
                      chalenjuname={item.uname}
                      chalenjDisplaytype={item.display_type}
                      chalenjProg={item.persentage}
                      onChalenjClick={() => {
                        console.log('name - ' + item.name);
                        // manage view for view actions
                        setActionViewVisible(true);
                      }}
                      onPreviewClick={() => {
                        // manage view for view actions
                        // setActionViewVisible(true);
                      }}
                      onMoveClick={() => {
                        // manage view for view actions
                        callMoveToFolder(item.id, item.display_type);
                      }}
                      onDeletePreviewChalenj={() => {
                        // manage view for view actions
                        callDeletePreviewChalenjApi(item.id);
                      }}
                      onRefreshChalenj={() => {
                        callRefreshChalenjApi(item.id, item.display_type);
                      }}
                    />
                  );
                }}
              />
            )}

            {clickStatas ? (
              <SideMenuComponent
                onClosePressCallback={() => {
                  setClickStatas(false);
                }}
                onCreateNewPressCallback={() => {
                  callNew();
                }}
                onEditPressCallback={() => {
                  callNewEdit();
                }}
                onDeletePressCallback={() => {
                  callFolderDelete();
                }}
                onCreateChalenjPressCallback={() => {
                  loadInBrowser();
                }}
                onLogoutPressCallback={() => {
                  logoutCall();
                }}
              />
            ) : (
              <View></View>
            )}
          </LinearGradient>

          {/* This BS is for create folder */}
          <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}>
            <View style={styles.bottomNavigationView}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 20,
                  marginStart: 10,
                }}>
                Create Folder
              </Text>
              <View style={{width: '100%', marginTop: 20}}>
                <Inputcomponent
                  style={{height: 60}}
                  hideInput={false}
                  placeHolderText="Enter folder name"
                  inputValue={folderName}
                  onInputChange={newFolder => setFolderName(newFolder)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  marginTop: 5,
                }}>
                <View style={{flex: 1, marginEnd: 5}}>
                  <ButtonComponent
                    borderColor="#fff"
                    bgColor="#252635"
                    textColor="#ffffff"
                    title="Cancle"
                    showIcon={false}
                    onPressCallback={() => toggleBottomNavigationView()}
                  />
                </View>
                <View style={{flex: 1, marginStart: 5}}>
                  <ButtonComponent
                    borderColor="#fff"
                    bgColor="#e06e34"
                    textColor="#ffffff"
                    title="OK"
                    showIcon={false}
                    onPressCallback={() => callCreateFolderApi('create')}
                  />
                </View>
              </View>
            </View>
          </BottomSheet>

          {/* This BS is for showing folder list */}
          <BottomSheet
            visible={visibleFolderToMove}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleFolderToMoveView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleFolderToMoveView}>
            <View style={styles.MoveToFolderView}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 20,
                  marginStart: 10,
                }}>
                Move to folder
              </Text>
              <View style={{width: '100%', marginTop: 10}}>
                <FlatList
                  style={{height: 250}}
                  keyExtractor={folderId => folderId.id}
                  data={moveToFolder}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          marginBottom: 5,
                          padding: 10,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRadius: 5,
                        }}
                        activeOpacity={0.5}
                        onPress={() => callMoveChalenjApi(item.id)}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 12,
                            color: 'black',
                          }}>
                          {item.file_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  marginTop: 5,
                }}>
                <View style={{flex: 1, marginEnd: 5}}>
                  <ButtonComponent
                    borderColor="#fff"
                    bgColor="#252635"
                    textColor="#ffffff"
                    title="Close"
                    showIcon={false}
                    onPressCallback={() => toggleFolderToMoveView()}
                  />
                </View>
              </View>
            </View>
          </BottomSheet>

          {/* this is Update */}

          {/* This BS is for showing folder list to edit or delete */}
          <BottomSheet
            visible={visibleFolderToEdit}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleFolderToEditView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleFolderToEditView}>
            <View style={styles.EditToFolderView}>
              {actionForFolder == 'edit' ? (
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'flex-start',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginStart: 10,
                    marginTop: 15,
                  }}>
                  Select Folder to edit
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'flex-start',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginStart: 10,
                    marginTop: 15,
                  }}>
                  Select Folder to delete
                </Text>
              )}

              <View
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  width: '100%',
                  paddingVertical: 5,
                }}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {
                      borderColor: 'black',
                    },
                  ]}
                  itemTextStyle={{
                    color: 'black',
                    paddingVertical: 5,
                    marginTop: -15,
                    marginBottom: -15,
                    paddingHorizontal: 5,
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: 'black',
                    fontSize: 12,
                  }}
                  containerStyle={{backgroundColor: 'white', marginBottom: 10}}
                  activeColor={{backgroundColor: 'red'}}
                  placeholderStyle={{fontSize: 13, color: 'black'}}
                  selectedTextStyle={{
                    fontSize: 13,
                    color: 'black',
                  }}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={moveToFolder}
                  search
                  maxHeight={200}
                  labelField="file_name"
                  valueField="id"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log('dropvale--', value, value);
                    setFolderName(item.file_name);
                    setFolderId(item.id);
                    setValue(item.id);
                    setIsFocus(false);
                  }}
                />
              </View>
              {actionForFolder == 'edit' ? (
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.InputStyle}
                  value={folderName}
                  onChangeText={newfoldername => setFolderName(newfoldername)}
                  textColor="black"
                />
              ) : (
                <View></View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flex: 1, marginEnd: 5}}>
                  <ButtonComponent
                    borderColor="#fff"
                    bgColor="#252635"
                    textColor="#ffffff"
                    title="Cancle"
                    showIcon={false}
                    onPressCallback={() => toggleFolderToEditView()}
                  />
                </View>
                {actionForFolder == 'edit' ? (
                  <View style={{flex: 1, marginStart: 5}}>
                    <ButtonComponent
                      borderColor="#fff"
                      bgColor="#e06e34"
                      textColor="#ffffff"
                      title="Update"
                      showIcon={false}
                      onPressCallback={() => callCreateFolderApi('edit')}
                    />
                  </View>
                ) : (
                  <View style={{flex: 1, marginStart: 5}}>
                    <ButtonComponent
                      borderColor="#fff"
                      bgColor="#e06e34"
                      textColor="#ffffff"
                      title="Delete"
                      showIcon={false}
                      onPressCallback={() => callCreateFolderApi('delete')}
                    />
                  </View>
                )}
              </View>
            </View>
          </BottomSheet>

          {/* 
          
          <BottomSheet
            wrapperStyle={{backgroundColor: '#252635'}}
            animationDuration={50}
            sliderMinHeight={0}
            isOpen={false}
            onClose={() => console.log('close')}
            ref={ref => (panelRefDelete.current = ref)}>
            <View>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                Select Folder to delete
              </Text>
              <View
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: 'white', color: 'black'},
                  ]}
                  containerStyle={{backgroundColor: 'black'}}
                  activeColor={{backgroundColor: 'red'}}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  marginTop: 5,
                }}>
                <View style={{flex: 1, marginEnd: 5}}>
                  <ButtonComponent
                    borderColor="#fff"
                    bgColor="#252635"
                    textColor="#ffffff"
                    title="Cancle"
                    showIcon={false}
                    onPressCallback={() => panelRefDelete.current.togglePanel()}
                  />
                </View>
                <View style={{flex: 1, marginStart: 5}}>
                  <ButtonComponent
                    borderColor="#fff"
                    bgColor="#e06e34"
                    textColor="#ffffff"
                    title="Delete"
                    showIcon={false}
                    onPressCallback={() => console.log('Pressed')}
                  />
                </View>
              </View>
            </View>
          </BottomSheet> */}
        </SafeAreaView>
      )}

      {/* For progressbar pop up */}
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
  InputStyle: {
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: 45,
    marginTop: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: 'black',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: 800,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 20,
  },
  MoveToFolderView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 20,
  },
  EditToFolderView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 20,
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
  ActionHeaderStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'space-between',
    elevation: 10,
    height: 70,
    flexDirection: 'row',
  },
  ActionImageStyle: {
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  ActionImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  HeaderStyle: {
    height: 80,
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'center',
    elevation: 10,
  },
  linearGradient: {
    flex: 1,
  },
  ImageStyle: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
  BackImageStyle: {
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
export default ChalenjPage;
