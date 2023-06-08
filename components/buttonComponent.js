import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

const ButtonComponent = ({
  borderColor,
  bgColor,
  textColor,
  title,
  showIcon,
  btnIcon,
  onPressCallback,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        marginTop: 15,

        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
      }}
      onPress={() => onPressCallback()}>
      {showIcon && <Image source={btnIcon} style={style.ImageStyle} />}

      <Text style={{fontSize: 13, fontWeight: 'bold', color: textColor}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  ImageStyle: {
    width: 20,
    height: 20,
    marginEnd: 20,
  },
});

export default ButtonComponent;
