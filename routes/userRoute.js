'use strict';
import express from 'express';
import { user_get, user_list_get, user_post } from '../controllers/userController';
const router = express.Router();

router.get('/', user_list_get);
  
router.get('/:id', user_get);
  
router.post('/', user_post);
  
router.put('/', (req, res) => {
    res.send('From this endpoint you can edit user.')
});
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete users.')
});


export default router;