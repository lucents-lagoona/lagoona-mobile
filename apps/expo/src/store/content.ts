import { create } from "zustand";

import type {
  CategoryHighlight,
  FeaturedEvent,
  NewsStory,
} from "@/types/content";
import type { Event } from "@/types/event";

interface ContentState {
  categories: CategoryHighlight[];
  featuredEvent: FeaturedEvent | null;
  newsStories: NewsStory[];
  events: Event[];
  isLoading: boolean;
  isError: boolean;

  // Actions
  setCategories: (categories: CategoryHighlight[]) => void;
  setFeaturedEvent: (event: FeaturedEvent | null) => void;
  setNewsStories: (stories: NewsStory[]) => void;
  setEvents: (events: Event[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  categories: [],
  featuredEvent: null,
  newsStories: [],
  events: [],
  isLoading: false,
  isError: false,

  setCategories: (categories) => set({ categories }),
  setFeaturedEvent: (featuredEvent) => set({ featuredEvent }),
  setNewsStories: (newsStories) => set({ newsStories }),
  setEvents: (events) => set({ events }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),
}));
