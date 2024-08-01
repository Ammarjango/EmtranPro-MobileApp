// SaveUserResponse API

import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

export const SaveUserResponseAPI = async (
  name: any,
  lang: any,
  gender: any,
  age: any,
  user_response: any,
  navigation: any,
) => {
  try {
    const SessionApiRes: any = await dataServer.post(`/session`, {
      name: name,
      lang: lang,
      gender: gender,
      age: age,
      user_response: user_response,
    });
    if (SessionApiRes.status === true) {
      Alert.alert(
        SessionApiRes?.message,
        '',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'DrawerNavigation'}],
                }),
              );
            },
          },
        ],
        {cancelable: false},
      );
      return SessionApiRes?.data;
    } else {
      Toast.show({
        type: 'error',
        text1: SessionApiRes.message,
      });
      return null;
    }
  } catch (e: any) {
    console.log('error', e);
    Toast.show({
      type: 'error',
      text1: e.message,
    });
    return null;
  }
};
