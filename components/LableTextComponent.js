import React from 'react';
import {View, Text} from 'react-native';

const LableComponent = ({
  lableText,
  lableColor,
  lablefontSize,
  lableTextFontWeight,
}) => {
  return (
    <View>
      <Text
        style={{
          color: lableColor,
          fontSize: lablefontSize,
          fontWeight: lableTextFontWeight,
        }}>
        {lableText}
      </Text>
    </View>
  );
};

export default LableComponent;
