# Akshat Parmar-IIT2024077

# Task 3 Auth Backend

A simple authentication backend using Node.js, Express, and MongoDB.

## Endpoints
- **POST /api/signup**: Register a user.
- **POST /api/login**: Login and start a session.
- **POST /api/logout**: Logout and clear session.
- **GET /api/profile**: Retrieve user profile (requires session).

## Setup
1. Install dependencies: `npm install`
2. Configure `.env` with `ATLAS_URL` and `PORT`
3. Start the server: `npm start`