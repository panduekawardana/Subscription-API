import express from 'express';

import { PORT } from './config/env.js'
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import subscriptionRoute from './routes/subscription.route.js';
import connectionDatabase from './database/postgresql.js';
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// /api/v1/users

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/subscriptions', subscriptionRoute);
app.use(errorMiddleware)

app.get('/', (req, res) => {
   res.send('Hello express');
});

app.listen(PORT, async () => {
   console.log(`Server started on port http://localhost:${PORT}`);
   await connectionDatabase();
});