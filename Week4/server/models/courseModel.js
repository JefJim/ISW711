const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true }, 
  code: { type: String, required: true, unique: true }, 
  description: { type: String, required: true }, 
  teacher: { type: Schema.Types.ObjectId, ref: 'teachers', required: true } 
});

module.exports = mongoose.model('courses', courseSchema);