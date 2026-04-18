import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { 
    createSubscription,
    deleteSubscription,
    getSubscription,
    getSubscriptions,
    getUserSubscription,
    updateSubscription
} from '../controllers/subscription.controller.js';
import { getUser } from '../controllers/user.controller.js';

const subscriptionRoute = Router();

subscriptionRoute.get('/', authorize, getSubscriptions);

subscriptionRoute.get('/:id', authorize, getSubscription);

subscriptionRoute.post('/', authorize, createSubscription);

subscriptionRoute.put('/:id', authorize, updateSubscription);

subscriptionRoute.delete('/:id', authorize, deleteSubscription);

subscriptionRoute.get('/user/:id', authorize, getUserSubscription);

subscriptionRoute.put('/:id/cancel', (req, res) => res.send({title : 'CANCEL subscriptions'}));

subscriptionRoute.get('/:id/upcoming-renewals', (req, res) => res.send({title : 'GET upcoming renewals'}));

export default subscriptionRoute;