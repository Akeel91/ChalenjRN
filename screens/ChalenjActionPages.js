import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddNoteChalenj from './AddNoteChalenjPage';
import FormChalenjPage from './FormChalenjPage';
import OpenCertificatePage from './OpenCertificatePage';
import OpenLinkChalenj from './OpenLinkChalenjPage';
import OpenPDFChalenj from './OpenPDFChalenjPage';
import PollChalenjPage from './PollChalenjPage';
import QRScanChalenj from './QRScanChalenjPage';
import QuizChalengPage from './QuizChalenjPage';
import HorizoltalRatingPage from './RatingNumberHorizontal';
import RatingStarChalenj from './RatingStarChalenjPage';
import SendEmailChalenj from './SendEmailChalenjPage';
import UploadDocChalenj from './UploadDocChalenjPage';
import UploadImageChalenj from './UploadImageChalenjPage';
import MultiChoiceVerticalPage from './VerticalMultiChoice';
import SingleChoiceVerticalPage from './VerticalSingleChoicePage';
import VideoChalenjPage from './VideoChalenjPage';

const ChalenjActionPage = ({navigation}) => {
  const [pageCount, setPageCount] = useState(1);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.HeaderStyle}>
        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.ImageStyleCenter}
        />

        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            navigation.navigate('HelpPage');
          }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 35}}
            source={require('../assets/images/help_icon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.PaginationStyle}>
        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            pageCount > 1 ? setPageCount(pageCount - 1) : setPageCount(1);
          }}>
          <Image
            style={{alignSelf: 'center', width: 30, height: 30}}
            source={require('../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={styles.PaginationTextStyle}>{pageCount}</Text>
          <Text style={styles.PaginationTextStyle}>/</Text>
          <Text style={styles.PaginationTextStyle}>15</Text>
        </View>
        <TouchableOpacity
          style={styles.ImageStyle}
          onPress={() => {
            pageCount < 15 ? setPageCount(pageCount + 1) : setPageCount(15);
          }}>
          <Image
            style={{
              alignSelf: 'center',
              width: 30,
              height: 30,
              transform: [{rotate: '180deg'}],
            }}
            source={require('../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
      </View>

      {pageCount == 1 && <QuizChalengPage />}
      {pageCount == 2 && <SingleChoiceVerticalPage />}
      {pageCount == 3 && <MultiChoiceVerticalPage />}
      {pageCount == 4 && <AddNoteChalenj />}
      {pageCount == 5 && <UploadDocChalenj />}
      {pageCount == 6 && <OpenLinkChalenj />}
      {pageCount == 7 && <OpenPDFChalenj />}
      {pageCount == 8 && <FormChalenjPage />}
      {pageCount == 9 && <QRScanChalenj />}
      {pageCount == 10 && <VideoChalenjPage />}
      {pageCount == 11 && <UploadImageChalenj />}
      {pageCount == 12 && <SendEmailChalenj />}
      {pageCount == 13 && <HorizoltalRatingPage />}
      {pageCount == 14 && <RatingStarChalenj />}
      {pageCount == 15 && <PollChalenjPage />}
      {pageCount == 16 && <OpenCertificatePage />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'space-between',
    elevation: 10,
    height: 70,
    flexDirection: 'row',
  },
  PaginationStyle: {
    backgroundColor: '#252635',
    elevation: 15,
    justifyContent: 'center',
    elevation: 10,
    height: 70,
    flexDirection: 'row',
  },
  ImageStyleCenter: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  ImageStyle: {
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  PaginationTextStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
});

export default ChalenjActionPage;
