'use strict';
import express from 'express';
import cors from 'cors';
import catRoute from './routes/catRoute';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import passport from './utils/pass';
import db from './utils/db';
//import session from 'express-session';

const app = express();
const port = process.env.PORT || 3000;

/*
app.use(session({
  secret: 'jscdjkbdscbsdjcsdjkHHGJG7867HGFGUIOUOdeoöjV',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
*/

app.use(passport.initialize());
//app.use(passport.session());

/*
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({message: 'Hell no!'});
  }
};
*/

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
  }

app.use(cors(corsOptions));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/auth', authRoute)
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

db.on('connected', () => {
  app.listen(port, () => { console.log(`app listen on port ${port}`); });
});

