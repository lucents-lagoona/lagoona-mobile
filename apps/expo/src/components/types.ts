export interface TService {
  id: string;
  name: string;
  image: string;
  memberType: string;
  duration: string;
  description: string;
  features: string[];
  basePrice: number;
  category: string;
  capacity: number;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
}

export interface TEvent {
  id: string;
  name: string;
  image: string;
  memberType: string;
  startTime: string;
  endTime: string;
  address: string;
  basePrice: number;
  description: string;
  category: string;
  capacity: number;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
}

export interface TBooking {
  id: string;
  type: string;
  status: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  bookingDate: string;
  scheduledDate: string;
  completedDate?: string;
  quantity: number;
  totalAmount: number;
  memberType: string;
  notes: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  advisorName?: string;
  rating?: number;
  review?: string;
  assistantName: string;
}
