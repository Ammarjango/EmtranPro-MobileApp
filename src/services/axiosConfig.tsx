import axios from 'axios';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROD_URL} from '../constants/env';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';
export const navigationRef = createNavigationContainerRef();

const UseAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem('AccessTokken');

  return accessToken;
};

function navigate() {
  AsyncStorage.clear();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'LogIn'}],
      }),
    );
  }
}

const dataServer = axios.create({
  baseURL: PROD_URL,
  timeout: 100000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
});
dataServer.interceptors.request.use(config => {
  return new Promise((resolve, reject) => {
    NetInfo.addEventListener(async state => {
      const accessToken = await UseAccessToken();
      if (!state.isConnected) {
        return reject({message: 'Connectivity issue: No internet connection.'});
      }
      if (config.data && config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return resolve(config);
    });
  });
});

dataServer.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error?.response?.status === 401) {
      // Alert.alert('token expired try loggin again');
      navigate();
    }
    return Promise.reject(error);
  },
);

export {dataServer};
