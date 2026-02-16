# Honeymoon Skincare

A fullstack MERN application for managing Honeymoon skincare products, a natural soap made with honey, cinnamon, and oats.

## Features

- User authentication with JWT and RBAC (Admin, Seller, Customer, Guest)
- Product management
- Order placement and management
- PDF export for orders
- Form validation with draft saving
- Animations and responsive design
- Color palette: light browns, oranges, yellows

## Tech Stack

- Frontend: React, React Router, Styled Components, Framer Motion, React Hook Form, Yup
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt
- Containerization: Docker, Docker Compose

## Setup

1. Ensure Docker and Docker Compose are installed.
2. Clone the repository.
3. Run `docker-compose up --build` to start the application.
4. Access the client at http://localhost:3000
5. Access the server at http://localhost:5000

## Wireframes and Mockups

Due to the nature of this environment, wireframes and mockups are described below instead of being created in Figma.

### Screens

1. **Login Page**: Form with email and password fields, login button, link to register.
2. **Register Page**: Form with name, email, password fields, register button.
3. **Dashboard**: Welcome message, navigation links to products, orders, purchase, admin.
4. **Products Page**: Grid of product cards showing name, description, price.
5. **Purchase Page**: Form to select product and quantity, purchase button.
6. **Orders Page**: List of user orders with status and PDF export button.
7. **Admin Panel**: Placeholder for admin functionalities.

All screens feature animations on load and interactions, using the defined color palette.

## API Endpoints

- POST /api/auth/login
- POST /api/auth/register
- GET /api/products
- POST /api/products (admin/seller)
- PUT /api/products/:id (admin/seller)
- DELETE /api/products/:id (admin)
- GET /api/orders
- POST /api/orders
- PUT /api/orders/:id/status (admin/seller)
- GET /api/orders/:id/pdf
- GET /api/users (admin)
- PUT /api/users/:id/role (admin)