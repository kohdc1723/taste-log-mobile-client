import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomMarker from "./CustomMarker";
import { NEUTRAL } from "@/constants/colours";
import { MarkerColor } from "@/types/domains";

interface MarkerSelectorProps {
  markerColor: MarkerColor;
  onPressMarker: (color: MarkerColor) => void;
};

const markerColorList: MarkerColor[] = [
  "RED",
  "YELLOW",
  "GREEN",
  "BLUE",
  "PURPLE"
];

export default function MarkerSelector({
  markerColor,
  onPressMarker
}: MarkerSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>Select marker</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {markerColorList.map(color => (
            <Pressable
              onPress={() => onPressMarker(color)}
              style={[
                styles.markerBox,
                (markerColor === color) && styles.selectedMarker
              ]}
            >
              <CustomMarker color={color} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: NEUTRAL[300],
    padding: 15
  },
  markerLabel: {
    marginBottom: 15,
    color: NEUTRAL[700]
  },
  markerInputScroll: {
    flexDirection: "row",
    gap: 20
  },
  markerBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    backgroundColor: NEUTRAL[50],
    borderRadius: 4
  },
  selectedMarker: {
    borderWidth: 2,
    borderColor: NEUTRAL[300],
    backgroundColor: NEUTRAL[100]
  }
});