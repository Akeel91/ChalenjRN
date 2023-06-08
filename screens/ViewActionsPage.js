import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const ViewActionsPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.HeaderStyle}>
        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.ImageStyleCenter}
        />

        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.navigate('HelpPage');
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
          <View></View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  HeaderStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'space-between',
    elevation: 10,
    height: 70,
    flexDirection: 'row',
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  ImageStyle: {
    alignSelf: 'center',
    marginHorizontal: 20,
  },
});
export default ViewActionsPage;
