import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoChalenjPage = () => {
  const [message, setmessage] = useState('');
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
              Video Chalenj Description.
            </Text>

            <View style={{marginTop: 20}}>
              <View style={{}}>
                <YoutubePlayer
                  height={210}
                  play={true}
                  videoId={'84WIaK3bl_s'}
                />
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
