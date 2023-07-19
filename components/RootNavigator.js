import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
// import DrawerNavigator from './DrawerNavigation';
import SplashScreen from '../screens/SplashPage';
import WelcomeScreen from '../screens/WelcomePage';
import RegisterPage from '../screens/RegisterPage';
import LoginPage from '../screens/LoginPage';
import ForgorPasswordPage from '../screens/ForgotPasswordPage';
import TermAndCondition from '../screens/TermAndCondPage';
import HelpPage from '../screens/HelpPage';
import NewUserRegisterPage from '../screens/NewUserRegister';
import BottomNavigation from './BottomNavigator';
import DashboardPage from '../screens/DashboardPage';
import ChalenjPage from '../screens/MyChalenjPage';
import ActionsPage from '../screens/ActionsPage';
import NotificationPage from '../screens/NotificationPage';
import ChalenjDetailsPage from '../screens/ChalenjDetails';
import ChalenjActionPage from '../screens/ChalenjActionPages';
import CertificatePage from '../screens/certificatePage';
import QRScanPage from '../screens/QRScanPage';
import ViewActionsPage from '../screens/ViewActionsPage';
import OpenCertificatePage from '../screens/OpenCertificatePage';
import QRScanChalenj from '../screens/QRScanChalenjPage';
import PollChalenjPage from '../screens/PollChalenjPage';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="WelCome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="OpenCertificate"
        component={OpenCertificatePage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="QRScanChalenj"
        component={QRScanChalenj}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ForgorPassword"
        component={ForgorPasswordPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="TermAndCondition"
        component={TermAndCondition}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="HelpPage"
        component={HelpPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="NewUserRegister"
        component={NewUserRegisterPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="DashboardPage"
        component={DashboardPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ActionsPage"
        component={ActionsPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ChalenjPage"
        component={ChalenjPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ChalenjDetails"
        component={ChalenjDetailsPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ChalenjActionPage"
        component={ChalenjActionPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="CertificatePage"
        component={CertificatePage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="QRScanPage"
        component={QRScanPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ViewActions"
        component={ViewActionsPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      {/* <Stack.Screen
        name="PollAction"
        component={PollChalenjPage}
        options={{
          headerShown: false,
          title: 'WelCome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
