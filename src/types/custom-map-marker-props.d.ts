import { LatLng } from "react-native-maps";

declare module "react-native-maps" {
  export interface CustomMapMarkerProps extends MapMarkerProps {
    coordinate?: LatLng;
  };
};