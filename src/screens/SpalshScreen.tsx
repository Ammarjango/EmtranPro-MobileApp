/**
 * Project Name: EMTran Pro
 * Created By: Kashif Mubarak on Jan 15, 2024
 * Company: Codistan
 * Current Developer: Kashif Mubarak, Muhammad Uzair, Saad Waheed Khan
 * @format
 */
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {splash} from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

const SpalshScreen = ({navigation}: any) => {
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessTokken');
      const isPaid: any = await AsyncStorage.getItem('userIsPaid');
      console.log('isPaid', isPaid);

      if (token && isPaid === 'true') {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'DrawerNavigation'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'LogIn'}],
          }),
        );
      }
    } catch (error) {
      console.log('Error checking login status:', error);
      //@ts-ignore
      navigation.replace('LogIn');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkLoginStatus();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return <ImageBackground style={{flex: 1}} source={splash} />;
};

export default SpalshScreen;

const styles = StyleSheet.create({});
