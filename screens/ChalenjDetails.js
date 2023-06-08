import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../components/HeaderComponent';
import Inputcomponent from '../components/InputTypeComponent';
import ChalenjItem from '../components/rowChalenjItem';
import SideMenuComponent from '../components/SideMenuComponent';
const ChalenjDetailsPage = ({navigation}) => {
  const [clickStatas, setClickStatas] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [searchClick, setSearchClick] = useState(false);

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
  const friendList = [
    {fname: 'Frnd 1'},
    {fname: 'Frnd 2'},
    {fname: 'Frnd 3'},
    {fname: 'Frnd 4'},
    {fname: 'Frnd 5'},
    {fname: 'Frnd 6'},
    {fname: 'Frnd 8'},
    {fname: 'Frnd 9'},
    {fname: 'Frnd 10'},
    {fname: 'Frnd 11'},
    {fname: 'Frnd 12'},
    {fname: 'Frnd 13'},
    {fname: 'Frnd 14'},
    {fname: 'Frnd 15'},
    {fname: 'Frnd 16'},
  ];
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

        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          keyExtractor={frndname => frndname.fname}
          data={friendList}
          renderItem={({item}) => {
            return (
              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <ChalenjItem
                  onChalenjOpenClick={() =>
                    navigation.navigate('ChalenjActionPage')
                  }
                />
              </View>
            );
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ChalenjDetailsPage;
