import { BikeService } from '../types';

export const mockBikeServices: BikeService[] = [
  {
    id: '1',
    name: 'Basic Tune-Up',
    description: 'Basic bike inspection, tire pressure check, and chain lubrication',
    price: 49.99,
    duration: 60
  },
  {
    id: '2',
    name: 'Full Service',
    description: 'Complete bike service including brake adjustment, gear tuning, and thorough cleaning',
    price: 129.99,
    duration: 180
  },
  {
    id: '3',
    name: 'Brake Service',
    description: 'Brake pad replacement and brake system adjustment',
    price: 79.99,
    duration: 90
  },
  {
    id: '4',
    name: 'Wheel Truing',
    description: 'Wheel alignment and spoke tension adjustment',
    price: 59.99,
    duration: 60
  },
  {
    id: '5',
    name: 'Drivetrain Overhaul',
    description: 'Complete cleaning and maintenance of chain, cassette, and derailleurs',
    price: 149.99,
    duration: 120
  }
];

export const getServices = (): Promise<BikeService[]> => {
  return Promise.resolve(mockBikeServices);
};

export const getServiceById = (id: string): Promise<BikeService | undefined> => {
  return Promise.resolve(mockBikeServices.find(service => service.id === id));
}; 