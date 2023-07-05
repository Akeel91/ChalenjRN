import React from 'react';
import {Card} from 'react-native-paper';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const CardComponent = ({
  chalenjName,
  chalenjRefresh,
  chalenjLogo,
  chalenjuname,
  chalenjDisplaytype,
  chalenjProg,
  onChalenjClick,
  onPreviewClick,
  onMoveClick,
  onDeletePreviewChalenj,
  onRefreshChalenj,
}) => {
  console.log(
    'listData--',
    chalenjName,
    chalenjRefresh,
    chalenjLogo,
    chalenjuname,
    chalenjDisplaytype,
  );

  let chalenjProgress = Math.round(chalenjProg);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onChalenjClick()}>
        <View style={style.cardStyle}>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
            }}>
            <View style={{alignSelf: 'center', width: 65}}>
              <Image
                source={{uri: chalenjLogo}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 7,
                  alignSelf: 'center',
                  marginLeft: -10,
                }}
              />

              {chalenjDisplaytype == 'preview' ? (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    marginTop: -10,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    height: 30,
                    width: 30,
                  }}
                  activeOpacity={0.8}
                  onPress={() => onPreviewClick()}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 22,
                      width: 22,
                      elevation: 10,
                      borderRadius: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/eye_preview.png')}
                      style={{alignSelf: 'center', width: 17, height: 17}}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View>
            <View style={{alignSelf: 'center', marginStart: 15, flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {chalenjName}
              </Text>
              <Text
                style={{
                  color: '#808080',
                  fontWeight: 600,
                  fontSize: 14,
                }}>
                {chalenjuname}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.8}
                  onPress={() => onMoveClick()}>
                  <Image
                    source={require('../assets/icons/c_plus.png')}
                    style={{alignSelf: 'center', width: 22, height: 22}}
                  />
                </TouchableOpacity>

                {chalenjRefresh ? (
                  <TouchableOpacity
                    style={{
                      width: 35,
                      height: 35,
                      justifyContent: 'center',

                      marginStart: 5,
                    }}
                    activeOpacity={0.8}
                    onPress={() => onRefreshChalenj()}>
                    <Image
                      source={require('../assets/icons/c_refresh.png')}
                      style={{
                        width: 22,
                        height: 22,
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
                {chalenjDisplaytype == 'preview' ? (
                  <TouchableOpacity
                    style={{
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      marginStart: 5,
                    }}
                    activeOpacity={0.8}
                    onPress={() => onDeletePreviewChalenj()}>
                    <Image
                      source={require('../assets/icons/c_delete.png')}
                      style={{
                        width: 22,
                        height: 22,
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            </View>

            {chalenjProg == 100 ? (
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../assets/images/green_tick.png')}
                  style={{
                    width: 45,
                    height: 45,
                    alignSelf: 'center',
                    alignSelf: 'flex-end',
                  }}
                />
              </View>
            ) : chalenjProg == 0 ? (
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../assets/images/playbutton.png')}
                  style={{
                    width: 45,
                    height: 45,
                    alignSelf: 'center',
                    alignSelf: 'flex-end',
                  }}
                />
              </View>
            ) : (
              <View style={{justifyContent: 'center', paddingRight: 5}}>
                <AnimatedCircularProgress
                  size={43}
                  width={5}
                  fill={chalenjProgress}
                  tintColor="#e06e34"
                  rotation={360}
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#3d5875">
                  {fill => (
                    <Text style={{fontSize: 11, color: 'black'}}>
                      {chalenjProgress}%
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  cardStyle: {
    width: '90%',
    height: 130,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginTop: 20,
    alignSelf: 'center',
    elevation: 4,
    justifyContent: 'center',
  },
  cardTopStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: -50,
  },
});

export default CardComponent;
