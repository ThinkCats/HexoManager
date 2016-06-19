import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('Guide',new Schema({
    status: Boolean,
    step : Number
}));