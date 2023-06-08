import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OptionMenuPage = ({imageTop, title, onPressCallback}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPressCallback()}>
      <View
        style={{
          width: 150,
          marginTop: 20,
          alignSelf: 'center',
        }}>
        <View style={{alignSelf: 'center'}}>
          <Image source={imageTop} style={styles.ImageStyleIcon} />
          <Text
            style={{
              fontSize: 12,
              marginTop: 10,
              marginBottom: 5,
              color: 'black',
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#D3D3D3',
            height: 1,
            flex: 2,
          }}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageStyleIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
export default OptionMenuPage;
