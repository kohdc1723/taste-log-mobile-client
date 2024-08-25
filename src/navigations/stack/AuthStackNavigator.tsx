import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import { AUTH } from '@/constants/navigations';

export type AuthStackParamList = {
  [AUTH.HOME]: undefined;
  [AUTH.LOGIN]: undefined;
  [AUTH.REGISTER]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: {
        backgroundColor: "white"
      },
      headerStyle: {
        backgroundColor: "white",
        shadowColor: "gray"
      },
      // headerTitleStyle: {
      //   fontSize: 15
      // },
      headerTintColor: "black"
    }}>
      <Stack.Screen
        name={AUTH.HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: "",
          headerShown: false
        }}
      />
      <Stack.Screen
        name={AUTH.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={AUTH.REGISTER}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};