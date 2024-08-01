import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {AppLogo, ThreeDots} from '../../assets/svgs/SvgGroup';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {interRegular} from '../../assets/fonts';
import {colors} from '../../utils/appContants';
import * as Typography from '../../assets/fonts/typography';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const MainHeader = ({navigation}: any) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerContent}>
        <View style={styles.logoContainer}>
          <SvgXml xml={AppLogo} />
          <Text style={styles.headerText}>EMTRAN</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          // onPress={() => navigation.openDrawer()}
        >
          <SvgXml xml={ThreeDots} style={{paddingHorizontal: 10}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: heightPercentageToDP(3),
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    // marginBottom: heightPercentageToDP(3),
  },
  containerContent: {
    flexDirection: 'row',
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    gap: widthPercentageToDP(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: 'bold',
    color: colors.lightBlack,
    letterSpacing: 0.5,
  },
});
