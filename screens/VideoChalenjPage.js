import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
const {convert} = require('html-to-text');
import {useSelector} from 'react-redux';

const VideoChalenjPage = () => {
  const [message, setmessage] = useState('');
  const apiResp = useSelector(state => state.apiRes);

  const options = {
    wordwrap: false,
    // ...
  };
  const nameText = convert(apiResp.apiResponse[0].name, options);
  const descText = convert(apiResp.apiResponse[0].description, options);
  const video_url = apiResp.apiResponse[0].content;
  const name = nameText.trim();
  const description = descText.trim();

  const videoURL = video_url.replace(
    'width="560" height="315"',
    'width="100%" height="100%"',
  );
  console.log('videourl---', videoURL);
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
              <View style={{}}>
                <WebView
                  style={{width: '100%', height: 220}}
                  originWhitelist={['*']}
                  source={{
                    html: videoURL,
                  }}
                />

                {/* <YoutubePlayer
                  height={210}
                  play={true}
                  videoId={'84WIaK3bl_s'}
                  
                /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default VideoChalenjPage;
