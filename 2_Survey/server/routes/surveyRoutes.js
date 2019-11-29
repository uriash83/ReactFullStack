const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer');
const surveyTemlate = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('api/surveys/thanks',(req,res)=> {
        res.send('Thanks for voting')
    });

    app.post('/api/surveys/webhooks',(req,res) => {
        console.log(req.body)
        res.send({'asdf': 'asdf'})
    });

    app.post('/api/surveys',requireLogin,requireCredits, async (req,res) => {
        const { title , subject , body , recipients } = req.body;
        console.log(req.body)
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ( {email: email.trim()})), // return { email: email}
            _user: req.user.id,
            dateSent: Date.now()
        })

        //send emial
        const mailer = new Mailer(survey,surveyTemlate(survey));
        try{
            await mailer.send(); // wyłanie maila
            await survey.save(); // zapis survey w mongodb
            req.user.credits -= 1; 
            const user = await req.user.save(); //zapis usera i jego credytów
            res.send(user);
        } catch (err) {
            res.status(422).send(err)
        }
        



    });
};