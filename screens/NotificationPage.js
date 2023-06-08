import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ListComponent from '../components/rowListComponent';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const NotificationPage = ({navigation}) => {
  const dataList = [
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
      <View style={styles.HeaderStyle}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.ImageStyleCenter}
        />

        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/cross.png')}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={styles.linearGradient}>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={frndname => frndname.fname}
            data={dataList}
            renderItem={({item}) => {
              return <ListComponent />;
            }}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ImageStyleLeft: {
    width: 30,
    height: 30,
  },
  ImageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  HeaderStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'center',
    elevation: 10,
    height: 70,
  },

  linearGradient: {
    flex: 1,
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
});

export default NotificationPage;
