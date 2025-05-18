package com.bikeservice.service;

import com.bikeservice.dto.AuthRequest;
import com.bikeservice.dto.AuthResponse;
import com.bikeservice.dto.RegisterRequest;
 
public interface AuthService {
    AuthResponse authenticate(AuthRequest request);
    AuthResponse refreshToken(String refreshToken);
    AuthResponse register(RegisterRequest request);
} 