import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {interMedium} from '../../assets/fonts';
import {colors} from '../../utils/appContants';
import * as Typography from '../../assets/fonts/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ViewNext = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.Next}
      onPress={() =>
        props.navigation.navigate(props.screen, {
          ViewDetails: props?.ViewDetails,
          language: props.language,
        })
      }>
      <Text style={styles.NextText}>View Next</Text>
    </TouchableOpacity>
  );
};

export default ViewNext;

const styles = StyleSheet.create({
  NextText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_14,
  },
  Next: {
    width: wp(40),
    marginBottom: hp(3),
    backgroundColor: colors.turquoise,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: hp(1),
    borderRadius: hp(0.8),
  },
});
