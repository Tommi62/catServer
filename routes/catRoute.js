'use strict';
import express from 'express';
import { cat_delete, cat_get, cat_list_get, cat_post, cat_put } from '../controllers/catController';
import multer from 'multer'; 

const router = express.Router();
const upload = multer({ dest: './uploads/' })

router.get('/', cat_list_get);
  
router.get('/:id', cat_get);
  
router.post('/', upload.single('cat'), cat_post);
  
router.put('/:id', cat_put);
  
router.delete('/:id', cat_delete);


export default router;
