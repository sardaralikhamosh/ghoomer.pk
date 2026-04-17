import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  created_at?: string;
}

export interface Tour {
  id: string;
  title: string;
  date: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  availableSlots: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
}

export interface Guide {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerDay: number;
  specialties: string[];
  image: string;
  isVerified: boolean;
  badge?: string;
  bio: string;
  experienceYears: number;
  availability: string[]; // e.g., ['Mon', 'Tue', ...]
  languages: string[];
  certifications: string[];
  gallery?: string[];
  videoIntro?: string;
  stats?: {
    completedTours: number;
    successRate: number;
    responseTime: string;
  };
  coordinates?: { lat: number; lng: number };
  popularity: number;
  reviewsList?: {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    images?: string[];
  }[];
  upcomingTours?: Tour[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  guideCount: number;
  region: 'Gilgit-Baltistan' | 'Khyber Pakhtunkhwa' | 'Azad Kashmir' | 'Punjab';
  activityType: 'Trekking' | 'Cultural' | 'Mountaineering' | 'Photography' | 'Winter Sports' | 'Sightseeing' | 'Honeymoon' | 'Cycling' | 'Pilgrimage';
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  bestSeason: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  groupSize: 'Solo' | 'Small Group' | 'Large Group';
  duration?: string;
  popularity: number;
  coordinates?: { lat: number; lng: number };
  gallery?: string[];
  popularActivities?: string[];
  highlights?: string[];
}

export interface Booking {
  id: string;
  guideId: string;
  guideName: string;
  tripName: string;
  startDate: string;
  endDate: string;
  days: number;
  travelers: number;
  totalPrice: number;
  status: 'Pending' | 'Approved' | 'Confirmed' | 'Paid' | 'Completed' | 'Cancelled' | 'In Progress' | 'Rejected';
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded';
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: '24h' | '7d' | 'Non-refundable';
  createdAt: string;
}

export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  image: string;
  features: string[];
  capacity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export const FEATURED_GUIDES: Guide[] = [
  {
    id: '1',
    name: "Ali Raza",
    location: "Hunza Valley",
    rating: 4.9,
    reviews: 127,
    pricePerDay: 75,
    specialties: ["K2 Trekking", "Mountaineering", "Photography"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    badge: "TOP RATED",
    bio: "Born and raised in the heart of Hunza, I have been guiding expeditions for over a decade. My passion is showing travelers the hidden gems of the Karakoram range.",
    experienceYears: 12,
    availability: ["Monday", "Wednesday", "Friday", "Saturday"],
    languages: ["English", "Urdu", "Burushaski"],
    certifications: ["WFR Certified", "IFMGA Aspirant"],
    popularity: 95,
    coordinates: { lat: 36.3167, lng: 74.6500 }
  },
  {
    id: '2',
    name: "Sarah Khan",
    location: "Skardu",
    rating: 4.8,
    reviews: 89,
    pricePerDay: 65,
    specialties: ["Cultural Tours", "Food Tours", "Photography"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    badge: "CULTURE EXPERT",
    bio: "I specialize in cultural immersion and photography. I love sharing the rich history and traditions of the Balti people with my guests.",
    experienceYears: 8,
    availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    languages: ["English", "Urdu", "Balti"],
    certifications: ["Cultural Heritage Guide"],
    popularity: 88,
    coordinates: { lat: 35.2981, lng: 75.6333 }
  },
  {
    id: '3',
    name: "Ahmed Hassan",
    location: "Fairy Meadows",
    rating: 4.7,
    reviews: 156,
    pricePerDay: 85,
    specialties: ["Ice Climbing", "Skiing", "Winter Expeditions"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    badge: "WINTER SPECIALIST",
    bio: "An expert in winter sports and high-altitude climbing. I have summited several 7,000m peaks and am a certified ice climbing instructor.",
    experienceYears: 15,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    languages: ["English", "Urdu", "German"],
    certifications: ["Certified Ski Instructor", "High Altitude Rescue"],
    popularity: 92,
    coordinates: { lat: 35.3833, lng: 74.5833 }
  },
  {
    id: '4',
    name: "Zara Malik",
    location: "Chitral",
    rating: 4.9,
    reviews: 203,
    pricePerDay: 70,
    specialties: ["Kalash Valley", "Cultural Immersion", "Trekking"],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    badge: "LOCAL EXPERT",
    bio: "I am deeply connected to the Kalash community and offer unique insights into their ancient way of life. Join me for a journey through time.",
    experienceYears: 10,
    availability: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    languages: ["English", "Urdu", "Khowar"],
    certifications: ["Local History Expert"],
    popularity: 97,
    coordinates: { lat: 35.8511, lng: 71.7889 }
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'k2',
    name: "K2 Base Camp",
    description: "World's most challenging trek",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
    guideCount: 32,
    region: 'Gilgit-Baltistan',
    activityType: 'Mountaineering',
    price: 1200,
    difficulty: 'Extreme',
    bestSeason: 'Summer',
    groupSize: 'Small Group',
    popularity: 98,
    coordinates: { lat: 35.8818, lng: 76.5133 },
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["High Altitude Trekking", "Glacier Crossing", "Ice Climbing"],
    highlights: ["Concordia - Throne Room of Mountain Gods", "Baltoro Glacier", "Views of 4 eight-thousanders"]
  },
  {
    id: 'hunza',
    name: "Hunza Valley",
    description: "Cultural gem of the north",
    image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=600&q=80",
    guideCount: 45,
    region: 'Gilgit-Baltistan',
    activityType: 'Cultural',
    price: 450,
    difficulty: 'Easy',
    bestSeason: 'Spring',
    groupSize: 'Large Group',
    popularity: 95,
    coordinates: { lat: 36.3167, lng: 74.6500 },
    gallery: [
      "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Altit & Baltit Fort Tours", "Attabad Lake Boating", "Apricot Blossom Viewing"],
    highlights: ["Ancient Silk Road History", "Stunning Autumn Colors", "Local Organic Cuisine"]
  },
  {
    id: 'fairy',
    name: "Fairy Meadows",
    description: "Camp under Nanga Parbat",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=600&q=80",
    guideCount: 28,
    region: 'Gilgit-Baltistan',
    activityType: 'Trekking',
    price: 350,
    difficulty: 'Moderate',
    bestSeason: 'Summer',
    groupSize: 'Small Group',
    popularity: 92,
    coordinates: { lat: 35.3833, lng: 74.5833 },
    gallery: [
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Camping", "Horse Riding", "Base Camp Hike"],
    highlights: ["Nanga Parbat Face View", "Pine Forest Trails", "Starry Night Skies"]
  },
  {
    id: 'skardu',
    name: "Skardu Valley",
    description: "Gateway to the Karakoram",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    guideCount: 38,
    region: 'Gilgit-Baltistan',
    activityType: 'Photography',
    price: 600,
    difficulty: 'Moderate',
    bestSeason: 'Autumn',
    groupSize: 'Solo',
    popularity: 89,
    coordinates: { lat: 35.2981, lng: 75.6333 },
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Deosai Plains Safari", "Shangrila Resort Visit", "Cold Desert Jeep Safari"],
    highlights: ["Highest Plateau in the World", "Stunning Blue Lakes", "Ancient Buddhist Rock Carvings"]
  },
  {
    id: 'phander',
    name: "Phander Valley",
    description: "The trout fishing paradise",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
    guideCount: 15,
    region: 'Gilgit-Baltistan',
    activityType: 'Sightseeing',
    price: 350,
    difficulty: 'Easy',
    bestSeason: 'Summer',
    groupSize: 'Small Group',
    popularity: 85,
    coordinates: { lat: 36.1833, lng: 73.4500 },
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Trout Fishing", "Lake Boating", "River Side Camping"],
    highlights: ["Crystal Clear Phander Lake", "Serene Gupis Valley", "Peaceful Fishing Spots"]
  },
  {
    id: 'khaplu',
    name: "Khaplu Valley",
    description: "Royal heritage and architecture",
    image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=600&q=80",
    guideCount: 20,
    region: 'Gilgit-Baltistan',
    activityType: 'Cultural',
    price: 400,
    difficulty: 'Easy',
    bestSeason: 'Autumn',
    groupSize: 'Small Group',
    popularity: 87,
    coordinates: { lat: 35.1444, lng: 76.3333 },
    gallery: [
      "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Khaplu Palace Tour", "Chaqchan Mosque Visit", "Local Handicraft Shopping"],
    highlights: ["Historic Royal Palace", "Ancient Wooden Mosque", "Stunning Shyok River Views"]
  },
  {
    id: 'shandur',
    name: "Shandur Pass",
    description: "Roof of the world polo ground",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=600&q=80",
    guideCount: 12,
    region: 'Gilgit-Baltistan',
    activityType: 'Cultural',
    price: 550,
    difficulty: 'Moderate',
    bestSeason: 'Summer',
    groupSize: 'Small Group',
    popularity: 82,
    coordinates: { lat: 36.0833, lng: 72.5167 },
    gallery: [
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Polo Festival Attendance", "High Altitude Camping", "Stargazing"],
    highlights: ["Highest Polo Ground in the World", "Stunning Mountain Pass", "Cultural Exchange"]
  },
  {
    id: 'kalash',
    name: "Kalash Valley",
    description: "Ancient culture and traditions",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=600&q=80",
    guideCount: 18,
    region: 'Khyber Pakhtunkhwa',
    activityType: 'Cultural',
    price: 400,
    difficulty: 'Easy',
    bestSeason: 'Autumn',
    groupSize: 'Small Group',
    popularity: 94,
    coordinates: { lat: 35.6833, lng: 71.7167 },
    gallery: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    popularActivities: ["Chilam Joshi Festival", "Local Dance Viewing", "Traditional Craft Tours"],
    highlights: ["Unique Kalash Culture", "Vibrant Traditional Festivals", "Historic Wooden Houses"]
  }
];

export const CARS: Car[] = [
  {
    id: 'corolla',
    name: 'Toyota Corolla',
    type: 'Sedan',
    pricePerDay: 50,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80',
    features: ['AC', 'Bluetooth', 'Spacious Trunk'],
    capacity: 4
  },
  {
    id: 'prado',
    name: 'Toyota Prado',
    type: 'SUV',
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
    features: ['4x4', 'Off-road capable', 'Luxury Interior'],
    capacity: 7
  },
  {
    id: 'hiace',
    name: 'Toyota Hiace',
    type: 'Van',
    pricePerDay: 80,
    image: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?auto=format&fit=crop&w=600&q=80',
    features: ['High Roof', 'AC', 'Ideal for Groups'],
    capacity: 12
  },
  {
    id: 'revo',
    name: 'Toyota Hilux Revo',
    type: 'Pickup',
    pricePerDay: 100,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820bc6988?auto=format&fit=crop&w=600&q=80',
    features: ['4x4', 'Rugged', 'Adventure Ready'],
    capacity: 5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'London, UK',
    text: 'Exploria made my Hunza trip unforgettable. The guide was knowledgeable and the logistics were seamless. I felt safe and well-cared for throughout the journey.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Ahmed Khan',
    location: 'Dubai, UAE',
    text: 'The K2 Base Camp trek was challenging but Ghoomer handled everything perfectly. The local insights provided by our guide were invaluable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Elena Petrov',
    location: 'Moscow, Russia',
    text: 'Beautiful landscapes and even better service. The car rental was smooth and the driver was very professional. Highly recommended for anyone visiting Pakistan.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '4',
    name: 'David Wilson',
    location: 'New York, USA',
    text: 'A truly authentic experience. We visited remote villages that we never would have found on our own. The hospitality was incredible.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '5',
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    text: 'The photography tour was amazing. Our guide knew all the best spots for sunrise and sunset. I captured some of my best shots ever here.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];
