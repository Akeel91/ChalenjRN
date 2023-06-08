import React from 'react';
import {View} from 'react-native';

const CustomBottomBar = () => {
  return (
    <View
      style={{
        height: 48,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default CustomBottomBar;
