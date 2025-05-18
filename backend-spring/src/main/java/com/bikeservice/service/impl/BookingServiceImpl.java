package com.bikeservice.service.impl;

import com.bikeservice.dto.BookingRequest;
import com.bikeservice.exception.BookingNotFoundException;
import com.bikeservice.model.Booking;
import com.bikeservice.repository.BookingRepository;
import com.bikeservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    @Transactional
    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setCustomerEmail(request.getCustomerEmail());
        booking.setCustomerName(request.getCustomerName());
        booking.setCustomerPhone(request.getCustomerPhone());
        booking.setBikeBrand(request.getBikeBrand());
        booking.setBikeModel(request.getBikeModel());
        booking.setManufactureYear(request.getManufactureYear());
        booking.setAppointmentDate(request.getAppointmentDate());
        booking.setServiceType(request.getServiceType());
        booking.setNotes(request.getNotes());
        
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getUserBookings(String userEmail) {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException(bookingId));
    }

    @Override
    @Transactional
    public Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public Booking updateBooking(Long bookingId, BookingRequest request) {
        Booking booking = getBookingById(bookingId);
        
        booking.setCustomerEmail(request.getCustomerEmail());
        booking.setCustomerName(request.getCustomerName());
        booking.setCustomerPhone(request.getCustomerPhone());
        booking.setBikeBrand(request.getBikeBrand());
        booking.setBikeModel(request.getBikeModel());
        booking.setManufactureYear(request.getManufactureYear());
        booking.setAppointmentDate(request.getAppointmentDate());
        booking.setServiceType(request.getServiceType());
        booking.setNotes(request.getNotes());
        booking.setStatus(request.getBookingStatus());
        
        return bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void deleteBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        bookingRepository.delete(booking);
    }
} 