const mongoose = require('mongoose');
const MernSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    deault: 'Incomplete',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('mern', MernSchema);
