export enum Tab {
  HOME = 'home',
  VISUALIZER = 'visualizer',
  BOOKING = 'booking',
  PROFILE = 'profile'
}

export interface Technician {
  id: string;
  name: string;
  rating: number;
  avatar: string; // URL or color code
  specialty: string;
}

export interface CarConfig {
  color: string;
  rims: 'standard' | 'sport' | 'luxury';
  tint: number; // 0 to 1 opacity
  price: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}