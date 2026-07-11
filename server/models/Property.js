const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ['house', 'land'], required: true },
  type: { type: String, enum: ['rent', 'sell'], required: true },
  bhk: { type: Number },
  area: { type: Number, required: true },
  images: [{ type: String }],
  phone: { type: String, required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

PropertySchema.pre('save', function () {
  if (!this.projectId) {
    this.projectId = 'PR' + Math.floor(100000 + Math.random() * 900000);
  }
});

module.exports = mongoose.model('Property', PropertySchema);