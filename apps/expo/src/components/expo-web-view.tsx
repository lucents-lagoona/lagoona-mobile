import type { ViewProps } from "react-native";
import * as React from "react";
import { requireNativeViewManager } from "expo-modules-core";

export type Props = {
  url?: string;
} & ViewProps;

const NativeView: React.ComponentType<Props> =
  requireNativeViewManager("ExpoWebView");

export default function ExpoWebView(props: Props) {
  return <NativeView {...props} />;
}
