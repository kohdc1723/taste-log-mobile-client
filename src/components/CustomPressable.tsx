import {
  Text,
  Pressable,
  PressableProps,
  StyleSheet,
  Dimensions
} from 'react-native';
import { ROSE, WHITE } from '@/constants/colours';

interface CustomPressableProps extends PressableProps {
  label: string;
  variant?: "filled" | "outlined";
  size?: "large" | "medium";
  inValid?: boolean;
};

const deviceHeight = Dimensions.get("screen").height;

export default function CustomPressable({
  label,
  variant = "filled",
  size = "large",
  inValid = false,
  ...props
}: CustomPressableProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        styles[size],
        inValid && styles.inValid,
        pressed ? styles[`${variant}Pressed`] : styles[variant]
      ]}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  inValid: {
    opacity: 0.5
  },
  filled: {
    backgroundColor: ROSE[700]
  },
  outlined: {
    borderWidth: 1,
    borderColor: ROSE[700],
    backgroundColor: WHITE
  },
  filledPressed: {
    opacity: 0.75
  },
  outlinedPressed: {
    opacity: 0.75
  },
  large: {
    width: "100%",
    paddingVertical: (deviceHeight > 700) ? 16 : 14,
    alignItems: "center",
    justifyContent: "center"
  },
  medium: {
    width: "50%",
    paddingVertical: (deviceHeight > 700) ? 12 : 10,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: 600
  },
  filledText: {
    color: WHITE
  },
  outlinedText: {
    color: ROSE[700]
  }
});