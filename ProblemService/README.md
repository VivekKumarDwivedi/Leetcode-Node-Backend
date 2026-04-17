# Problem Service

A RESTful API service for managing coding problems in a LeetCode-style platform. Built with Express.js, TypeScript, and MongoDB.

## Features

- **Problem Management**: Create, read, update, and delete coding problems
- **Search & Filter**: Search problems by title and filter by difficulty level
- **Rich Content**: Support for problem descriptions, editorials, and test cases
- **Validation**: Comprehensive input validation using Zod schemas
- **Logging**: Structured logging with Winston and daily log rotation
- **Type Safety**: Full TypeScript implementation with strict typing

## API Endpoints

### Base URL: `/api/v1/problems`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Create a new problem |
| `GET` | `/` | Get all problems (with pagination) |
| `GET` | `/:id` | Get a specific problem by ID |
| `PUT` | `/:id` | Update a problem by ID |
| `DELETE` | `/:id` | Delete a problem by ID |
| `GET` | `/difficulty/:difficulty` | Get problems by difficulty (easy/medium/hard) |
| `GET` | `/search?q=query` | Search problems by title |

## Problem Data Model

```typescript
interface IProblem {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  editorial?: string;
  testcases: {
    input: string;
    output: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VivekKumarDwivedi/Leetcode-Node-Backend.git
   cd LeetcodeBackend/ProblemService
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Create .env file
   echo PORT=3000 >> .env
   echo MONGODB_URI=mongodb://localhost:27017/problem-service >> .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | - |

## Project Structure

```
src/
|-- config/          # Configuration files (database, logger)
|-- controllers/     # Request handlers
|-- dtos/           # Data transfer objects
|-- middlewares/     # Custom middleware
|-- models/         # MongoDB schemas
|-- repositories/   # Data access layer
|-- routers/        # API routes
|-- services/       # Business logic
|-- utils/          # Utility functions
|-- validators/     # Input validation schemas
```

## Technologies Used

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Logging**: Winston
- **Development**: Nodemon, tsx

## Example API Usage

### Create a Problem
```bash
POST /api/v1/problems
Content-Type: application/json

{
  "title": "Two Sum",
  "description": "Given an array of integers, return indices of the two numbers that add up to a target.",
  "difficulty": "easy",
  "editorial": "Use a hash map to store complement values...",
  "testcases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[0,1]"
    }
  ]
}
```

### Search Problems
```bash
GET /api/v1/problems/search?q=array
```

### Get Problems by Difficulty
```bash
GET /api/v1/problems/difficulty/easy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License
