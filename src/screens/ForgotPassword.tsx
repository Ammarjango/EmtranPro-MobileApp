/**
 * Project Name: EMTran Pro
 * Created By: Kashif Mubarak on Jan 15, 2024
 * Company: Codistan
 * Current Developer: Kashif Mubarak, Muhammad Uzair, Saad Waheed Khan
 * @format
 */
import {
  ActivityIndicator,
  Keyboard,
  Linking,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/appContants';
import BackButtonComp from '../components/BackButtonComp/BackButtonComp';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as typography from '../assets/fonts/typography';
import {interBold, interRegular} from '../assets/fonts';
import {SvgXml} from 'react-native-svg';
import {
  emailDark,
  emailIcon,
  emailLight,
  emailvalidIcon,
} from '../assets/svgs/SvgGroup';
import {dataServer} from '../services/axiosConfig';
import Toast from 'react-native-toast-message';

const ForgotPassword = (props: any) => {
  const [inputText, setInputText] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [Loading, setLoading] = useState(false);

  const validateEmail = (text: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(text);
    setIsEmailValid(isValid);
    setInputText(text);
  };

  const ForgotPasswordAPI = async () => {
    setLoading(true);
    try {
      const ForgotPasswordAPIRes: any = await dataServer.post(
        '/mobile/forgot-password',
        {
          email: inputText,
        },
      );
      console.log('ForgotPasswordAPIRes', ForgotPasswordAPIRes);
      if (ForgotPasswordAPIRes.status === true) {
        setLoading(false);

        props.navigation.navigate('OTPScreen', {
          email: inputText,
          purpose: 'forgotPassword',
        });

        if (ForgotPasswordAPIRes?.data?.testURI) {
          Linking.openURL(ForgotPasswordAPIRes?.data?.testURI);
        }
      } else {
        setLoading(false);

        Toast.show({
          type: 'error',
          text1: ForgotPasswordAPIRes.message,
          text2: '',
        });
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error?.message,
        text2: '',
      });
    }
  };
  //Function to handle reset password button
  const handleReset = async () => {
    //On API Success->Navigate to OTP Screen
    props.navigation.navigate('OTPScreen');
  };
  return (
    <SafeAreaView style={styles.SafeAreaStyle}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <View style={{height: hp(20)}}>
            <TouchableOpacity style={styles.backButton}>
              <BackButtonComp />
            </TouchableOpacity>
          </View>
          <View style={styles.MainView}>
            <View>
              <View style={styles.container}>
                <Text style={styles.Forgot}>Forgot</Text>
                <Text style={styles.Password}>Password?</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  Enter your email address, we will send you confirmation code.
                </Text>
              </View>
              <View style={styles.EmailView}>
                <Text style={styles.emailText}>Email Address</Text>
                <View
                  style={{
                    ...styles.inputBorder,
                    borderColor: isEmailValid
                      ? colors.turquoise
                      : colors.borderColor,
                  }}>
                  {isEmailValid ? (
                    <SvgXml xml={emailDark} style={{left: wp(2)}} />
                  ) : (
                    <SvgXml xml={emailIcon} style={{left: wp(2)}} />
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="jhon123@gmail.com"
                    placeholderTextColor={colors.borderColor}
                    onChangeText={validateEmail}
                    keyboardType="email-address"
                    value={inputText}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => ForgotPasswordAPI()}
              style={[
                styles.ResetButton,
                isEmailValid ? null : styles.disabledButton,
              ]}
              disabled={!isEmailValid}>
              <Text style={styles.resetText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {Loading && (
        <Modal
          transparent
          visible={Loading}
          onRequestClose={() => setLoading(false)}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color={colors.turquoise} />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default ForgotPassword;
const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  Forgot: {
    fontSize: typography.FONT_SIZE_24,
    fontFamily: interBold,
    fontWeight: '500',
    color: colors.turquoise,
  },
  MainView: {
    height: hp(68),
    justifyContent: 'space-between',
  },
  disabledButton: {
    backgroundColor: colors.borderColor,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  resetText: {
    color: colors.white,
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_14,
    fontWeight: '500',
  },
  ResetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp(1),
    padding: hp(1),
    borderRadius: hp(1),
    width: '100%',
    backgroundColor: colors.turquoise,
  },
  inputBorder: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    gap: wp(2),
    paddingHorizontal: wp(1.5),
    marginTop: hp(1.5),
    borderRadius: hp(1),
    padding: hp(1),
  },
  text: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_16,
    marginTop: hp(1.5),
  },
  input: {
    padding: hp(1),
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(0.5),
    width: wp(80),
    borderRadius: hp(1),
    color: colors.black,
  },
  emailText: {
    color: colors.greyDark,
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_16,
    marginTop: hp(1.5),
  },
  EmailView: {},
  Password: {
    fontSize: typography.FONT_SIZE_24,
    fontFamily: interBold,
    fontWeight: '500',
    color: colors.lightBlack,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: hp(2.5),
  },
  container: {
    // marginTop: hp(15),
    flexDirection: 'row',
    gap: wp(1.5),
  },
  backButton: {
    justifyContent: 'center',
    width: '10%',
    marginTop: hp(1),
  },
});
