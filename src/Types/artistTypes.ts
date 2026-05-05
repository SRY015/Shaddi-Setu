import type { FieldValue } from "firebase/firestore";

export interface ServicePackage {
  id: string;
  title: string;
  price: number;
  description: string;
}

export interface ServiceHours {
  day: string;
  morningStart: string;
  morningEnd: string;
  eveningStart: string;
  eveningEnd: string;
  isOff: boolean;
}

export interface ArtistPortfolio {
  id?: string;
  title: string;
  subtitle: string;
  userId: string;
  featured?: boolean;
  type: string;
  image: string;
  createdAt: FieldValue;
}

export interface ArtistProfile {
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType?: string;
  designation?: string;
  bio?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  travelDistance?: number;
  offDays?: string[];
  servicePackages?: ServicePackage[];
  startingPrice?: number;
  profilePicture?: string;
  verified?: boolean;
  role?: string;
  serviceHours?: ServiceHours[];
  profileCompletion?: number;
}
