const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ClientSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    providers: [{
      type: Schema.Types.ObjectId, 
      ref: 'Provider'
    }]   
  }, { timestamps: true });

  module.exports = mongoose.model('Client', ClientSchema);  