const assert = require('assert');
const question = require('../models/question');

describe('Saving a question', function() {

    it("Adds a questionAnswer to a database", function(done) {
        let q1 = new question({
            name: "SampleQuestion1",
            answer: "Answer1"
        });
        q1.save();
        assert(q1.isNew === false);
        done();
    });
});

describe('Delete from database', function() {

});
