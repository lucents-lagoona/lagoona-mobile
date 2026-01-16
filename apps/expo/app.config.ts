import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import type { ConfigContext, ExpoConfig } from "expo/config";

const env = process.env as Record<string, string | undefined>;
const projectRoot = __dirname;

function resolveRelativeIfExists(relativePath: string) {
  const absolutePath = path.resolve(projectRoot, relativePath);
  return fs.existsSync(absolutePath) ? relativePath : undefined;
}

function resolveGoogleServicesFile(preferredRelativePath: string) {
  return resolveRelativeIfExists(preferredRelativePath);
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const appEnv = env.APP_ENV ?? env.EXPO_PUBLIC_APP_ENV ?? "development";
  const appUrl = env.EXPO_PUBLIC_API_URL; // use as app link host
  const deriveHost = (value?: string) => {
    if (!value) return undefined;
    try {
      return new URL(value).host;
    } catch {
      return value.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    }
  };
  const defaultHost = deriveHost(appUrl);

  const envProfiles = {
    development: {
      channelName: "development",
      iosBundleIdentifier: "com.lagoona.app.dev",
      androidPackage: "com.lagoona.app.dev",
      scheme: "lagoona-dev",
      appName: "Lagoona (Dev)",
      googleServicesFile: "./google-services.dev.json",
    },
    staging: {
      channelName: "staging",
      iosBundleIdentifier: "com.lagoona.app.staging",
      androidPackage: "com.lagoona.app.staging",
      scheme: "lagoona-staging",
      appName: "Lagoona (Staging)",
      googleServicesFile: "./google-services.staging.json",
    },
    production: {
      channelName: "production",
      iosBundleIdentifier: "com.lagoona.app",
      androidPackage: "com.lagoona.app",
      scheme: "lagoona",
      appName: "Lagoona",
      googleServicesFile: "./google-services.json",
    },
  } as const;

  const profile =
    envProfiles[appEnv as keyof typeof envProfiles] ?? envProfiles.development;
  const googleServicesFile = resolveGoogleServicesFile(
    profile.googleServicesFile,
  );

  if (!googleServicesFile) {
    const message = `Missing ${profile.googleServicesFile} for APP_ENV=${appEnv}.`;
    if (appEnv === "production" || appEnv === "staging") {
      // throw new Error(message);
    }
    console.warn(message);
  }

  return {
    ...config,
    name: profile.appName,
    slug: "lagoona",
    scheme: profile.scheme,
    owner: "lucents-technology",
    jsEngine: "hermes",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/3aa6132e-71fc-480a-990a-3a1ed1f56f9e",
      requestHeaders: {
        "expo-channel-name": profile.channelName,
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    ios: {
      ...(config.ios ?? {}),
      bundleIdentifier: profile.iosBundleIdentifier,
      supportsTablet: true,
      icon: {
        light: "./assets/icon.png",
        dark: "./assets/icon.png",
      },
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      associatedDomains: defaultHost ? [`applinks:${defaultHost}`] : [],
    },
    android: {
      ...(config.android ?? {}),
      package: profile.androidPackage,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#f8f6ee",
      },
      edgeToEdgeEnabled: true,
      ...(googleServicesFile ? { googleServicesFile } : {}),
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "https",
              host: defaultHost,
              pathPrefix: "/open",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    extra: {
      APP_ENV: appEnv,
      apiUrl: env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
      appLinkHost: defaultHost,
      eas: {
        projectId: "3aa6132e-71fc-480a-990a-3a1ed1f56f9e",
      },
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-web-browser",
      "expo-notifications",
      [
        "expo-video",
        {
          supportsBackgroundPlayback: true,
          supportsPictureInPicture: true,
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#f8f6ee",
          image: "./assets/splash.png",
          resizeMode: "native",
          dark: {
            backgroundColor: "#1D1D1D",
            image: "./assets/splash.png",
          },
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Lagoona needs your location.",
        },
      ],
      [
        "expo-local-authentication",
        {
          faceIDPermission:
            "Enable Face ID for faster, more secure access to your Lagoona platform.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share images to our platform.",
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "../../node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf",
            "../../node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf",
            "../../node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf",
            "../../node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf",
            "../../node_modules/@expo-google-fonts/inter/800ExtraBold/Inter_800ExtraBold.ttf",
            "../../node_modules/@expo-google-fonts/inter/900Black/Inter_900Black.ttf",
            "../../node_modules/@expo-google-fonts/lora/400Regular/Lora_400Regular.ttf",
            "../../node_modules/@expo-google-fonts/lora/500Medium/Lora_500Medium.ttf",
            "../../node_modules/@expo-google-fonts/lora/600SemiBold/Lora_600SemiBold.ttf",
            "../../node_modules/@expo-google-fonts/lora/700Bold/Lora_700Bold.ttf",
          ],
        },
      ],
    ],
  };
};
