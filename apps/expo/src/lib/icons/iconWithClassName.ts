import type { IconProps } from "phosphor-react-native";
import type { ComponentType } from "react";
import { cssInterop } from "nativewind";

export function iconWithClassName(icon: ComponentType<IconProps>) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      } as unknown as Record<string, string | boolean>,
    },
  });
  return icon;
}
