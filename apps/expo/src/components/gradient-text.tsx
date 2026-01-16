import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export const GradientText = ({
  children,
  colors,
  start,
  end,
  style,
}: {
  children: string;
  colors: [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <MaskedView maskElement={<Text style={[style]}>{children}</Text>}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[StyleSheet.absoluteFillObject]}
      />
    </MaskedView>
  );
};
