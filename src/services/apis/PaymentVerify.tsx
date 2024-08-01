// PaymentVerify API

import Toast from 'react-native-toast-message';
import {dataServer} from '../axiosConfig';

export const PaymentVerify = async (purchaseBody: any) => {
  try {
    const PaymentVerifyRes: any = await dataServer.post(
      `/payment-verify`,
      purchaseBody,
    );
    if (PaymentVerifyRes.status === true) {
      return PaymentVerifyRes;
    } else {
      Toast.show({
        type: 'error',
        text1: PaymentVerifyRes?.message,
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
