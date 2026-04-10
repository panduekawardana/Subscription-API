import {Router} from 'express';

const authRoute = Router();

authRoute.post('/sign-up', (req, res) => res.send('Sign Up'));

export default authRoute;