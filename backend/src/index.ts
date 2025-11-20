import express from 'express';
import type { Request, Response } from 'express';

import cors from 'cors';
import rootRouter from './routes/rootRoutes.js';

const app = express()
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
import bcrypt from 'bcrypt';
// Replace 'your_password' with what you want to use
const hash = await bcrypt.hash('sachin123', 10);
console.log(hash);
app.use("/api", rootRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});