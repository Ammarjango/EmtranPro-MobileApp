// Session History API

import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';

export const HistoryApi = async () => {
  try {
    const SessionHistory: any = await dataServer.get(`/session/history`);
    if (SessionHistory.status === true) {
      return SessionHistory.data;
    } else {
      Toast.show({
        type: 'error',
        text1: SessionHistory.message,
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
