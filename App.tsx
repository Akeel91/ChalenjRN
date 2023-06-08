import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import StackNavigator from './components/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default()=>{
  return <Provider store={store}>
      <App/>
    </Provider>
  
};
