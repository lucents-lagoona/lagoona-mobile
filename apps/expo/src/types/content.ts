export interface CategoryHighlight {
  id: string;
  name: string;
  imageUrl: string;
  eventCount: number;
}

export interface FeaturedEvent {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category: string;
  date: string;
  time: string;
  location: string;
}

export interface NewsStory {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: "news" | "behind-scenes" | "conservation" | "philosophy";
  publishedAt: string;
  readTime: string;
}
