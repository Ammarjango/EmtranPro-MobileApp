import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {
  aboutColoredSvg,
  aboutSvg,
  deleteUser,
  deleteUserPressed,
  dollarSign,
  dollarSignPressed,
  homeColoredSvg,
  homeSvg,
  logoutSvg,
  telephoneColoredSvg,
  telephoneGreySvg,
} from '../assets/svgs/SvgGroup';
import {interRegular} from '../assets/fonts';
import * as Typography from '../assets/fonts/typography';
import {colors} from '../utils/appContants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {
  cancelSubscriptionAndroid,
  cancelSubscriptionIos,
} from '../constants/env';

const MainDrawer = (props: any) => {
  const [selectedButton, setSelectedButton] = useState('HomeScreen');

  const handlePress = (screen: string) => {
    setSelectedButton(screen);
    if (screen === 'Unsubscribe') {
      if (Platform.OS === 'ios') {
        Linking.openURL(cancelSubscriptionIos);
      } else {
        Linking.openURL(cancelSubscriptionAndroid);
      }
    } else if (screen === 'DeleteScreen') {
      props.navigation.navigate('DeleteScreen');
    } else {
      props.navigation.navigate(screen);
    }
  };

  const getColoredSvg = (screen: string) => {
    switch (screen) {
      case 'Home_Screen':
        return homeColoredSvg;
      case 'AboutScreen':
        return aboutColoredSvg;
      case 'ContactUsScreen':
        return telephoneColoredSvg;
      case 'Unsubscribe':
        return dollarSignPressed;
      case 'deleteUser':
        return deleteUserPressed;
      default:
        return homeColoredSvg;
    }
  };

  const buttons = [
    {screen: 'Home_Screen', svg: homeSvg, label: 'Home'},
    {screen: 'AboutScreen', svg: aboutSvg, label: 'About'},
    {screen: 'ContactUsScreen', svg: telephoneGreySvg, label: 'Contact'},
    {
      screen: 'Unsubscribe',
      svg: dollarSign,
      label: 'Unsubscribe',
    },
    {
      screen: 'DeleteScreen',
      svg: deleteUser,
      label: 'Delete Account',
    },
  ];
  const handleLogout = async () => {
    await AsyncStorage.clear();
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'LogIn'}],
      }),
    );
  };
  return (
    <View {...props} style={styles.drawer}>
      {buttons.map(button => (
        <TouchableOpacity
          key={button.screen}
          style={styles.Button}
          onPress={() => handlePress(button.screen)}>
          <SvgXml
            xml={
              selectedButton === button.screen
                ? getColoredSvg(button.screen)
                : button.svg
            }
          />
          <Text
            style={[
              styles.text,
              {
                color:
                  selectedButton === button.screen
                    ? colors.turquoise
                    : colors.lightBlack,
              },
            ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
      {/* LOGOUT */}
      <TouchableOpacity style={styles.Button} onPress={() => handleLogout()}>
        <SvgXml xml={logoutSvg} />
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainDrawer;

const styles = StyleSheet.create({
  drawer: {
    marginTop: heightPercentageToDP(4),
    marginLeft: widthPercentageToDP(8),
    gap: heightPercentageToDP(3),
  },
  Button: {
    flexDirection: 'row',
    gap: widthPercentageToDP(5),
    alignItems: 'center',
    width: widthPercentageToDP(40),
  },
  text: {
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_16,
    color: colors.lightBlack,
  },
});
