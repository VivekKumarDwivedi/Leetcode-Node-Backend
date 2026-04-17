# Submission Service

A microservice for handling code submissions in a competitive programming platform. This service manages the complete lifecycle of code submissions including validation, queue processing, and result storage.

## Features

- **Submission Management**: Create, retrieve, update, and delete code submissions
- **Queue Processing**: Asynchronous job processing using BullMQ and Redis
- **Multi-language Support**: Support for C++, Python, Java, and JavaScript
- **Status Tracking**: Real-time submission status updates (Pending, Accepted, Wrong Answer, Time Limit Exceeded)
- **Database Integration**: MongoDB with Mongoose ODM
- **Structured Logging**: Winston-based logging with daily rotation
- **API Versioning**: Support for multiple API versions (v1, v2)

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Queue**: BullMQ with Redis
- **Logging**: Winston with daily rotate file
- **Validation**: Zod schemas
- **Language Support**: C++, Python, Java, JavaScript

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SubmissionService
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Configure the following environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/submission-service
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
```

## Running the Service

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Base URL
- `http://localhost:3000/api/v1`

### Endpoints

#### Create Submission
```http
POST /api/v1/submissions
Content-Type: application/json

{
  "problemId": "string",
  "code": "string",
  "language": "cpp|python|java|javascript"
}
```

#### Get Submission by ID
```http
GET /api/v1/submissions/:id
```

#### Get Submissions by Problem ID
```http
GET /api/v1/submissions/problem/:problemId
```

#### Delete Submission
```http
DELETE /api/v1/submissions/:id
```

#### Update Submission Status
```http
PUT /api/v1/submissions/:id/status
Content-Type: application/json

{
  "status": "pending|accepted|wrong_answer|time_limit_exceeded",
  "submissionData": {
    "output": "string"
  }
}
```

## Submission Status Values

- `pending` - Submission is queued for processing
- `accepted` - Code passed all test cases
- `wrong_answer` - Code failed test cases
- `time_limit_exceeded` - Code exceeded time limits

## Supported Languages

- `cpp` - C++
- `python` - Python
- `java` - Java
- `javascript` - JavaScript

## Architecture

The service follows a layered architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and orchestration
- **Repositories**: Data access layer
- **Models**: Database schemas and interfaces
- **Producers**: Queue job creation
- **Queues**: Job processing and management

## Error Handling

The service implements comprehensive error handling with:
- Custom error classes (BadRequestError, NotFoundError)
- Global error middleware
- Structured error responses
- Request correlation IDs for tracing

## Logging

Logs are configured with:
- Daily rotation files
- Different log levels (error, warn, info, debug)
- Structured JSON format
- Request correlation tracking

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | - |
| REDIS_URL | Redis connection string | - |
| LOG_LEVEL | Logging level | info |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
