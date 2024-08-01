/**
 * Project Name: EMTran Pro
 * Created By: Kashif Mubarak on Jan 16, 2024
 * Company: Codistan
 * Current Developer: Kashif Mubarak, Muhammad Uzair, Saad Waheed Khan
 * @format
 */
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
import {interBold, interMedium, interRegular} from '../assets/fonts';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SvgXml} from 'react-native-svg';
import {crossSvg, openEmail} from '../assets/svgs/SvgGroup';
import {dataServer} from '../services/axiosConfig';
import Toast from 'react-native-toast-message';
import ConfirmationModal from '../modals/ConfirmationModal';
const OTPScreen = ({navigation, route}: any) => {
  const [isModalVisible, setisModalVisible] = useState(true);
  const CELL_COUNT = 4;
  const {email, purpose, fullName, password} = route?.params || {};
  // console.log('emaill', email, purpose);

  const [Loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // const handleSubmit = () => {
  //   if (value.length === CELL_COUNT) {
  //     navigation.navigate('ResetPassword');
  //   }
  // };
  const ForgotPasswordAPI = async () => {
    setLoading(true);
    try {
      const ForgotPasswordAPIRes: any = await dataServer.post(
        '/mobile/forgot-password',
        {
          email: email,
        },
      );

      if (ForgotPasswordAPIRes.status === true) {
        setLoading(false);

        navigation.navigate('OTPScreen', {
          email: email,
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
    }
  };
  const handleSignUpSubmit = async () => {
    try {
      setLoading(true);
      await dataServer
        .post('/sign-up', {
          email: email,
          fullName: fullName,
          password: password,
          isMobile: true,
        })
        .then(async (signUpApi: any) => {
          if (signUpApi.status === true) {
            setLoading(false);

            setisModalVisible(true);

            console.log('signUpApi', signUpApi);
          } else {
            setLoading(false);
            console.log('Login failed:', signUpApi.message);
            Toast.show({
              type: 'error',
              text1: signUpApi.message || 'SignUp failed',
            });
          }
        });
    } catch (e: any) {
      setLoading(false);
      console.log('error heheh', e.message);
      Toast.show({
        type: 'error',
        text1: e.message || 'SignUp failed',
      });
      // if (e.message && e.message.includes('400')) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'E-Mail exists already, please pick a different one.',
      //   });
      // } else {
      //   Toast.show({
      //     type: 'error',
      //     text1: e.message || 'An unexpected error occurred during SignUp.',
      //   });
      // }
    }
  };
  const verifyOTPApi = async () => {
    if (value === '') {
      Toast.show({
        type: 'error',
        text1: 'Please provide the OTP',
        text2: '',
      });
      return;
    }
    setLoading(true);

    try {
      const verifyOTPRes: any = await dataServer.post('/mobile/verify-otp', {
        otp: value,
        email: email,
      });
      if (verifyOTPRes.status === true) {
        console.log('Data', verifyOTPRes);
        Toast.show({
          type: 'success',
          text1: verifyOTPRes.message,
          text2: '',
        });
        if (purpose === 'signUp') {
          navigation.navigate('LogIn');
        } else {
          navigation.navigate('ResetPassword', {
            verificationToken: verifyOTPRes?.verificationToken,
          });
        }
      } else {
        9620;
        Toast.show({
          type: 'error',
          text1: verifyOTPRes.message,
          text2: '',
        });
      }
      setLoading(false);
      // setshowOTPModal(true);
      // props.navigation.navigate('LogIn');
    } catch (e: any) {
      console.log('error', e);
      Toast.show({
        type: 'error',
        text1: e.message,
        text2: '',
      });
      setLoading(false);
    }
    // Do something when password input is submitted, e.g. sign up
  };
  const handleResendOTP = () => {
    if (purpose == 'forgotPassword') {
      ForgotPasswordAPI();
    } else if (purpose == 'signUp') {
      handleSignUpSubmit();
    }
  };
  return (
    <SafeAreaView style={styles.SafeAreaStyle}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={{height: hp(20)}}>
              <TouchableOpacity style={styles.backButton}>
                <BackButtonComp />
              </TouchableOpacity>
            </View>
            <View style={styles.MainView}>
              <View>
                <View style={styles.container}>
                  <Text style={styles.Password}>Enter</Text>
                  <Text style={styles.Forgot}>Confirmation</Text>
                  <Text style={styles.Password}>Code</Text>
                </View>
                <View>
                  <Text style={styles.text}>
                    Enter code that we have sent to your email address i.e; {''}
                    {email}
                  </Text>
                </View>
                <View>
                  <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    autoCapitalize="none"
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                      <Text
                        key={index}
                        style={[
                          styles.cell,
                          isFocused && styles.focusCell,
                          // @ts-ignore
                          value[index] && styles.filledCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />
                </View>
              </View>
              <View style={styles.VerifyView}>
                <TouchableOpacity
                  onPress={() => verifyOTPApi()}
                  style={[styles.ResetButton]}>
                  <Text style={styles.resetText}>Verify</Text>
                </TouchableOpacity>
                <View style={styles.CodeTextView}>
                  <Text style={styles.textCode}>Didn’t receive the code? </Text>
                  <TouchableOpacity onPress={handleResendOTP}>
                    <Text style={styles.ResendText}>Resend</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* -----Modal----- */}

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
      <ConfirmationModal
        isModalVisible={isModalVisible}
        setisModalVisible={setisModalVisible}
        navigation={navigation}
        email={email}
      />
    </SafeAreaView>
  );
};

export default OTPScreen;
const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ResetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: hp(3),
    padding: hp(1),
    borderRadius: hp(1),
    width: '100%',
    backgroundColor: colors.turquoise,
  },
  text: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_16,
    paddingVertical: hp(2),
  },
  resetText: {
    color: colors.white,
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_14,
    fontWeight: '500',
  },
  Forgot: {
    fontSize: typography.FONT_SIZE_24,
    fontFamily: interBold,
    fontWeight: '500',
    color: colors.turquoise,
  },
  VerifyView: {
    justifyContent: 'space-between',
    bottom: Platform.OS === 'android' ? hp(4) : hp(10),
  },
  CodeTextView: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: hp(1),
  },
  textCode: {
    fontFamily: interRegular,
    color: '#393939',
  },
  ResendText: {
    fontFamily: interBold,
    color: colors.turquoise,
  },

  codeFieldRoot: {
    alignItems: 'center',
  },
  filledCell: {
    borderColor: colors.turquoise,
  },
  MainView: {
    height: hp(80),
    bottom: hp(3),

    flex: 1,
    justifyContent: 'space-between',
  },
  cell: {
    width: hp(6.5),
    height: hp(6.5),
    lineHeight: hp(6.5),
    // padding: hp(1.5),
    // paddingHorizontal: wp(5),
    fontSize: 24,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    textAlign: 'center',
    color: colors.black,
    textAlignVertical: 'center',
    verticalAlign: 'middle',
  },
  disabledButton: {
    backgroundColor: colors.borderColor,
  },

  focusCell: {
    borderColor: colors.turquoise,
  },

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
