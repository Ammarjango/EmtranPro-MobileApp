/**
 * Project Name: EMTran Pro
 * Created By: Kashif Mubarak on Jan 16, 2024
 * Company: Codistan
 * Current Developer: Kashif Mubarak, Muhammad Uzair, Saad Waheed Khan
 * @format
 */ /**
 * Project Name: EMTran Pro
 * Created By: Kashif Mubarak on Jan 16, 2024
 * Company: Codistan
 * Current Developer: Kashif Mubarak, Muhammad Uzair, Saad Waheed Khan
 * @format
 */
import {
  ActivityIndicator,
  Keyboard,
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
import {interBold, interMedium, interRegular} from '../assets/fonts';
import {SvgXml} from 'react-native-svg';
import {
  passwordDark,
  passwordLight,
  passwordShowDark,
  passwordShowLight,
  passwordHideDark,
  passwordHideLight,
  successSvg,
} from '../assets/svgs/SvgGroup';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import {CommonActions} from '@react-navigation/native';
import {dataServer} from '../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const ResetPassword = ({navigation, route}: any) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [IsConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [Loading, setLoading] = useState(false);
  const verificationToken = route?.params?.verificationToken || {};
  const validationSchema = yup.object().shape({
    ChangePassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'The password must contain at least one uppercase letter, one lowercase letter, one special character (@$!%*?&) and one digit.',
      )
      .required('Password is required'),
    ConfirmPassword: yup
      .string()
      // @ts-ignore
      .oneOf([yup.ref('ChangePassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      ChangePassword: '',
      ConfirmPassword: '',
    },
    validationSchema,

    onSubmit: value => {
      let _data: any = {
        new_password: value.ChangePassword,
        confirm_password: value.ConfirmPassword,
      };
      console.log('data in onsbumit ', _data);
      handleSubmit(_data);
    },
  });
  const handleSubmit = async (values: any) => {
    console.log('values in handleSubmit', values);
    //After Success of Change Password API
  };
  const ResetPasswordAPI = async () => {
    setLoading(true);

    try {
      const ResetPasswordAPIRes: any = await dataServer.post(
        '/reset-password',
        {
          password: formik.values.ChangePassword,
          confirmPassword: formik.values.ConfirmPassword,
          verificationToken: verificationToken,
        },
      );
      if (ResetPasswordAPIRes.status === true) {
        console.log('Data', ResetPasswordAPIRes);
        setisModalVisible(true);
      } else {
        Toast.show({
          type: 'error',
          text1: ResetPasswordAPIRes.message,
          text2: '',
        });
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      console.log('error', e);
      Toast.show({
        type: 'error',
        text1: e.message,
        text2: '',
      });
    }
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
          <View style={styles.container}>
            <Text style={styles.Password}>Create</Text>
            <Text style={styles.Forgot}>New</Text>
            <Text style={styles.Password}>Password</Text>
          </View>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              height: hp(50),
            }}>
            <View style={styles.MainView}>
              <View>
                <View>
                  <Text style={styles.text}>
                    Create your new password to sign in
                  </Text>
                </View>
                <View>
                  <Text style={styles.emailText}>New Password</Text>
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    formik.touched.ChangePassword &&
                    !formik.errors.ChangePassword
                      ? styles.filledinputContainer
                      : null,
                  ]}>
                  <SvgXml
                    style={styles.svg}
                    xml={
                      formik.touched.ChangePassword &&
                      !formik.errors.ChangePassword
                        ? passwordDark
                        : passwordLight
                    }
                  />
                  <TextInput
                    style={[
                      styles.inputText,
                      formik.touched.ChangePassword &&
                      !formik.errors.ChangePassword
                        ? styles.filledinputContainer
                        : null,
                    ]}
                    placeholder="Password"
                    placeholderTextColor={colors.borderColor}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={formik.handleChange('ChangePassword')}
                    onBlur={formik.handleBlur('ChangePassword')}
                    onFocus={formik.handleBlur('ChangePassword')}
                    value={formik.values.ChangePassword}
                  />

                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(prev => !prev)}>
                    <SvgXml
                      style={styles.svg}
                      xml={
                        isPasswordVisible
                          ? formik.touched.ChangePassword &&
                            !formik.errors.ChangePassword
                            ? passwordShowDark
                            : passwordShowLight
                          : formik.touched.ChangePassword &&
                            !formik.errors.ChangePassword
                          ? passwordHideDark
                          : passwordHideLight
                      }
                    />
                  </TouchableOpacity>
                </View>

                {formik.touched.ChangePassword &&
                  formik.errors.ChangePassword && (
                    <Text style={styles.errorText}>
                      {formik.errors.ChangePassword}
                    </Text>
                  )}
                <Text style={styles.confirmPassword}>Confirm New Password</Text>

                <View
                  style={[
                    styles.inputContainer,
                    formik.touched.ConfirmPassword &&
                    !formik.errors.ConfirmPassword
                      ? styles.filledinputContainer
                      : null,
                  ]}>
                  <SvgXml
                    style={styles.svg}
                    xml={
                      formik.touched.ConfirmPassword &&
                      !formik.errors.ConfirmPassword
                        ? passwordDark
                        : passwordLight
                    }
                  />
                  <TextInput
                    style={[
                      styles.inputText,
                      formik.touched.ConfirmPassword &&
                      !formik.errors.ConfirmPassword
                        ? styles.filledinputContainer
                        : null,
                    ]}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.borderColor}
                    secureTextEntry={!IsConfirmPasswordVisible}
                    onChangeText={formik.handleChange('ConfirmPassword')}
                    onBlur={formik.handleBlur('ConfirmPassword')}
                    onFocus={formik.handleBlur('ConfirmPassword')}
                    value={formik.values.ConfirmPassword}
                  />

                  <TouchableOpacity
                    onPress={() => setIsConfirmPasswordVisible(prev => !prev)}>
                    <SvgXml
                      style={styles.svg}
                      xml={
                        IsConfirmPasswordVisible
                          ? formik.touched.ConfirmPassword &&
                            !formik.errors.ConfirmPassword
                            ? passwordShowDark
                            : passwordShowLight
                          : formik.touched.ConfirmPassword &&
                            !formik.errors.ConfirmPassword
                          ? passwordHideDark
                          : passwordHideLight
                      }
                    />
                  </TouchableOpacity>
                </View>
                {formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword && (
                    <Text style={styles.errorText}>
                      {formik.errors.ConfirmPassword}
                    </Text>
                  )}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.VerifyView}>
            <TouchableOpacity
              disabled={
                !(
                  formik.touched.ChangePassword &&
                  !formik.errors.ChangePassword &&
                  formik.touched.ConfirmPassword &&
                  !formik.errors.ConfirmPassword
                )
              }
              style={[
                styles.ResetButton,
                formik.touched.ChangePassword &&
                !formik.errors.ChangePassword &&
                formik.touched.ConfirmPassword &&
                !formik.errors.ConfirmPassword
                  ? null
                  : styles.disabledButton,
              ]}
              onPress={() => ResetPasswordAPI()}>
              <Text style={styles.resetText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* -----Modal----- */}
      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Success Logo  */}
            <SvgXml xml={successSvg} />
            {/* Modal Heading  */}
            <Text
              style={{
                color: colors.black,
                fontFamily: interMedium,
                fontSize: typography.FONT_SIZE_18,
              }}>
              Success
            </Text>

            {/* Modal Message  */}
            <Text
              style={[styles.text, {textAlign: 'center', paddingVertical: 0}]}>
              You have successfully reset your password.
            </Text>

            {/* Button  */}
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'LogIn'}],
                  }),
                )
              }
              style={[styles.ResetButton, {bottom: 0}]}>
              <Text style={styles.resetText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

export default ResetPassword;
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
  disabledButton: {
    backgroundColor: colors.borderColor,
  },
  filledinputText: {
    color: colors.grey,
  },
  svg: {
    paddingHorizontal: wp(7),
  },
  inputText: {
    fontSize: typography.FONT_SIZE_16,
    fontFamily: interRegular,
    textAlign: 'left',
    flex: 1,
    color: colors.borderColor,
    height: hp(5.5),
  },
  errorText: {
    color: 'red',
    marginTop: hp(0.5),
  },
  filledinputContainer: {
    borderColor: colors.turquoise,
    color: colors.grey,
  },
  inputContainer: {
    marginTop: hp(1),
    borderRadius: 7,
    borderColor: colors.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  VerifyView: {
    justifyContent: 'space-between',
    bottom: hp(2),
  },

  MainView: {
    height: hp(50),
    flex: 1,

    justifyContent: 'space-between',
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
    bottom: hp(3),
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

  emailText: {
    color: colors.greyDark,
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_16,
    // marginTop: hp(1.5),
  },
  confirmPassword: {
    color: colors.greyDark,
    paddingVertical: hp(1),
    fontFamily: interRegular,
    fontSize: typography.FONT_SIZE_16,
  },

  Password: {
    fontSize: typography.FONT_SIZE_24,
    fontFamily: interBold,
    fontWeight: '500',
    color: colors.blackDark,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: wp(90),
    padding: wp(6),
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(2),
  },
});
