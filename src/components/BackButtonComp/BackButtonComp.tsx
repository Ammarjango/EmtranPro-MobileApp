import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {BackButton} from '../../assets/svgs/SvgGroup';
import {useNavigation} from '@react-navigation/native';

const BackButtonComp = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={goBack}>
      <SvgXml xml={BackButton} />
    </TouchableOpacity>
  );
};

export default BackButtonComp;

const styles = StyleSheet.create({});
