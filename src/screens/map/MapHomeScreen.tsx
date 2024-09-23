import { Alert, Pressable, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import MapView, { Callout, LatLng, LongPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
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
import { VANCOUVER } from '@/constants/location';
import CustomMarker from '@/components/CustomMarker';
import { MAP } from '@/constants/navigations';
import MESSAGES from '@/constants/messages';
import useGetMarkersQuery from '@/hooks/queries/useGetMarkersQuery';

type MapHomeNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function MapHomeScreen() {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation<MapHomeNavigationProps>();

  const { userLocation, isUserLocationError } = useUserLocation();

  const [selectedLocation, setSelectedLocation] = useState<LatLng>();

  const mapRef = useRef<MapView | null>(null);

  const { data: markers = [] } = useGetMarkersQuery();

  usePermission("LOCATION");

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
  const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };
  const handlePressAddPost = () => {
    if (!selectedLocation) {
      return Alert.alert(
        MESSAGES.LOCATION_NOT_SELECTED.TITLE,
        MESSAGES.LOCATION_NOT_SELECTED.DESCRIPTION
      );
    }

    navigation.navigate(MAP.ADD_POST, {
      location: selectedLocation
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        onLongPress={handleLongPressMapView}
        customMapStyle={googleMapStyle}
        style={styles.container}
      >
        {markers.map(marker => (
          <CustomMarker
            key={marker.id}
            color={marker.color}
            rating={marker.score}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          />
        ))}
        {selectedLocation && (
          <Callout>
            <CustomMarker color={"RED"} coordinate={selectedLocation} />
          </Callout>
        )}
      </MapView>
      <Pressable
        onPress={handlePressDrawerButton}
        style={[styles.drawerButton, { top: inset.top || 20 }]}
      >
        <Ionicons name='menu' color={WHITE} size={28} />
      </Pressable>
      <View style={[styles.buttonList, { bottom: inset.bottom || 20 }]}>
        <Pressable
          onPress={handlePressAddPost}
          style={styles.mapButton}
        >
          <MaterialIcons name='add' color={WHITE} size={28} />
        </Pressable>
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