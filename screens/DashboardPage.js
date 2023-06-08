import React, {useContext, useEffect, useRef, useState} from 'react';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
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

// var clickStatus = false;
export const CallMenu = clickStatus => {};

const DashboardPage = ({navigation}) => {
  const [clickStatas, setClickStatas] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [searchClick, setSearchClick] = useState(false);
  const panelRef = useRef(null);
  const panelRefEdit = useRef(null);
  const panelRefDelete = useRef(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  function callNew() {
    console.log('calling');
    panelRef.current.togglePanel();
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
    navigation.reset({
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
        onMsgPressCallback={() => navigation.navigate('NotificationPage')}
        onHelpPressCallback={() => navigation.navigate('HelpPage')}
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 20,
              }}>
              <SimpleButton
                titleText="Active"
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
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 10,
              }}>
              <SimpleButton
                titleText="Completed"
                onPressCallback={() => {
                  //   setclickedBtn('pp'),
                  //     setButtonColorDP('#fff'),
                  //     setButtonColorPP('#e06e34'),
                  //     setButtonColorTnC('#fff'),
                  //     setButtonColorTextDP('#e06e34'),
                  //     setButtonColorTextPP('#fff'),
                  //     setButtonColorTextTnC('#e06e34');
                  //   console.log('Privacy : ' + clickedBtn);
                }}
                buttonWidth="100%"
                bgColor="#fff"
                btnTextColor="#e06e34"
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingStart: 10,
                paddingEnd: 20,
              }}>
              <SimpleButton
                titleText="Custom"
                onPressCallback={() => {
                  //   setclickedBtn('dp'),
                  //     setButtonColorDP('#e06e34'),
                  //     setButtonColorPP('#fff'),
                  //     setButtonColorTnC('#fff'),
                  //     setButtonColorTextDP('#fff'),
                  //     setButtonColorTextPP('#e06e34'),
                  //     setButtonColorTextTnC('#e06e34');
                  //   console.log('Data : ' + clickedBtn);
                }}
                buttonWidth="100%"
                bgColor="#fff"
                btnTextColor="#e06e34"
              />
            </View>
          </ScrollView>
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          keyExtractor={frndname => frndname.fname}
          data={friendList}
          renderItem={({item}) => {
            return (
              <CardComponent
                onChalenjClick={() => {
                  navigation.navigate('ChalenjDetails');
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
        wrapperStyle={{backgroundColor: '#252635'}}
        animationDuration={50}
        sliderMinHeight={0}
        isOpen={false}
        ref={ref => (panelRef.current = ref)}>
        <View>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Create Folder
          </Text>
          <View style={{marginTop: 20}}>
            <Inputcomponent
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
                onPressCallback={() => panelRef.current.togglePanel()}
              />
            </View>
            <View style={{flex: 1, marginStart: 5}}>
              <ButtonComponent
                borderColor="#fff"
                bgColor="#e06e34"
                textColor="#ffffff"
                title="OK"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
