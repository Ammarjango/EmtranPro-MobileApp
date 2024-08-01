//
//  EMTranPro Mobile App
//
//  Created by Muhammad Uzair on 16/01/2024
//
//  Company: Codistan Pvt ltd.
//
//  Current developer: Muhamamd Uzair
//

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  emailLight,
  emailDark,
  passwordLight,
  passwordDark,
  logoName,
  passwordShowDark,
  passwordShowLight,
  passwordHideDark,
  passwordHideLight,
  nameValid,
  nameInvalid,
} from '../assets/svgs/SvgGroup';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../utils/appContants';
import * as Typography from '../assets/fonts/typography';
import {interBold, interMedium, interRegular} from '../assets/fonts';
import {dataServer} from '../services/axiosConfig';
import Toast from 'react-native-toast-message';
import LoaderComp from '../components/LoaderComp/LoaderComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {
  TermsConditioniOS,
  TermsConditionAndroid,
  PrivacyAndroid,
  PrivacyiOS,
} from '../constants/env';
const SignUp = (props: any) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  console.log('toggleCheckBox', toggleCheckBox);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    fullName: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'The password must contain at least one uppercase letter, one lowercase letter, one special character (@$!%*?&) and one digit.',
      )
      .required('Password is required'),
    fullName: yup.string().required('Full Name is required'),
  });

  const handleSignUpSubmit = async (values: any) => {
    console.log('valuess', values);
    if (toggleCheckBox === false) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'You must agree to Terms & Condition and Privacy Policy',
      });
      return;
    }
    try {
      setIsLoading(true);
      await dataServer
        .post('/sign-up', {
          email: values.email,
          fullName: values.fullName,
          password: values.password,
          isMobile: true,
        })
        .then(async (signUpApi: any) => {
          if (signUpApi.status === true) {
            setIsLoading(false);

            // setisModalVisible(true);
            props.navigation.navigate('OTPScreen', {
              email: values.email,
              fullName: values.fullName,
              password: values.password,
              purpose: 'signUp',
            });

            console.log('signUpApi', signUpApi);
          } else {
            setIsLoading(false);
            console.log('Login failed:', signUpApi.message);
            Toast.show({
              type: 'error',
              text1: signUpApi.message || 'SignUp failed',
            });
          }
        });
    } catch (e: any) {
      setIsLoading(false);
      console.log('error heheh', e.message);
      if (e.message && e.message.includes('400')) {
        Toast.show({
          type: 'error',
          text1: 'E-Mail exists already, please pick a different one.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: e.message || 'An unexpected error occurred during SignUp.',
        });
      }
    }
  };
  const handleAccept = () => {
    setToggleCheckBox(!toggleCheckBox);
  };
  const handleTermsandCondition = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(TermsConditioniOS);
    } else {
      Linking.openURL(TermsConditionAndroid);
    }
  };
  const handlePrivacyPolicy = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(PrivacyiOS);
    } else {
      Linking.openURL(PrivacyAndroid);
    }
  };
  return (
    <View style={styles.container}>
      {/* -----Logo----- */}
      <View style={styles.logoContainer}>
        <SvgXml xml={logoName} />
      </View>

      {/* -----Form----- */}
      <Text style={styles.headingRow}>
        <Text style={styles.headingColor1}>Sign </Text>
        <Text style={styles.headingColor2}>up</Text>
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUpSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <KeyboardAwareScrollView
              resetScrollToCoords={{x: 0, y: 0}}
              scrollEnabled={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                height: hp(90),
              }}>
              {/* -----Heading----- */}

              {/* Email Input */}
              <View style={{height: hp(50)}}>
                {/* Password Input */}
                <Text style={styles.label}>Name</Text>
                <View
                  style={[
                    styles.inputContainer,
                    touched.fullName && !errors.fullName
                      ? styles.filledinputContainer
                      : null,
                  ]}>
                  <SvgXml
                    style={styles.svg}
                    xml={
                      touched.fullName && !errors.fullName
                        ? nameValid
                        : nameInvalid
                    }
                  />
                  <TextInput
                    style={[
                      styles.inputText,
                      touched.fullName && !errors.fullName
                        ? styles.filledinputText
                        : null,
                    ]}
                    numberOfLines={1}
                    placeholder="Full Name"
                    placeholderTextColor={colors.borderColor}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    onFocus={handleBlur('fullName')}
                    value={values.fullName}
                    multiline={false}
                  />
                </View>
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
                <Text style={styles.label}>Email Address</Text>
                <View
                  style={[
                    styles.inputContainer,
                    touched.email && !errors.email
                      ? styles.filledinputContainer
                      : null,
                  ]}>
                  <SvgXml
                    style={styles.svg}
                    xml={
                      touched.email && !errors.email ? emailDark : emailLight
                    }
                  />
                  <TextInput
                    style={[
                      styles.inputText,
                      touched.email && !errors.email
                        ? styles.filledinputText
                        : null,
                    ]}
                    keyboardType="email-address"
                    placeholder="Email Address"
                    placeholderTextColor={colors.borderColor}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onFocus={handleBlur('email')}
                    value={values.email}
                    multiline={false}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Text style={styles.label}>Password</Text>

                <View
                  style={[
                    styles.inputContainer,
                    touched.password && !errors.password
                      ? styles.filledinputContainer
                      : null,
                  ]}>
                  <SvgXml
                    style={styles.svg}
                    xml={
                      touched.password && !errors.password
                        ? passwordDark
                        : passwordLight
                    }
                  />
                  <TextInput
                    style={[
                      styles.inputText,
                      touched.password && !errors.password
                        ? styles.filledinputText
                        : null,
                    ]}
                    numberOfLines={1}
                    placeholder="Password"
                    placeholderTextColor={colors.borderColor}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onFocus={handleBlur('password')}
                    value={values.password}
                    multiline={false}
                    onSubmitEditing={() => handleSubmit()}
                  />

                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(prev => !prev)}>
                    <SvgXml
                      style={styles.svg}
                      xml={
                        isPasswordVisible
                          ? touched.password && !errors.password
                            ? passwordShowDark
                            : passwordShowLight
                          : touched.password && !errors.password
                          ? passwordHideDark
                          : passwordHideLight
                      }
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={false}
                    style={styles.checkbox}
                    onCheckColor={colors.turquoise}
                    onTintColor={colors.turquoise}
                    tintColors={{true: colors.turquoise, false: 'grey'}}
                    value={toggleCheckBox}
                    onValueChange={handleAccept}
                  />

                  <View style={styles.checkboxTextContainer}>
                    <Text style={styles.checkboxText}>I Agree to</Text>
                    <TouchableOpacity onPress={handleTermsandCondition}>
                      <Text style={styles.checkboxLink}>Terms & Condition</Text>
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}> and </Text>
                    <TouchableOpacity onPress={handlePrivacyPolicy}>
                      <Text style={styles.checkboxLink}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={[
                    styles.button,
                    __DEV__
                      ? null
                      : touched.password &&
                        !errors.password &&
                        touched.email &&
                        !errors.email
                      ? null
                      : styles.disabledButton,
                  ]}
                  disabled={
                    __DEV__
                      ? false
                      : !(
                          touched.password &&
                          !errors.password &&
                          touched.email &&
                          !errors.email
                        )
                  }>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('LogIn')}>
                    <Text style={styles.In}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        )}
      </Formik>

      {/*-----Modal----*/}
      <LoaderComp isLoading={isLoading} setIsLoading={setIsLoading} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: colors.backgroundColor,
  },
  logoContainer: {
    alignSelf: 'center',
    height: hp(20),
    justifyContent: 'center',
  },
  headingRow: {
    flexDirection: 'row',
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: interBold,
    marginVertical: hp(0.5),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp(1),
  },
  checkbox: {
    transform: [{scale: 0.8}],
    top: 1,
    // right: hp(0.5),
    // borderWidth: 1,
  },
  checkboxTextContainer: {
    flexDirection: 'row',
    // right: hp(0.5),
    // marginLeft: 4,
  },
  checkboxText: {
    fontSize: Typography.FONT_SIZE_12,
    color: 'black',
  },
  checkboxLink: {
    color: colors.turquoise,
    fontSize: Typography.FONT_SIZE_12,
    marginLeft: 4,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  In: {
    color: colors.turquoise,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interBold,
    alignSelf: 'center',
  },
  signUpText: {
    color: 'grey',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interRegular,

    alignSelf: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  forgotPasswordButton: {
    marginTop: hp(2),
    width: wp(42),
    alignSelf: 'flex-end',
  },
  headingColor1: {
    color: colors.blackDark,
  },
  headingColor2: {
    color: colors.turquoise,
  },
  label: {
    color: colors.greyDark,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: interMedium,
    marginTop: hp(2),
    marginBottom: hp(0.2),
  },
  inputContainer: {
    marginTop: hp(1),

    borderRadius: 7,
    borderColor: colors.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filledinputContainer: {
    borderColor: colors.turquoise,
  },
  inputText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: interRegular,
    textAlign: 'left',
    flex: 1,
    paddingVertical: hp(1),
    color: colors.borderColor,
  },

  filledinputText: {
    color: colors.grey,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  svg: {
    paddingHorizontal: wp(7),
  },

  modalContent: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: interMedium,
    color: colors.turquoise,
    textAlign: 'right',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(0.7),
    marginTop: hp(3),
    borderRadius: hp(1),
    width: '100%',
    backgroundColor: colors.turquoise,
    height: hp(5.5),
  },
  buttonText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_16,
  },
  disabledButton: {
    backgroundColor: colors.borderColor,
  },
});
