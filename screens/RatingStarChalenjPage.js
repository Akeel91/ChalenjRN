import React, {useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/buttonComponent';
const {convert} = require('html-to-text');
import {useSelector} from 'react-redux';

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(' ' + msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert('' + msg);
  }
}

const RatingStarChalenj = () => {
  const [starRating, setStarRating] = useState(0);
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

  console.log('clickedRating-' + starRating);
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
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => setStarRating(1)}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 1
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => setStarRating(2)}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 2
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => setStarRating(3)}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 3
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => setStarRating(4)}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 4
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginEnd: 5}}
                    onPress={() => setStarRating(5)}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={
                        starRating >= 5
                          ? require('../assets/icons/ic_star_selected.png')
                          : require('../assets/icons/ic_star_unselected.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
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

export default RatingStarChalenj;
