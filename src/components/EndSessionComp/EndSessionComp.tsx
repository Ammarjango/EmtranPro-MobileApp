import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from '../../utils/appContants';
import {interBold, interMedium, interRegular} from '../../assets/fonts';
import * as Typography from '../../assets/fonts/typography';
import CloseModal from '../../modals/CloseModal';
import Toast from 'react-native-toast-message';

const EndSessionComp = (props: any) => {
  const [isModalVisible, setisModalVisible] = useState(false);

  const showMessage = (info: any) => {
    Toast.show({
      type: 'error',
      text1: 'Missing Information',
      text2: `Please provide ${info} to proceed with the form.`,
    });
  };

  const handleEndSession = () => {
    setisModalVisible(true);
    // props.navigation.navigate('DrawerNavigation');
  };
  const handleValidation = () => {
    let validate = true;

    if (!props.userRes?.name) {
      showMessage('Patient Name');
      validate = false;
    } else if (!props.userRes?.gender === undefined) {
      showMessage('Patient Gender');
      validate = false;
    } else if (!props.userRes?.dob) {
      showMessage('Patient Date of Birth');
      validate = false;
    }

    if (validate) {
      props.navigation.navigate(props.targetNavigation);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.EndSession} onPress={handleEndSession}>
        <Text style={styles.EndSessionText}>End Session</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Next}
        onPress={() => {
          props.startSession
            ? handleValidation()
            : props.navigation.navigate(props.NextNavigation);
        }}>
        <Text style={styles.NextText}>Next</Text>
      </TouchableOpacity>
      <CloseModal
        isModalVisible={isModalVisible}
        setisModalVisible={setisModalVisible}
        EndSessionCheck
        navigation={props.navigation}
      />
    </View>
  );
};

export default EndSessionComp;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(2),
    marginBottom: heightPercentageToDP(4.5),
    marginTop: heightPercentageToDP(1),
  },
  EndSession: {
    borderWidth: 1,
    borderColor: colors.red,
    width: widthPercentageToDP(40),
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(0.8),
  },
  Next: {
    width: widthPercentageToDP(40),
    backgroundColor: colors.turquoise,
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(0.8),
  },
  NextText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_14,
  },
  EndSessionText: {
    color: colors.red,
    fontFamily: interRegular,
    fontSize: Typography.FONT_SIZE_14,
  },
});
