# To-Do List API

A RESTful API for managing tasks with user authentication built with Node.js, Express, and Prisma ORM. This API provides secure user registration, authentication, and task management functionality.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Password Security**: Bcrypt password hashing with salt rounds
- **Task Management**: Full CRUD operations for tasks
- **Task Status Tracking**: Support for PENDING, IN_PROGRESS, and COMPLETED statuses
- **Task Filtering**: Filter tasks by status
- **User-specific Tasks**: Each user can only access their own tasks
- **Database Integration**: Prisma ORM with PostgreSQL database support

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Database**: PostgreSQL (via Prisma)

## 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/nikusha1446/todo-list-api.git
   cd todo-list-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the project root:

   ```env
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5000
   ```

4. Run migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

Server will run at:  
`http://localhost:5000`

---

## 📋 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/users/register` | Register a new user | No |
| POST | `/api/v1/users/login` | Login user and get JWT token | No |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/tasks` | Get all user tasks | Yes |
| GET | `/api/v1/tasks?status=PENDING` | Get tasks filtered by status | Yes |
| GET | `/api/v1/tasks/:id` | Get specific task by ID | Yes |
| POST | `/api/v1/tasks` | Create a new task | Yes |
| PUT | `/api/v1/tasks/:id` | Update task (title, description, status) | Yes |
| DELETE | `/api/v1/tasks/:id` | Delete a task | Yes |
