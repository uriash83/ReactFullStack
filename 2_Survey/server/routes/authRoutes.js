const passport = require('passport')

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile','email']
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/surveys') //localhost:3000/surveys - fron
        }
        )

    app.get('/api/current_user', (req,res) => {
        res.send(req.user)
    })

    app.get('/api/logout' , (req,res) => {
        req.logout(); //kill id
        //res.send(req.user) // empty user
        res.redirect('/') // localhost:3000
    })
}
    