export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  joinedAt: string;
  likedEvents: string[]; // Event IDs
}

export interface Attendee {
  id: string;
  fullName: string;
  avatarUrl: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // e.g. "2026-07-15" or similar format
  time: string; // e.g. "19:00"
  location: string; // Friendly address text
  locationDetails?: string; // Additional address details
  price: string; // e.g. "$25" or "10 Entry"
  isFree: boolean;
  category: string; // Music, Food, Tech, Sports, Arts, Nature
  image: string; // Image URL
  hostedById: string;
  hostedByName: string;
  hostedByAvatar: string;
  attendees: Attendee[];
  capacity?: number;
  registeredUserIds: string[]; // List of user IDs RSVP'ed to this event
}

export type ScreenState = 'welcome' | 'auth' | 'explore' | 'details' | 'create' | 'my-gathers';

export interface Category {
  id: string;
  name: string;
  iconName: string; // Match with lucide-react icon
}
