import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {colors} from '../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {logoName} from '../assets/svgs/SvgGroup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {interMedium} from '../assets/fonts';
import * as Typography from '../assets/fonts/typography';
import BackButtonComp from '../components/BackButtonComp/BackButtonComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteScreen = (props: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validate = () => {
    let valid = true;

    if (!userName) {
      setUserNameError('Username is required');
      valid = false;
    } else {
      setUserNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      Alert.alert(
        'Account Deletion',
        'The account deletion request has been sent to admin',
        [
          {
            text: 'OK',
            onPress: async () => {
              await AsyncStorage.clear();
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'LogIn'}],
                }),
              );
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    setIsSubmitDisabled(!userName || !validateEmail(email));
  }, [userName, email]);
  return (
    <View style={styles.container}>
      <View style={styles.backButtonView}>
        <TouchableOpacity style={styles.backButton}>
          <BackButtonComp />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <SvgXml xml={logoName} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.titlePlan}>Deletion</Text>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={userName}
        style={[
          styles.input,
          {
            borderColor: userName ? colors.turquoise : colors.borderColor,
            borderWidth: 1,
          },
        ]}
        onChangeText={setUserName}
        placeholder="Enter your email"
      />
      {emailError ? (
        <Text style={styles.errorText}>{userNameError}</Text>
      ) : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              !validateEmail(email) === false
                ? colors.turquoise
                : colors.borderColor,
            borderWidth: 1,
          },
        ]}
        value={email}
        numberOfLines={1}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* <Button
        title="Submit"
        disabled={isSubmitDisabled}
        onPress={handleSubmit}
        
      /> */}
      <TouchableOpacity
        disabled={isSubmitDisabled}
        onPress={handleSubmit}
        style={[
          styles.button,
          {
            backgroundColor: isSubmitDisabled
              ? colors.borderColor
              : colors.turquoise,
          },
        ]}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DeleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: colors.backgroundColor,
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
  backButtonView: {
    height: hp(2),
  },
  backButton: {
    justifyContent: 'center',
    width: '10%',
    marginTop: hp(1),
  },
  titleContainer: {
    flexDirection: 'row',
    gap: wp(1.2),
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
  },
  buttonText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_14,
  },
  logoContainer: {
    alignSelf: 'center',
    height: hp(20),
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    color: colors.black,
    fontWeight: '500',
  },
  titlePlan: {
    fontSize: Typography.FONT_SIZE_20,
    color: colors.turquoise,
    fontWeight: '500',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.black,
  },
  input: {
    // height: 40,
    padding: hp(1),
    color: colors.black,
    borderRadius: hp(1),

    marginBottom: hp(1),
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: hp(1),
  },
});
