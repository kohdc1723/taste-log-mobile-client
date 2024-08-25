import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import { MAIN } from '@/constants/navigations';
import { NavigatorScreenParams } from '@react-navigation/native';

export type MainDrawerParamList = {
  [MAIN.HOME]: NavigatorScreenParams<MapStackParamList>;
  [MAIN.FEED]: undefined;
  [MAIN.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front"
      }}
    >
      <Drawer.Screen
        name={MAIN.HOME}
        component={MapStackNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name={MAIN.FEED}
        component={FeedHomeScreen}
        options={{ title: "Feed" }}
      />
      <Drawer.Screen
        name={MAIN.CALENDAR}
        component={CalendarHomeScreen}
        options={{ title: "Calendar" }}
      />
    </Drawer.Navigator>
  );
};