import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Modal} from 'react-native-paper';
const ProgressLoader = ({loading}) => {
  return (
    <View>
      {/* For QR pop up */}
      <Modal
        style={{alignItems: 'center'}}
        animationType="slide"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
        <View style={style.progressViewStyle}>
          <ActivityIndicator size="large" color="#e06e34" />
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  progressViewStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    width: 50,
    maxHeight: 50,
    alignItems: 'center',
    elevation: 5,
  },
});
export default ProgressLoader;
