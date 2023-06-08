import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardPage, {CallMenu} from '../screens/DashboardPage';
import ChalenjPage from '../screens/MyChalenjPage';
import ActionsPage from '../screens/ActionsPage';
import ProfilePage from '../screens/ProfilePage';
import AppContext from '../contextProvider/context';
import ChalenjDetailsPage from '../screens/ChalenjDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
var picURI = null;
const getData = async () => {
  try {
    picURI = await AsyncStorage.getItem('ProfilePic');
    console.log('ProfilePic---- ' + picURI);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

const BottomNavigationStack = ({navigation}) => {
  const [clickedMenu, setclickedMenu] = useState(true);
  // const {data, getClickStatus} = useContext(AppContext);

  const profilePic = useSelector(state => state.userProfile);
  const dispatch = useDispatch();
  console.log('ppppppp- ' + profilePic.profileImgPath);

  getData();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e06e34',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#252635', //Set Header color
          height: 70,
        },

        headerTitle: props => (
          <View>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.ImageStyleLogo}
            />
          </View>
        ),
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              clickedMenu ? setclickedMenu(false) : setclickedMenu(true);
              dispatch({type: 'clicked', payload: clickedMenu});
            }}
            style={{marginLeft: 10}}>
            <Image
              source={require('../assets/icons/menu.png')}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.ImageStyleRight}
              onPress={() => {
                navigation.navigate('HelpPage');
              }}>
              <Image
                style={{alignSelf: 'center', width: 30, height: 30}}
                source={require('../assets/icons/ic_search.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ImageStyleRight}
              onPress={() => {
                navigation.navigate('HelpPage');
              }}>
              <Image
                style={{alignSelf: 'center', width: 27, height: 27}}
                source={require('../assets/icons/ic_bell.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ImageStyleRight}
              onPress={() => {
                navigation.navigate('HelpPage');
              }}>
              <Image
                style={{alignSelf: 'center', width: 30, height: 30}}
                source={require('../assets/images/help_icon.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
      initialRouteName="DashboardPage">
      <Tab.Screen
        name="Explore"
        component={DashboardPage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                tintColor: color,
              }}
              source={require('../assets/icons/ic_explore.png')}
            />
          ),
          tabBarLabel: 'Explore',
        }}
      />
      <Tab.Screen
        name="My Chalenj"
        component={ChalenjPage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                tintColor: color,
              }}
              source={require('../assets/icons/ic_mychalenj.png')}
            />
          ),
          tabBarLabel: 'My Chalenj',
        }}
      />
      <Tab.Screen
        name="Actions"
        component={ChalenjDetailsPage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                tintColor: color,
              }}
              source={require('../assets/icons/ic_action.png')}
            />
          ),
          tabBarLabel: 'Actions',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{
                height: 33,
                borderColor: color,
                borderWidth: 1,
                width: 33,
                borderRadius: 50,
              }}
              source={
                (console.log('picURI--', picURI),
                profilePic.profileImgPath != null
                  ? {uri: profilePic.profileImgPath}
                  : require('../assets/images/pic_placeholder.png'))
              }
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    width: 30,
    height: 30,
  },
  ImageStyleLogo: {
    width: 45,
    height: 45,
  },
  ImageStyleRight: {
    width: 30,
    height: 30,
    marginEnd: 15,
  },
});
export default BottomNavigationStack;
