import express from 'express';

import { PORT } from './config/env.js'
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import subscriptionRoute from './routes/subscription.route.js';
import connectionDatabase from './database/postgresql.js';

const app = express();
// /api/v1/users

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/subscription', subscriptionRoute);

app.get('/', (req, res) => {
   res.send('Hello express');
});

app.listen(PORT, async () => {
   console.log(`Server started on port http://localhost:${PORT}`);
   await connectionDatabase();
});