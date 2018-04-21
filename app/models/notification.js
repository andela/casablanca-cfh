import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
  url: String,
  sender: String,
  receiver: String,
  message: String,
  read_at: { type: Date },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
