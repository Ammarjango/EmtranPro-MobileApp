import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Typography from '../assets/fonts/typography';
import {colors} from '../utils/appContants';

import {withIAPContext} from 'react-native-iap';

import LoaderComp from '../components/LoaderComp/LoaderComp';
import {InAppPurchasePayments} from '../helperFunc/helperFunc';
import {PaymentVerify} from '../services/apis/PaymentVerify';
import Toast from 'react-native-toast-message';
const PaymentScreen = (props: any) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const myProducts: any = ['EmTranPro399', 'EmtranPro36'];
  const myProductsAndroid: any = ['emtranpro_399', 'emtranpro_36'];

  const handleInAppPurchase = async (
    navigation: any,
    setIsLoading: any,
    productId: any,
    planType: any,
  ) => {
    setSelectedPlan(planType);

    setIsLoading(true);
    try {
      const res = await InAppPurchasePayments(productId);

      if (res?.success === true) {
        console.log(`Payment successful for ${planType}`);
        console.log('response Payment', res);
        const purchaseToken = res?.detail[0]?.purchaseToken;
        const transactionId = res?.detail?.originalTransactionIdentifierIOS;
        console.log('purchaseToken==>', purchaseToken);
        console.log('transactionId', transactionId);

        const postBody = {
          transactionId: Platform.OS === 'ios' ? transactionId : null,
          purchaseToken: Platform.OS === 'android' ? purchaseToken : null,
        };
        console.log('postBody', postBody);

        setIsLoading(false);
        const resVerify = await PaymentVerify(postBody);
        // console.log('resVerify', resVerify);
        // navigation.navigate('PaymentSuccessScreen', {
        //   price: planType === 'Basic' ? '3.99' : '36.0',
        // });
        if (resVerify?.status === true) {
          Toast.show({
            type: 'success',
            text1: resVerify?.message,
          });
          navigation.navigate('PaymentSuccessScreen', {
            price: planType === 'Basic' ? '3.99' : '36.0',
          });
        }
      } else {
        console.log(`Payment failed or not acknowledged for ${planType}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`Error during purchase for ${planType}:`, error);
      setIsLoading(false);
    }
  };

  const PlanOption = ({planType, price, savings, isSelected, onPress}: any) => (
    <TouchableOpacity
      style={[
        styles.planContainer,
        {
          borderColor: isSelected ? colors.turquoise : colors.borderColor,
          borderWidth: 1,
        },
      ]}
      onPress={onPress}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          {savings ? (
            <View style={styles.planView}>
              <Text></Text>
              <Text style={styles.planTypeEssential}>{planType}</Text>
              <Text style={styles.savings}>{savings}</Text>
            </View>
          ) : (
            <Text style={styles.planType}>{planType}</Text>
          )}
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={{color: colors.black, fontSize: Typography.FONT_SIZE_13}}>
            $
          </Text>
          <Text style={styles.price}>{price} </Text>
          <Text style={styles.duration}>
            / {planType === 'Basic' ? 'm' : 'y'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handleTermsofUse = () => {
    props.navigation.navigate('TermsofUse');
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose</Text>
        <Text style={styles.titlePlan}>Plans</Text>
      </View>
      <Text style={styles.subtitle}>
        Selecting the right plan is the first step towards unlocking the
        benefits tailored just for you.
      </Text>
      <View style={{marginTop: hp(1)}}>
        <PlanOption
          planType="Basic"
          price="3.99"
          isSelected={selectedPlan === 'Basic'}
          onPress={() =>
            handleInAppPurchase(
              props.navigation,
              setIsLoading,
              Platform.OS === 'android' ? 'emtranpro_399' : 'EmTranPro399',
              'Basic',
            )
          }
        />

        <PlanOption
          planType="Essential"
          price="36.0"
          savings="25% savings"
          isSelected={selectedPlan === 'Essential'}
          onPress={() =>
            handleInAppPurchase(
              props.navigation,
              setIsLoading,
              Platform.OS === 'android' ? 'emtranpro_36' : 'EmtranPro36',
              'Essential',
            )
          }
        />
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={styles.linkButton}
            onPress={handleTermsofUse}>
            <Text style={styles.Link}>Terms of Use</Text>
          </TouchableOpacity>
        )}
      </View>
      <LoaderComp isLoading={isLoading} setIsLoading={setIsLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: hp(4),
    paddingHorizontal: 20,
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    color: colors.black,
    fontWeight: '500',
  },
  Link: {
    color: colors.turquoise,
    fontSize: Typography.FONT_SIZE_12,

    fontWeight: 'bold',

    textDecorationLine: 'underline',
  },
  linkButton: {
    width: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  duration: {
    color: colors.black,
    fontSize: Typography.FONT_SIZE_13,
    right: wp(1.5),
  },
  planView: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(1.5),
  },
  titlePlan: {
    fontSize: Typography.FONT_SIZE_20,
    color: colors.turquoise,
    fontWeight: '500',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: wp(1.2),
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
  },
  subtitle: {
    fontSize: Typography.FONT_SIZE_13,
    color: colors.grey,
    marginBottom: hp(2),
  },
  planContainer: {
    paddingVertical: hp(2), // Adjusted for consistency with design
    paddingHorizontal: hp(1),
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '120%',
    alignItems: 'center',
    marginBottom: 8,
  },
  planType: {
    fontSize: 18,
    color: colors.grey,
  },
  planTypeEssential: {
    fontSize: 18,
    color: colors.grey,
    marginLeft: hp(10),
  },
  price: {
    fontSize: Typography.FONT_SIZE_32,
    color: colors.black,
    fontWeight: '500',
  },
  savings: {
    fontSize: Typography.FONT_SIZE_10,
    color: colors.red,
    borderWidth: 1,
    borderColor: colors.red,
    padding: hp(0.3),
    paddingHorizontal: hp(0.9),

    borderRadius: hp(1.5),
  },
});

export default withIAPContext(PaymentScreen);
