import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { AUTH } from '@/constants/navigations';
import CustomButton from '@/components/CustomPressable';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof AUTH.HOME
>;

export default function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
  const handlePressLogin = () => navigation.navigate(AUTH.LOGIN);
  const handlePressSignUp = () => navigation.navigate(AUTH.REGISTER);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode='contain'
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Login"
          variant="filled"
          onPress={handlePressLogin}
        />
        <CustomButton
          label="Sign Up"
          variant="outlined"
          onPress={handlePressSignUp}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 280,
    height: 280,
  },
  buttonContainer: {
    flex: 1,
    gap: 12
  }
});