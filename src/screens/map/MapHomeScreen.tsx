import { Pressable, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

import { BLACK, ROSE, WHITE } from '@/constants/colours';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import googleMapStyle from '@/styles/googleMapStyle';

type MapHomeNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function MapHomeScreen() {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation<MapHomeNavigationProps>();

  const { userLocation, isUserLocationError } = useUserLocation();

  usePermission("LOCATION");

  const mapRef = useRef<MapView | null>(null);

  const handlePressDrawerButton = () => navigation.openDrawer();
  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        customMapStyle={googleMapStyle}
        style={styles.container}
      />
      <Pressable
        onPress={handlePressDrawerButton}
        style={[styles.drawerButton, { top: inset.top || 20 }]}
      >
        <Ionicons name='menu' color={WHITE} size={28} />
      </Pressable>
      <View style={[styles.buttonList, { bottom: inset.bottom || 20 }]}>
        <Pressable
          onPress={handlePressUserLocation}
          style={styles.mapButton}
        >
          <MaterialIcons name='my-location' color={WHITE} size={28} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerButton: {
    position: "absolute",
    left: 0,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ROSE[700],
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    shadowColor: BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4
  },
  buttonList: {
    position: "absolute",
    right: 20
  },
  mapButton: {
    backgroundColor: ROSE[700],
    marginVertical: 4,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4
  }
});