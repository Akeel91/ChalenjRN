import React from 'react';
import {Card} from 'react-native-paper';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ListComponent = ({imageTop, title, onPressCallback}) => {
  console.log(imageTop);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => console.log('Press')}>
        <View style={style.cardStyle}>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{width: 60, height: 60, alignSelf: 'center'}}
            />
            <View style={{alignSelf: 'center', marginStart: 15, flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Title
              </Text>
              <Text
                style={{
                  color: '#808080',
                  fontWeight: 600,
                  fontSize: 14,
                }}>
                Description
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  cardStyle: {
    width: '90%',
    height: 90,
    borderRadius: 7,
    backgroundColor: '#d8ebfa',
    marginTop: 20,
    alignSelf: 'center',
    elevation: 4,
    justifyContent: 'center',
  },
});

export default ListComponent;
