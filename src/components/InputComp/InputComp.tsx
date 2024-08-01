import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {personSvg} from '../../assets/svgs/SvgGroup';
import {colors} from '../../utils/appContants';
const InputComp = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const borderColor =
    isFocused || (props.labelValue && props.labelValue.trim() !== '')
      ? colors.turquoise
      : colors.borderColor;
  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: borderColor,
        },
      ]}>
      {props.Svg ? (
        <View style={styles.SvgView}>
          {props.labelValue ? (
            <SvgXml
              xml={props.svgFocus}
              height={props.height}
              width={props.width}
            />
          ) : (
            <SvgXml xml={props.svg} height={props.height} width={props.width} />
          )}
        </View>
      ) : null}

      <TextInput
        secureTextEntry={props.isPassword}
        style={[
          styles.input,
          {
            fontSize: props.fontSize,
            fontFamily: props.fontFamily,
            color: props.color,
          },
        ]}
        value={props.labelValue}
        keyboardType={
          props.keyboardType
            ? props.keyboardType
            : Platform.OS === 'ios'
            ? 'ascii-capable'
            : props.isPassword
            ? 'email-address'
            : 'visible-password'
        }
        multiline={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={props.editable !== false}
        onChangeText={text =>
          props.onTextInputChange(
            text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase(),
          )
        }
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
      />
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  input: {
    padding: hp(1),
    paddingHorizontal: hp(1.5),
    width: wp(80),
    borderRadius: hp(1),
    // borderWidth:1
  },
  SvgView: {
    left: wp(1.5),
  },
  inputContainer: {
    marginTop: hp(1),
    borderRadius: 7,
    borderColor: colors.borderColor,
    borderWidth: 1,
    padding: hp(0.5),
    gap: wp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
