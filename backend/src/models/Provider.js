import mongoose from 'mongoose';
const { Schema } = mongoose; 

const ProviderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      }, 
}, { timestamps: true });

module.exports = mongoose.model('Provider', ProviderSchema);  