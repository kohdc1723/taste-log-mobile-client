import { axiosInstance } from "@/api/axios";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";

export default function useGetAddress(location: LatLng) {
  const { latitude, longitude } = location;
  const [result, setResult] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&language=en&key=AIzaSyB498rRZ7VjsleFrJ2Vo7c4i0EIrmsi0Ws`);

        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        
        setResult(address);
      } catch (err) {
        setResult(ERROR_MESSAGES.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return result;
};