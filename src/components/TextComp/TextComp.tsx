import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TextComp = (props: any) => {
  return (
    <Text
      {...props}
      style={{
        fontFamily: props.fontFamily,
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
        width: props.width,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}>
      {props.textvalue?.charAt(0)?.toUpperCase() + props.textvalue?.slice(1)}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({});
