import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {interMedium, interRegular} from '../assets/fonts';
import {openEmail, crossSvg} from '../assets/svgs/SvgGroup';
import {colors} from '../utils/appContants';
import * as typography from '../assets/fonts/typography';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ConfirmationModal = (props: any) => {
  const openEmailApp = async () => {
    await Linking.openURL('https://gmail.app.goo.gl')
      .then(() => {
        props.setisModalVisible(false);
        props.navigation.navigate('OTPScreen');
        console.log('Email app opened successfully');
      })
      .catch(error => {
        console.error('Error opening email app:', error);
      });
  };

  return (
    <Modal visible={props.isModalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Email Logo  */}
          <SvgXml xml={openEmail} />
          {/* Cross Button  */}
          <TouchableOpacity
            hitSlop={20}
            onPress={() => props.setisModalVisible(false)}
            style={styles.crossButton}>
            <SvgXml xml={crossSvg} />
          </TouchableOpacity>
          {/* Modal Heading  */}
          <Text
            style={{
              color: colors.black,
              fontFamily: interMedium,
              fontSize: typography.FONT_SIZE_18,
            }}>
            Check Your Email
          </Text>

          {/* Modal Message  */}
          <Text
            style={[styles.text, {textAlign: 'center', paddingVertical: 0}]}>
            We have sent confirmation code to {props.email}
          </Text>

          {/* Button  */}
          <TouchableOpacity
            onPress={() => openEmailApp()}
            style={[styles.ResetButton]}>
            <Text style={styles.resetText}>Open Email App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
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
  crossButton: {
    position: 'absolute',
    top: wp(6),
    right: wp(6),
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
});
