import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../utils/appContants';
import {interMedium, interRegular} from '../assets/fonts';
import * as Typography from '../assets/fonts/typography';
import {useTranslation} from 'react-i18next';
import TextComp from '../components/TextComp/TextComp';
import {SvgXml} from 'react-native-svg';
import {radioButtonEmpty, radioButtonFilled} from '../assets/svgs/SvgGroup';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import SessionComp from '../components/SessionComp/SessionComp';
import {LangContext} from '../../App';
import CloseModal from '../modals/CloseModal';
import {userResponse} from '../store/reducers/appReducer';
import {SaveUserResponseAPI} from '../services/apis/saveUserResponse';
import moment from 'moment';
import LoaderComp from '../components/LoaderComp/LoaderComp';
import Toast from 'react-native-toast-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const Step6CarWrecksOnly = (props: any) => {
  const [PatientData, setPatientData] = useState<any>({
    name: '',
    gender: '',
    age: '',
  });
  const UserRes = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );
  const keysToReset = [24, 25, 26, 27, 28];
  const {ViewDetails, language} = props?.route?.params || {};

  const [isLoading, setIsLoading] = useState(false);
  console.log('PatientData console', ViewDetails);
  const dispatch = useDispatch();
  const selectSessionData = (state: RootState) => state.appReducer.SessionData;
  const selectSessionDataSlice = createSelector(
    [selectSessionData],
    sessionData => {
      if (!sessionData || !Array.isArray(sessionData)) {
        return [];
      }
      return sessionData.slice(23, 28);
    },
  );

  const navigation: any = useNavigation();
  const SessionData = useSelector(selectSessionDataSlice);
  const {practitiionerLang, lang} = useContext(LangContext);

  const [selectedRadio, setselectedRadio] = useState(0);

  const [isModalVisible, setisModalVisible] = useState(false);

  useEffect(() => {
    if (UserRes['3'] || UserRes['4'] || UserRes['31']) {
      const dobString = UserRes['4'];
      const dobParts = dobString?.split('/');
      const dob = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);

      const today = new Date();
      let age: any = today.getFullYear() - dob.getFullYear();

      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      console.log('Age:', age);

      if (!isNaN(age)) {
        let PatientName = UserRes['3'];
        console.log('Patient Name:', PatientName);

        let PatientGender = UserRes['31'];
        const genderData: any = {
          0: 'male',
          1: 'female',
          2: 'others',
        };
        let gender = genderData[PatientGender];

        setPatientData((prevState: any) => ({
          ...prevState,
          name: PatientName,
          gender: gender,
          age: age,
        }));
      } else {
        console.error('Invalid age calculation');
      }
    }
  }, []);

  const handleReset = () => {
    const updatedUserResponse = {...UserRes};
    keysToReset.forEach(key => {
      updatedUserResponse[key] = null;
    });
    dispatch(userResponse(updatedUserResponse));
    console.log('updatedUserResponse formed 1', updatedUserResponse);
  };

  const submitUserResponse = async () => {
    try {
      SaveUserResponseAPI(
        PatientData?.name,
        practitiionerLang,
        PatientData?.gender,
        PatientData?.age,
        UserRes,
        navigation,
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = () => {
    if (ViewDetails) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'DrawerNavigation'}],
        }),
      );
    } else {
      setisModalVisible(true);
    }
  };
  const handleSkip = () => {
    setisModalVisible(true);
  };
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      {/* STEPS  */}
      <View style={styles.stepContainer}>
        <TextComp
          textvalue="Step 6/6"
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
          textvalue={'CAR WRECKS ONLY'}
          color={colors.lightBlack}
          fontSize={Typography.FONT_SIZE_16}
          fontFamily={interMedium}
        />
        <TouchableOpacity disabled={ViewDetails} onPress={() => handleSkip()}>
          <Text
            style={[
              styles.skipText,
              {color: ViewDetails ? colors.borderColor : colors.greyDark},
            ]}>
            Skip/Submit
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
                radioButtonsData={item?.options}
                question_type={item?.new_question_type}
                optionType={newOptionType}
                quesId={item.id}
                selectedRadio={selectedRadio}
                setselectedRadio={setselectedRadio}
              />
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.Submit} onPress={() => handleSubmit()}>
        <Text style={styles.SubmitText}>
          {ViewDetails ? 'Go Back Home' : 'Submit'}
        </Text>
      </TouchableOpacity>
      <CloseModal
        isModalVisible={isModalVisible}
        setisModalVisible={setisModalVisible}
        navigation={props.navigation}
        submitUserResponse={submitUserResponse}
      />
      <LoaderComp isLoading={isLoading} setIsLoading={setIsLoading} />
    </ScrollView>
  );
};

export default Step6CarWrecksOnly;

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
  },
  RadioStyle: {
    marginTop: hp(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  RadioTouchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.8),
    paddingBottom: hp(1),
  },
  radioButtonText: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
  },
  RadioStyleBool: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  RadioTouchableStyleBool: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    paddingHorizontal: hp(0.4),
    paddingVertical: hp(0.4),
  },
  RadioTouchableStyleWreck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    gap: wp(1),
  },
  RadioStyleWreck: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: wp(3),
    marginTop: hp(1),
  },
  RadioTouchableStyleMPH: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    gap: wp(2),
    width: wp(28),
  },
  Submit: {
    width: wp(40),
    backgroundColor: colors.turquoise,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: hp(1),
    borderRadius: 5,
    marginVertical: hp(3),
  },
  SubmitText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_14,
  },
});
