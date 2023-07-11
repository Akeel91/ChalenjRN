import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  ToastAndroid,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import {useSelector} from 'react-redux';
const {convert} = require('html-to-text');

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(' ' + msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert('' + msg);
  }
}
const UploadDocChalenj = () => {
  const [fileResponse, setFileResponse] = useState([]);
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse[0].name, options);
  const descText = convert(apiResp.apiResponse[0].description, options);
  const name = nameText.trim();
  const description = descText.trim();

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      notifyMessage(response[0].uri);
      console.log(JSON.stringify(response));
      setFileResponse(response);
    } catch (err) {
      // console.warn(err);
      notifyMessage(err);
    }
  }, []);

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
                fontSize: 14,
                color: 'white',
              }}>
              {description}
            </Text>

            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/docs.png')}
                bgColor="#e06e34"
                btnTitle="Browse Your Documents"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  console.log('Doc--');

                  handleDocumentSelection();
                }}
              />
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

export default UploadDocChalenj;
