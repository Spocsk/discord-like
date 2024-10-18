# Discord Clone Project

This project aims to replicate the functionalities of Discord using a microservices architecture. It leverages a stack consisting of MongoDB, Nest.js, Angular, and Docker.

## Technologies Used

- **MongoDB**: NoSQL database to store user data, messages, and room information.
- **Nest.js**: Framework for building scalable server-side applications.
    - **User Service**: Handles user authentication and management.
    - **Message Service**: Manages messages and rooms using WebSockets for real-time communication.
- **Angular**: Frontend framework for building the user interface.
- **Docker**: Containerization tool to simplify deployment and development.

## Project Structure

- **User Service**: Nest.js microservice that manages user authentication and user-related operations.
- **Message Service**: Nest.js microservice that manages messages and rooms, enabling real-time communication through WebSockets.
- **Frontend**: Angular microservice that serves the user interface for the application.
- **MongoDB Service**: Docker service to run MongoDB.

## Getting Started

To start the project using Docker Compose, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory> 
    ```

2. **Build the Docker images**:

   ```bash
   docker-compose build
   ```
3. **Start the services**:

   ```bash
   docker-compose up
   ```