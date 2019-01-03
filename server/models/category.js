const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    questions: []
});

module.exports = mongoose.model('Category', categorySchema);