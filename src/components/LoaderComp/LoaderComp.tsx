import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/appContants';

const LoaderComp = (props: any) => {
  return (
    <>
      {props.isLoading && (
        <Modal
          transparent
          visible={props.isLoading}
          onRequestClose={() => props.setIsLoading(false)}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color={colors.turquoise} />
          </View>
        </Modal>
      )}
    </>
  );
};

export default LoaderComp;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
