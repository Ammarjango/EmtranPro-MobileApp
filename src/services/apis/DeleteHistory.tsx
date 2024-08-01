// Session History API

import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';
import {HistoryApi} from './HistoryApi';

export const DeleteHistory = async (id: any) => {
  try {
    const DeleteHistory: any = await dataServer.delete(
      `/session/deletehistory?id=${id}`,
    );

    if (DeleteHistory.status === true) {
      return DeleteHistory;
    } else {
      Toast.show({
        type: 'error',
        text1: DeleteHistory.message,
      });
      return null;
    }
  } catch (e: any) {
    console.log('error', e.data);

    Toast.show({
      type: 'error',
      text1: e.message,
    });
    return null;
  }
};
