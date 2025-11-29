import express from 'express';
import path from 'path';

import cors from 'cors';
import rootRouter from './routes/rootRoutes.js';
import { fileURLToPath } from 'url';

const app = express()
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  "origin": "*"
,  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204}));

app.use(express.json());
app.use("/api", rootRouter)
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/{*path}', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

// import bcrypt from 'bcrypt';
// const hash = await bcrypt.hash('sachin123', 10);
// console.log(hash);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});