/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Platform, SafeAreaView} from 'react-native';
import Toast from 'react-native-toast-message';
import {MainStack} from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './src/store';
import en from './src/i18n/en.json';
import fr from './src/i18n/fr.json';
import es from './src/i18n/es.json';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import {navigationRef} from './src/services/axiosConfig';
import * as RNIap from 'react-native-iap';
import {withIAPContext} from 'react-native-iap';
let init: any;
export const LangContext = createContext(init);

export const App = () => {
  const [lang, setlang] = useState<any>('english');
  const [practitiionerLang, setPractitiionerLang] = useState<any>('english');
  //@ts-ignore
  let purchaseUpdateSubscription = null;
  //@ts-ignore
  let purchaseErrorSubscription = null;

  useEffect(() => {
    //@ts-ignore
    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async purchase => {
        //

        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            if (Platform.OS === 'ios') {
              // RNIap.finishTransactionIOS(purchase.transactionId);
            } else if (Platform.OS === 'android') {
              // await RNIap.consumeAllItemsAndroid(purchase.purchaseToken);
              // await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
            }

            // await RNIap.finishTransaction(purchase, true);
          } catch (ackErr) {}
        }
      },
    );
    //@ts-ignore
    purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {});

    return () => {
      //@ts-ignore
      if (purchaseUpdateSubscription) {
        //@ts-ignore
        purchaseUpdateSubscription.remove();

        purchaseUpdateSubscription = null;
      }
      //@ts-ignore
      if (purchaseErrorSubscription) {
        //@ts-ignore
        purchaseErrorSubscription.remove();

        purchaseErrorSubscription = null;
      }
    };
  }, []);
  return (
    <LangContext.Provider
      value={{lang, setlang, practitiionerLang, setPractitiionerLang}}>
      <NavigationContainer ref={navigationRef}>
        {/* <I18nextProvider i18n={i18n}> */}
        <Provider store={store}>
          <SafeAreaView style={{flex: 1}}>
            <MainStack />
            <Toast position="bottom" bottomOffset={hp(7)} />
          </SafeAreaView>
        </Provider>
        {/* </I18nextProvider> */}
      </NavigationContainer>
    </LangContext.Provider>
  );
};

export default App;
