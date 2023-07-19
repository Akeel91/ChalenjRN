import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import ButtonComponent from '../components/buttonComponent';
const {convert} = require('html-to-text');

const AddNoteChalenj = () => {
  const [message, setmessage] = useState('');
  const apiResp = useSelector(state => state.apiRes);
  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse.name, options);
  const descText = convert(apiResp.apiResponse.description, options);
  const taskStatus = apiResp.apiResponse.task_status;
  const taskContent = apiResp.apiResponse.ts_content;
  const name = nameText.trim();
  const description = descText.trim();

  const getInputData = () => {
    console.log('Message-- ' + message);
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
                fontSize: 14,
                color: 'white',
              }}>
              {description}
            </Text>

            <View style={{marginTop: 20}}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.InputStyle}
                placeholder="Enter note here"
                value={taskStatus == 1 ? taskContent : message}
                onChangeText={newmessage => setmessage(newmessage)}
                placeholderTextColor="#8f9392"
                numberOfLines={5}
                textAlignVertical="top"
                editable={taskStatus == 1 ? false : true}
                multiline={true}
                defaultValue="AAAA"
              />
            </View>

            {message.length > 0 && taskStatus == 0 ? (
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

export default AddNoteChalenj;
