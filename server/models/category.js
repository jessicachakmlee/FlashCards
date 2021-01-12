const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    questions: []
});

const CategoryS = mongoose.model('Category', categorySchema);
module.exports = CategoryS