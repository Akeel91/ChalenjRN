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
import FormComponents from '../components/FormComponent';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');

const FormChalenjPage = () => {
  const [myTextInput, setMyTextInput] = useState([]);
  const inputValues = [];
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse[0].name, options);
  const descText = convert(apiResp.apiResponse[0].description, options);
  const name = nameText.trim();
  const description = descText.trim();

  function addInputText(numberOfInputs) {
    let cloneArray = [...myTextInput];
    for (let i = 0; i < numberOfInputs; i++) {
      cloneArray.push({text: ''});
      console.log('cloneArray ' + cloneArray);
    }
    setMyTextInput(cloneArray);
  }
  useEffect(() => {
    addInputText(apiResp.apiResponse[0].form_filed_data.length);
  }, []);

  const onChangeText = (text, index) => {
    let updateInput = myTextInput.map((item, i) => {
      if (index == i) {
        return {...item, text: text};
      }
      return item;
    });

    setMyTextInput(updateInput);
  };

  console.log('aaaa - ' + JSON.stringify(myTextInput));
  for (let i = 0; i < myTextInput.length; i++) {
    if (myTextInput[i].text != '') {
      inputValues.push({text: myTextInput[i].text});
    } else {
      console.log('empty');
    }
  }
  console.log('size-- ' + inputValues.length + ' ' + myTextInput.length);
  const getInputData = () => {
    console.log('size-- ' + inputValues.length + ' ' + myTextInput.length);
    // for (let i = 0; i < myTextInput.length; i++) {
    //   if (myTextInput[i].text == '') {
    //     Alert.alert('Fill all val');
    //   } else {
    //     console.log(myTextInput[i].text);
    //   }
    // }
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
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
              {name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 14,
                color: 'white',
              }}>
              {description}
            </Text>

            {myTextInput.map((val, i) => {
              return (
                <View style={{marginTop: 15}}>
                  <FormComponents
                    QuestionTitle={
                      apiResp.apiResponse[0].form_filed_data[i].field_text
                    }
                  />
                  <TextInput
                    value={val.text}
                    key={String(i)}
                    placeholder="Your Answer"
                    style={{
                      height: 45,
                      borderWidth: 1,
                      borderRadius: 50,
                      marginTop: 20,
                      paddingHorizontal: 15,
                      borderColor: 'white',
                    }}
                    onChangeText={text => onChangeText(text, i)}
                  />
                </View>
              );
            })}

            {inputValues.length == myTextInput.length ? (
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

export default FormChalenjPage;
