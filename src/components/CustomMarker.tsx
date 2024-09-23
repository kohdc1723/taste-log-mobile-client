import { StyleSheet, View } from "react-native";
import { CustomMapMarkerProps, LatLng, MapMarkerProps, Marker } from "react-native-maps";

import { BLACK, BLUE, GREEN, PURPLE, RED, YELLOW } from "@/constants/colours";
import { MarkerColor } from "@/types/domains";

interface CustomMarkerProps extends CustomMapMarkerProps {
  coordinate?: LatLng;
  color: MarkerColor;
  rating?: number;
};

const markerColor = {
  RED: RED[500],
  YELLOW: YELLOW[500],
  GREEN: GREEN[500],
  BLUE: BLUE[500],
  PURPLE: PURPLE[500]
};

export default function CustomMarker({
  coordinate,
  color,
  rating = 3,
  ...props
}: CustomMarkerProps) {
  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, { backgroundColor: markerColor[color] }]}>
        <View style={[styles.eyes, styles.leftEye]} />
        <View style={[styles.eyes, styles.rightEye]} />
        {(rating > 3) && <View style={[styles.mouth, styles.good]} />}
        {(rating === 3) && <View style={styles.soso} />}
        {(rating < 3) && <View style={[styles.mouth, styles.bad]} />}
      </View>
    </View>
  );

  return coordinate ? (
    <Marker
      coordinate={coordinate}
      {...props}
    >
      {markerView}
    </Marker>
  ) : (
    markerView
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: 36,
    alignItems: "center"
  },
  marker: {
    transform: [{ rotate: "45deg" }],
    height: 28,
    width: 28,
    borderRadius: 14,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: BLACK
  },
  eyes: {
    position: "absolute",
    backgroundColor: BLACK,
    width: 4,
    height: 4,
    borderRadius: 4
  },
  leftEye: {
    top: 12,
    left: 5
  },
  rightEye: {
    top: 5,
    left: 12
  },
  mouth: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "45deg" }]
  },
  good: {
    transform: [{ rotate: "225deg" }],
    marginLeft: 5,
    marginTop: 5,
    borderRightColor: "transparent",
    borderLeftColor: BLACK,
  },
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderLeftColor: BLACK,
    borderLeftWidth: 1,
    transform: [{ rotate: "45deg" }]
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: "transparent",
    borderLeftColor: BLACK
  }
});