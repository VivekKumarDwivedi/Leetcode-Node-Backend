# Evaluation Service

A microservice for evaluating code submissions in a LeetCode-style platform. This service handles code execution, test case validation, and result processing using Docker containers.

## Features

- **Code Execution**: Runs Python and C++ code in isolated Docker containers
- **Test Case Evaluation**: Validates code output against expected test cases
- **Job Queue**: Uses BullMQ with Redis for asynchronous job processing
- **Microservice Architecture**: Integrates with Problem and Submission services
- **Comprehensive Logging**: Winston-based structured logging with rotation
- **Container Management**: Automatic Docker image pulling and management

## Tech Stack

- **Node.js** with TypeScript
- **Express.js** for REST API
- **BullMQ** for job queue management
- **Redis** for job queue storage
- **Docker** for code execution isolation
- **Winston** for logging
- **Zod** for schema validation

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Redis server
- Access to Docker Hub (for pulling language images)

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3003
PROBLEM_SERVICE=http://localhost:3000/api/v1
SUBMISSION_SERVICE=http://localhost:3001/api/v1
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/VivekKumarDwivedi/Leetcode-Node-Backend.git
cd Leetcode-Node-Backend/EvaluationService
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Usage

### Development

Start the service in development mode:
```bash
npm run dev
```

### Production

Build and start the service:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/v1/ping` - Service health status

## Architecture

### Job Processing Flow

1. **Job Creation**: Submissions are added to the Redis queue
2. **Worker Processing**: Evaluation workers pick up jobs asynchronously
3. **Code Execution**: Code runs in Docker containers with specified timeouts
4. **Result Validation**: Output is compared against expected test cases
5. **Status Update**: Results are sent back to the Submission Service

### Supported Languages

- **Python**: Uses official Python Docker image
- **C++**: Uses GCC-based Docker image

### Evaluation Results

- **AC**: Accepted - Output matches expected result
- **WA**: Wrong Answer - Output doesn't match
- **TLE**: Time Limit Exceeded - Execution took too long
- **Error**: Runtime error during execution

## Docker Images

The service automatically pulls required Docker images on startup:
- Python runtime image
- C++ GCC runtime image

## Logging

Logs are structured and include:
- Request correlation IDs
- Job processing status
- Error details and stack traces
- Performance metrics

Logs rotate daily and are retained for 14 days by default.

## Development Notes

- The service runs on port 3003 by default
- Workers start automatically when the server boots
- Docker images are pulled on first run
- All code execution is sandboxed for security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License
