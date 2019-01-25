const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


//allow cross-origin requests
app.use(cors());

// connect to mLab
mongoose.connect('mongodb://Jessica:testing123@ds145304.mlab.com:45304/graphql-studyingtool', {useNewUrlParser: true}).catch(e => console.log(e));
mongoose.connection.once('open', () => {
        console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for requests on port 4000')
});
