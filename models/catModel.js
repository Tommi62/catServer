'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

const catSchema = new Schema({
  name:{type: String, minlength: [2, 'Sorry your cat cannot be called Z']},
  birthdate: {type: Date, max: [Date.now, 'Cat from the future?']},
  gender: {
    type: String, 
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported'
    }
  },
  color: {type: String}, 
  filename: String,
  weight: {
    type: Number,
    min: [0, 'This cat does not weight anything?'],
    max: [20, 'That is too much weight!'],
    } 
});


export default mongoose.model('Cat', catSchema);
