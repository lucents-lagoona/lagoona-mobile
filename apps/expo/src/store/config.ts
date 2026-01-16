import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppConfig {
  appName: string;
  appDescription: string;
  logoUrl?: string | null;
  defaultTheme: "light" | "dark" | "nature" | "ocean" | "auto";
  chatWelcomeMessage: string;
  chatPlaceholder: string;
  homeTitle: string;
  homeDescription: string;
  assistantName: string;
  assistantDescription: string;
  maxRetries: number;
  timeoutMs: number;
  enableAnalytics: boolean;
  version: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  displayName: string;
  isDark: boolean;
  isActive: boolean;
}

export interface CompleteConfig {
  appConfig: AppConfig;
  themeConfigs: ThemeConfig[];
}

interface ConfigState {
  // Configuration data
  config: CompleteConfig | null;

  // Loading states
  isLoading: boolean;
  isInitialized: boolean;
  hasError: boolean;
  errorMessage?: string;

  // Retry mechanism
  retryCount: number;
  lastFetchTime?: number;

  // Actions
  setConfig: (config: CompleteConfig) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  incrementRetry: () => void;
  resetRetry: () => void;
  updateLastFetchTime: () => void;

  // Helper getters
  getThemeByName: (name: string) => ThemeConfig | undefined;
  getCurrentTheme: () => ThemeConfig | undefined;
}

// Default fallback configuration
export const DEFAULT_CONFIG: CompleteConfig = {
  appConfig: {
    appName: "Lagoona AI",
    appDescription: "Thoughtful guidance on request.",
    defaultTheme: "dark",
    chatWelcomeMessage: "Ask me anything...",
    chatPlaceholder: "Type your message...",
    homeTitle: "Events",
    homeDescription: "Discover upcoming events and explore their timelines",
    assistantName: "Assistant",
    assistantDescription: "Thoughtful guidance on request.",
    maxRetries: 2,
    timeoutMs: 10000,
    enableAnalytics: false,
    version: "1.0.0",
  },
  themeConfigs: [
    {
      id: "default-light",
      name: "light",
      displayName: "Light",
      isDark: false,
      isActive: true,
    },
    {
      id: "default-dark",
      name: "dark",
      displayName: "Dark",
      isDark: true,
      isActive: false,
    },
    {
      id: "nature-theme",
      name: "nature",
      displayName: "Nature",
      isDark: true,
      isActive: false,
    },
    {
      id: "ocean-theme",
      name: "ocean",
      displayName: "Ocean",
      isDark: true,
      isActive: false,
    },
  ],
};

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      // Initial state
      config: null,
      isLoading: false,
      isInitialized: false,
      hasError: false,
      errorMessage: undefined,
      retryCount: 0,
      lastFetchTime: undefined,

      // Actions
      setConfig: (config) =>
        set({
          config,
          hasError: false,
          errorMessage: undefined,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setError: (error) =>
        set({
          hasError: !!error,
          errorMessage: error ?? undefined,
          isLoading: false,
        }),

      setInitialized: (initialized) =>
        set({
          isInitialized: initialized,
        }),

      incrementRetry: () =>
        set((state) => ({
          retryCount: state.retryCount + 1,
        })),

      resetRetry: () =>
        set({
          retryCount: 0,
        }),

      updateLastFetchTime: () =>
        set({
          lastFetchTime: Date.now(),
        }),

      // Helper getters
      getThemeByName: (name) => {
        const state = get();
        return state.config?.themeConfigs.find((theme) => theme.name === name);
      },

      getCurrentTheme: () => {
        const state = get();
        if (!state.config) return undefined;

        const defaultTheme = state.config.appConfig.defaultTheme;
        return state.config.themeConfigs.find(
          (theme) => theme.name === defaultTheme,
        );
      },
    }),
    {
      name: "app-config-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the config data, not loading states
      partialize: (state) => ({
        config: state.config,
        lastFetchTime: state.lastFetchTime,
      }),
    },
  ),
);
