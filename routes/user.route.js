import {Router} from 'express';
import {getUser, getUsers} from '../controllers/user.controller.js';
import authorize from '../middleware/auth.middleware.js';

const userRoute = Router();

userRoute.get('/', getUsers);
userRoute.get('/:id', authorize, getUser);
userRoute.post('/', (req, res) => res.send({title : 'CREATE new user'}));
userRoute.put('/:id', (req, res) => res.send({title : 'UPDATE user data'}));
userRoute.delete('/:id', (req, res) => res.send({title : 'DELETE user data'}));

export default userRoute;
