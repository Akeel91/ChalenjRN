import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from 'react-native';

const PasswordInputcomponent = ({
  hideInput,
  placeHolderText,
  inputValue,
  onInputChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  console.log(passwordVisible);
  return (
    <View style={style.InputStyle}>
      <TextInput
        style={{
          flex: 1,
          alignSelf: 'center',
          marginHorizontal: 10,
          color: 'white',
        }}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeHolderText}
        value={inputValue}
        onChangeText={onInputChange}
        placeholderTextColor="#8f9392"
        secureTextEntry={passwordVisible}
      />

      <TouchableOpacity
        onPress={
          passwordVisible
            ? passwordVisible => setPasswordVisible(false)
            : passwordVisible => setPasswordVisible(true)
        }
        style={{alignSelf: 'center'}}
        activeOpacity={0.8}>
        <Image
          source={
            passwordVisible
              ? require('../assets/icons/ic_hidepassword.png')
              : require('../assets/icons/ic_showpassword.png')
          }
          style={{
            height: 25,
            width: 25,
            alignSelf: 'center',
            tintColor: 'white',
            marginEnd: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  InputStyle: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: '#171b26',
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default PasswordInputcomponent;
