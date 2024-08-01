import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {filter, searchIcon} from '../../assets/svgs/SvgGroup';
import {SvgXml} from 'react-native-svg';
import HomeFilter from '../Filters/HomeFilter';

const SearchBarInput = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterVisible, setisFilterVisible] = useState(false);

  const updateFilteredData = (data: any) => {
    props.setSearchFilteredData(data);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.inputContainer,
          props.borderRadius,
          {
            borderColor: isFocused ? colors.turquoise : colors.borderColor,
            borderWidth: 1,
          },
        ]}>
        <View style={styles.searchView}>
          <SvgXml xml={searchIcon} />
          <TextInput
            style={[styles.input]}
            placeholder={'Search record...'}
            placeholderTextColor={colors.borderColor}
            value={props.searchTxt}
            onChangeText={txt => props.handleSearchChange(txt)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => setisFilterVisible(true)}>
        <View style={styles.filter}>
          <SvgXml xml={filter} />
        </View>
      </TouchableOpacity>

      <Modal
        onDismiss={() => console.log('first')}
        visible={isFilterVisible}
        transparent>
        <HomeFilter
          setisFilterVisible={setisFilterVisible}
          updateFilteredData={updateFilteredData}
          CardData={props.CardData}
        />
      </Modal>
    </View>
  );
};

export default SearchBarInput;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(100),
    paddingHorizontal: wp(4),
    // borderWidth: 1,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',

    right: wp(1),
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: wp(3),
    borderRadius: 7,
    borderColor: colors.borderColor,
    paddingVertical: hp(0.4),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(75),
    left: wp(1),
    height: Platform.OS === 'android' ? hp(6) : hp(4.8),
    backgroundColor: colors.white,
  },
  input: {
    // padding: hp(1),
    paddingHorizontal: hp(1.5),
    borderRadius: hp(1),

    backgroundColor: colors.white,
    flex: 1,
    color: colors.black,
  },
});
