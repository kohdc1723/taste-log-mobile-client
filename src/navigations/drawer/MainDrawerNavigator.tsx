import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import { MAIN } from '@/constants/navigations';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NEUTRAL, ROSE, WHITE } from '@/constants/colours';
import DrawerContent from '@/navigations/drawer/DrawerContent';

export type MainDrawerParamList = {
  [MAIN.HOME]: NavigatorScreenParams<MapStackParamList>;
  [MAIN.FEED]: undefined;
  [MAIN.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  let iconName;

  switch (route.name) {
    case MAIN.HOME:
      iconName = "location-on";
      break;
    case MAIN.FEED:
      iconName = "book";
      break;
    case MAIN.CALENDAR:
      iconName = "event-note";
      break;
  }

  return <MaterialIcons name={iconName} size={24} color={focused ? ROSE[700] : NEUTRAL[500]} />;
};

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          width: Dimensions.get("screen").width * 0.6,
          backgroundColor: WHITE
        },
        drawerActiveTintColor: ROSE[700],
        drawerInactiveTintColor: NEUTRAL[500],
        drawerActiveBackgroundColor: ROSE[100],
        drawerInactiveBackgroundColor: NEUTRAL[50],
        drawerLabelStyle: { fontWeight: "600" },
        drawerIcon: ({ focused }) => DrawerIcons(route, focused)
      })}
    >
      <Drawer.Screen
        name={MAIN.HOME}
        component={MapStackNavigator}
        options={{
          title: "Home",
          swipeEnabled: false
        }}
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