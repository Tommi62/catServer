'use strict';
import jwt from 'jsonwebtoken';
import passport from '../utils/pass';

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', { session: false },
    (err, user, info) => {
      console.log('Login', err, user, info);
      if(err || !user) {
          res.status(400).send('');
          return;
      }
      req.login(user, {session: false}, (err) => {
        if(err) {
            res.status(400).send('');
            return;
        }
        const token = jwt.sign(req.user, 'jfyytrdRdrDfkhÖIH645DfVW1200');
        res.json({message: 'Welcome', user: req.user, token});
      });
    })(req, res);
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'Logout'});
}

export { login, logout };
