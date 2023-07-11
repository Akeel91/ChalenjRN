import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import CheckBox from 'react-native-check-box';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');

const QuizChalengPage = () => {
  const [myCheckBox, setMyCheckBoxChecked] = useState([]);
  const inputChecked = [];
  const quizAnswer = [
    {answer: 'w'},
    {answer: 'w'},
    {answer: 'r'},
    {answer: 'w'},
    {answer: 'w'},
  ];
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse[0].name, options);
  const descText = convert(apiResp.apiResponse[0].description, options);
  const questiontext = convert(
    apiResp.apiResponse[0].question.question,
    options,
  );
  const name = nameText.trim();
  const description = descText.trim();
  const chalenjQuestion = questiontext.trim();

  console.log('apiRespds--', apiResp.apiResponse[0].question.answer.length);

  function addCheckBox(numberOfInputs) {
    let cloneArray = [...myCheckBox];
    for (let i = 0; i < numberOfInputs; i++) {
      cloneArray.push({checked: false});
      console.log('cloneArray ' + JSON.stringify(cloneArray));
    }
    setMyCheckBoxChecked(cloneArray);
  }
  useEffect(() => {
    addCheckBox(apiResp.apiResponse[0].question.answer.length);
  }, []);

  const toggleCheckBox = (checked, index) => {
    console.log('cccc= ' + checked, index);
    let updateInput = myCheckBox.map((item, i) => {
      if (index == i) {
        return {...item, checked: checked};
      } else {
        return {...item, checked: false};
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

  const getCheckedData = () => {
    console.log('size-- ' + JSON.stringify(myCheckBox));

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
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
              {name}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 13,
                color: 'white',
              }}>
              {description}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'white',
                marginTop: 15,
              }}>
              {chalenjQuestion}
            </Text>
            {myCheckBox.map((val, i) => {
              return (
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      val.checked
                        ? toggleCheckBox(false, i)
                        : toggleCheckBox(true, i);
                    }}
                    style={{
                      height: 50,
                      borderRadius: 5,
                      backgroundColor: val.checked ? '#e06e34' : '#d6d6d6',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {val.checked ? (
                        <Image
                          key={String(i)}
                          style={{
                            width: 20,
                            borderWidth: 1,

                            height: 20,
                          }}
                          source={
                            quizAnswer[i].answer == 'w'
                              ? require('../assets/icons/ic_close.png')
                              : require('../assets/icons/ic_tick_w.png')
                          }
                        />
                      ) : (
                        <View></View>
                      )}
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.QuizTitleStyle}>
                        {apiResp.apiResponse[0].question.answer[i].answer}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {val.checked ? (
                    <View
                      key={String(i)}
                      style={{
                        backgroundColor: 'white',
                        marginTop: 3,
                        justifyContent: 'center',
                        padding: 15,
                        borderRadius: 4,
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
                  onPressCallback={() => getCheckedData()}
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

const styles = StyleSheet.create({
  QuizTitleStyle: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginStart: 12,
  },
});

export default QuizChalengPage;
