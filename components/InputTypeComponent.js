import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const Inputcomponent = ({
  hideInput,
  placeHolderText,
  inputValue,
  onInputChange,
}) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={style.InputStyle}
        placeholder={placeHolderText}
        value={inputValue}
        onChangeText={onInputChange}
        secureTextEntry={hideInput}
        placeholderTextColor="#8f9392"
      />
    </View>
  );
};

const style = StyleSheet.create({
  InputStyle: {
    height: 40,
    borderRadius: 50,
    backgroundColor: '#171b26',
    borderColor: 'white',
    borderWidth: 1,

    paddingHorizontal: 15,
    fontSize: 14,
    color: 'white',
  },
});

export default Inputcomponent;
