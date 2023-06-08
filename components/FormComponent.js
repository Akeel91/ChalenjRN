import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Inputcomponent from './InputTypeComponent';
const FormComponents = ({QuestionTitle}) => {
  return (
    <View>
      <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
        {QuestionTitle}
      </Text>
    </View>
  );
};

export default FormComponents;
