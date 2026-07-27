# Keystone Field Service Management

A modern full-stack field service management platform designed to streamline operations for service teams, dispatchers, and administrators. This repository contains the frontend application for Keystone, with the backend and database services planned for integration by the backend team.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-6.x-007FFF?logo=mui&logoColor=white)

## Overview

Keystone Field Service Management is a web-based solution for managing field operations efficiently. It provides role-based access for administrators, dispatchers, managers, and service users, enabling smooth coordination across customers, sites, work orders, and analytics.

## Key Features

- Dashboard with operational insights
- Customer management
- Site management
- Work order tracking
- Dispatcher workflow support
- Analytics and reporting views
- Profile and settings management
- Secure role-based navigation

## Tech Stack

- Frontend: React, TypeScript, Vite
- UI Library: Material UI
- Routing: React Router DOM
- Charts: Recharts
- State & Forms: Context API, React Hook Form, Yup
- HTTP Client: Axios

## Project Structure

```text
frontend/
  src/
    components/
    context/
    pages/
    services/
    styles/
    theme/
    types/
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at the local Vite URL shown in the terminal.

### Build for Production

```bash
npm run build
```

## Environment Configuration

Create an environment file if your backend API is hosted separately:

```bash
cp .env.example .env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Backend Integration Note

This repository currently contains the frontend interface. The backend APIs and database services will be integrated by the backend team and connected through the configured API base URL.

## Contribution Guidelines

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch and open a pull request

## License

This project is licensed under the MIT License.

## Team

Developed as part of the Zidio Java Full-Stack Internship project.
