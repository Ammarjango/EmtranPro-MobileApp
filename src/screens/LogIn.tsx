//
//  EMTranPro Mobile App
//
//  Created by Muhammad Uzair on 16/01/2024
//
//  Company: Codistan Pvt ltd.
//
//  Current developer: Muhamamd Uzair
//

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
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
} from '../assets/svgs/SvgGroup';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../utils/appContants';
import * as Typography from '../assets/fonts/typography';
import {interBold, interMedium, interRegular} from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dataServer} from '../services/axiosConfig';
import Toast from 'react-native-toast-message';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userData} from '../store/reducers/appReducer';
import {useTranslation} from 'react-i18next';
import LoaderComp from '../components/LoaderComp/LoaderComp';
const LogIn = (props: any) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };
  const debugValues = {
    email: 'kashifcodistan@gmail.com',
    password: 'Kashif@123',
    // email: 'zodom@emtranpro.com',
    // password: 'Admin@1122',
    // email: 'MuhammadHamzaawaan@gmail.com',
    // password: 'redhat@123',
    // email: 'riled36792@cnurbano.com',
    // password: 'Kashif2021$',
    // email: 'arslan75@yopmail.com',
    // password: 'Akomg!23+',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleLogInSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await dataServer
        .post('/login', {
          email: values.email,
          password: values.password,
        })
        .then(async (_loginApi: any) => {
          if (_loginApi.status === true) {
            const paidCheck = _loginApi?.user?.isActiveSubscription;
            // console.log('first', _loginApi?.user);
            console.log('paidCheck', typeof paidCheck);
            setIsLoading(false);
            await AsyncStorage.setItem('AccessTokken', _loginApi?.token);

            if (paidCheck === undefined) {
              await AsyncStorage.removeItem('userIsPaid');
            } else {
              await AsyncStorage.setItem(
                'userIsPaid',
                JSON.stringify(paidCheck),
              );
            }

            dispatch(userData(_loginApi?.user));
            Toast.show({
              type: 'success',
              text1: _loginApi.message,
              text2: '',
            });
            // props.navigation.replace('PaymentScreen');

            if (paidCheck === true) {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'DrawerNavigation'}],
                }),
              );
            } else {
              props.navigation.replace('PaymentScreen');
            }
          } else {
            setIsLoading(false);
            console.log('Login failed:', _loginApi.message);
            Toast.show({
              type: 'error',
              text1: _loginApi.message || 'Login failed',
              text2: '',
            });
          }
        });
    } catch (e: any) {
      setIsLoading(false);
      console.log('error', e);
      Toast.show({
        type: 'error',
        text1: e.message || 'An error occurred',
        text2: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* -----Logo----- */}
      <View style={styles.logoContainer}>
        <SvgXml xml={logoName} />
      </View>

      {/* -----Form----- */}
      <Formik
        initialValues={__DEV__ ? debugValues : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogInSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          resetForm,
          setFieldTouched,
        }) => (
          <View>
            <View style={{height: hp(60)}}>
              {/* -----Heading----- */}
              <Text style={styles.headingRow}>
                <Text style={styles.headingColor1}>Sign </Text>
                <Text style={styles.headingColor2}>In</Text>
              </Text>
              {/* Email Input */}
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
                  xml={touched.email && !errors.email ? emailDark : emailLight}
                />
                <TextInput
                  style={[
                    styles.inputText,
                    touched.email && !errors.email
                      ? styles.filledinputText
                      : null,
                  ]}
                  keyboardType="email-address"
                  placeholder="Email"
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

              {/* Password Input */}
              <Text style={styles.label}>{'Password'}</Text>
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

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => {
                  resetForm(), props.navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
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
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    resetForm(), props.navigation.navigate('SignUp');
                  }}>
                  <Text style={styles.Up}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>

      {/*-----Modal----*/}
      <LoaderComp isLoading={isLoading} setIsLoading={setIsLoading} />
    </View>
  );
};

export default LogIn;

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
    marginVertical: hp(1),
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
    width: wp(45),
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
    marginTop: hp(1),
  },
  signUpText: {
    color: 'grey',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interRegular,

    alignSelf: 'center',
  },
  Up: {
    color: colors.turquoise,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interBold,

    alignSelf: 'center',
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
    // width: wp(60),
    // borderWidth: 1,
    flex: 1,
    paddingVertical: hp(1),
    color: colors.borderColor,
    // height: hp(5.5),

    // overflow: 'hidden',
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
    bottom: Platform.OS === 'ios' ? hp(1) : hp(0.7),
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
