export interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  seat: string;
  ticketType: "VIP" | "General Admission";
  qrCodeUrl: string;
  imageUrl: string;
}

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "t1",
    eventId: "e1",
    eventName: "Lagoona Dance Show",
    date: "2025-11-25",
    time: "14:00",
    location: "Con Dao",
    seat: "Row A, Seat 12",
    ticketType: "VIP",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleTicket1",
    imageUrl:
      "https://pub-63b5168ea22f4018a67982ad0642b457.r2.dev/tickets/1.jpg",
  },
  {
    id: "t2",
    eventId: "e2",
    eventName: "Ocean Reserve Performance",
    date: "2025-12-02",
    time: "18:30",
    location: "Phu Quoc",
    seat: "General Admission",
    ticketType: "General Admission",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleTicket2",
    imageUrl:
      "https://pub-63b5168ea22f4018a67982ad0642b457.r2.dev/tickets/2.jpg",
  },
  {
    id: "t3",
    eventId: "e3",
    eventName: "Ham Nghi Art Exhibition",
    date: "2025-12-10",
    time: "10:00",
    location: "Hue",
    seat: "Entry Pass",
    ticketType: "General Admission",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleTicket3",
    imageUrl:
      "https://pub-63b5168ea22f4018a67982ad0642b457.r2.dev/tickets/3.jpg",
  },
];
