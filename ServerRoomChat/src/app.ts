import express from 'express';
import indexRoute from './routes/index.route';
import cors from "cors";

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));
app.use(express.json());
app.use('/api', indexRoute);

export default app;
