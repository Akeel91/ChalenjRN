import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const HorizontalRatingComponent = ({
  titleText,
  onPressCallback,
  bgColor,
  btnTextColor,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressCallback()}
      style={{
        height: 40,
        width: 40,
        backgroundColor: bgColor,
        elevation: 5,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: btnTextColor,
          fontSize: 16,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        {titleText}
      </Text>
    </TouchableOpacity>
  );
};

export default HorizontalRatingComponent;
