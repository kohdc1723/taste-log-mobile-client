import { useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation';
import { LatLng } from "react-native-maps";
import { VANCOUVER } from "@/constants/location";

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>(VANCOUVER);
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const { latitude, longitude } = info.coords;
        setUserLocation({ latitude, longitude });
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true
      }
    );
  }, []);

  return {
    userLocation,
    isUserLocationError,
  };
};