import React, {useContext, useMemo, useEffect, useRef, useState} from 'react';
// import BottomSheet from 'react-native-simple-bottom-sheet';
import {BottomSheet} from 'react-native-btr';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  ToastAndroid,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SimpleButton from '../components/simpleButtonComponent';
import OptionMenuPage from '../components/OptionMenuComponent';
import CardComponent from '../components/CardConponent';
import Inputcomponent from '../components/InputTypeComponent';
import ButtonComponent from '../components/buttonComponent';
import HeaderComponent from '../components/HeaderComponent';
import SideMenuComponent from '../components/SideMenuComponent';
import {Modal} from 'react-native-paper';
import ApiConfig from '../AppNetwork/ApiConfig';

// var clickStatus = false;
export const CallMenu = clickStatus => {};

const DashboardPage = props => {
  const snapPoints = useMemo(() => ['25%'], []);

  const [clickStatas, setClickStatas] = useState(false);
  const [folderId, setFolderId] = useState('');
  const [folderName, setFolderName] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [searchClick, setSearchClick] = useState(false);
  const panelRef = useRef(null);
  const panelRefEdit = useRef(null);
  const panelRefDelete = useRef(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }

  const callCreateFolderApi = async type => {
    console.log('CreateFolder--', type, folderId, folderName);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
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
      console.log('regtoken- ', response.data.data.message);
      setLoading(false);
      toggleBottomNavigationView();
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

  const callGetFolderListApi = async () => {
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
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
      console.log('regtoken- ', response.data.data);
      setFolderList(response.data.data);
      setLoading(false);
      console.log('name ', response.data.data[0].name);
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
      callGetFolderListApi();
    }
  }, [props, isFocused]);

  function callNew() {
    console.log('calling');
    toggleBottomNavigationView();
    setClickStatas(false);
  }
  function callNewEdit() {
    console.log('calling');
    panelRefEdit.current.togglePanel();
    setClickStatas(false);
  }
  function callFolderDelete() {
    console.log('calling');
    panelRefDelete.current.togglePanel();
    setClickStatas(false);
  }
  function logoutCall() {
    // AsyncStorage.setItem('saveEmail', '');
    // AsyncStorage.setItem('savePassword', '');
    // AsyncStorage.setItem('isRememberMe', 'no');
    AsyncStorage.setItem('isLogin', 'no');
    props.navigation.reset({
      index: 0,
      routes: [{name: 'WelCome'}],
    });
  }
  const data = [
    {label: 'Folder 1', value: '1'},
    {label: 'Folder 2', value: '2'},
    {label: 'Folder 3', value: '3'},
  ];

  loadInBrowser = () => {
    Linking.openURL('https://dev.chalenj.com/author/dashboard').catch(err =>
      console.error("Couldn't load page", err),
    );
    setClickStatas(false);
  };
  const friendList = [
    {fname: 'Frnd 1'},
    {fname: 'Frnd 2'},
    {fname: 'Frnd 3'},
    {fname: 'Frnd 4'},
    {fname: 'Frnd 5'},
    {fname: 'Frnd 6'},
    {fname: 'Frnd 7'},
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        leftIcon={require('../assets/icons/menu.png')}
        onMenuPressCallback={() =>
          clickStatas ? setClickStatas(false) : setClickStatas(true)
        }
        onSearchPressCallback={() =>
          searchClick ? setSearchClick(false) : setSearchClick(true)
        }
        onMsgPressCallback={() => props.navigation.navigate('NotificationPage')}
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
                      //   setclickedBtn('tnc'),
                      //     setButtonColorDP('#fff'),
                      //     setButtonColorPP('#fff'),
                      //     setButtonColorTnC('#e06e34'),
                      //     setButtonColorTextDP('#e06e34'),
                      //     setButtonColorTextPP('#e06e34'),
                      //     setButtonColorTextTnC('#fff');
                      //   console.log('TnC : ' + clickedBtn + ' ' + buttonColorTnC);
                    }}
                    buttonWidth="100%"
                    bgColor="#fff"
                    btnTextColor="#e06e34"
                  />
                </View>
              );
            }}
          />
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          keyExtractor={frndname => frndname.fname}
          data={friendList}
          renderItem={({item}) => {
            return (
              <CardComponent
                onChalenjClick={() => {
                  props.navigation.navigate('ChalenjDetails');
                }}
              />
            );
          }}
        />
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

      <BottomSheet
        wrapperStyle={{backgroundColor: '#252635'}}
        animationDuration={50}
        sliderMinHeight={0}
        isOpen={false}
        ref={ref => (panelRefEdit.current = ref)}>
        <View>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Select Folder to edit
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
                onPressCallback={() => panelRefEdit.current.togglePanel()}
              />
            </View>
            <View style={{flex: 1, marginStart: 5}}>
              <ButtonComponent
                borderColor="#fff"
                bgColor="#e06e34"
                textColor="#ffffff"
                title="Update"
                showIcon={false}
                onPressCallback={() => console.log('Pressed')}
              />
            </View>
          </View>
        </View>
      </BottomSheet>

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
      </BottomSheet>
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
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
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
export default DashboardPage;
