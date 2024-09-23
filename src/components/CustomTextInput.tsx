import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Dimensions,
  Text,
  Pressable
} from 'react-native';
import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import mergeRefs from 'merge-refs';

import { BLACK, NEUTRAL, RED } from '@/constants/colours';

interface CustomTextInputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  icon?: ReactNode;
};

const deviceHeight = Dimensions.get("screen").height;

const CustomTextInput = forwardRef(({
  disabled = false,
  error,
  icon = null,
  ...props
}: CustomTextInputProps,
  ref?: ForwardedRef<TextInput>
) => {
  const textInputRef = useRef<TextInput | null>(null);

  const handlePressTextInput = () => textInputRef.current?.focus();

  return (
    <Pressable onPress={handlePressTextInput}>
      <View style={[
        styles.container,
        props.multiline && styles.multiline,
        disabled && styles.disabled,
        (Boolean(error)) && styles.inputError
      ]}>
        <View style={Boolean(icon) && styles.innerContainer}>
          {icon}
          <TextInput
            ref={ref ? mergeRefs(ref, textInputRef) : textInputRef}
            editable={!disabled}
            style={styles.input}
            placeholderTextColor={NEUTRAL[400]}
            autoCapitalize='none'
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
        </View>
        {Boolean(error) && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    </Pressable>
  );
});

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: NEUTRAL[300],
    padding: (deviceHeight > 700) ? 16 : 12
  },
  multiline: {
    paddingBottom: (deviceHeight > 700) ? 48 : 40
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  input: {
    fontSize: 16,
    color: BLACK
  },
  disabled: {
    backgroundColor: NEUTRAL[300],
    color: NEUTRAL[500],
    opacity: 0.5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: RED[300]
  },
  error: {
    color: RED[500],
    fontSize: 12,
    paddingTop: 8
  }
});