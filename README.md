# ReservaApp Microservices

Welcome to ReservaApp! This is a project for managing reservations. You can manage users, rooms, and make bookings with ease!

## Features 🎀
*   User Management 🧍‍♀️🧍‍♂️
*   Room Management 🚪🛋️
*   Reservation System 📅✔️
*   Cute Frontend Interface 🖥️💖
*   Event-driven communication with RabbitMQ 🐇

## Technologies Stack 🛠️
*   **Backend:** Java 21, Spring Boot 3.4.4
*   **Frontend:** HTML, CSS, JavaScript
*   **Databases:** MySQL (one per microservice)
*   **Orchestration:** Docker, Docker Compose
*   **API Gateway:** Nginx
*   **Messaging:** RabbitMQ
*   **Build Tool:** Maven

## Project Structure Overview 🏗️
The project structure is organized like this:
*   `frontend/`: The user interface
*   `ms-usuario/`: Microservice for our users.
*   `ms-sala/`: Microservice for all the rooms.
*   `ms-reserva/`: Microservice to handle all the reservations.
*   `nginx/`: The API gateway.
*   `docker-compose.yml`: Configuration file for container orchestration. 
*   `README.md`: This file you're reading!

## Prerequisites 📋
*   **Docker Desktop:** Make sure it's installed and running on your machine! You can get it from [Docker's official website](https://www.docker.com/products/docker-desktop/).
*   **A Web Browser:** Any modern browser like Chrome, Firefox, or Edge.
*   **(Optional) For local development outside Docker for the services:**
    *   Java JDK 21
    *   Apache Maven

## Getting Started 🚀

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/mayumihb/atividade-microsservico.git
    cd atividade-microsservico
    ```

2.  **Launch the application with Docker Compose:**
    This command will build the Docker images (if they don't exist yet) and start all the services.
    Open your terminal in the project root directory (where `docker-compose.yml` is) and run:
    ```bash
    docker-compose up -d --build
    ```
    It might take a few moments for all containers to build and start, especially the first time. The databases need a little time to initialize. The healthchecks in `docker-compose.yml` help ensure services start in the correct order.

    You can check the status of your containers with:
    ```bash
    docker-compose ps
    ```
    And watch the logs (if you're curious or troubleshooting) with:
    ```bash
    docker-compose logs -f
    ```

3.  **Access the application:**
    Once everything is up and running, you can access the different parts of the system:

    *   **🌸 Frontend Application:**
        Open your favorite web browser and go to: `http://localhost`
        (Nginx serves the frontend on port 80 by default).

    *   **⚙️ API Endpoints (via Nginx Gateway):**
        The APIs are also accessible through `http://localhost`:
        *   User Service: `http://localhost/api/usuarios`
        *   Room Service: `http://localhost/api/salas`
        *   Reservation Service: `http://localhost/api/reservas`

    *   **🗃️ Adminer (Database Management Tool):**
        To peek into the databases: `http://localhost:4040`
        You'll need to log in for each database server:
        *   **System:** MySQL
        *   **Server:**
            *   `mysql-usuario-container` (for user data)
            *   `mysql-sala-container` (for room data)
            *   `mysql-reserva-container` (for reservation data)
        *   **Username:** `admin`
        *   **Password:** `123`
        *   **Database:**
            *   `db_usuario` (for user service)
            *   `db_sala` (for room service)
            *   `db_reserva` (for reservation service)

    *   **🐇 RabbitMQ Management Console:**
        To see message queues and exchanges: `http://localhost:15672`
        *   **Username:** `admin`
        *   **Password:** `admin`

## Microservices Details 🤓

*   **`ms-usuario` (User Service):**
    *   Manages all the information about the users.
    *   Has its own dedicated MySQL database (`mysql-usuario-container` / `db_usuario`).
    *   Exposes API endpoints under `http://localhost/api/usuarios`.
    *   Uses RabbitMQ for asynchronous communication (e.g., publishing events when a user is created).

*   **`ms-sala` (Room Service):**
    *   Takes care of all the details for the available rooms.
    *   Has its own dedicated MySQL database (`mysql-sala-container` / `db_sala`).
    *   Exposes API endpoints under `http://localhost/api/salas`.

*   **`ms-reserva` (Reservation Service):**
    *   Handles the creation and management of reservations, linking users to rooms.
    *   Has its own dedicated MySQL database (`mysql-reserva-container` / `db_reserva`).
    *   Exposes API endpoints under `http://localhost/api/reservas`.
    *   Uses RabbitMQ for asynchronous communication (e.g., publishing events when a reservation is made).

## Stopping the Application 🛑
When you're ready to stop all the services, go back to your terminal in the project root directory and run:
```bash
docker-compose down
```
This command will stop and remove the containers.

If you also want to remove the Docker volumes (this will **delete all your database data**! So be careful! 😱), you can use:
```bash
docker-compose down -v
```
