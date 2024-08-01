import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {t} from 'i18next';
import {interMedium, interRegular} from '../assets/fonts';
import TextComp from '../components/TextComp/TextComp';
import {colors} from '../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Typography from '../assets/fonts/typography';
import {useDispatch} from 'react-redux';
import {userResponse} from '../store/reducers/appReducer';
const CloseModal = (props: any) => {
  const handleResetAndClear = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'DrawerNavigation'}],
      }),
    );
    props.setisModalVisible(false);
  };
  const handleSubmit = () => {
    props.setisModalVisible(false);
    props.submitUserResponse();
  };

  return (
    <Modal visible={props.isModalVisible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={() => props.setisModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextComp
              textvalue={
                props.EndSessionCheck
                  ? 'Are you sure, you want to end the session?'
                  : 'Are you sure, you want to submit the form?'
              }
              color={colors.lightBlack}
              fontSize={Typography.FONT_SIZE_15}
              fontFamily={interRegular}
              textAlign={'center'}
              width={wp(70)}
            />

            {/* BUTTONS  */}
            <View style={{marginTop: hp(3)}}>
              <TouchableOpacity
                style={styles.SubmitModal}
                onPress={() =>
                  props.EndSessionCheck ? handleResetAndClear() : handleSubmit()
                }>
                <Text style={styles.SubmitText}>
                  {props.EndSessionCheck ? 'Yes' : 'Submit'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelModal}
                onPress={() => props.setisModalVisible(false)}>
                <Text style={[styles.SubmitText, {color: colors.turquoise}]}>
                  {props.EndSessionCheck ? 'No' : 'Cancel'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CloseModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    alignSelf: 'center',
    borderRadius: 16,
    paddingVertical: hp(3),
  },
  SubmitModal: {
    width: wp(70),
    backgroundColor: colors.turquoise,
    alignItems: 'center',
    padding: hp(1),
    borderRadius: 5,
    marginBottom: hp(2),
  },
  SubmitText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_14,
  },
  cancelModal: {
    width: wp(70),
    borderColor: colors.turquoise,
    borderWidth: 1,
    alignItems: 'center',
    padding: hp(1),
    borderRadius: 5,
  },
});
