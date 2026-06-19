import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import authRoutes from './routes/auth.routes.js';
import noteRoutes from './routes/note.routes.js';
import { errorHandler } from "./middleware/error.middleware.js";

app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});