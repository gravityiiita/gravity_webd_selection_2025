# Akshat Parmar-IIT2024077

# Todo API

A RESTful API for managing todo tasks using Node.js, Express, and MongoDB.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```env
   ATLAS_URL=your_mongodb_connection_string
   PORT=3000
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Endpoints
- **POST** `/api/todos` - Add a new todo
- **GET** `/api/todos` - List all todos (supports `limit`, `page`)
- **GET** `/api/todos/:id` - Get todo by ID
- **PUT** `/api/todos/:id` - Update todo
- **DELETE** `/api/todos/:id` - Delete todo
- **PATCH** `/api/todos/:id/complete` - Mark todo as completed

## Todo Model
- `id` (Number, unique, required)
- `title` (String, required)
- `description` (String)
- `completed` (Boolean, default: false)
- `priority` (String)

---

