import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import * as PhosphorIcon from "phosphor-react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIcon = (name: string): PhosphorIcon.Icon => {
  const IconComponent =
    (PhosphorIcon as unknown as Record<string, PhosphorIcon.Icon>)[name] ??
    PhosphorIcon.SparkleIcon;
  return IconComponent;
};
