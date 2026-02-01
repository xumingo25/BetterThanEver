import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import nutritionRoutes from './routes/nutrition.routes';
import healthRoutes from './routes/health.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Health primero (keep-alive Render)
app.use('/api', healthRoutes);

// 🔹 Rutas reales
app.use('/api/nutrition', nutritionRoutes);

// 🔹 Error handler siempre al final
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
