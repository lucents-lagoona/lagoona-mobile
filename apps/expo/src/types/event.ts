export interface Question {
  id: string;
  question: string;
  category: "general" | "technical" | "historical" | "context";
}

export interface TimelinePoint {
  id: string;
  time: string; // HH:MM format
  title: string;
  description: string;
  questions: Question[];
  images: string[]; // URLs to images
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  location: string;
  videoUrl: string; // YouTube URL
  timeline: TimelinePoint[];
  thumbnailImage?: string;
}
