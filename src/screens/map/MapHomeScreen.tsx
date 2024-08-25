import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BLACK, ROSE } from '@/constants/colours';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';

type MapHomeNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<MapHomeNavigationProps>();
  const { userLocation, isUserLocationError } = useUserLocation();

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
        // showsMyLocationButton={false}
        style={styles.container}
      />
      <Pressable
        onPress={handlePressDrawerButton}
        style={[styles.drawerButton, { top: inset.top || 20 }]}
      >
        <Text>BTN</Text>
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable
          onPress={handlePressUserLocation}
          style={styles.mapButton}
        >
          <Text>My</Text>
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
    // top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: ROSE[700],
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4
  },
  buttonList: {
    position: "absolute",
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: ROSE[700],
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2
  }
});