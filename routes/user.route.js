import {Router} from 'express';

const userRoute = Router();

userRoute.get('/', (req, res) => res.send({title : 'GET all users'}));
userRoute.get('/:id', (req, res) => res.send({title : 'GET user details'}));
userRoute.post('/', (req, res) => res.send({title : 'CREATE new user'}));
userRoute.put('/:id', (req, res) => res.send({title : 'UPDATE user data'}));
userRoute.delete('/:id', (req, res) => res.send({title : 'DELETE user data'}));

export default userRoute;