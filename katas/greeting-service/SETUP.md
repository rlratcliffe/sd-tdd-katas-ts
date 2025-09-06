# Greeting Service Setup Guide

## Quick Start with Docker

### 1. Start PostgreSQL Database
```bash
# Start just the database
docker-compose up -d postgres

# Or start with pgAdmin for database management
docker-compose --profile admin up -d
```

### 2. Install Dependencies and Start the Service
```bash
# Install Node.js dependencies
npm install

# Start the development server (will connect to Docker PostgreSQL)
npm run dev
```

### 3. Test the Service
```bash
# Basic greeting
curl "http://localhost:3000/api/greeting"

# Personalized greeting
curl "http://localhost:3000/api/greeting?name=Joe"

# Time-based greeting with quote
curl "http://localhost:3000/api/greeting?name=Joe&timeBasedGreeting=true&withQuote=true"
```

## Database Management

### Using pgAdmin (Optional)
If you started with the `--profile admin` flag:
- Open http://localhost:8080
- Login: `admin@greeting.local` / `admin`
- Add server: `postgres:5432`, user: `postgres`, password: `postgres`

### Direct Database Access
```bash
# Connect to PostgreSQL directly
docker-compose exec postgres psql -U postgres -d greeting_service

# View tables
\dt

# Check a user table
SELECT * FROM users LIMIT 5;
```

## API Endpoints

### Basic Features (Work without database)
- `GET /api/greeting` - Basic greeting
- `GET /api/greeting?name={name}` - Personalized greeting
- `GET /api/greeting?name={name}&timeBasedGreeting=true` - Time-based greeting
- `GET /api/greeting?name={name}&withQuote=true` - Greeting with inspirational quote

### Database Features (Require PostgreSQL)
- `POST /api/users` - Create new user
- `GET /api/users/{id}/preferences` - Get user preferences
- `PUT /api/users/{id}/preferences` - Update user preferences
- `GET /api/greeting/{user_id}` - Personalized greeting using saved preferences
- `GET /api/users/{id}/greeting-history` - Get greeting history
- `POST /api/users/{id}/favorite-quotes` - Add favorite quote

## Environment Configuration

Copy `.env.example` to `.env` and modify as needed:
```bash
cp .env.example .env
```

The default configuration works with the Docker setup.

## Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

## Troubleshooting

### Service won't start
- Make sure PostgreSQL is running: `docker-compose ps`
- Check logs: `docker-compose logs postgres`
- Test connection: `docker-compose exec postgres pg_isready -U postgres`

### Reset database
```bash
docker-compose down -v
docker-compose up -d postgres
```

### Run without database
```bash
SKIP_DB_INIT=true npm run dev
```