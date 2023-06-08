import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
const HeaderComponent = ({
  leftIcon,
  onMenuPressCallback,
  onSearchPressCallback,
  onMsgPressCallback,
  onHelpPressCallback,
}) => {
  return (
    <View style={styles.headerStyle}>
      <View
        style={{
          height: 10,
          width: '100%',
          flex: 1,
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.ImageStyleLogo}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          onMenuPressCallback();
        }}
        style={{marginLeft: 10, alignSelf: 'center'}}>
        <Image source={leftIcon} style={styles.ImageStyleLeft} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.ImageStyleRight}
          onPress={() => {
            onSearchPressCallback();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/ic_search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ImageStyleRight}
          onPress={() => {
            onMsgPressCallback();
          }}>
          <Image
            style={{alignSelf: 'center', width: 27, height: 27}}
            source={require('../assets/icons/ic_bell.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ImageStyleRight}
          onPress={() => {
            onHelpPressCallback();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/images/help_icon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#252635', //Set Header color
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
  },
  ImageStyleLeft: {
    width: 30,
    height: 30,
  },
  logoContainerStyle: {
    justifyContent: 'center',
    flex: 1,
  },
  ImageStyleLogo: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  ImageStyleRight: {
    width: 30,
    height: 30,
    marginEnd: 15,
    alignSelf: 'center',
  },
});

export default HeaderComponent;
