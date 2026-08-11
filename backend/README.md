# ABTalks - Java Spring Boot Backend Foundation

This is the Java Spring Boot backend service foundation for the ABTalks 60-Day Code Challenge platform.

## Architecture & Package Structure

```text
src/main/java/com/abtalks/
├── AbTalksApplication.java   # Spring Boot Main Entry Point
├── config/
│   └── CorsConfig.java        # Cross-Origin Resource Sharing Setup
├── controller/
│   └── HealthController.java  # Health Check API Endpoint
├── dto/                       # Data Transfer Objects (Future migration steps)
├── model/                     # JPA Domain Entities (Future migration steps)
├── repository/                # Data Repositories (Future migration steps)
└── service/                   # Business Logic Layer (Future migration steps)
```

## Tech Stack

- **Java 17+**
- **Spring Boot 3.2.x**
- **Spring Web**
- **Spring Data JPA**
- **H2 In-Memory Database** (for development)
- **Maven**

## Prerequisites

- Java Development Kit (JDK 17 or higher)
- Apache Maven 3.8+

## How to Run

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Compile and run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```

3. The server will start on `http://localhost:8080`.

## Health Check API

To verify that the Spring Boot backend is running successfully:

- **Endpoint:** `GET http://localhost:8080/api/health`
- **Response:**
  ```json
  {
    "status": "ok",
    "message": "ABTalks backend is running"
  }
  ```

## CORS Configuration

Configured in `CorsConfig.java` to allow requests from the frontend development origins:
- `http://localhost:3000`
- `http://localhost:5173`
