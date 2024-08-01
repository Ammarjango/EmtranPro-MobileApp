import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {colors} from '../../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
const SliderComp = (props: any) => {
  const UserResponse = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );

  const [selectedSlider, setSelectedSlider] = useState('Minutes'); // State to track the selected slider
  const initialValues =
    UserResponse &&
    UserResponse['30']
      ?.split(',')
      ?.map((value: string) => parseInt(value.trim(), 10));

  const [durationScale, setdurationScale] = useState<any>({
    Minutes: initialValues ? initialValues[0] : 5,
    Hours: initialValues ? initialValues[1] : 2,
    Days: initialValues ? initialValues[2] : 1,
    Weeks: initialValues ? initialValues[3] : 1,
    Months: initialValues ? initialValues[4] : 1,
  });

  useEffect(() => {
    props.setSliderValues(
      `${durationScale.Minutes}, ${durationScale.Hours}, ${durationScale.Days}, ${durationScale.Weeks}, ${durationScale.Months}`,
    );
  }, [durationScale]);

  const handleTouchablePress = (sliderName: any) => {
    setSelectedSlider(sliderName); // Set the selected slider based on the pressed touchable
    // Perform any actions needed based on the selected button
  };

  // Function to handle slider value change
  const handleSliderChange = (value: any, key: string) => {
    setdurationScale((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const touchablesData = [
    {name: 'Minutes', min: 5, max: 60, step: 5},
    {name: 'Hours', min: 2, max: 24, step: 2},
    {name: 'Days', min: 1, max: 7, step: 1},
    {name: 'Weeks', min: 1, max: 4, step: 1},
    {name: 'Months', min: 1, max: 12, step: 1},
  ];
  const handleStepPress = (value: any, name: any) => {
    setdurationScale((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getMarginRight = (name: any) => {
    const platform = Platform.OS;
    switch (name) {
      case 'Minutes':
        return platform === 'ios' ? wp(3.6) : wp(3.9);
      case 'Hours':
        return wp(4.4);
      case 'Days':
        return wp(12);
      case 'Weeks':
        return wp(27);
      case 'Months':
        return wp(5.4);
      default:
        return 0;
    }
  };
  const maxSteps = Math.max(
    ...touchablesData.map(touchable => touchable.max / touchable.step),
  );
  const sliderLength = maxSteps * wp(7.1);
  return (
    <View
      style={{
        flex: 1,
        bottom: hp(1.5),

        width: wp(90),
        alignSelf: 'center',
      }}>
      {/* Buttons row */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {touchablesData.map((touchable, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTouchablePress(touchable.name)}
            style={[
              styles.touchable,
              selectedSlider === touchable.name && styles.selectedTouchable,
              {
                borderBottomWidth: 1,
                borderBottomColor:
                  selectedSlider === touchable.name
                    ? colors.turquoise
                    : 'transparent',
              },
            ]}>
            <Text
              style={{
                color:
                  selectedSlider === touchable.name
                    ? colors.turquoise
                    : colors.borderColor,
              }}>
              {touchable.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {touchablesData.map((touchable, index) => (
        <View
          key={index}
          style={{
            marginTop: hp(2),
            display: selectedSlider === touchable.name ? 'flex' : 'none',
          }}>
          {selectedSlider === touchable.name && (
            <>
              <View style={{flexDirection: 'row'}}>
                {[...Array(touchable.max / touchable.step)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      handleStepPress((i + 1) * touchable.step, touchable.name)
                    }
                    style={{marginRight: getMarginRight(touchable.name)}}>
                    <Text
                      style={{
                        color:
                          (i + 1) * touchable.step ===
                          durationScale[touchable.name]
                            ? colors.turquoise
                            : colors.black,
                      }}>
                      {(i + 1) * touchable.step}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          <View style={{flex: 1}}>
            <MultiSlider
              sliderLength={sliderLength}
              min={touchable.min}
              max={touchable.max}
              step={touchable.step}
              selectedStyle={styles.selectedStyle}
              allowOverlap={false}
              snapped
              values={[durationScale[touchable.name]]}
              onValuesChange={values => {
                handleSliderChange(values[0], touchable.name);
              }}
              customMarker={() => <View style={styles.marker}></View>}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default SliderComp;
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
    left: wp(2),
    zIndex: 10,
    borderRadius: 8,
    backgroundColor: colors.turquoise,
    borderWidth: 1,
    borderColor: colors.turquoiseDark,
  },
  touchable: {
    // paddingHorizontal: 2,
    // paddingVertical: 2,
    // marginHorizontal: 5,
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  selectedTouchable: {
    backgroundColor: 'transparent',
  },
});
