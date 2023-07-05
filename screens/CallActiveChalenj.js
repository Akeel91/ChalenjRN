import React from 'react';
import {View} from 'react-native';
const callActiveChalenjPageWithApi = () => {
  // This Api is for get All Active chalenj with pagination
  const callActiveChalenjApi = async () => {
    console.log('my_page---2', page);
    var token = await AsyncStorage.getItem('AuthToken');
    setAuthToken(token);
    setLoading(true);
    try {
      const response = await ApiConfig.post(
        '/get-active-chalenjs',
        {
          page: page,
        }, //Send Params hear
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, //Send header config hear
        {},
      );
      console.log('activechalenj- ', page, response.data.data);
      {
        page > 1
          ? setactiveChalenjList([...activeChalenjList, ...response.data.data])
          : setactiveChalenjList(response.data.data);
      }
      console.log('responseactive--', response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      if (String(err.message).includes('Network')) {
        notifyMessage(err.message);
      } else {
        notifyMessage('Something went wrong.');
      }
    }
  };

  return <View></View>;
};

export default callActiveChalenjPageWithApi;
