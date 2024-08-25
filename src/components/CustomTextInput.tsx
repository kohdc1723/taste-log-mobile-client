import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Dimensions,
  Text,
  Pressable
} from 'react-native';
import React, { ForwardedRef, forwardRef, useRef } from 'react';
import mergeRefs from 'merge-refs';
import { BLACK, NEUTRAL, RED } from '@/constants/colours';

interface CustomTextInputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
};

const deviceHeight = Dimensions.get("screen").height;

const CustomTextInput = forwardRef(({
  disabled = false,
  error,
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
        disabled && styles.disabled,
        (Boolean(error)) && styles.inputError
      ]}>
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
  input: {
    fontSize: 16,
    color: BLACK
  },
  disabled: {
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