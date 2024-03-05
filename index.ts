import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import formsRouter from './src/routes/forms';
import notFoundRouter from './src/routes/notFound';
import auth from './src/middlewares/auth';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/', auth, formsRouter);
app.use('*', notFoundRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
