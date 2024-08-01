import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainHeader from '../components/MainHeader/MainHeader';
import {colors} from '../utils/appContants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {interRegular, interSemiBold} from '../assets/fonts';
import * as Typography from '../assets/fonts/typography';

const AboutScreen = () => {
  return (
    <View style={styles.mainContainer}>
      {/* <MainHeader /> */}
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headerText}>About</Text>
          <Text style={[styles.headerText, {color: colors.lightBlack}]}>
            EMTRAN
          </Text>
        </View>

        <View style={{marginBottom: heightPercentageToDP(4)}}>
          <Text style={styles.headerTwo}>
            The Next Generation clinic & family care
          </Text>
          <Text style={styles.generalText}>
            Our Clinic lets you visit exceptional medical providers, get
            clinically-backed wellness services, and discover the right
            medicine, all in one place.
          </Text>
        </View>

        <View>
          <Text style={styles.headerTwo}>Our Mission</Text>
          <Text style={styles.generalText}>
            At Emtran, our mission is to help all people receive the best
            medical care possible. We strive for speed, accuracy, and
            efficiency, all while simplifying the translation process for both
            the patient and the provider. Emtran works and continuously improves
            with the valuable feedback from patients and providers of all levels
            across many specialties. With this method, everyone we help becomes
            a member of the Emtran team, and together we will bridge language
            gaps in healthcare.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AboutScreen;

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
    marginBottom: heightPercentageToDP(4),
  },
  headerText: {
    fontFamily: interRegular,
    color: colors.turquoise,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_20,
    letterSpacing: 0.5,
  },
  headerTwo: {
    fontFamily: interSemiBold,
    color: colors.lightBlack,
    fontSize: Typography.FONT_SIZE_15,
    letterSpacing: 0.5,
    marginBottom: heightPercentageToDP(1.5),
  },
  generalText: {
    fontFamily: interRegular,
    color: colors.grey,
    fontSize: Typography.FONT_SIZE_12,
    textAlign: 'justify',
  },
});
