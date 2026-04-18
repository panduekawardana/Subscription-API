import {Router} from 'express';
import {getUser, getUsers} from '../controllers/user.controller.js';
import authorize from '../middleware/auth.middleware.js';
import arcjetMiddleware from '../middleware/arcjet.midlleware.js';

const userRoute = Router();

userRoute.get('/', arcjetMiddleware, getUsers);
userRoute.get('/:id', authorize, arcjetMiddleware, getUser);
userRoute.post('/', (req, res) => res.send({title : 'CREATE new user'}));
userRoute.put('/:id', (req, res) => res.send({title : 'UPDATE user data'}));
userRoute.delete('/:id', (req, res) => res.send({title : 'DELETE user data'}));

export default userRoute;
