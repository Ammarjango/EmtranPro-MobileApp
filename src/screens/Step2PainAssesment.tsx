import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Body from 'react-native-body-highlighter';
import {interMedium, interRegular} from '../assets/fonts';
import TextComp from '../components/TextComp/TextComp';
import {colors} from '../utils/appContants';
import * as Typography from '../assets/fonts/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {ScrollView} from 'react-native-gesture-handler';
import EndSessionComp from '../components/EndSessionComp/EndSessionComp';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {createSelector} from 'reselect';
import SessionComp from '../components/SessionComp/SessionComp';
import {LangContext} from '../../App';
import ViewNext from '../components/ViewNext/ViewNext';
import {userResponse} from '../store/reducers/appReducer';
import {SvgXml} from 'react-native-svg';

import {radioButtonEmpty, radioButtonFilled} from '../assets/svgs/SvgGroup';
const Step2PainAssesment = (props: any) => {
  const UserRes = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );
  const loadedUserRes = useSelector(
    (state: any) => state.appReducer.UserResponse[10],
  );
  const dispatch = useDispatch();
  const selectSessionData = (state: RootState) =>
    state?.appReducer?.SessionData;
  const keysToReset = [7, 8, 9];

  const selectSessionDataSlice = createSelector(
    [selectSessionData],
    sessionData => {
      if (!sessionData || !Array.isArray(sessionData)) {
        return [];
      }
      return sessionData.slice(7, 10);
    },
  );
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const SessionData = useSelector(selectSessionDataSlice);

  const [bodyPartSelected, setBodyPartSelected] = useState<any>([
    {color: '', slug: '', intensity: 0},
  ]);

  const {ViewDetails, language} = props?.route?.params || {};

  useEffect(() => {
    try {
      const params = JSON?.parse(UserRes['10']?.params);
      const optionSelected = JSON?.parse(UserRes['10']?.optionSelected);

      setBodyPartSelected(
        Object.keys(params).map(d => ({
          slug: d,
          intensity: 1,
          color: '#ff0000',
        })),
      );

      setSelectedBodyPart(Object.keys(params));

      const valueMapping: any = {
        Bleed: 0,
        Hurt: 1,
        Pain: 2,
      };

      const transformedData: any = {};
      Object.keys(optionSelected).forEach(key => {
        transformedData[key] = valueMapping[optionSelected[key]];
      });

      setSelectedOptions(transformedData);
    } catch (error) {
      console.log('Error parsing UserRes:', error);
      // Handle parsing error gracefully, e.g., by setting default values or showing an error message
    }
  }, [UserRes]);
  // useEffect(() => {
  //   if (loadedUserRes) {
  //     try {
  //       // Assuming loadedUserRes is an object containing keys for params and optionSelected
  //       const {params, optionSelected} = loadedUserRes;

  //       // Parse params and optionSelected if they are stringified JSON
  //       const parsedParams = params ? JSON.parse(params) : {};
  //       const parsedOptionSelected = optionSelected
  //         ? JSON.parse(optionSelected)
  //         : {};

  //       // Update state with the parsed objects
  //       setSelectedBodyPart(Object.keys(parsedParams)); // Assuming these are the keys of the body parts
  //       setSelectedOptions(parsedOptionSelected); // This should be the actual selections
  //     } catch (error) {
  //       console.error('Error parsing UserRes data:', error);
  //     }
  //   }
  // }, [loadedUserRes]);

  const {lang} = useContext(LangContext);

  const [selectedBodyPart, setSelectedBodyPart] = useState<any>([]);

  const handleReset = () => {
    const updatedUserResponse = {...UserRes};
    keysToReset.forEach(key => {
      updatedUserResponse[key] = null;
    });
    dispatch(userResponse(updatedUserResponse));
  };
  const renderRadioButtons = (quesId: any) => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: hp(2),
        }}>
        {selectedBodyPart.map((part: any, index: any) => {
          return (
            <>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: interMedium,
                  fontWeight: '500',
                  alignSelf: 'flex-start',
                  paddingVertical: hp(1),
                  fontSize: Typography.FONT_SIZE_11,
                }}>
                {part?.charAt(0)?.toUpperCase() + part?.slice(1)}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',

                  alignSelf: 'flex-start',
                }}>
                {['Bleed', 'Hurt', 'Pain'].map((option, optionIndex) => {
                  const radioButtonXml =
                    selectedOptions[part] === optionIndex
                      ? radioButtonFilled
                      : radioButtonEmpty;

                  const handleOptionPress = async (
                    part: any,
                    option: any,
                    optionIndex: any,
                  ) => {
                    try {
                      const updatedOptions = {
                        ...selectedOptions,
                        [part]: optionIndex,
                      };

                      setSelectedOptions(updatedOptions);

                      const params = selectedBodyPart.reduce(
                        (acc: any, bodyPart: any) => {
                          acc[bodyPart] = {
                            selected: updatedOptions[bodyPart] !== '',
                          };
                          return acc;
                        },
                        {},
                      );

                      const optionSelected = selectedBodyPart.reduce(
                        (acc: any, bodyPart: any) => {
                          acc[bodyPart] =
                            selectedOptions[bodyPart] !== ''
                              ? ['Bleed', 'Hurt', 'Pain'][
                                  updatedOptions[bodyPart]
                                ]
                              : '';
                          return acc;
                        },
                        {},
                      );

                      // Format data
                      const formattedData = {
                        params: JSON.stringify(params),
                        optionSelected: JSON.stringify(optionSelected),
                      };

                      // Update UserRes with the new data
                      const userResUpdate = {
                        [quesId]: formattedData,
                      };

                      // Merge updated data with existing UserRes
                      const mergedUserRes = {
                        ...UserRes,
                        ...userResUpdate,
                      };

                      // Dispatch action
                      await dispatch(userResponse(mergedUserRes));

                      // Any other post-dispatch logic here
                    } catch (error) {
                      console.error('Error occurred:', error);
                    }
                  };

                  return (
                    <>
                      <TouchableOpacity
                        key={optionIndex}
                        style={styles.Radiobutton}
                        onPress={() =>
                          handleOptionPress(part, option, optionIndex)
                        }>
                        <SvgXml xml={radioButtonXml} />
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: interMedium,
                            fontWeight: 'normal',
                            fontSize: Typography.FONT_SIZE_11,
                          }}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                })}
              </View>
            </>
          );
        })}
      </View>
    );
  };

  const handleBodyPartPress = (e: any) => {
    const slug: any = e.slug;
    const isSelected = selectedBodyPart.includes(slug);

    // Toggle selection
    if (isSelected) {
      setSelectedBodyPart(
        selectedBodyPart.filter((part: any) => part !== slug),
      );

      setBodyPartSelected(
        bodyPartSelected.filter((part: any) => part.slug !== slug),
      );
    } else {
      setSelectedBodyPart([...selectedBodyPart, slug]);

      setBodyPartSelected([
        ...bodyPartSelected,
        {slug, intensity: 1, color: '#ff0000'},
      ]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.SafeAreaStyle,
          {
            flex: 1,
          },
        ]}>
        <View style={styles.mainContainer}>
          <View style={styles.stepContainer}>
            <TextComp
              textvalue="Step 2/6"
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
                      color: Object.values(UserRes).every(
                        value => value === null,
                      )
                        ? colors.borderColor
                        : colors.red,
                    },
                  ]}>
                  Reset
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.PainText}>
            <TextComp
              textvalue={'PAIN ASSESSMENT'}
              color={colors.lightBlack}
              fontSize={Typography.FONT_SIZE_16}
              fontFamily={interMedium}
            />
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
                    index={index}
                    SessionData={SessionData}
                    radioButtonsData={item?.options}
                    question_type={item?.new_question_type}
                    viewDetailLang={language}
                    optionType={newOptionType}
                    ScaleCheck
                    quesId={item.id}
                  />

                  {item.id === 10 && (
                    <View style={styles.BodyContainer}>
                      <ScrollView
                        style={{
                          maxHeight: hp(42),
                        }}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          justifyContent: 'flex-start',
                        }}>
                        {renderRadioButtons(item.id)}
                      </ScrollView>
                      <View>
                        <Body
                          data={[
                            {slug: 'hair', intensity: 3, color: '#0984e3'},
                            ...bodyPartSelected,
                          ]}
                          onBodyPartPress={handleBodyPartPress}
                          zoomOnPress={true}
                          side={'front'}
                          scale={0.9}
                          colors={['#f94449', '#74b9ff', '#464646']}
                          frontOnly={false}
                          backOnly={false}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        {ViewDetails ? (
          <ViewNext
            navigation={props.navigation}
            ViewDetails={ViewDetails}
            screen={'Step3MedicalHistory'}
            language={language}
          />
        ) : (
          <EndSessionComp
            navigation={props.navigation}
            NextNavigation={'Step3MedicalHistory'}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Step2PainAssesment;

const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  Radiobutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(0.5),
    gap: wp(0.5),
  },
  labelValue: {
    marginLeft: wp(5.5),
    right: wp(1.5),
    fontSize: Typography.FONT_SIZE_13,
    color: colors.grey,
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
  DesText: {
    color: colors.lightBlack,
    fontSize: Typography.FONT_SIZE_11,
    fontFamily: interRegular,
  },
  bullet: {
    padding: 1,
    backgroundColor: 'black',
    height: 4,
    borderRadius: 2,
    width: 4,
  },
  DesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  DesWidth: {
    width: wp(80),
    flexDirection: 'row',
  },

  InnerScale: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  RadioStyle: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  InnerView: {
    marginTop: hp(0.5),
    marginBottom: hp(1),
  },
  mainContainer: {},
  personalInfoContainer: {
    marginTop: hp(2.5),
  },
  PainScale: {},
  PainText: {
    paddingVertical: hp(2.5),
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    marginTop: hp(3),
    zIndex: -1,
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
  BodyContainer: {
    // alignItems: 'flex-end',
    flex: 1,
    width: wp(90),
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(1),
    justifyContent: 'space-between',
    // borderWidth: 1,
    bottom: hp(2),
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
  NextText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_14,
  },
});
