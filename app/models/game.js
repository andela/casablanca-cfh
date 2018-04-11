import mongoose from 'mongoose';

const { Schema } = mongoose;

const gameSchema = new Schema({
  gameID: Number,
  czar: String,
  userID: String,
  players: [],
  round: Number,
  winner: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);