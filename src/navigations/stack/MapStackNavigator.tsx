import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MAP } from '@/constants/navigations';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import { LatLng } from 'react-native-maps';

export type MapStackParamList = {
  [MAP.HOME]: undefined;
  [MAP.ADD_POST]: { location: LatLng };
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
      headerTitleStyle: {
        fontSize: 15
      },
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
      <Stack.Screen
        name={MAP.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: "Add Post"
        }}
      />
    </Stack.Navigator>
  );
};