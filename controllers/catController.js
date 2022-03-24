// Controller
'use strict';
import Cat from '../models/catModel';

const cat_list_get = async (req, res) => {
  const query = req.query;

  if (query.hasOwnProperty('weight') && query.hasOwnProperty('gender')){
    query['weight'] = parseInt(query.weight);
     return res.json(await Cat.find({ gender: query.gender, weight: { $gte: query.weight } }));
  }

  if (query.hasOwnProperty('weight')){
    query['weight'] = parseInt(query.weight);
    return res.json(await Cat.find({ weight: { $gte: query.weight } }));
  }

  if (query.hasOwnProperty('gender')){
    return res.json(await Cat.find({ gender: query.gender }));
  }

  return res.json(await Cat.find());
};

const cat_get = async (req, res) => {
    const catId = req.params.id;
    res.json(await Cat.findById(catId));
  };

const cat_post = async (req, res) => {
  const newCat = req.body;
  newCat.filename = req.file.filename;
  try {
    await Cat.create(newCat);
    res.json(newCat);
  } catch (error) {
    console.log(error.message);
    res.json();
  }
};

const cat_put = async (req, res) => {
  const {name, weight, color} = req.body;
  const {id} = req.params;
  try {
    const mod = await Cat.updateOne({ _id: id }, { name, weight, color });
    res.status(200).send(`Updated sucessfully ${mod.modifiedCount} cat`);
  } catch (error) {
    console.log(error.message);
    res.json();
  }
};

const cat_delete = async (req, res) => {
  const {id} = req.params;
  try {
    const del = await Cat.deleteOne({ _id: id });
    res.send(`Deleted ${del.deletedCount} cat`);

  } catch (error) {
    console.log(error.message);
    res.json();
  }
};

export {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
  cat_delete,
};

