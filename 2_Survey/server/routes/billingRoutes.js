const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => { // middleware może być dużo ale na koću i tak musi być (req,res)
    app.post('/api/stripe', requireLogin , async (req,res) => {
        //console.log(req);
        if(!req.user){
            return res.status(401).send({ error: 'You must log in'})
        }
        const charge = await stripe.charges.create({
            amount: 1000, // po stronie frontu wysyłamy wniosek o 1000 i tutaj to potwierdzamy  
            currency: 'usd',
            description: '5$ for 5 credits',
            source: req.body.id  
        });

        req.user.credits += 10; // req.user to jest user model  z mongoo
        const user = await req.user.save();
        res.send(user)
    });
}