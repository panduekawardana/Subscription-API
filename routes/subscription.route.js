import {Router} from 'express';

const subscriptionRoute = Router();
subscriptionRoute.get('/', (req, res) => res.send({title : 'GET all subscriptions'}));
subscriptionRoute.get('/:id', (req, res) => res.send({title : 'GET subscriptions details'}));
subscriptionRoute.post('/', (req, res) => res.send({title : 'CREATE new subscriptions'}));
subscriptionRoute.put('/:id', (req, res) => res.send({title : 'EDIT subscriptions details'}));
subscriptionRoute.delete('/:id', (req, res) => res.send({title : 'DELETE subscriptions'}));
subscriptionRoute.get('/user/:id', (req, res) => res.send({title : 'GET all users subscriptions'}));
subscriptionRoute.put('/:id/cancel', (req, res) => res.send({title : 'CANCEL subscriptions'}));
subscriptionRoute.get('/:id/upcoming-renewals', (req, res) => res.send({title : 'GET upcoming renewals'}));

export default subscriptionRoute;