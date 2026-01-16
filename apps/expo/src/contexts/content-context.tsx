/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { createContext, useContext } from "react";

import type {
  CategoryHighlight,
  FeaturedEvent,
  NewsStory,
} from "@/types/content";
import type { Event } from "@/types/event";
import { api } from "@/utils/api";

interface ContentContextType {
  categories: CategoryHighlight[];
  featuredEvent: FeaturedEvent | null;
  newsStories: NewsStory[];
  events: Event[];
  isLoading: boolean;
  isError: boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

interface ContentProviderProps {
  children: React.ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  // Fetch categories with fallback
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = api.category.getAll.useQuery(undefined, {
    retry: 1,
    retryDelay: 2000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch featured event with fallback
  const {
    data: featuredEventData,
    isLoading: featuredLoading,
    isError: featuredError,
  } = api.event.getFeatured.useQuery(undefined, {
    retry: 1,
    retryDelay: 2000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch news stories with fallback
  const {
    data: newsStoriesData,
    isLoading: newsLoading,
    isError: newsError,
  } = api.newsStory.getAll.useQuery(undefined, {
    retry: 1,
    retryDelay: 2000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch all events with fallback
  const {
    data: eventsData,
    isLoading: eventsLoading,
    isError: eventsError,
  } = api.event.getAll.useQuery(undefined, {
    retry: 1,
    retryDelay: 2000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Use server data
  const categories =
    categoriesData && !categoriesError
      ? categoriesData.map((cat) => ({
          id: cat.id,
          name: cat.name,
          imageUrl: cat.imageUrl,
          eventCount: cat.eventCount,
        }))
      : [];

  const featuredEvent =
    featuredEventData && !featuredError
      ? {
          id: featuredEventData.id,
          title: featuredEventData.title,
          subtitle: featuredEventData.subtitle ?? "",
          imageUrl: featuredEventData.imageUrl,
          category: featuredEventData.category,
          date: featuredEventData.date,
          time: featuredEventData.time,
          location: featuredEventData.location,
        }
      : null;

  const newsStories =
    newsStoriesData && !newsError
      ? newsStoriesData.map((story) => ({
          id: story.id,
          title: story.title,
          excerpt: story.excerpt,
          imageUrl: story.imageUrl,
          category: story.category as
            | "news"
            | "behind-scenes"
            | "conservation"
            | "philosophy",
          publishedAt: story.publishedAt,
          readTime: story.readTime,
        }))
      : [];

  const events =
    eventsData && !eventsError
      ? eventsData.map((event) => ({
          id: event.id,
          name: event.title,
          description: event.description,
          date: event.date,
          startTime: event.time.split(" - ")[0] ?? "00:00",
          endTime: event.time.split(" - ")[1] ?? "00:00",
          location: event.location,
          videoUrl: event.videoUrl ?? "",
          thumbnailImage: event.imageUrl,
          timeline:
            event.timelines?.map((timeline) => ({
              id: timeline.id,
              time: timeline.time,
              title: timeline.title,
              description: timeline.description,
              questions:
                timeline.questions?.map((q) => ({
                  id: q.id,
                  question: q.question,
                  category: q.category as "general" | "technical" | "context",
                })) ?? [],
              images: timeline.images ?? [],
            })) ?? [],
        }))
      : [];

  const isLoading =
    categoriesLoading || featuredLoading || newsLoading || eventsLoading;
  const isError = categoriesError || featuredError || newsError || eventsError;

  const contextValue: ContentContextType = {
    categories,
    featuredEvent,
    newsStories,
    events,
    isLoading,
    isError,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
