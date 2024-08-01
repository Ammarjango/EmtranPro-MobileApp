import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../utils/appContants';
import * as Typography from '../../assets/fonts/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
const TableComp = ({
  data,
  item,
  items,
  index,
  iTake,
  quesId,
  iAmAllergic,
  handleToggleTake,
  handleToggleAllergic,
}: any) => {
  const UserResponse = useSelector(
    (state: RootState) => state.appReducer.UserResponse,
  );

  const handleTakeToggle = (newValue: boolean) => {
    handleToggleTake(item, newValue);
  };

  const handleAllergicToggle = (newValue: boolean) => {
    handleToggleAllergic(item, newValue);
  };

  return (
    <ScrollView style={styles.mainView} contentContainerStyle={{}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          borderLeftWidth: 1.5,
          borderRightWidth: 1.5,
          borderBottomWidth: 1.5,
          borderColor: colors.borderColor,
          overflow: 'hidden',
          backgroundColor:
            index % 2 === 1 ? colors.turqioiseOpacity : colors.whiteOpacity,
          borderBottomLeftRadius: index === 14 ? hp(1) : hp(0),
          borderBottomRightRadius: index === 14 ? hp(1) : hp(0),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={[
              styles.tableData,
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text numberOfLines={2} style={styles.name}>
              {item.replace(/(\r\n|\n|\r)/gm, '')}
            </Text>
          </View>

          <View
            style={[
              styles.checkBoxView,
              {borderLeftWidth: 1, borderLeftColor: colors.tableBorder},
            ]}>
            <CheckBox
              value={iTake}
              onValueChange={handleTakeToggle}
              tintColors={{
                true: colors.turquoise,
                false: 'silver',
              }}
              onCheckColor={'#fff'}
              onFillColor={colors.turquoise}
              tintColor={'silver'}
              onTintColor={colors.turquoise}
            />
          </View>

          <View
            style={[
              styles.checkBoxView,
              {
                borderLeftWidth: 1,
                borderLeftColor: colors.tableBorder,
                zIndex: 10,
              },
            ]}>
            <CheckBox
              value={iAmAllergic}
              onValueChange={handleAllergicToggle}
              tintColors={{
                true: colors.turquoise,
                false: 'silver',
              }}
              onCheckColor={'#fff'}
              onFillColor={colors.turquoise}
              tintColor={'silver'}
              onTintColor={colors.turquoise}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TableComp;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    flex: 1,
  },

  name: {
    fontSize: Typography.FONT_SIZE_12,
    color: colors.black,
    fontWeight: 'normal',

    // top: hp(0.5),
  },
  tableData: {
    flexDirection: 'row',

    padding: hp(1.5),
    alignItems: 'center',
  },
  checkBoxView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
