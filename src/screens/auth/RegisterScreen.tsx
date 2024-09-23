import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomInputField from '@/components/CustomTextInput';
import CustomPressable from '@/components/CustomPressable';
import useAuth from '@/hooks/queries/useAuth';

type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterSchema = yup.object({
  email: yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string()
    .required("Password is required")
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
});

export default function RegisterScreen() {
  const { signupMutation, loginMutation } = useAuth();

  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema)
  });

  const onSubmit = (data: RegisterData) => {
    const { email, password } = data;

    signupMutation.mutate({ email, password }, {
      onSuccess: () => loginMutation.mutate({ email, password })
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInputField
              autoFocus
              placeholder="Email"
              onChangeText={onChange}
              onBlur={onBlur}
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              returnKeyType="next"
              value={value}
              error={errors.email && errors.email.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInputField
              ref={passwordRef}
              placeholder="Password"
              onChangeText={onChange}
              onBlur={onBlur}
              blurOnSubmit={false}
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              returnKeyType="next"
              value={value}
              error={errors.password && errors.password.message}
              secureTextEntry
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInputField
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
              onChangeText={onChange}
              onBlur={onBlur}
              blurOnSubmit={false}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="join"
              value={value}
              error={errors.confirmPassword && errors.confirmPassword.message}
              secureTextEntry
            />
          )}
        />
      </View>
      <CustomPressable
        label='Sign Up'
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 24
  }
});