// GetLanguages API

import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';

export const GetLanguagesAPI = async () => {
  try {
    const GetLanguagesRes: any = await dataServer.get(`/lang`);
    if (GetLanguagesRes.status === true) {
      return GetLanguagesRes?.data;
    } else {
      Toast.show({
        type: 'error',
        text1: GetLanguagesRes?.message,
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
