package com.bikeservice.dto;

import com.bikeservice.model.Booking;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingRequest {
    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    @NotBlank(message = "Bike brand is required")
    private String bikeBrand;

    @NotBlank(message = "Bike model is required")
    private String bikeModel;

    @NotBlank(message = "Manufacture year is required")
    private String manufactureYear;

    @NotNull(message = "Appointment date is required")
    private LocalDateTime appointmentDate;

    @NotBlank(message = "Service type is required")
    private String serviceType;

    private String notes;

    private Booking.BookingStatus bookingStatus;
} 