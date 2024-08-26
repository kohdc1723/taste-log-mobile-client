import { useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation';
import { LatLng } from "react-native-maps";
import { VANCOUVER } from "@/constants/location";
import useAppState from "./useAppState";

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>(VANCOUVER);
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isBack } = useAppState();

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
  }, [isBack]);

  return {
    userLocation,
    isUserLocationError,
  };
};