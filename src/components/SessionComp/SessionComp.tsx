import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  interBold,
  interMedium,
  interRegular,
  interSemiBold,
} from '../../assets/fonts';
import {colors} from '../../utils/appContants';
import TextComp from '../TextComp/TextComp';
import * as Typography from '../../assets/fonts/typography';
import {SvgXml} from 'react-native-svg';
import {
  radioButtonFilled,
  radioButtonEmpty,
  focuedPersonSvg,
  personSvg,
  dateDarkSvg,
  dateLightSvg,
  PainScale,
  triangleCursor,
  CrossSvg,
  OSymbol,
  PlusSymbol,
} from '../../assets/svgs/SvgGroup';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import InputComp from '../InputComp/InputComp';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {LangContext} from '../../../App';
import TableComp from '../TableComp/TableComp';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {userResponse} from '../../store/reducers/appReducer';
import SliderComp from '../SliderComp/SliderComp';
import PregnancyScaleComp from '../PregnancyScaleComp/PregnancyScaleComp';
import {string} from 'yup';
const SessionComp = (props: any) => {
  const UserResponse = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );

  const ViewDetails = props.ViewDetails;
  const question_type = props?.question_type;

  const viewDetailLang = props.viewDetailLang;

  const initialDate =
    viewDetailLang && UserResponse['4']
      ? moment(UserResponse['4'], 'DD/MM/YYYY').toDate()
      : null;

  const [date, setdate] = useState<Date | null>(
    ViewDetails ? initialDate : null,
  );

  const [DateOpen, setDateOpen] = useState(false);

  const [current, setCurrent] = useState<Date>(new Date());
  // console.log('current', current);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const optionType = props?.optionType;
  const radioButtonData = props?.radioButtonsData;
  const {lang} = useContext(LangContext);

  // useEffect(() => {
  //   if (optionType === 'TableBox' && !viewDetailLang) {
  //     let _tableRes: any = {};
  //     radioButtonData[0][lang].split('\n').map((d: any) => {
  //       _tableRes[d] = {iTake: '', iAmAllergic: ''};
  //     });

  //     dispatch(
  //       userResponse({
  //         ...UserResponse,
  //         [props.quesId]: JSON.stringify(_tableRes),
  //       }),
  //     );
  //   }
  // }, []);
  useEffect(() => {
    if (optionType === 'TableBox' && !viewDetailLang) {
      const existingResponse = UserResponse[props.quesId]
        ? JSON.parse(UserResponse[props.quesId])
        : null;

      if (!existingResponse) {
        let _tableRes: any = {};
        radioButtonData[0][lang].split('\n').forEach((d: any) => {
          _tableRes[d] = {iTake: false, iAmAllergic: false};
        });

        dispatch(
          userResponse({
            ...UserResponse,
            [props.quesId]: JSON.stringify(_tableRes),
          }),
        );
      }
    }
    if (UserResponse[4]) {
      setdate(moment(UserResponse[4], 'DD/MM/YYYY').toDate());
    }
  }, [
    optionType,
    viewDetailLang,
    UserResponse,
    props.quesId,
    lang,
    radioButtonData,
  ]);

  const symbols = [
    {name: 'cross', component: CrossSvg},
    {name: 'o', component: OSymbol},
    {name: 'plus', component: PlusSymbol},
  ];
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  useEffect(() => {
    // console.log('response in component::', UserResponse);
  }, [UserResponse]);

  const dispatch = useDispatch();

  const handleOptionSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions?.filter((item: any) => item !== option),
      );
      return selectedOptions.filter((item: any) => item !== option);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      return [...selectedOptions, option];
    }
  };

  const handlePress = (symbolName: any) => {
    setSelectedSymbol(symbolName === selectedSymbol ? null : symbolName);
  };

  const handleOptionPress = (value: any, totalOptions: any) => {
    if (totalOptions?.length > 1) {
      const res: any = handleOptionSelect(value);
      const NewRes = res?.join(', ');

      dispatch(
        userResponse({
          ...UserResponse,
          [props.quesId]: NewRes,
        }),
      );
    } else {
      dispatch(
        userResponse({
          ...UserResponse,
          [props.quesId]: value,
        }),
      );
    }
  };

  const handleDateConfirm = (selectedDate: any) => {
    setDateOpen(false);
    handleOptionPress(moment(selectedDate).format('DD/MM/YYYY'), []);
    setdate(selectedDate);
  };

  return (
    <View key={props.indexx}>
      {props.textvalue && question_type === 'Textual' && (
        <View
          style={{
            marginBottom: hp(2),
          }}>
          {props.quesId === 10 && (
            <>
              <TextComp
                textvalue={
                  viewDetailLang
                    ? 'where am I hurt?'
                    : 'Press where you are hurt.'
                }
                color={colors.lightBlack}
                fontSize={Typography.FONT_SIZE_14}
                fontFamily={interSemiBold}
              />
              {/* <View style={styles.Symbol}>
                {/* {symbols.map((symbol, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(symbol.name)}
                    style={[
                      styles.SymbolButtons,
                      {
                        borderColor:
                          selectedSymbol === symbol.name
                            ? colors.turquoise
                            : 'white',
                      },
                    ]}>
                    <SvgXml xml={symbol.component} />
                  </TouchableOpacity>
                ))} *
              </View> */}
              {/* {props.textvalue.split('\n').map((line: any, index: any) => (
                // <View
                //   style={{
                //     flexDirection: 'row',
                //     alignItems: 'flex-start',
                //   }}
                //   key={index}>
                //   {/* <Text
                //     style={{
                //       fontSize: Typography.FONT_SIZE_16,
                //       marginRight: 5,
                //       color: colors.black,
                //     }}>
                //     {'\u2022'}
                //   </Text> 
                //   <Text
                //     style={{
                //       fontSize: Typography.FONT_SIZE_12,
                //       color: colors.grey,
                //       fontWeight: 'normal',
                //     }}>
                //     {/* {line} 
                //   </Text>
                // </View>
              ))} */}
            </>
          )}

          {props.quesId !== 10 && (
            <TextComp
              textvalue={props.textvalue.replace(/(\r\n|\n|\r)/gm, '')}
              color={colors.lightBlack}
              fontSize={Typography.FONT_SIZE_16}
              fontFamily={interMedium}
            />
          )}
        </View>
      )}

      {radioButtonData &&
        optionType !== 'TableBox' &&
        optionType !== 'PregnantScale' &&
        radioButtonData?.map((item: any, index: any) => {
          const options = item[viewDetailLang ? viewDetailLang : lang];

          const optionsArray = options
            ?.split(',')
            ?.map((option: any) => option?.trim());

          const checkBoxes = optionsArray?.map((option: any, index: any) => {
            const userResponseString = UserResponse[props.quesId];
            let isChecked;

            if (userResponseString && typeof userResponseString === 'string') {
              isChecked = userResponseString
                .split(',')
                .map(Number)
                .includes(index);
            } else {
              isChecked = false;
            }

            return (
              <View key={index} style={styles.checkboxContainer}>
                <CheckBox
                  style={
                    Platform.OS === 'android'
                      ? {right: wp(1.5)}
                      : {right: wp(1.5), transform: [{scale: 0.8}]}
                  }
                  tintColors={{
                    true: colors.turquoise,
                    false: 'silver',
                  }}
                  value={isChecked}
                  onValueChange={() => handleOptionPress(index, optionsArray)}
                  //Props for iOS
                  boxType="square"
                  onCheckColor={'#fff'}
                  onFillColor={colors.turquoise}
                  tintColor={colors.borderColor}
                  onTintColor={colors.turquoise}
                />
                <Text numberOfLines={2} style={styles.checkboxLabel}>
                  {option}
                </Text>
              </View>
            );
          });

          return item.new_type === 'Check Box' ? (
            <View style={styles.CheckBoxContainer}>{checkBoxes}</View>
          ) : (
            <View
              style={{
                marginBottom: hp(1),
                flexDirection: optionsArray?.length > 2 ? 'row' : 'column',
                flexWrap: 'wrap',
                width: wp(90),
                alignSelf: 'flex-start',
                gap: wp(2),
              }}>
              {optionsArray?.length > 0 &&
                optionsArray?.map((item: any, index: number) => {
                  // console.log('itemm', item);
                  let radioButtonXml = radioButtonEmpty;
                  radioButtonXml =
                    UserResponse[props.quesId] === index
                      ? radioButtonFilled
                      : radioButtonEmpty;
                  {
                    if (
                      optionsArray.length > 0 &&
                      optionsArray[0] !== '1 2 3 4 5 6 7 8 9 10' &&
                      optionsArray[0] !== ''
                    ) {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleOptionPress(index, [])}
                          style={[
                            styles.RadioTouchableStyle,
                            {marginRight: wp(6)},
                          ]}>
                          <SvgXml xml={radioButtonXml} />
                          <Text
                            style={[
                              styles.radioButtonText,
                              {
                                color:
                                  UserResponse[props.quesId] === index
                                    ? colors.turquoise
                                    : colors.borderColor,
                              },
                            ]}>
                            {/* {item} */}
                            {item
                              ?.split(' ')
                              .map(
                                (word: any) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(' ')}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  }
                })}
            </View>
          );
        })}

      {optionType === 'TableBox' &&
        radioButtonData.map((item: any, index: any) => {
          const data = item[viewDetailLang ? viewDetailLang : lang];
          const dataArray = data.split('\n');

          const handleToggleTake = (itemName: any, newValue: any) => {
            try {
              let currentData = JSON.parse(UserResponse[props.quesId] || '{}');
              let updatedData = {
                ...currentData,
                [itemName]: {
                  ...currentData[itemName],
                  iTake: newValue,
                },
              };
              handleOptionPress(JSON.stringify(updatedData), []);
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          };

          const handleToggleAllergic = (itemName: any, newValue: any) => {
            try {
              let currentData = JSON.parse(UserResponse[props.quesId] || '{}');
              let updatedData = {
                ...currentData,
                [itemName]: {
                  ...currentData[itemName],
                  iAmAllergic: newValue,
                },
              };
              handleOptionPress(JSON.stringify(updatedData), []);
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          };

          return (
            <View
              key={index}
              style={{marginBottom: hp(1), backgroundColor: 'transparent'}}>
              <View style={styles.tableView}>
                <View
                  style={{
                    flex: 1,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.headingText}>Name</Text>
                </View>
                <View
                  style={{
                    flex: 1,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.headingText,
                      {
                        marginLeft: wp(4.5),
                      },
                    ]}>
                    I take
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.headingText,
                      {
                        marginLeft: Platform.OS === 'ios' ? wp(5) : wp(6),
                      },
                    ]}>
                    I am Allergic
                  </Text>
                </View>
              </View>
              {dataArray.map((item: any, index: number) => {
                // Parse the JSON string into a JavaScript object

                const jsonObject = JSON.parse(
                  UserResponse[props.quesId] || '{}',
                );

                if (JSON.stringify(jsonObject) === '{}') {
                  return <></>;
                } else {
                  // console.log('lkhgfgjk::', jsonObject);
                }

                return (
                  <TableComp
                    key={index}
                    data={item[viewDetailLang ? viewDetailLang : lang]}
                    item={item}
                    iTake={jsonObject[item]?.iTake}
                    iAmAllergic={jsonObject[item]?.iAmAllergic}
                    jsonObject={jsonObject}
                    quesId={props?.quesId}
                    index={index}
                    handleToggleTake={(_item: any, newValue: boolean) => {
                      handleToggleTake(_item, newValue);
                    }}
                    handleToggleAllergic={(_item: any, newValue: boolean) => {
                      handleToggleAllergic(_item, newValue);
                    }}
                  />
                );
              })}
            </View>
          );
        })}
      {optionType === 'DurationSlider' && (
        <SliderComp
          setSliderValues={(text: any) => handleOptionPress(text, [])}
        />
      )}
      {optionType === 'PregnantScale' && (
        <PregnancyScaleComp
          setSliderValues={(text: any) => handleOptionPress(text, [])}
        />
      )}

      {optionType === 'NameText' && (
        <View style={{marginBottom: hp(2), bottom: hp(2)}}>
          <InputComp
            placeholder={'Josef Manchos'}
            placeholderTextColor={colors.borderColor}
            Svg
            svg={personSvg}
            svgFocus={focuedPersonSvg}
            fontSize={Typography.FONT_SIZE_13}
            fontFamily={interRegular}
            color={colors.black}
            labelValue={UserResponse[props.quesId]}
            height={22}
            width={22}
            onTextInputChange={(text: any) => handleOptionPress(text, [])}
          />
        </View>
      )}
      {optionType === 'DOB' && (
        <>
          <TouchableOpacity
            onPress={() => setDateOpen(true)}
            style={[
              styles.dateContainer,

              {
                borderWidth: 1,
                borderColor: date ? colors.turquoise : colors.borderColor,
              },
            ]}>
            <SvgXml xml={date ? dateDarkSvg : dateLightSvg} />
            <Text style={[styles.dateText, date && styles.filledDateText]}>
              {date ? moment(date).format('DD/MM/YYYY') : 'Select Date'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={DateOpen}
            date={current}
            title={null}
            mode="date"
            theme="light"
            textColor="#323232"
            onConfirm={handleDateConfirm}
            onCancel={() => {
              setDateOpen(false);
            }}
            maximumDate={new Date()}
          />
        </>
      )}

      {optionType === 'PainScale' &&
        radioButtonData &&
        radioButtonData?.map((item: any, key: any) => {
          const optionLang = item[viewDetailLang ? viewDetailLang : lang];

          const sliderIntialVal =
            viewDetailLang && UserResponse[props.quesId]
              ? [parseInt(UserResponse[props.quesId], 10)]
              : [parseInt(UserResponse[props.quesId] || [1], 10)];

          return (
            <View style={styles.Scale}>
              <View style={styles.InnerScale}>
                <Text key={key} style={styles.labelValue}>
                  {optionLang}
                </Text>
              </View>
              <SvgXml
                xml={PainScale}
                width={wp(90)}
                style={{marginTop: hp(1)}}
              />
              <View
                style={{
                  alignSelf: 'center',
                  width: wp(76),
                  left: wp(1),
                }}>
                <MultiSlider
                  sliderLength={wp(76)}
                  onValuesChange={index => {
                    handleOptionPress(index.toString(), []),
                      console.log('what', index);
                  }}
                  min={1}
                  max={10}
                  step={1}
                  customMarker={() => (
                    <SvgXml xml={triangleCursor} style={{bottom: hp(0.5)}} />
                  )}
                  snapped
                  allowOverlap={false}
                  markerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                  }}
                  trackStyle={{
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  }}
                  selectedStyle={{
                    backgroundColor: 'transparent',
                  }}
                  values={sliderIntialVal}
                />
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default SessionComp;

const styles = StyleSheet.create({
  RadioTouchableStyle: {
    flexDirection: 'row',
    width: wp(22),
    gap: wp(1.5),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(0.4),
    paddingVertical: hp(0.4),
  },
  tableView: {
    flexDirection: 'row',
    borderTopEndRadius: hp(1),

    borderTopLeftRadius: hp(1),
    backgroundColor: colors.turquoise,

    padding: hp(1),
  },
  RadioTouchableStyleNo: {
    flexDirection: 'row',
    gap: wp(3),
    paddingHorizontal: hp(0.4),
  },
  Symbol: {
    flexDirection: 'row',
    gap: wp(4),
    paddingVertical: hp(2),
  },
  SymbolButtons: {
    backgroundColor: colors.white,
    padding: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(12),
    height: hp(5.5),
    width: wp(12),
    borderWidth: 1,
  },
  labelValue: {
    flexDirection: 'column',
    left: wp(3),
    letterSpacing: wp(2.3),
    fontSize: Typography.FONT_SIZE_13,
    color: colors.grey,
  },
  headingText: {
    fontSize: Typography.FONT_SIZE_14,
    color: colors.white,
    paddingVertical: hp(0.2),
    fontWeight: '500',
  },
  InnerScale: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    width: wp(90),
  },
  Scale: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: 5, // Adjust spacing as needed
  },
  checkboxLabel: {
    textAlign: 'left',
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: 'Mona-Sans-Regular',
    color: colors.black,
    width: wp(20),
    right: wp(1),
    bottom: hp(0.2),
  },
  radioButtonText: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
  },
  radioButtonTextNo: {
    color: colors.grey,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
    // top: 10,
  },
  CheckBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: wp(3),
    alignSelf: 'center',

    bottom: hp(1),
    // margin: hp(1),
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  bullet: {
    padding: 1,
    backgroundColor: 'black',
    height: 4,
    borderRadius: 2,
    width: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: hp(1),

    // gap: -wp(1),

    width: wp(26),
  },
  dateContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    // borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',

    gap: wp(2),
    bottom: hp(1),
    marginBottom: hp(2),
  },
  filledDateText: {
    color: colors.grey,
  },
  dateText: {
    color: colors.borderColor,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interRegular,
  },
  // filledDate: {
  //   borderColor: colors.turquoise,
  // },
});
