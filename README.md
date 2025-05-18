# Bike Service Booking Application

A full-stack application for booking bike services, built with React and Spring Boot.

## Project Structure

```
bike-service-booking/
├── frontend-react/           # React TypeScript frontend
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   ├── package.json         # Frontend dependencies
│   └── tsconfig.json        # TypeScript configuration
│
└── backend-spring/          # Spring Boot backend
    ├── src/                 # Source files
    │   └── main/
    │       ├── java/       # Java source files
    │       └── resources/  # Application properties
    └── pom.xml             # Backend dependencies
```

## Technology Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- React Router

### Backend
- Spring Boot 3.2
- Spring Security
- JWT Authentication
- PostgreSQL
- JPA/Hibernate

## Getting Started

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend-react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
   The frontend will be available at http://localhost:3000

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend-spring
   ```
2. Install dependencies and build:
   ```bash
   ./mvnw clean install
   ```
3. Start the server:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend API will be available at http://localhost:8080

### Database Setup
1. Install PostgreSQL
2. Create a database named 'bike_service'
3. Update database credentials in `backend-spring/src/main/resources/application.yml` if needed

## Features
- User Authentication and Authorization
- Bike Service Booking
- Admin Dashboard
- Service Management
- Booking Management