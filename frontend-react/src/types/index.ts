export interface BikeService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bikeBrand: string;
  bikeModel: string;
  manufactureYear: string;
  appointmentDate: string;
  serviceType: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}