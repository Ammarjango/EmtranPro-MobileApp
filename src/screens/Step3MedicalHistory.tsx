import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import TextComp from '../components/TextComp/TextComp';
import {colors} from '../utils/appContants';
import {interRegular} from '../assets/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Typography from '../assets/fonts/typography';
import EndSessionComp from '../components/EndSessionComp/EndSessionComp';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import SessionComp from '../components/SessionComp/SessionComp';
import {LangContext} from '../../App';
import {userResponse} from '../store/reducers/appReducer';
import ViewNext from '../components/ViewNext/ViewNext';

const Step3MedicalHistory = (props: any) => {
  const [selectedRadio, setselectedRadio] = useState(0);
  const UserRes = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );
  // console.log('UserRes', UserRes);
  const {ViewDetails, language} = props?.route?.params || {};
  const keysToReset = [30, 11, 12, 13];

  const dispatch = useDispatch();
  const selectSessionData = (state: RootState) => state.appReducer.SessionData;
  const selectSpecificSessionData = createSelector(
    [selectSessionData],
    sessionData => {
      if (!sessionData || !Array.isArray(sessionData)) {
        return [];
      }
      const selectedData = [
        sessionData?.[28],
        sessionData?.[10],
        sessionData?.[11],
        sessionData?.[12],
      ];
      return selectedData;
    },
  );

  const SessionData = useSelector(selectSpecificSessionData);

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
          textvalue="Step 3/6"
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
          textvalue={'MEDICAL HISTORY'}
          color={colors.lightBlack}
          fontSize={Typography.FONT_SIZE_16}
          fontFamily={interRegular}
        />
        <TouchableOpacity
          disabled={ViewDetails}
          style={{padding: hp(0.2)}}
          onPress={() => props.navigation.navigate('Step4RecentActivities')}>
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
                viewDetailLang={language}
                radioButtonsData={item?.options}
                question_type={item?.new_question_type}
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
            screen={'Step4RecentActivities'}
          />
        ) : (
          <EndSessionComp
            navigation={props.navigation}
            NextNavigation={'Step4RecentActivities'}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Step3MedicalHistory;

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
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: wp(5),
    marginTop: hp(1),
  },
  RadioTouchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    width: wp(26.5),
    paddingVertical: hp(0.4),
  },
  radioButtonText: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
  },
  CheckBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: wp(5.5),
    rowGap: hp(1),
    marginTop: hp(1),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(26),
  },
  checkboxLabel: {
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: 'Mona-Sans-Regular',
    color: colors.black,
    right: hp(0.5),
    bottom: hp(0.2),
  },
});
