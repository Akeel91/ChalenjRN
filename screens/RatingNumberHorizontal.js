import React, {useState} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import HorizontalRatingComponent from '../components/horizontalRatingComponent';
import {useSelector} from 'react-redux';

const {convert} = require('html-to-text');
function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(' ' + msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert('' + msg);
  }
}
const HorizoltalRatingPage = () => {
  const [clickedRating, setClickedRating] = useState('0');
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

  console.log('clickedRating-' + clickedRating);
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

            <View style={{marginTop: 20}}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                {chalenjQuestion}
              </Text>

              <View
                style={{
                  height: 100,
                  backgroundColor: '#3e3f48',
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  justifyContent: 'space-around',
                }}>
                <HorizontalRatingComponent
                  titleText="1"
                  onPressCallback={() => {
                    setClickedRating(1);
                  }}
                  bgColor={clickedRating == '1' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '1' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="2"
                  onPressCallback={() => {
                    setClickedRating('2');
                  }}
                  bgColor={clickedRating == '2' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '2' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="3"
                  onPressCallback={() => {
                    setClickedRating('3');
                  }}
                  bgColor={clickedRating == '3' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '3' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="4"
                  onPressCallback={() => {
                    setClickedRating('4');
                  }}
                  bgColor={clickedRating == '4' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '4' ? '#fff' : '#000'}
                />
                <HorizontalRatingComponent
                  titleText="5"
                  onPressCallback={() => {
                    setClickedRating('5');
                  }}
                  bgColor={clickedRating == '5' ? '#e06e34' : '#fff'}
                  btnTextColor={clickedRating == '5' ? '#fff' : '#000'}
                />
              </View>

              <View style={{marginTop: 20}}>
                <ButtonComponent
                  bgColor="#563410"
                  textColor="#fff"
                  title="Tap To Complete"
                  showIcon={true}
                  btnIcon={require('../assets/icons/ic_right_tick.png')}
                  onPressCallback={() => console.log('Pressed')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  InputStyle: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#171b26',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 14,
    color: 'white',
  },
});

export default HorizoltalRatingPage;
