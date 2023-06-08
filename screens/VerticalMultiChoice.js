import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import CheckBox from 'react-native-check-box';

const MultiChoiceVerticalPage = () => {
  const [myCheckBox, setMyCheckBoxChecked] = useState([]);

  const inputChecked = [];

  function addCheckBox(numberOfInputs) {
    let cloneArray = [...myCheckBox];
    for (let i = 0; i < numberOfInputs; i++) {
      cloneArray.push({checked: false});
      console.log('cloneArray ' + JSON.stringify(cloneArray));
    }
    setMyCheckBoxChecked(cloneArray);
  }
  useEffect(() => {
    addCheckBox(5);
  }, []);

  const toggleCheckBox = (checked, index) => {
    console.log('cccc= ' + checked, index);
    let updateInput = myCheckBox.map((item, i) => {
      if (index == i) {
        return {...item, checked: checked};
      }
      return item;
    });

    setMyCheckBoxChecked(updateInput);
  };

  console.log('aaaa - ' + JSON.stringify(myCheckBox));
  for (let i = 0; i < myCheckBox.length; i++) {
    if (myCheckBox[i].checked == true) {
      inputChecked.push({checked: true});
    } else {
      console.log('empty');
    }
  }
  console.log('size-- ' + inputChecked.length + ' ' + myCheckBox.length);

  const getInputData = () => {
    console.log('size-- ' + inputChecked.length + ' ' + myCheckBox.length);

    // call api here
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#1f2031', '#61626c']}
        style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
              Chalenj Title
            </Text>
            <Text
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 14,
                color: 'white',
              }}>
              Vertical List Chalenj Description.
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
                marginTop: 15,
              }}>
              Choice - Vertical List User can select more than one answer
            </Text>
            {myCheckBox.map((val, i) => {
              return (
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      height: 50,
                      borderRadius: 5,
                      backgroundColor: '#d6d6d6',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <CheckBox
                      key={String(i)}
                      onClick={() => {
                        val.checked
                          ? toggleCheckBox(false, i)
                          : toggleCheckBox(true, i);
                        console.log('checkedVal--' + JSON.stringify(val), i);
                      }}
                      rightText={'Poll 1'}
                      isChecked={val.checked}
                      disabled={false}
                      checkBoxColor="white"
                      checkedCheckBoxColor="#e06e34"
                      rightTextStyle={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                  {val.checked ? (
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginTop: 3,
                        justifyContent: 'center',
                        padding: 15,
                      }}>
                      <Text
                        key={String(i)}
                        style={{
                          fontSize: 13,
                          color: 'black',
                        }}>
                        Poll Description
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              );
            })}

            {inputChecked.length > 0 ? (
              <View style={{marginTop: 20}}>
                <ButtonComponent
                  bgColor="#563410"
                  textColor="#fff"
                  title="Tap To Complete"
                  showIcon={true}
                  btnIcon={require('../assets/icons/ic_right_tick.png')}
                  onPressCallback={() => getInputData()}
                />
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MultiChoiceVerticalPage;
