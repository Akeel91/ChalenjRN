import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const SimpleButton = ({
  titleText,
  onPressCallback,
  buttonWidth,
  bgColor,
  btnTextColor,
}) => {
  return (
    console.log('bgColorSB--' + bgColor + ' ' + btnTextColor),
    (
      <TouchableOpacity
        style={{
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          width: buttonWidth,
          height: 40,
          alignSelf: 'center',
        }}
        onPress={() => onPressCallback()}>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 12,
            fontWeight: 'bold',
            color: btnTextColor,
            paddingHorizontal: 10,
            paddingVertical: 7,
          }}>
          {titleText}
        </Text>
      </TouchableOpacity>
    )
  );
};

export default SimpleButton;
