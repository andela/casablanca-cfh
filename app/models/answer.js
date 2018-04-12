/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose';

/**
 * Answer Schema
 */
const AnswerSchema = new Schema({
  id: {
    type: Number
  },
  text: {
    type: String,
    default: '',
    trim: true
  },
  official: {
    type: Boolean
  },
  expansion: {
    type: String,
    default: '',
    trim: true
  },
  regionId: {
    type: String
  }
});

/**
 * Statics
 */
AnswerSchema.statics = {
  load: (id, cb) => {
    this.findOne({
      id,
    }).select('-_id').exec(cb);
  }
};

module.exports = mongoose.model('Answer', AnswerSchema);
