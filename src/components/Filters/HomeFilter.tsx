//
//  EMTranPro Mobile App
//
//  Created by Muhammad Uzair on 18/01/2024
//
//  Company: Codistan Pvt ltd.
//
//  Current developer: Muhamamd Uzair
//

import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../utils/appContants';
import {SvgXml} from 'react-native-svg';
import {
  crossSvg,
  crossTurquoise,
  dateDarkSvg,
  dateLightSvg,
  radioButtonEmpty,
  radioButtonFilled,
} from '../../assets/svgs/SvgGroup';
import * as Typography from '../../assets/fonts/typography';
import {interMedium, interRegular} from '../../assets/fonts';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LoaderComp from '../LoaderComp/LoaderComp';
import Toast from 'react-native-toast-message';

const HomeFilter = (props: any) => {
  // For Date Picker
  const [date, setdate] = useState<any>('');

  const [current, setcurrent] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([1, 10]);
  const sliderLength = wp(84);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  // console.log('card data', props.CardData);
  const [selectedRadio, setselectedRadio] = useState<any>('');
  const radioButtonsData = [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'},
    {id: 3, name: 'Others'},
  ];

  const applyFilters = () => {
    let filteredData = props?.CardData;
    setIsLoading(true);
    if (selectedRadio.id === 1) {
      filteredData = filteredData.filter((item: any) => item.gender === 'male');
    } else if (selectedRadio.id === 2) {
      filteredData = filteredData.filter(
        (item: any) => item.gender === 'female',
      );
    } else if (selectedRadio.id === 3) {
      filteredData = filteredData.filter(
        (item: any) => item.gender !== 'male' && item.gender !== 'female',
      );
    }

    if (!(values[0] === 1 && values[1] === 10)) {
      filteredData = filteredData.filter(
        (item: any) =>
          parseInt(item.age) >= values[0] && parseInt(item.age) <= values[1],
      );
    }

    if (date) {
      const selectedDate = moment(date).format('DD/MM/YYYY');
      filteredData = filteredData.filter(
        (item: any) =>
          moment(item.createdAt).format('DD/MM/YYYY') === selectedDate,
      );
    }
    if (filteredData.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No Record found',
        text2: '',
      });
    }
    console.log('Filtered Data:', typeof filteredData);
    setIsLoading(false);

    props.setisFilterVisible(false);
    props.updateFilteredData(filteredData);
  };

  const multiSliderValuesChange = (values: any) => {
    setValues(values);
    setShowResetButton(true);
  };
  const handleReset = () => {
    setValues([1, 10]);
    setselectedRadio('');
    setdate('');
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.setisFilterVisible(false)}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback>
      <View style={styles.contentContainer}>
        {/* -----Filters Row----- */}
        <View style={styles.filtersRow}>
          <Text style={styles.heading}>Filters</Text>
          <TouchableOpacity onPress={() => props.setisFilterVisible(false)}>
            <SvgXml xml={crossSvg} />
          </TouchableOpacity>
        </View>

        {/* -----Line----- */}
        <View style={styles.line} />

        {/* -----Filtered Data----- */}

        <View style={styles.filteredRow}>
          {/* -----Reset Button----- */}
          {date && selectedRadio && values[0] >= 1 && values[1] > 10 && (
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          )}

          {/* -----Date Button----- */}
          {date && (
            <View style={styles.filteredDataButton}>
              <Text style={styles.filteredDataText}>
                {moment(date).format('DD/MM/YYYY')}
              </Text>
              <TouchableOpacity onPress={() => setdate(null)}>
                <SvgXml xml={crossTurquoise} />
              </TouchableOpacity>
            </View>
          )}
          {/* -----Gender Button----- */}
          {selectedRadio && (
            <View style={styles.filteredDataButton}>
              <Text style={styles.filteredDataText}>{selectedRadio?.name}</Text>
              <TouchableOpacity onPress={() => setselectedRadio('')}>
                <SvgXml xml={crossTurquoise} />
              </TouchableOpacity>
            </View>
          )}
          {/* -----Age Button----- */}
          {values[0] >= 1 && values[1] > 10 ? (
            <View style={styles.filteredDataButton}>
              <Text style={styles.filteredDataText}>
                {values[0]} - {values[1]}
              </Text>
              <TouchableOpacity onPress={() => setValues([1, 10])}>
                <SvgXml xml={crossTurquoise} />
              </TouchableOpacity>
            </View>
          ) : values[0] === 1 && values[1] === 10 ? null : null}
        </View>

        {/* -----Select Date----- */}
        <View>
          <Text style={styles.heading}>Date</Text>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[styles.dateContainer, date && styles.filledDate]}>
            <SvgXml xml={date ? dateDarkSvg : dateLightSvg} />
            <Text style={[styles.dateText, date && styles.filledDateText]}>
              {date ? moment(date).format('DD/MM/YYYY') : 'Select Date'}
            </Text>
          </TouchableOpacity>

          {/* -----Date Picker----- */}
          <DatePicker
            modal
            open={open}
            date={current}
            title={null}
            mode="date"
            theme="light"
            textColor="#323232"
            onConfirm={db => {
              setOpen(false);
              setdate(db);
              setShowResetButton(true);
            }}
            maximumDate={new Date()}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        {/* -----Select Gender----- */}
        <View>
          <Text style={styles.heading}>Gender</Text>
          {/* Radion Buttons Contaier */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(1),
              marginBottom: hp(2),
            }}>
            {radioButtonsData.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setselectedRadio(item), setShowResetButton(true);
                  }}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: wp(2),
                  }}>
                  {selectedRadio.id == item.id ? (
                    <SvgXml xml={radioButtonFilled} />
                  ) : (
                    <SvgXml xml={radioButtonEmpty} />
                  )}
                  <Text style={{color: colors.blackDark}}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={styles.heading}>Age</Text>
          <Text
            style={[
              styles.yearsText,
              {
                color:
                  values[0] >= 1 && values[1] <= 10
                    ? colors.borderColor
                    : colors.turquoise,
              },
            ]}>
            {values[0]} - {values[1]}
          </Text>
          <View style={{left: wp(3)}}>
            <MultiSlider
              values={values}
              min={1}
              max={80}
              step={1}
              sliderLength={sliderLength}
              onValuesChange={multiSliderValuesChange}
              allowOverlap={false}
              snapped
              selectedStyle={{
                backgroundColor: colors.turquoise,
                borderWidth: 1.5,
                borderColor:
                  values[0] >= 1 && values[1] <= 10
                    ? colors.borderColor
                    : colors.turquoise,
              }}
              unselectedStyle={{
                borderWidth: 1.5,
                borderColor: colors.borderColor,
              }}
              markerStyle={{
                backgroundColor: colors.white,
                borderWidth: 1.5,
                borderColor:
                  values[0] >= 1 && values[1] <= 10
                    ? colors.borderColor
                    : colors.turquoise,
                height: wp(6.5),
                width: wp(6.5),
              }}
              containerStyle={{
                height: 40,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          disabled={
            // date === null ||
            // !date ||
            // selectedRadio === ''

            !date && selectedRadio === '' && values[0] >= 1 && values[1] === 10

            // selectedRadio
          }
          style={[
            styles.button,
            {
              backgroundColor:
                !date &&
                selectedRadio === '' &&
                values[0] >= 1 &&
                values[1] === 10
                  ? colors.borderColor
                  : colors.turquoise,

              // date === null ||
              // selectedRadio === '' ||
              // (values[0] === 1 && values[1] === 10)
              //   ? colors.borderColor
              //   : colors.turquoise,
            },
          ]}
          onPress={() => applyFilters()}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <LoaderComp isLoading={isLoading} setIsLoading={setIsLoading} />
    </View>
  );
};

export default HomeFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(0.7),
    borderRadius: hp(1),
    backgroundColor: colors.turquoise,
    height: hp(5.5),
    marginTop: hp(1),
    marginVertical: hp(4),
  },
  buttonText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_15,
  },
  yearsText: {
    alignSelf: 'flex-end',
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_13,
  },
  contentContainer: {
    width: wp(100),
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: wp(6),
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: colors.blackDark,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: interMedium,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.borderColor,
    marginVertical: hp(2),
  },
  resetButton: {
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    justifyContent: 'center',
  },
  resetText: {
    color: colors.red,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: interMedium,
  },
  filteredDataButton: {
    backgroundColor: colors.turquoiseLight,
    borderColor: colors.turquoise,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(2),
  },
  filteredDataText: {
    color: colors.turquoise,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: interMedium,
  },
  filteredRow: {
    flexDirection: 'row',
    gap: wp(3),
    flexWrap: 'wrap',
    marginBottom: hp(2),
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
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  filledDate: {
    borderColor: colors.turquoise,
  },
  dateText: {
    color: colors.borderColor,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: interRegular,
  },
  filledDateText: {
    color: colors.grey,
  },
});
