import express from 'express';
import { greetingRoutes } from './routes/greeting';
import { userRoutes } from './routes/users';
import { personalizedGreetingRoutes } from './routes/personalizedGreeting';
import { initDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', greetingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/greeting', personalizedGreetingRoutes);

async function startServer() {
  try {
    if (process.env.SKIP_DB_INIT !== 'true') {
      await initDatabase();
      console.log('Database connection established');
    } else {
      console.log('Database initialization skipped (SKIP_DB_INIT=true)');
    }
    
    app.listen(PORT, () => {
      console.log(`Greeting service running on port ${PORT}`);
      if (process.env.SKIP_DB_INIT === 'true') {
        console.log('WARNING: Database features disabled. Basic greeting endpoints only.');
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    if (process.env.SKIP_DB_INIT !== 'true') {
      console.log('TIP: Set SKIP_DB_INIT=true to run without database for basic features');
    }
    process.exit(1);
  }
}

startServer();

export default app;