import {
  getProducts,
  initConnection,
  requestSubscription,
  getSubscriptions,
  getAvailablePurchases,
  clearTransactionIOS,
} from 'react-native-iap';
import {Platform} from 'react-native';

export const InAppPurchasePayments = async (productId: any) => {
  const myProducts = productId;
  await makeConnection(myProducts);
  let paymentMethodCall = await handlePayment(myProducts);
  return paymentMethodCall;
};

const makeConnection = async (myProducts: any) => {
  await initConnection();
  await getProducts({skus: [myProducts]});
  if (Platform.OS === 'ios') {
    // const availablePurchases = await getAvailablePurchases();
    // console.log('availablePurchases', availablePurchases);
    // if (availablePurchases.length > 0) {
    await clearTransactionIOS();
    // }
  }
};

const handlePayment = async (myProducts: any) => {
  let payment: any = await getSubscriptions({skus: [myProducts]})
    .then(async (value: any) => {
      return await requestSubscription({
        sku: myProducts,

        ...('offerToken' && {
          subscriptionOffers: [
            {
              sku: myProducts, // as a string
              offerToken:
                Platform.OS == 'android'
                  ? value[0].subscriptionOfferDetails[0].offerToken
                  : 'offerToken',
            },
          ],
        }),
      })
        .then(async (requestSubscriptionIAP: any) => {
          if (Platform.OS == 'ios') {
            if (
              requestSubscriptionIAP &&
              requestSubscriptionIAP?.transactionReceipt
            ) {
              return {
                detail: requestSubscriptionIAP,
                success: true,
              };
            }
          } else {
            return {
              detail: requestSubscriptionIAP,
              success: true,
            };
          }
        })
        .catch(error => {
          return {
            error: error,
            success: false,
          };
        });
    })
    .catch(err => {
      return {
        error: err,
        success: false,
      };
    });
  return payment;
};
