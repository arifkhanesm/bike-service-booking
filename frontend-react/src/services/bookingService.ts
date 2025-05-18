import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

export interface BookingRequest {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  bikeBrand: string;
  bikeModel: string;
  manufactureYear: string;
  appointmentDate: string;
  serviceType: string;
  notes?: string;
  bookingStatus: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface BookingResponse {
  id: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  bikeBrand: string;
  bikeModel: string;
  manufactureYear: string;
  appointmentDate: string;
  serviceType: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export const bookingService = {
  createBooking: (bookingData: BookingRequest) => {
    return api.post<BookingResponse>('/api/v1/bookings', bookingData);
  },

  getAllBookings: () => {
    return api.get<BookingResponse[]>('/api/v1/bookings');
  },

  getBookingById: (id: number) => {
    return api.get<BookingResponse>(`/api/v1/bookings/${id}`);
  },

  updateBooking: (id: number, bookingData: BookingRequest) => {
    return api.put<BookingResponse>(`/api/v1/bookings/update/${id}`, bookingData);
  },

  deleteBooking: (id: number) => {
    return api.delete(`/api/v1/bookings/${id}`);
  }
}; 