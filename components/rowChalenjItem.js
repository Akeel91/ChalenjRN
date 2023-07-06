import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import moment from 'moment';
const ChalenjItem = ({
  taskDay,
  instStep,
  type,
  title,
  imageTop,
  bgColor,
  onPressCallback,
}) => {
  console.log('taskday--', taskDay);
  moment.locale();
  return (
    // This view is using to show the Instruction and list type chalenj's

    <TouchableOpacity onPress={() => onPressCallback()}>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#c1c0c0',
          height: 70,
        }}>
        {/*      
      <View
        style={{
          justifyContent: 'center',
          height: 70,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          padding: 12,
        }}>
        <Text style={{color: 'grey', fontSize: 12}}>STEP 1</Text>
        <Image
          style={{width: 30, height: 30, alignSelf: 'center', marginTop: 5}}
          source={require('../assets/images/logo.png')}
        />
      </View> */}

        {/* 
      This view is using to show the Date specific type chalenj's 
      */}

        {type == 'dateSpef' ? (
          <View
            style={{
              justifyContent: 'center',
              height: 70,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: bgColor,
              padding: 12,
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
              {moment(taskDay).format('DD')}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'white',
                alignSelf: 'center',
              }}>
              {moment(taskDay).format('MMM')}
            </Text>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              height: 70,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: '#573310', // will be dynamic just static for now
              padding: 12,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                justifyContent: 'center',
                alignSelf: 'center',
                height: 30,
                width: 30,
                borderRadius: 5,
                backgroundColor: '#573310',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {instStep}
              </Text>
            </View>
          </View>
        )}

        {/* 
      This view is using to show the Ref. type chalenj's 
      */}

        {/* <View
          style={{
            justifyContent: 'center',
            height: 70,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: '#e06e34',
            padding: 12,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
            30
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: 'white',
              alignSelf: 'center',
            }}>
            Mar
          </Text>
        </View> */}

        {/* 
      This view is using to show the all types of chalenj name with or without icon with
      */}

        <View
          style={{
            height: 70,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            padding: 7,
            flexDirection: 'row',
            flex: 1,
          }}>
          {type == 'dateSpef' ? (
            <Image
              style={{width: 18, height: 18, alignSelf: 'center'}}
              source={imageTop}
            />
          ) : null}

          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              marginStart: 10,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
export default ChalenjItem;
