/**
 * Project Name: EMTran Pro
 * Created By: Kashif Mubarak on Jan 15, 2024
 * Company: Codistan
 * Current Developer: Kashif Mubarak, Muhammad Uzair, Saad Waheed Khan
 * @format
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from '../screens/LogIn';
import SplashScreen from '../screens/SpalshScreen';
import ForgotPassword from '../screens/ForgotPassword';
import OTPScreen from '../screens/OTPScreen';
import ResetPassword from '../screens/ResetPassword';
import MainDrawer from './MainDrawer';
import DrawerNavigation from './DrawerNavigation';
import BackButtonHeaderWithDrawer from '../components/BackButtonHeaderWithDrawer/BackButtonHeaderWithDrawer';
import StartSession from '../screens/StartSession';
import Step2PainAssesment from '../screens/Step2PainAssesment';
import Step3MedicalHistory from '../screens/Step3MedicalHistory';
import Step4RecentActivities from '../screens/Step4RecentActivities';
import Step5WomenOnly from '../screens/Step5WomenOnly';
import Step6CarWrecksOnly from '../screens/Step6CarWrecksOnly';
import SignUp from '../screens/SignUp';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import DeleteScreen from '../screens/AccountDelete';
import TermsofUse from '../screens/TermsofUse';

const Stack = createStackNavigator();

export const MainStack = (props: any) => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPassword"
        component={ForgotPassword}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="OTPScreen"
        component={OTPScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen
        name="HomeScreen"
        component={DrawerNavigation}
        // options={{header: MainHeader}}
      />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />

      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen
        name="Step2PainAssesment"
        component={Step2PainAssesment}
        options={{
          header: BackButtonHeaderWithDrawer,
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Step4RecentActivities"
        component={Step4RecentActivities}
        options={{header: BackButtonHeaderWithDrawer, headerShown: true}}
      />
      <Stack.Screen
        name="Step3MedicalHistory"
        component={Step3MedicalHistory}
        options={{header: BackButtonHeaderWithDrawer, headerShown: true}}
      />
      <Stack.Screen
        name="BackButtonHeaderWithDrawer"
        component={BackButtonHeaderWithDrawer}
      />
      <Stack.Screen
        name="Step5WomenOnly"
        component={Step5WomenOnly}
        options={{header: BackButtonHeaderWithDrawer, headerShown: true}}
      />
      <Stack.Screen
        name="Step6CarWrecksOnly"
        component={Step6CarWrecksOnly}
        options={{header: BackButtonHeaderWithDrawer, headerShown: true}}
      />
      <Stack.Screen
        name="StartSession"
        component={StartSession}
        options={{header: BackButtonHeaderWithDrawer, headerShown: true}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DrawerNavigation"
        component={DrawerNavigation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DeleteScreen"
        component={DeleteScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TermsofUse"
        component={TermsofUse}
      />
    </Stack.Navigator>
  );
};
