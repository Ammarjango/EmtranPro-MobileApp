import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
// Make sure to install 'expo-vector-icons'
import * as Typography from '../assets/fonts/typography';
import {colors} from '../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {done} from '../assets/svgs/SvgGroup';
import {CommonActions} from '@react-navigation/native';
const PaymentSuccessScreen = (props: any) => {
  const {price} = props?.route?.params || {};
  const handleNavigation = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'DrawerNavigation'}],
      }),
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <SvgXml xml={done} />
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={{color: colors.black, fontSize: Typography.FONT_SIZE_13}}>
            $
          </Text>
          <Text style={styles.amount}>{price}</Text>
        </View>
        <Text style={styles.message}>
          Thank you! Your Payment is complete and we look forward to serving
          you.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigation}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',

    padding: 20,
    height: hp(70),
  },
  iconContainer: {
    marginBottom: hp(3),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(1.5),
  },
  amount: {
    fontSize: Typography.FONT_SIZE_32,
    color: colors.black,
    fontWeight: '500',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(0.7),
    bottom: Platform.OS === 'ios' ? hp(1) : hp(0.7),
    borderRadius: hp(1),
    width: '100%',
    backgroundColor: colors.turquoise,
    height: hp(5),
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    height: hp(12),
    paddingHorizontal: wp(4),
  },
});

export default PaymentSuccessScreen;
