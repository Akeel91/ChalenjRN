import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
const ButtonWithIcon = ({
  btnIcon,
  bgColor,
  btnTitle,
  btnTitleColor,
  onPressCallback,
}) => {
  return (
    // This view is using to show the Instruction and list type chalenj's

    <TouchableOpacity onPress={() => onPressCallback()}>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: bgColor,
          height: 55,
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: 55,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            width: 60,
            flexDirection: 'row',
          }}>
          <Image
            style={{width: 28, height: 28, alignSelf: 'center', marginTop: 5}}
            source={btnIcon}
          />
        </View>

        <View style={{height: 55, width: 1, backgroundColor: 'green'}}></View>

        <View
          style={{
            height: 55,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            padding: 12,
            flexDirection: 'row',
            flex: 1,
            marginStart: 30,
          }}>
          <Text
            style={{
              color: btnTitleColor,
              alignSelf: 'center',
              marginStart: 10,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {btnTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
export default ButtonWithIcon;
