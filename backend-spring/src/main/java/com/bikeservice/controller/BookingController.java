package com.bikeservice.controller;

import com.bikeservice.dto.BookingRequest;
import com.bikeservice.model.Booking;
import com.bikeservice.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/bookings", "/v1/bookings"})
@Tag(name = "Bookings", description = "Booking management APIs")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class BookingController {

    private final BookingService bookingService;

    @Operation(
        summary = "Create a new booking",
        description = "Create a new service booking"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Booking created successfully",
            content = @Content(schema = @Schema(implementation = Booking.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input"
        )
    })
    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    @Operation(
        summary = "Get user's bookings",
        description = "Retrieve all bookings for the authenticated user"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "List of bookings retrieved successfully",
            content = @Content(schema = @Schema(implementation = Booking.class))
        )
    })
    @GetMapping
    public ResponseEntity<List<Booking>> getUserBookings(
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        List<Booking> bookings = bookingService.getUserBookings(userDetails.getUsername());
        return ResponseEntity.ok(bookings);
    }

    @Operation(
        summary = "Get booking by ID",
        description = "Retrieve a specific booking by its ID"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Booking found",
            content = @Content(schema = @Schema(implementation = Booking.class))
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Booking not found"
        )
    })
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(
            @Parameter(description = "Booking ID") @PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @Operation(
        summary = "Update booking status",
        description = "Update the status of a specific booking"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Booking status updated successfully",
            content = @Content(schema = @Schema(implementation = Booking.class))
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Booking not found"
        )
    })
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @Parameter(description = "Booking ID") @PathVariable Long id,
            @Parameter(description = "New booking status") @RequestParam Booking.BookingStatus status) {
        Booking booking = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(booking);
    }

    @Operation(
        summary = "Update booking details",
        description = "Update all details of a specific booking except status"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Booking updated successfully",
            content = @Content(schema = @Schema(implementation = Booking.class))
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Booking not found"
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input"
        )
    })
    @PutMapping("update/{id}")
    public ResponseEntity<Booking> updateBooking(
            @Parameter(description = "Booking ID") @PathVariable Long id,
            @Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.updateBooking(id, request);
        return ResponseEntity.ok(booking);
    }

    @Operation(
        summary = "Delete booking",
        description = "Delete a specific booking by its ID"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Booking deleted successfully"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Booking not found"
        )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(
            @Parameter(description = "Booking ID") @PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().build();
    }
} 