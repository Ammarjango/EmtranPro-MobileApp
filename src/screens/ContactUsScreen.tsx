import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../utils/appContants';
import MainHeader from '../components/MainHeader/MainHeader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {interMedium, interRegular} from '../assets/fonts';
import * as Typography from '../assets/fonts/typography';
import {SvgXml} from 'react-native-svg';
import {locationSvg, messageSvg, telephoneSvg} from '../assets/svgs/SvgGroup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EmailApi} from '../services/apis/EmailApi';
import Toast from 'react-native-toast-message';

const ContactUsScreen = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsSubmitDisabled(!userName || !validateEmail(email) || !message);
  }, [userName, email, message]);
  const handlePress = () => {
    const phoneNumber = '+19312203686';
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleSend = async () => {
    if (!isSubmitDisabled) {
      const postBody = {
        name: userName,
        message: message,
        email: email,
      };
      const resEmail = await EmailApi(postBody);

      if (resEmail?.status === true) {
        setEmail('');
        setMessage('');
        setUserName('');
        Toast.show({
          type: 'success',
          text1: resEmail?.message,
        });
      }
    } else {
      console.log(`not successful`);
    }
  };
  return (
    <KeyboardAwareScrollView
      // behavior="padding"
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      {/* <View style={styles.mainContainer}> */}
      {/* <MainHeader /> */}
      {/* HEADER */}
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headerText}>Get</Text>
          <Text style={[styles.headerText, {color: '#000'}]}>In Touch</Text>
        </View>
        <Text style={styles.generalText}>
          Contact us for a qoute, help or to join the team.
        </Text>

        {/* CONTACT INFO  */}
        <View
          style={{
            marginTop: heightPercentageToDP(3),
            gap: heightPercentageToDP(2),
          }}>
          <View style={styles.generalContainerContact}>
            <View style={{width: widthPercentageToDP(5)}}>
              <SvgXml xml={locationSvg} />
            </View>

            <Text
              style={[styles.generalText, {fontSize: Typography.FONT_SIZE_14}]}>
              2972 Westheimer, Illinois
            </Text>
          </View>
          <View style={styles.generalContainerContact}>
            <View style={{width: widthPercentageToDP(5)}}>
              <SvgXml xml={telephoneSvg} />
            </View>
            <TouchableOpacity onPress={handlePress}>
              <Text
                style={[
                  styles.generalText,
                  {fontSize: Typography.FONT_SIZE_14},
                ]}>
                +1 931-220-3686
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.generalContainerContact}>
            <View style={{width: widthPercentageToDP(5)}}>
              <SvgXml xml={messageSvg} />
            </View>
            <Text
              style={[styles.generalText, {fontSize: Typography.FONT_SIZE_14}]}>
              emtranpro@gmail.com
            </Text>
          </View>
        </View>

        {/* TEXT INPUTS */}
        <View style={{marginTop: heightPercentageToDP(3)}}>
          <TextInput
            value={userName}
            style={[
              styles.inputText,
              {
                borderColor:
                  userName === '' ? colors.borderColor : colors.turquoise,
              },
            ]}
            onChangeText={setUserName}
            placeholder="Name"
            placeholderTextColor={colors.borderColor}
          />

          <TextInput
            value={email}
            style={[
              styles.inputText,
              {
                borderColor:
                  !validateEmail(email) === true
                    ? colors.borderColor
                    : colors.turquoise,
              },
            ]}
            placeholder="Email"
            onChangeText={setEmail}
            placeholderTextColor={colors.borderColor}
          />

          <TextInput
            value={message}
            style={[
              styles.inputText,
              {
                borderColor:
                  message === '' ? colors.borderColor : colors.turquoise,
                height: heightPercentageToDP(15),
                textAlignVertical: 'top',
              },
            ]}
            placeholder="Write your message..."
            placeholderTextColor={colors.borderColor}
            numberOfLines={4}
            onChangeText={setMessage}
            multiline
          />
        </View>
        {/* SEND BUTTON */}
        <TouchableOpacity
          onPress={handleSend}
          disabled={isSubmitDisabled}
          style={[
            styles.button,
            {
              backgroundColor: isSubmitDisabled
                ? colors.borderColor
                : colors.turquoise,
            },
          ]}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </KeyboardAwareScrollView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  contentContainer: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    marginTop: heightPercentageToDP(3),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(2),
    marginBottom: heightPercentageToDP(1.5),
  },
  headerText: {
    fontFamily: interRegular,
    color: colors.turquoise,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_20,
    letterSpacing: 0.5,
  },
  generalText: {
    fontFamily: interRegular,
    color: colors.grey,
    fontSize: Typography.FONT_SIZE_12,
  },
  generalContainerContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(4),
  },
  inputText: {
    height: heightPercentageToDP(6.5),
    borderWidth: 1,
    borderRadius: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(4),
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
    marginVertical: heightPercentageToDP(1),
    color: colors.black,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentageToDP(0.7),
    borderRadius: heightPercentageToDP(1),
    height: heightPercentageToDP(5.5),
    marginTop: heightPercentageToDP(1),
  },
  buttonText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_16,
  },
});
