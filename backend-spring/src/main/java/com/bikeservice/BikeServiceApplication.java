package com.bikeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class BikeServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BikeServiceApplication.class, args);
    }
} 