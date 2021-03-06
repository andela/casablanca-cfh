/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose';

/**
 * Question Schema
 */
const QuestionSchema = new Schema({
  id: {
    type: Number
  },
  text: {
    type: String,
    default: '',
    trim: true
  },
  numAnswers: {
    type: Number
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
QuestionSchema.statics = {
  load: (id, cb) => {
    this.findOne({
      id,
    }).select('-_id').exec(cb);
  }
};

module.exports = mongoose.model('Question', QuestionSchema);
