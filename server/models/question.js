const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    categoryId: String
});
const QuestionS = mongoose.model('Question', questionSchema);
module.exports = QuestionS