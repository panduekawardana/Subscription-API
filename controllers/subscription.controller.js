import {query} from '../database/postgresql.js';

/**
 * Method POST
 * CREATE NEW SUBSCRIPTION
 * */
export const createSubscription = async(req, res, next) => {
    try{
        const {name, price, currency, category, startDate, renewalDate} = req.body;
        const userId = req.user.id;
        const normalizedCategory = category ? category.toLowerCase() : 'entertainment';

        const subscriptionResult = await query(
            `
            INSERT INTO subscriptions (name, price, currency, category, start_date, renewal_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
            `,
            [name, price, currency, normalizedCategory, startDate, renewalDate, userId]
        );

        res.status(201).json({
            success: true,
            message: 'Subscription created successfuly',
            data: subscriptionResult.rows[0]
        });
    } catch(error) {
        next(error);
    }
}

/**
 * Method GET
 * GET ALL SUBSCRIPTION
 * */
export const getSubscriptions = async(req, res, next) => {
    try{
        const subscriptionResult = await query(
            `SELECT * FROM subscriptions ORDER BY created_at DESC`
        );

        const subscriptionResultRow = subscriptionResult.rows.map(s => ({
            id: s.id,
            data: {
                user: {
                    user_id: s.user_id
                },
                name: s.name,
                price: s.price,
                currency: s.currency,
                category: s.category,
                startDate: s.start_date,
                renewalDate: s.renewal_date,
            }
        }))

        res.status(200).json({
            success: true,
            data: subscriptionResultRow
        })
    } catch(error) {
        next(error);
    }
}

/**
 * Method GET
 * GET SUBSCRIPTION BY ID
 * */
export const getSubscription = async(req, res, next) => {
    try {
        const {id} = req.params;
        const subscriptionResult = await query(
            `SELECT * FROM subscriptions WHERE id = $1 LIMIT 1`,[id]
        )
        if(subscriptionResult.rowCount === 0 ){
            const error = new Error('No subscription found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: subscriptionResult.rows[0]
        })
    } catch(error) {
        next(error)
    }
}

/**
 * method GET
 * GET USERS SUBSCRIPTION
*/

export const getUserSubscription = async(req, res, next) => {
    try {
        const {id} = req.params;

        // --- DEBUGGING ---
        console.log("ID dari Token JWT (req.user.id) :", req.user.id);
        console.log("ID dari URL Postman (req.params.id) :", id);
        // -----------------

        if(req.user.id !== id){
            const error = new Error('You are not authorize to view these subscriptions');
            error.statusCode = 403;
            throw error;
        }
        const userSubscription = await query(
            `SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC`, [id]
        )
        const formatSubscriptions = userSubscription.rows.map(s => ({
            id: s.id,
            data: {
                name: s.name,
                price: s.price,
                currency: s.currency,
                category: s.category,
                startDate: s.start_date,
                renewalDate: s.renewal_date
            }
        }));

        res.status(200).json({success: true, data: formatSubscriptions})
    } catch(error) {
        next(error)
    }
}

/**
 * Method PUT
 * UPDATED SUBSCRIPTION
 * */
export const updateSubscription = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {name, price, currency, category, startDate, renewalDate} = req.body;
        const normalizedCategory = category ? category.toLowerCase() : 'entertainment';
        
        const subscription = await query(
            `
            UPDATE subscriptions SET name = $1, price = $2, currency = $3, category = $4, start_date = $5, renewal_date = $6, updated_at = NOW() WHERE id = $7 RETURNING *
            `,
            [name, price, currency, normalizedCategory, startDate, renewalDate, id]
        )

        if(subscription.rowCount === 0) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        } 

        res.status(200).json({
            success: true,
            message: 'Subscription successfuly updated',
            data: subscription.rows[0]
        })

    } catch(error) {
        next(error);
    }
}

/**
 * Method DETELE
 * DELETE SUBSCRIPTION
 * */
export const deleteSubscription = async(req, res, next) => {
    try {
        const {id} = req.params;
        const deleteResult = await query(
            'DELETE FROM subscriptions WHERE id  = $1 RETURNING id', [id]
        );

        if(deleteResult.rowCount === 0) {
            const error = new Error('Error delete subscription');
            error.statusCode = 404;
            throw error;
        };

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfuly'
        })
    }catch(error){
        next(error)
    }
}