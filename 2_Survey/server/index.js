const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');



mongoose.connect(keys.mongoURI)

const app = express();
app.use(bodyParser.json()); // post request z defaut nie obsługuje req.body
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session())
require('./routes/authRoutes')(app) // require return fnction then we call this fnc with app
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)



const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log('Listening on port: ' + PORT))

// cliend ID 
// client secret 934256346222-j53mjdu2t33h7ji328fdkvgrl7b6cgbr.apps.googleusercontent.com