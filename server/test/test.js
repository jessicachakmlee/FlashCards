import {addQuestionMutation} from "../../frontend/src/queries/queries";

const assert = require('assert');
const question = require('../models/question');
const category = require('../models/category');

describe('Saving a question', function() {

    it("Adds a questionAnswer to a database", function(done) {
        let q1 = new question({
            name: "SampleQuestion1",
            answer: "Answer1",
            category: "all"
        });
        let q2 = new question({
            name: "SampleQuestion2",
            answer: "Answer2",
            category: "all"
        });

        q2.save();
        assert(q1.isNew === true);
        assert(q2.isNew === true);
        done();
    });
});

describe('Delete from database', function() {

});
