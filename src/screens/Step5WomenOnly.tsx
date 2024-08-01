import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Typography from '../assets/fonts/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../utils/appContants';
import {interRegular} from '../assets/fonts';
import TextComp from '../components/TextComp/TextComp';
import {useTranslation} from 'react-i18next';
import {SvgXml} from 'react-native-svg';
import {radioButtonEmpty, radioButtonFilled} from '../assets/svgs/SvgGroup';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import EndSessionComp from '../components/EndSessionComp/EndSessionComp';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import SessionComp from '../components/SessionComp/SessionComp';
import {LangContext} from '../../App';
import {userResponse} from '../store/reducers/appReducer';
import ViewNext from '../components/ViewNext/ViewNext';
const Step5WomenOnly = (props: any) => {
  const UserRes = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );
  const keysToReset = [19, 20, 21, 22, 23];

  const {ViewDetails, language} = props?.route?.params || {};

  const dispatch = useDispatch();
  const selectSessionData = (state: RootState) => state.appReducer.SessionData;
  const selectSessionDataSlice = createSelector(
    [selectSessionData],
    sessionData => {
      if (!sessionData || !Array.isArray(sessionData)) {
        return [];
      }
      return sessionData.slice(18, 23);
    },
  );

  const SessionData = useSelector(selectSessionDataSlice);
  const {lang} = useContext(LangContext);

  const handleReset = () => {
    const updatedUserResponse = {...UserRes};
    keysToReset.forEach(key => {
      updatedUserResponse[key] = null;
    });
    dispatch(userResponse(updatedUserResponse));
  };
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      {/* STEPS  */}
      <View style={styles.stepContainer}>
        <TextComp
          textvalue="Step 5/6"
          color={colors.turquoise}
          fontSize={Typography.FONT_SIZE_16}
          fontFamily={interRegular}
        />
        {ViewDetails ? null : (
          <TouchableOpacity
            disabled={
              keysToReset.length === 0 || // Disable if keysToReset is empty
              keysToReset.every(key => UserRes[key] === null) // Disable if any specified keys are null
            }
            style={[
              styles.resetButton,
              {
                borderWidth: 1,
                borderColor: keysToReset.every(key => UserRes[key] === null)
                  ? colors.borderColor
                  : colors.red,
              },
            ]}
            onPress={handleReset}>
            <Text
              style={[
                styles.resetText,
                {
                  color: keysToReset.every(key => UserRes[key] === null)
                    ? colors.borderColor
                    : colors.red,
                },
              ]}>
              Reset
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* HEADING */}
      <View style={styles.headingContainer}>
        <TextComp
          textvalue={'WOMEN ONLY'}
          color={colors.lightBlack}
          fontSize={Typography.FONT_SIZE_16}
          fontFamily={interRegular}
        />
        <TouchableOpacity
          disabled={ViewDetails}
          style={{padding: hp(0.2)}}
          onPress={() => props.navigation.navigate('Step6CarWrecksOnly')}>
          <Text
            style={[
              styles.skipText,
              {color: ViewDetails ? colors.borderColor : colors.greyDark},
            ]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {SessionData?.map((item: any, index: any) => {
          const question = item[language ? language : lang];
          let newOptionType;
          item?.options.forEach((obj: any) => {
            newOptionType = obj.new_type;
          });
          return (
            <View key={index}>
              <SessionComp
                textvalue={question}
                SessionData={SessionData}
                radioButtonsData={item?.options}
                question_type={item?.new_question_type}
                viewDetailLang={language}
                optionType={newOptionType}
                quesId={item.id}
              />
            </View>
          );
        })}
      </View>

      {/* BUTTONS  */}
      <View style={{marginTop: hp(1)}}>
        {ViewDetails ? (
          <ViewNext
            navigation={props.navigation}
            ViewDetails={ViewDetails}
            language={language}
            screen={'Step6CarWrecksOnly'}
          />
        ) : (
          <EndSessionComp
            navigation={props.navigation}
            NextNavigation={'Step6CarWrecksOnly'}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Step5WomenOnly;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    zIndex: -1,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: wp(1.5),
  },
  resetText: {
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_12,
    color: colors.red,
  },
  headingContainer: {
    flexDirection: 'row',
    paddingVertical: hp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_13,
    color: colors.greyDark,
  },
  RadioStyleWeek: {
    marginTop: hp(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  RadioStyleKids: {
    marginTop: hp(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  RadioTouchableStyleKids: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
    paddingBottom: hp(1),
    width: wp(30),
  },
  RadioTouchableStyleWeek: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.8),
    paddingBottom: hp(1),
  },
  radioButtonTextWeek: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
  },
  RadioStyle: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  RadioTouchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    paddingHorizontal: hp(0.4),
    paddingVertical: hp(0.4),
  },
  radioButtonText: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
  },
  trackStyle: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  selectedStyle: {
    backgroundColor: colors.turquoise,
  },
  marker: {
    height: 18,
    width: 18,
    borderRadius: 12,
    backgroundColor: colors.turquoise,
    borderWidth: 1,
    borderColor: colors.turquoiseDark,
  },
  markerContainer: {
    marginTop: hp(0.5),
  },
});
