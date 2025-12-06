import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  features: string[];
  icon: LucideIcon;
}

export interface PriceItem {
  title: string;
  range: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  text: string;
  author: string;
}
