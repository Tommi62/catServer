'use strict';
import passport from 'passport';
import Strategy from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import { getUserLogin } from '../models/userModel';
   
/*
// serialize: store user id in session 
passport.serializeUser((user, done) => {
    console.log('serialize', user);
    // serialize user id by adding it to 'done()' callback
    done(null, user);
});
   
// deserialize: get user id from session and get all user data
passport.deserializeUser(async (user, done) => {
    // get user data by id from userModel/getUser
    console.log('deserialize', user);
    // deserialize user by adding it to 'done()' callback
    done(null, user);
});
*/
   
passport.use(new Strategy(
    (username, password, done) => {
        // get user by username (in this case email) from userModel/getUserLogin
        const user = getUserLogin(username);
        // if user is undefined
        if(!user) {
            return done(null, false);
        }
        // if passwords dont match
         if(password !== user.password) {
            return done(null, false);
         }
         // if all is ok
         delete user.password;
         return done(null, user);
       }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jfyytrdRdrDfkhÖIH645DfVW1200',
}, (payload, done)=>{
    console.log('jwt payload', payload);
    done(null, payload);
}))
   
export default passport;
