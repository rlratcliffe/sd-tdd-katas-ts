import express from 'express';
import { greetingRoutes } from './routes/greeting';
import { userRoutes } from './routes/users';
import { personalizedGreetingRoutes } from './routes/personalizedGreeting';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', greetingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/greeting', personalizedGreetingRoutes);

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Greeting service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;