// Controller
'use strict';
import {getUser, users} from '../models/userModel';

const user_list_get = (req, res) => {
  res.json(users);
};

const user_get = (req, res) => {
    const userId = req.params.id;
    const user = getUser(userId);
    res.json(user.length > 0 ? user.pop() : {});
  };

  const user_post = (req, res) => {
    console.log('BODY', req.body);
    res.json(req.body);
  };

export {
  user_list_get,
  user_get,
  user_post,
};