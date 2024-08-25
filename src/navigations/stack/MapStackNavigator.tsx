import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MAP } from '@/constants/navigations';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamList = {
  [MAP.HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

export default function MapStackNavigator() {
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
        name={MAP.HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: "",
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};