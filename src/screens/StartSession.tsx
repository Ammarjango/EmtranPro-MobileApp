import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TextComp from '../components/TextComp/TextComp';
import {colors} from '../utils/appContants';
import {interMedium, interRegular} from '../assets/fonts';
import * as Typography from '../assets/fonts/typography';
import DropDownPicker from 'react-native-dropdown-picker';
import {SvgXml} from 'react-native-svg';
import {SwitchLangIcon} from '../assets/svgs/SvgGroup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EndSessionComp from '../components/EndSessionComp/EndSessionComp';
import {LangContext} from '../../App';
import {GetLanguagesAPI} from '../services/apis/GetLanguages';
import {SessionAPI} from '../services/apis/StartSession';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {sessionData, userResponse} from '../store/reducers/appReducer';
import SessionComp from '../components/SessionComp/SessionComp';
import {createSelector} from 'reselect';
import {viewDetailsAPI} from '../services/apis/viewDetails';
import ViewNext from '../components/ViewNext/ViewNext';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const StartSession = (props: any) => {
  const {setlang, lang, setPractitiionerLang} = useContext(LangContext);
  const UserRes = useSelector(
    (state: RootState) => state?.appReducer?.UserResponse,
  );
  // console.log('UserRes', UserRes);
  // const SessionData = useSelector(
  //   (state: RootState) => state?.appReducer?.SessionData,
  // );
  // const initialValues = UserRes['23']
  //   ?.split(',')
  //   ?.map((value: string) => parseInt(value.trim(), 10));

  const {ViewDetails, id, language} = props?.route?.params || {};

  const selectSessionData = (state: RootState) =>
    state?.appReducer?.SessionData;

  const selectCombinedSlices = createSelector(
    [selectSessionData],
    sessionData => {
      if (!sessionData || !Array.isArray(sessionData)) {
        return [];
      }
      const slice1 = sessionData.slice(0, 4);
      const slice2 = sessionData.slice(29, 31);
      // const slice4 = sessionData.slice(32);
      const slice3 = sessionData.slice(4, 7);

      return [...slice1, ...slice2, ...slice3].filter(Boolean);
    },
  );
  const SessionData = useSelector(selectCombinedSlices);

  const keysToReset = [1, 2, 3, 4, 5, 6, 7];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('english');
  const [PractitiionerValue, setPractitiionerValue] = useState(
    language ? language : 'english',
  );
  const [openPractitiioner, setPractitiioner] = useState(false);
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [dropDownitems, setdropDownItems] = useState<any>([]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const isFocused = useIsFocused();

  // const [helpText, sethelpText] = useState('');
  let helpText = '';

  const dispatch = useDispatch();

  const fetchSessionData = async () => {
    setIsLoading(true);
    try {
      const response = await SessionAPI();

      dispatch(sessionData(response));
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLanugaugesData = async () => {
    setIsLoading(true);
    try {
      const response = await GetLanguagesAPI();
      const mappedData = response.map((item: any, index: any) => ({
        label: item?.name,
        value: item?.name.toLowerCase(),
      }));
      setdropDownItems(mappedData);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await viewDetailsAPI(id);
      let _userResponse: any = {};

      response.map((d: any) => {
        _userResponse[d.question_id] = d.option_response;
      });
      dispatch(userResponse(_userResponse));
      // console.log('_userResponse', _userResponse);
    } catch (error) {
      console.log('Error in fetching details:', error);
    }
  };

  useEffect(() => {
    if (ViewDetails && isFocused) {
      fetchDetails();
    }
  }, [isFocused, ViewDetails]);

  useEffect(() => {
    if (isFocused) {
      fetchSessionData();

      fetchLanugaugesData();
    }
  }, [isFocused]);

  const handleLanguageChange = (newLanguage: any) => {
    setlang(newLanguage);
  };

  const handlePractitionerLanguage = (newLanguage: any) => {
    setPractitiionerLang(newLanguage);
  };
  // SWAP LANUGUAGES
  const handleSwitchLanguage = () => {
    setdropDownItems((prevItems: any) => prevItems.reverse());
    setValue(PractitiionerValue);
    setPractitiionerValue(value);
  };

  const handleOptionPress = (questionId: any, answer: any) => {
    console.log('id and value in parent', questionId, 'answer', answer);

    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answer,
    }));
  };

  const handleReset = () => {
    const updatedUserResponse = {...UserRes};
    keysToReset.forEach(key => {
      updatedUserResponse[key] = null;
    });
    dispatch(userResponse(updatedUserResponse));
    console.log('updatedUserResponse formed 1', updatedUserResponse);
  };

  return (
    <SafeAreaView style={styles.SafeAreaStyle}>
      <KeyboardAwareScrollView
        scrollEnabled={!open && !openPractitiioner}
        showsVerticalScrollIndicator={false}>
        {ViewDetails ? null : (
          <View>
            <View style={styles.StartSession}>
              <TextComp
                textvalue="Start"
                color={colors.blackDark}
                fontFamily={interMedium}
                fontSize={Typography.FONT_SIZE_19}
              />
              <TextComp
                textvalue="Session"
                color={colors.turquoise}
                fontFamily={interMedium}
                fontSize={Typography.FONT_SIZE_19}
              />
            </View>

            <TextComp
              textvalue="Hello, I'm here to assist you. I may not speak your language, so please answer as many questions below to help me understand your needs better. If you're a friend or relative, please fill out as much information as you can for the person."
              color={colors.grey}
              fontFamily={interRegular}
              fontSize={Typography.FONT_SIZE_14}
              textAlign={'justify'}
              fontWeight={'normal'}
            />
            <View style={styles.SelectLanguage}>
              <TextComp
                textvalue="Select"
                color={colors.blackDark}
                fontFamily={interMedium}
                fontSize={Typography.FONT_SIZE_16}
              />
              <TextComp
                textvalue="Language"
                color={colors.turquoise}
                fontFamily={interMedium}
                fontSize={Typography.FONT_SIZE_16}
              />
            </View>
          </View>
        )}

        {/* DROP DOWN */}
        <View style={styles.DropdownStyle}>
          <View
            style={{
              width: wp(35),
            }}>
            <TextComp
              textvalue="Patient"
              color={colors.blackDark}
              marginTop={ViewDetails && hp(3)}
              marginBottom={wp(3)}
              fontFamily={interMedium}
              fontSize={Typography.FONT_SIZE_16}
            />
            <DropDownPicker
              open={open}
              value={value}
              items={dropDownitems}
              disabled={ViewDetails}
              autoScroll={true}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setdropDownItems}
              placeholder={'Select'}
              placeholderStyle={{color: colors.borderColor}}
              dropDownContainerStyle={{
                borderColor: colors.borderColor,
                borderWidth: 1,
              }}
              labelStyle={{
                color: value === 'english' ? colors.borderColor : colors.black,
              }}
              style={{
                borderColor: ViewDetails
                  ? colors.borderColor
                  : value === 'english'
                  ? colors.borderColor
                  : colors.turquoise,
                borderWidth: 1,
                backgroundColor: 'transparent', // To avoid overriding DropDownPicker's default background color
              }}
              textStyle={{
                color: ViewDetails ? colors.borderColor : colors.black,
              }}
              // @ts-ignore
              onChangeItem={item => console.log('on change item', item)}
              onChangeValue={value => handleLanguageChange(value)}
            />
          </View>
          <View style={{top: hp(2.5)}}>
            <TouchableOpacity
              disabled={ViewDetails}
              onPress={handleSwitchLanguage}>
              <SvgXml xml={SwitchLangIcon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp(35),
            }}>
            <TextComp
              textvalue="Practitioner"
              color={colors.blackDark}
              marginTop={ViewDetails && hp(3)}
              marginBottom={wp(3)}
              fontFamily={interMedium}
              fontSize={Typography.FONT_SIZE_16}
            />
            <DropDownPicker
              open={openPractitiioner}
              value={PractitiionerValue}
              items={dropDownitems}
              disabled={ViewDetails}
              autoScroll={true}
              setOpen={setPractitiioner}
              setValue={setPractitiionerValue}
              setItems={setdropDownItems}
              placeholder={'Select'}
              placeholderStyle={{color: colors.borderColor}}
              dropDownContainerStyle={{
                borderColor: PractitiionerValue
                  ? colors.turquoise
                  : colors.borderColor,
                borderWidth: 1,
              }}
              textStyle={{
                color: ViewDetails ? colors.borderColor : colors.black,
              }}
              labelStyle={{
                color:
                  PractitiionerValue === 'english'
                    ? colors.borderColor
                    : ViewDetails
                    ? colors.borderColor
                    : colors.black,
              }}
              style={{
                borderColor: ViewDetails
                  ? colors.borderColor
                  : PractitiionerValue === 'english'
                  ? colors.borderColor
                  : colors.turquoise,
                borderWidth: 1,
                backgroundColor: 'transparent', // To avoid overriding DropDownPicker's default background color
              }}
              // @ts-ignore
              onChangeItem={item => console.log('on change item', item)}
              onChangeValue={value => handlePractitionerLanguage(value)}
            />
          </View>
        </View>

        {/* STEPS  */}
        <View style={styles.stepContainer}>
          <TextComp
            textvalue="Step 1/6"
            color={colors.turquoise}
            fontSize={Typography.FONT_SIZE_16}
            fontFamily={interRegular}
          />
          {ViewDetails ? null : (
            <TouchableOpacity
              disabled={
                Object.keys(UserRes).length === 0 ||
                keysToReset.every(key => UserRes[key] === null)
              }
              style={[
                styles.resetButton,
                {
                  borderWidth: 1,
                  borderColor: Object.values(UserRes).every(
                    value => value === null,
                  )
                    ? colors.borderColor
                    : colors.red,
                },
              ]}
              onPress={handleReset}>
              <Text
                style={[
                  styles.resetText,
                  {
                    color: Object.values(UserRes).every(value => value === null)
                      ? colors.borderColor
                      : colors.red,
                  },
                ]}>
                Reset
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* PERSONAL INFORMATION */}
        <View style={styles.personalInfoContainer}>
          <TextComp
            textvalue={'PERSONAL INFORMATION'}
            color={colors.lightBlack}
            fontSize={Typography.FONT_SIZE_15}
            fontFamily={interMedium}
          />
          <View style={{marginTop: hp(2)}}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={colors.turquoise} />
              </View>
            ) : (
              SessionData?.map((item: any, index: any) => {
                const question = item[language ? language : lang];

                let newOptionType;
                item?.options.forEach((obj: any) => {
                  newOptionType = obj.new_type;
                });

                return (
                  <View key={index}>
                    <SessionComp
                      index={index}
                      textvalue={question}
                      SessionData={SessionData}
                      question_type={item?.new_question_type}
                      radioButtonsData={item?.options}
                      viewDetailLang={language}
                      ViewDetails
                      isChecked={item?.extraParameter}
                      optionType={newOptionType}
                      quesId={item.id}
                      selectedAnswers={selectedAnswers}
                      setSelectedRadio={handleOptionPress}
                    />
                  </View>
                );
              })
            )}
          </View>

          {ViewDetails ? (
            <ViewNext
              navigation={props.navigation}
              ViewDetails={ViewDetails}
              language={language}
              screen={'Step2PainAssesment'}
            />
          ) : (
            <EndSessionComp
              navigation={props.navigation}
              ViewDetails={ViewDetails}
              userRes={{
                name: UserRes[3],
                gender: UserRes[31],
                dob: UserRes[4],
              }}
              startSession
              targetNavigation={'Step2PainAssesment'}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default StartSession;

const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  RadioStyle: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  checkbox: {
    transform: [{scale: 0.8}],
  },

  filledDate: {
    borderColor: colors.turquoise,
  },

  dateContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    gap: wp(2),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  InnerView: {
    marginTop: hp(0.5),
    marginBottom: hp(1),
  },
  dateText: {
    color: colors.borderColor,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interRegular,
  },
  filledDateText: {
    color: colors.grey,
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
  CheckBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: wp(3),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: hp(1),
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
  StartSession: {
    flexDirection: 'row',
    gap: wp(1),
    paddingVertical: hp(1.5),
    marginTop: hp(2),
  },
  DropdownStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    alignItems: 'center',
  },
  SelectLanguage: {
    flexDirection: 'row',
    gap: wp(1),
  },
  PatientAndPractitioner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  DropDownPickerStyle: {},
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
    zIndex: -1,
  },
  resetButton: {
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: wp(1.5),
  },
  resetText: {
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_12,
  },
  personalInfoContainer: {
    marginTop: hp(2.5),
    zIndex: -1,
  },
});
