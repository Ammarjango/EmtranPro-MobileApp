// StartSession API

import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';

export const viewDetailsAPI = async (id: any) => {
  try {
    const SessionApiRes: any = await dataServer.get(
      `/session/historyById/${id}`,
    );
    if (SessionApiRes.status === true) {
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
