import React from 'react';
import {Card} from 'react-native-paper';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ListComponent = ({
  childStatus,
  instStep,
  type,
  imageTop,
  title,
  onPressCallback,
}) => {
  console.log(type);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => onPressCallback()}>
        <View style={style.cardStyle}>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'column'}}>
              {type == 'instlistchalenj' ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'black',
                    fontSize: 10,
                    marginBottom: 4,
                  }}>
                  STEP {instStep}
                </Text>
              ) : null}
              <Image
                source={imageTop}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  alignSelf: 'center',
                  resizeMode: 'stretch',
                }}
              />
              {type == 'instlistchalenj' && childStatus == true ? (
                <Image
                  source={require('../assets/icons/dots.png')}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                    resizeMode: 'stretch',
                  }}
                />
              ) : null}
            </View>

            <View style={{alignSelf: 'center', marginStart: 15, flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {title}
              </Text>
              {type == 'listchalenj' || 'instlistchalenj' ? null : (
                <Text
                  style={{
                    color: '#808080',
                    fontWeight: 600,
                    fontSize: 14,
                  }}>
                  Description
                </Text>
              )}
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
    marginTop: 10,
    alignSelf: 'center',
    elevation: 4,
    justifyContent: 'center',
  },
});

export default ListComponent;
