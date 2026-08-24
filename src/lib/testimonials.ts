// DİKKAT: Yorum metinleri TASLAKTIR — yayına almadan önce müşteri onayı alınmalı,
// approved:true yapılmadan bileşen 'taslak' kabul edilir.
// Yorum metinleri src/messages/*.json → "testimonials.quotes.<quoteKey>" altında durur.

export interface Testimonial {
  id: string;
  workSlug: string;
  clientName: string;
  quoteKey: string;
  approved: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-nexos",
    workSlug: "nexos-investment",
    clientName: "Nexos Investment",
    quoteKey: "nexos",
    approved: false,
  },
  {
    id: "t-ambalaj-cini",
    workSlug: "ambalaj-cini",
    clientName: "Ambalaj Cini",
    quoteKey: "ambalajCini",
    approved: false,
  },
  {
    id: "t-sammys",
    workSlug: "sammys-hotel",
    clientName: "Sammys Hotel",
    quoteKey: "sammys",
    approved: false,
  },
  {
    id: "t-radyo-juke",
    workSlug: "radyo-juke",
    clientName: "Radyo Juke",
    quoteKey: "radyoJuke",
    approved: false,
  },
  {
    id: "t-velis",
    workSlug: "velis-ltd",
    clientName: "Velis Ticaret LTD",
    quoteKey: "velis",
    approved: false,
  },
  {
    id: "t-bt-elevator",
    workSlug: "bt-elevator",
    clientName: "BT Elevator",
    quoteKey: "btElevator",
    approved: false,
  },
];
