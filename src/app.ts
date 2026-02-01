
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import nutritionRoutes from './routes/nutrition.routes';
import { errorHandler } from './middlewares/error.middleware';
import healthRoutes from './routes/health.routes';




const app = express();
app.use('/api', healthRoutes);
app.use(errorHandler);

app.use(cors());
app.use(express.json());

app.use('/api/nutrition', nutritionRoutes);

export default app;