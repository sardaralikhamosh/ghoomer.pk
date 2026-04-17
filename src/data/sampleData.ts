import { type Guide as BaseGuide } from '../lib/utils';

export type Guide = BaseGuide;

export interface Adventure {
  id: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  price: number;
  image: string;
  guides: string[];
  popularity: number;
  coordinates?: { lat: number; lng: number };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
  adventure: string;
}

export const GUIDES: Guide[] = [
  {
    id: '1',
    name: 'Ali Khan',
    location: 'Hunza Valley',
    rating: 4.9,
    reviews: 124,
    pricePerDay: 45,
    specialties: ['Trekking', 'Photography', 'Cultural Tours'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    badge: 'Elite Guide',
    bio: 'Born and raised in Hunza, I have been guiding travelers for over 10 years. I specialize in high-altitude treks and local cultural immersion.',
    experienceYears: 12,
    languages: ['English', 'Urdu', 'Burushaski'],
    certifications: ['IFMGA Certified', 'First Aid Responder'],
    popularity: 150,
    videoIntro: 'https://www.w3schools.com/html/mov_bbb.mp4',
    stats: {
      completedTours: 142,
      successRate: 98,
      responseTime: '2 hours'
    },
    coordinates: { lat: 36.3167, lng: 74.6500 },
    isVerified: true,
    availability: ["Monday", "Wednesday", "Friday", "Saturday"],
    gallery: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80'
    ],
    reviewsList: [
      { 
        id: 'r1', 
        userName: 'James Wilson', 
        rating: 5, 
        comment: 'Ali was an incredible guide. His knowledge of the Hunza valley is unmatched.', 
        date: '2024-02-15',
        images: [
          'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80'
        ]
      },
      { id: 'r2', userName: 'Sarah Chen', rating: 4, comment: 'Very professional and friendly. Highly recommend for photography tours.', date: '2024-01-20' }
    ],
    upcomingTours: [
      {
        id: 't1',
        title: 'Hunza Valley Cultural Escape',
        date: '2024-05-15',
        duration: '5 Days',
        price: 350,
        image: 'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80',
        description: 'Explore the ancient forts and local traditions of Hunza.',
        availableSlots: 4,
        difficulty: 'Easy'
      },
      {
        id: 't2',
        title: 'Passu Cones Photography Trek',
        date: '2024-06-10',
        duration: '3 Days',
        price: 200,
        image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
        description: 'Capture the stunning Passu Cones at sunrise and sunset.',
        availableSlots: 6,
        difficulty: 'Moderate'
      }
    ]
  },
  {
    id: '2',
    name: 'Zahra Ahmed',
    location: 'Skardu',
    rating: 4.8,
    reviews: 89,
    pricePerDay: 55,
    specialties: ['Mountaineering', 'Camping', 'History'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    badge: 'Expert Climber',
    bio: 'Passionate mountaineer with multiple K2 Base Camp summits. I love sharing the history of the Balti people with my guests.',
    experienceYears: 8,
    languages: ['English', 'Urdu', 'Balti'],
    certifications: ['National Guide License', 'Wilderness First Aid'],
    popularity: 95,
    coordinates: { lat: 35.2975, lng: 75.6333 },
    isVerified: true,
    availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    gallery: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    reviewsList: [
      { id: 'r3', userName: 'David Wilson', rating: 5, comment: 'Zahra is a true expert. The K2 Base Camp trek was a life-changing experience.', date: '2024-03-01' }
    ],
    upcomingTours: [
      {
        id: 't3',
        title: 'K2 Base Camp Expedition',
        date: '2024-07-01',
        duration: '21 Days',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
        description: 'The ultimate challenge for any trekker. Walk among the giants.',
        availableSlots: 2,
        difficulty: 'Extreme'
      }
    ]
  },
  {
    id: '3',
    name: 'Ibrahim Shah',
    location: 'Fairy Meadows',
    rating: 5.0,
    reviews: 56,
    pricePerDay: 40,
    specialties: ['Stargazing', 'Horse Riding', 'Local Cuisine'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    badge: 'Nature Lover',
    bio: 'I provide the most authentic Fairy Meadows experience, from horse rides to traditional Nanga Parbat base camp stories.',
    experienceYears: 15,
    languages: ['English', 'Urdu', 'Shina'],
    certifications: ['High Altitude Specialist', 'Rescue Diver'],
    popularity: 60,
    coordinates: { lat: 35.3833, lng: 74.5833 },
    isVerified: true,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    gallery: [
      'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80'
    ],
    reviewsList: [
      { id: 'r4', userName: 'Elena Petrov', rating: 5, comment: 'Ibrahim is the best! The horse riding was so much fun.', date: '2024-02-28' }
    ],
    upcomingTours: [
      {
        id: 't4',
        title: 'Fairy Meadows Stargazing Camp',
        date: '2024-06-20',
        duration: '4 Days',
        price: 300,
        image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80',
        description: 'Sleep under the stars at the base of Nanga Parbat.',
        availableSlots: 8,
        difficulty: 'Moderate'
      }
    ]
  },
  {
    id: '4',
    name: 'Sarah Khan',
    location: 'Skardu',
    rating: 4.7,
    reviews: 92,
    pricePerDay: 60,
    specialties: ['Photography', 'Cultural Tours', 'Jeep Safari'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    badge: 'Photo Expert',
    bio: 'Capturing the beauty of Baltistan through my lens. I help travelers find the best spots for photography.',
    experienceYears: 7,
    languages: ['English', 'Urdu', 'Balti'],
    certifications: ['Professional Photographer', 'Local Heritage Guide'],
    popularity: 110,
    coordinates: { lat: 35.3000, lng: 75.6000 },
    isVerified: true,
    availability: ["Monday", "Tuesday", "Friday", "Saturday"],
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80'
    ],
    reviewsList: [
      { id: 'r5', userName: 'Yuki Tanaka', rating: 5, comment: 'Sarah took amazing photos of us. She knows all the best angles!', date: '2024-03-10' }
    ],
    upcomingTours: [
      {
        id: 't5',
        title: 'Skardu Valley Photography Workshop',
        date: '2024-05-25',
        duration: '6 Days',
        price: 500,
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        description: 'Master landscape photography in the gateway to the Karakoram.',
        availableSlots: 5,
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: '5',
    name: 'Kamran Akmal',
    location: 'Gilgit',
    rating: 4.5,
    reviews: 45,
    pricePerDay: 35,
    specialties: ['Trekking', 'Camping', 'Fishing'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    badge: 'Adventure Pro',
    bio: 'Specialist in low-budget adventure trips around Gilgit. I know all the best camping spots.',
    experienceYears: 5,
    languages: ['English', 'Urdu', 'Shina'],
    certifications: ['Camping Instructor', 'Fishing Guide'],
    popularity: 50,
    coordinates: { lat: 35.9208, lng: 74.3083 },
    isVerified: true,
    availability: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    reviewsList: [
      { id: 'r6', userName: 'Mark Smith', rating: 4, comment: 'Great guide for budget travelers. Very helpful.', date: '2024-01-15' }
    ],
    upcomingTours: [
      {
        id: 't6',
        title: 'Gilgit River Fishing Expedition',
        date: '2024-06-05',
        duration: '3 Days',
        price: 150,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
        description: 'A budget-friendly fishing and camping trip along the Gilgit River.',
        availableSlots: 10,
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: '6',
    name: 'Nadia Ali',
    location: 'Hunza Valley',
    rating: 4.9,
    reviews: 110,
    pricePerDay: 50,
    specialties: ['Cultural Tours', 'Local Cuisine', 'History'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    badge: 'Heritage Guide',
    bio: 'Expert in Hunza history and culture. I offer deep dives into the traditions of the valley.',
    experienceYears: 9,
    languages: ['English', 'Urdu', 'Burushaski'],
    certifications: ['History Specialist', 'Culinary Arts'],
    popularity: 125,
    coordinates: { lat: 36.3000, lng: 74.6000 },
    isVerified: true,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    gallery: [
      'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80'
    ],
    reviewsList: [
      { id: 'r7', userName: 'Anna Brown', rating: 5, comment: 'Nadia is so knowledgeable. We learned so much about Hunza history.', date: '2024-02-10' }
    ],
    upcomingTours: [
      {
        id: 't7',
        title: 'Hunza Culinary & Heritage Trail',
        date: '2024-05-30',
        duration: '4 Days',
        price: 280,
        image: 'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80',
        description: 'Taste the flavors of Hunza while exploring its ancient history.',
        availableSlots: 6,
        difficulty: 'Easy'
      }
    ]
  }
];

export const ADVENTURES: Adventure[] = [
  {
    id: '1',
    title: 'K2 Base Camp Trek',
    location: 'Concordia, Baltistan',
    description: 'The ultimate challenge for any trekker. Walk among the giants of the Karakoram.',
    duration: '21 Days',
    difficulty: 'Extreme',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    guides: ['2'],
    popularity: 45,
    coordinates: { lat: 35.8811, lng: 76.5133 }
  },
  {
    id: '2',
    title: 'Hunza Cultural Escape',
    location: 'Karimabad, Hunza',
    description: 'Explore ancient forts, local markets, and the legendary hospitality of the Hunza people.',
    duration: '5 Days',
    difficulty: 'Easy',
    price: 350,
    image: 'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80',
    guides: ['1'],
    popularity: 120,
    coordinates: { lat: 36.3216, lng: 74.6654 }
  },
  {
    id: '3',
    title: 'Nanga Parbat Base Camp',
    location: 'Fairy Meadows',
    description: 'Camp in the lush green meadows with the "Killer Mountain" looming over you.',
    duration: '7 Days',
    difficulty: 'Moderate',
    price: 450,
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80',
    guides: ['3'],
    popularity: 85,
    coordinates: { lat: 35.3833, lng: 74.5833 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'James Wilson',
    location: 'London, UK',
    text: 'Ali was an incredible guide. His knowledge of the Hunza valley is unmatched. The trip was perfectly organized.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    adventure: 'Hunza Cultural Escape'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    location: 'Singapore',
    text: 'K2 Base Camp was the hardest thing I\'ve ever done, but Zahra made it feel safe and achievable. Life-changing experience!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    adventure: 'K2 Base Camp Trek'
  }
];
