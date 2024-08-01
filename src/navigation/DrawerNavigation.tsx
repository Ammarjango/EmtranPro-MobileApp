import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ContactUsScreen from '../screens/ContactUsScreen';
import AboutScreen from '../screens/AboutScreen';
import MainHeader from '../components/MainHeader/MainHeader';
import MainDrawer from './MainDrawer';
import HomeScreen from '../screens/HomeScreen';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import BackButtonHeaderWithDrawer from '../components/BackButtonHeaderWithDrawer/BackButtonHeaderWithDrawer';
import ViewDetails1 from '../screens/Step2PainAssesment';
import BodyParts from '../screens/Step2PainAssesment';
import StartSession from '../screens/StartSession';
import Step2PainAssesment from '../screens/Step2PainAssesment';
import Step3MedicalHistory from '../screens/Step3MedicalHistory';
import Step4RecentActivities from '../screens/Step4RecentActivities';
import Step5WomenOnly from '../screens/Step5WomenOnly';
import Step6CarWrecksOnly from '../screens/Step6CarWrecksOnly';
import PaymentScreen from '../screens/PaymentScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      // initialRouteName="HomeScreen"
      drawerContent={props => <MainDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        gestureHandlerProps: {
          enabled: false,
        },
        drawerStyle: {
          marginTop: heightPercentageToDP(3),
          width: widthPercentageToDP(55),
        },
      }}>
      <Drawer.Screen
        name="Home_Screen"
        component={HomeScreen}
        options={{header: MainHeader}}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{header: MainHeader}}
      />
      <Drawer.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{header: MainHeader}}
      />
      <Drawer.Screen
        name="BackButtonHeaderWithDrawer"
        component={BackButtonHeaderWithDrawer}
      />
      <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
      {/* <Drawer.Screen
        name="StartSession"
        component={StartSession}
        options={{header: BackButtonHeaderWithDrawer}}
      />
      <Drawer.Screen
        name="BodyParts"
        component={BodyParts}
        options={{header: BackButtonHeaderWithDrawer}}
      />
      <Drawer.Screen
        name="Step2PainAssesment"
        component={Step2PainAssesment}
        options={{header: BackButtonHeaderWithDrawer}}
      />
      <Drawer.Screen
        name="Step3MedicalHistory"
        component={Step3MedicalHistory}
        options={{header: BackButtonHeaderWithDrawer}}
      />
      <Drawer.Screen
        name="Step4RecentActivities"
        component={Step4RecentActivities}
        options={{header: BackButtonHeaderWithDrawer}}
      />
      <Drawer.Screen
        name="Step5WomenOnly"
        component={Step5WomenOnly}
        options={{header: BackButtonHeaderWithDrawer}}
      />
      <Drawer.Screen
        name="Step6CarWrecksOnly"
        component={Step6CarWrecksOnly}
        options={{header: BackButtonHeaderWithDrawer}}
      /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};

export default DrawerNavigation;
