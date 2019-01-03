const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    name: String,
    answer: String,
    categoryId: String
});

module.exports = mongoose.model('Question', questionSchema);