import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TextComp from '../components/TextComp/TextComp';
import {interRegular} from '../assets/fonts';
import {colors} from '../utils/appContants';
import * as Typography from '../assets/fonts/typography';
import EndSessionComp from '../components/EndSessionComp/EndSessionComp';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import SessionComp from '../components/SessionComp/SessionComp';
import {LangContext} from '../../App';
import {userResponse} from '../store/reducers/appReducer';
import ViewNext from '../components/ViewNext/ViewNext';

const Step4RecentActivities = (props: any) => {
  const [selectedRadio, setselectedRadio] = useState(0);
  const dispatch = useDispatch();
  const UserRes = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );

  const {ViewDetails, language} = props?.route?.params || {};
  const keysToReset = [14, 15, 16, 17, 18];

  const selectSessionData = (state: RootState) => state.appReducer.SessionData;

  const selectSessionDataSlice = createSelector(
    [selectSessionData],
    sessionData => {
      if (!sessionData || !Array.isArray(sessionData)) {
        return [];
      }
      return sessionData.slice(13, 18);
    },
  );

  const SessionData = useSelector(selectSessionDataSlice) || [];

  const {lang} = useContext(LangContext);

  const handleReset = () => {
    const updatedUserResponse = {...UserRes};
    keysToReset.forEach(key => {
      updatedUserResponse[key] = undefined;
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
          textvalue="Step 4/6"
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
          textvalue={'RECENT ACTIVITIES'}
          color={colors.lightBlack}
          fontSize={Typography.FONT_SIZE_16}
          fontFamily={interRegular}
        />
        <TouchableOpacity
          style={{padding: hp(0.2)}}
          disabled={ViewDetails}
          onPress={() => props.navigation.navigate('Step5WomenOnly')}>
          <Text
            style={[
              styles.skipText,
              {color: ViewDetails ? colors.borderColor : colors.greyDark},
            ]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: hp(2)}}>
        {SessionData &&
          SessionData?.map((_item: any, index: any) => {
            const question = _item[language ? language : lang];
            let newOptionType;
            _item?.options.forEach((obj: any) => {
              newOptionType = obj?.new_type;
            });
            return (
              <View key={index}>
                <SessionComp
                  textvalue={question}
                  SessionData={SessionData}
                  radioButtonsData={_item?.options}
                  question_type={_item?.new_question_type}
                  viewDetailLang={language}
                  optionType={newOptionType}
                  quesId={_item.id}
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
            screen={'Step5WomenOnly'}
          />
        ) : (
          <EndSessionComp
            navigation={props.navigation}
            NextNavigation={'Step5WomenOnly'}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Step4RecentActivities;

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
});
