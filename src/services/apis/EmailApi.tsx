import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';

export const EmailApi = async (Body: any) => {
  try {
    const EmailApiRes: any = await dataServer.post(`/send-inquiry`, Body);
    if (EmailApiRes.status === true) {
      return EmailApiRes;
    } else {
      Toast.show({
        type: 'error',
        text1: EmailApiRes?.message,
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
