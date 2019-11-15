const passport = require('passport')
const util = require('util');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//const user = require('../models/User')
const keys = require('../config/keys')


const User = mongoose.model('users')

passport.serializeUser((user,done)=> {
    done(null,user.id) // this is in record id in mongoose bo w 1 rekordzie może byuć kilka id i logować sie przez google , linkedina itd

});

passport.deserializeUser((id,done)=>{
    // id to jest to z id recordu mongoose
    User.findById(id)
        .then(user => done(null,user) )
});


passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' // if we get resposne from google , google send callback to this URL
        //proxy: true
    }, 
        async (accessToken, refreshToken, profile,done)=> {
        //accesToken expired after some time
        //console.log('accessToken: ' +accessToken)
        //console.log('refreshToken: ' + refreshToken)
        //console.log('profile' + util.inspect(profile, {depth: null}))
        const existingUser = await User.findOne({ googleId: profile.id })
            
                if(existingUser){
                    // id user exist 
                    done(null,existingUser);
                    //done(noerror,przekazanie do passport usera)
                    
                }
                
                // if user not exist create one
                const user = await new User({googleId: profile.id }).save()
                done(null,user) 
        
        }
));