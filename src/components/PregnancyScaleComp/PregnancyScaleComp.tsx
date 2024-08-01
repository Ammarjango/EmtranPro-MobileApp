import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {colors} from '../../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LangContext} from '../../../App';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
const PregnancyScaleComp = (props: any) => {
  const [selectedSlider, setSelectedSlider] = useState('Minutes'); // State to track the selected slider
  const UserResponse = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );

  const initialValues =
    UserResponse &&
    UserResponse['23']
      ?.split(',')
      ?.map((value: string) => parseInt(value.trim(), 10));

  const [pregnancyScale, setpregnancyScale] = useState<any>({
    Months: initialValues ? initialValues[0] : 1,
    Weeks: initialValues ? initialValues[1] : 1,
    Days: initialValues ? initialValues[2] : 1,
  });

  useEffect(() => {
    props?.setSliderValues(
      `${pregnancyScale.Months}, ${pregnancyScale.Weeks}, ${pregnancyScale.Days}`,
    );
  }, [pregnancyScale]);

  const {lang} = useContext(LangContext);

  const handleSliderChange = (value: any, key: string) => {
    setpregnancyScale((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const touchablesData = [
    {name: 'Months', min: 1, max: 8, step: 1},
    {name: 'Weeks', min: 1, max: 4, step: 1},
    {name: 'Days', min: 1, max: 7, step: 1},
  ];

  const selectedLanguage = props?.options?.find(
    (option: any) => option?.new_type === 'PregnantScale',
  )?.[lang];

  const translatedTitles: any = [];

  if (selectedLanguage) {
    const translations = selectedLanguage.split(',');

    translatedTitles.push(translations[0]?.trim());
    translatedTitles.push(translations[2]?.trim());
    translatedTitles.push(translations[4]?.trim());
  }

  if (translatedTitles.length === 3) {
    touchablesData[0].name = translatedTitles[0];
    touchablesData[1].name = translatedTitles[1];
    touchablesData[2].name = translatedTitles[2];
  } else {
    console.log('error');
  }
  const handleStepPress = (value: any, name: any) => {
    setpregnancyScale((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const maxSteps = Math.max(
    ...touchablesData.map(touchable => touchable.max / touchable.step),
  );
  const sliderLength = maxSteps * wp(10.8);
  return (
    <View style={{flex: 1}}>
      {/* Buttons row */}
      <View style={{gap: wp(1)}}>
        {touchablesData?.map((touchable, index) => (
          <View key={index}>
            <Text
              style={{
                color: colors.grey,
                marginBottom: hp(1.5),
              }}>
              {touchable.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                overflow: 'hidden',
              }}>
              {[...Array(touchable.max / touchable.step)].map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    handleStepPress((i + 1) * touchable.step, touchable.name)
                  }>
                  <View style={{alignItems: 'center', position: 'relative'}}>
                    <Text
                      style={{
                        color:
                          (i + 1) * touchable.step ===
                          pregnancyScale[touchable.name]
                            ? colors.turquoise
                            : colors.black,
                      }}>
                      {(i + 1) * touchable.step}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{paddingHorizontal: 2, width: '100%'}}>
              <MultiSlider
                sliderLength={sliderLength}
                min={touchable.min}
                max={touchable.max}
                trackStyle={styles.trackStyle}
                selectedStyle={styles.selectedStyle}
                step={touchable.step}
                allowOverlap={false}
                snapped
                values={[pregnancyScale[touchable.name]]}
                onValuesChange={values => {
                  handleSliderChange(values[0], touchable.name);
                }}
                customMarker={() => <View style={styles.marker}></View>}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PregnancyScaleComp;
const styles = StyleSheet.create({
  trackStyle: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  selectedStyle: {
    backgroundColor: colors.turquoise,
  },
  marker: {
    height: 14,
    width: 14,
    borderRadius: 8.5,
    left: wp(1),
    zIndex: 10,
    // left: wp(1),
    backgroundColor: colors.turquoise,
    borderWidth: 1,
    borderColor: colors.turquoiseDark,
  },
  touchable: {
    paddingHorizontal: 2,
    // paddingVertical: 2,
    marginHorizontal: 5,
  },
  selectedTouchable: {
    backgroundColor: 'transparent',
  },
});
