# KEYSTONE – Field Service Management Platform

Backend REST API for a modern **Field Service Management (FSM)** system developed using **Spring Boot**.

This project was developed as part of the **Zidio Development Java Full Stack Internship**.

---

## 📌 Project Overview

KEYSTONE is a Field Service Management platform designed to streamline service operations by managing customers, service sites, technicians, work orders, and assets.

The backend exposes secure RESTful APIs protected with JWT Authentication and is designed to integrate with a React frontend.

---

## ✨ Features

- JWT Authentication & Authorization
- Customer Management
- Site Management
- Technician Management
- Work Order Management
- Asset Management
- Dashboard Summary
- Global Exception Handling
- Request Validation
- Database Migration using Flyway
- Swagger (OpenAPI) Documentation

---

## 🛠 Technology Stack

| Category | Technology |
|----------|------------|
| Language | Java 21 |
| Framework | Spring Boot 3.5 |
| Build Tool | Maven |
| Database | PostgreSQL |
| ORM | Spring Data JPA (Hibernate) |
| Security | Spring Security + JWT |
| Database Migration | Flyway |
| Validation | Jakarta Bean Validation |
| Documentation | Swagger (OpenAPI 3) |
| Utilities | Lombok |
| Version Control | Git & GitHub |

---

## 🏗 System Architecture

```
The KEYSTONE backend follows a layered architecture that separates authentication, business logic, persistence, and database access into independent layers. This architecture improves maintainability, scalability, and code organization while enabling secure communication between the frontend and backend through JWT authentication.

<p align="center">
  <img src="docs/images/System%20Architecture.png"
       alt="KEYSTONE System Architecture"
       width="900"/>
</p>

### Architecture Overview

The request flow is:

1. React Frontend sends API requests.
2. Spring Security validates every request.
3. JWT Authentication Filter authenticates the user.
4. REST Controllers receive HTTP requests.
5. Service Layer executes business logic.
6. Repository Layer interacts with PostgreSQL.
7. Flyway manages database schema migrations.

```

---

## 📂 Project Structure

```
src
├── asset
├── auth
├── common
├── config
├── customer
├── dashboard
├── dispatcher
├── security
├── site
├── technician
├── user
└── workorder
```

---

## 🗄 Database

The database schema is managed using Flyway.

Migration Files:

- V1 – Users
- V2 – Customers
- V3 – Sites
- V4 – Technicians
- V5 – Work Orders
- V6 – Assets

---

## 🔐 Authentication

JWT Authentication is used for securing protected APIs.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

Public APIs:

- Register
- Login
- Swagger UI
- Health Check

---

## 📚 API Modules

| Module | Endpoints |
|---------|-----------|
| Authentication | Register, Login |
| Customers | Create, Read, Update, Delete |
| Sites | Create, Read, Update, Delete |
| Technicians | Create, Read, Update, Delete |
| Work Orders | Create, Read, Update, Delete |
| Assets | Create, Read, Update, Delete |
| Dashboard | Summary Statistics |

---

## 📖 API Documentation

Swagger UI

```
http://localhost:8080/api/swagger-ui/index.html
```

OpenAPI Specification

```
http://localhost:8080/api/v3/api-docs
```

---

## 🚀 Getting Started

### Prerequisites

- Java 21
- Maven
- PostgreSQL
- Git

### Clone Repository

```bash
git clone <repository-url>
cd keystone-backend
```

### Configure Database

Update the datasource configuration in:

```
src/main/resources/application.yml
```

### Build

```bash
mvnw.cmd clean install
```

### Run

```bash
mvnw.cmd spring-boot:run
```

Application URL

```
http://localhost:8080/api
```

---

## 🧪 Testing

The backend APIs were tested using:

- Swagger UI
- Postman

Verified functionality includes:

- CRUD Operations
- JWT Authentication
- Validation
- Exception Handling
- Dashboard APIs
- Database Persistence

---

## 🔮 Future Enhancements

- Role-Based Access Control (RBAC)
- Email Notifications
- File Attachments
- Technician GPS Tracking
- Inventory Management
- Reports & Analytics
- Docker Support
- CI/CD Pipeline

---

## 👥 Project Contributions

| Component | Contributor |
|-----------|-------------|
| Backend API Development | **Pallavi V** |
| Database Design & Flyway Migrations | **Pallavi V** |
| Authentication & Security | **Pallavi V** |
| REST API Testing | **Pallavi V** |
| API Documentation (Swagger) | **Pallavi V** |
| Frontend Application | **Santhosh** |

---

## 👩‍💻 Developer

**Pallavi V**

Master of Computer Applications (MCA)

The Oxford College of Engineering

Developed as part of the **Zidio Development Java Full Stack Internship**.

---

## 📄 License

This project was developed for educational and internship purposes.

---

## ⭐ Project Status

| Module | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Customer Module | ✅ Complete |
| Site Module | ✅ Complete |
| Technician Module | ✅ Complete |
| Work Order Module | ✅ Complete |
| Asset Module | ✅ Complete |
| Dashboard | ✅ Complete |
| Swagger Documentation | ✅ Complete |
| Flyway Migrations | ✅ Complete |
| PostgreSQL Integration | ✅ Complete |

---

<p align="center">

**Thank you for visiting the KEYSTONE Field Service Management Platform repository.**

</p>