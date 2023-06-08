import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Modal} from 'react-native-paper';
import ButtonComponent from '../components/buttonComponent';
import ButtonWithIcon from '../components/ButtonWithIconComponent';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../constant/PermissionConstant';

const UploadImageChalenj = () => {
  const navigation = useNavigation();
  const [showImageOpt, setShowImageOpt] = useState(false);

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        try {
          console.log('Response = ', response.assets[0].uri);
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
        } catch (err) {
          // console.warn(err);
          // alert('Write permission err', err);
        }
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      try {
        console.log('Response = ', response.assets[0].uri);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
      } catch (err) {
        // console.warn(err);
        // alert('Write permission err', err);
      }
    });
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
              Upload Image Chalenj Description.
            </Text>

            <View style={{marginTop: 20}}>
              <ButtonWithIcon
                btnIcon={require('../assets/icons/ic_image_ph.png')}
                bgColor="#e06e34"
                btnTitle="Upload Image"
                btnTitleColor="#fff"
                onPressCallback={() => {
                  setShowImageOpt(true);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      {/* For image picker options */}
      <Modal
        style={{marginTop: -50}}
        animationType="slide"
        transparent={true}
        visible={showImageOpt}
        onRequestClose={() => {
          setShowImageOpt(!showImageOpt);
        }}>
        <View style={styles.modalViewOpt}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                marginTop: 15,
                marginEnd: 50,
                marginStart: 18,
                marginTop: 20,
              }}>
              Select your option
            </Text>

            <TouchableOpacity
              style={{marginHorizontal: 23}}
              onPress={() => {
                chooseFile('photo'), setShowImageOpt(!showImageOpt);
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginTop: 25,
                }}>
                Select your image from gallary.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginHorizontal: 23, marginBottom: 20}}
              onPress={() => {
                captureImage('photo'), setShowImageOpt(!showImageOpt);
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginTop: 15,
                }}>
                Capture your image.
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: '60%',
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <ButtonComponent
                bgColor="#e06e34"
                textColor="#ffffff"
                title="Cancel"
                showIcon={false}
                onPressCallback={() => setShowImageOpt(!showImageOpt)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalViewOpt: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default UploadImageChalenj;
