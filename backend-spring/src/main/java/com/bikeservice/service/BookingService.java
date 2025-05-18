package com.bikeservice.service;

import com.bikeservice.dto.BookingRequest;
import com.bikeservice.model.Booking;
import java.util.List;

public interface BookingService {
    Booking createBooking(BookingRequest request);
    List<Booking> getUserBookings(String userEmail);
    Booking getBookingById(Long bookingId);
    Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status);
    Booking updateBooking(Long bookingId, BookingRequest request);
    void deleteBooking(Long bookingId);
} 