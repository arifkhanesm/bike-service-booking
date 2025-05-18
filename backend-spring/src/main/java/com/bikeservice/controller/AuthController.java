package com.bikeservice.controller;

import com.bikeservice.dto.AuthRequest;
import com.bikeservice.dto.AuthResponse;
import com.bikeservice.dto.RegisterRequest;
import com.bikeservice.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping({"/api/v1/auth", "/v1/auth"})
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user",
            description = "Register a new user with email, password, full name, and phone number")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.debug("Received registration request for email: {}", request.getEmail());
        try {
            AuthResponse response = authService.register(request);
            log.debug("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Registration failed for email: {}", request.getEmail(), e);
            throw e;
        }
    }

    @PostMapping("/authenticate")
    @Operation(summary = "Authenticate user",
            description = "Authenticate a user with email and password")
    public ResponseEntity<AuthResponse> authenticate(@Valid @RequestBody AuthRequest request) {
        log.debug("Received authentication request for email: {}", request.getEmail());
        try {
            AuthResponse response = authService.authenticate(request);
            log.debug("Authentication successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Authentication failed for email: {}", request.getEmail(), e);
            throw e;
        }
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh authentication token",
            description = "Get a new access token using a refresh token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody String refreshToken) {
        log.debug("Received refresh token request");
        try {
            AuthResponse response = authService.refreshToken(refreshToken);
            log.debug("Token refresh successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Token refresh failed", e);
            throw e;
        }
    }
} 