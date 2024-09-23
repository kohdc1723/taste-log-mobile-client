import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomTextInput from '@/components/CustomTextInput';
import CustomPressable from '@/components/CustomPressable';
import useAuth from '@/hooks/queries/useAuth';

type LoginData = {
  email: string;
  password: string;
};

const LoginSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required")
});

export default function LoginScreen() {
  const { loginMutation } = useAuth();

  const passwordRef = useRef<TextInput | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
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
            <CustomTextInput
              ref={passwordRef}
              placeholder="Password"
              onChangeText={onChange}
              onBlur={onBlur}
              blurOnSubmit={false}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="join"
              value={value}
              error={errors.password && errors.password.message}
              secureTextEntry={true}
            />
          )}
        />
      </View>
      <CustomPressable
        label='Login'
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