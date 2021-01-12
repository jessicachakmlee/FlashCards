const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


//allow cross-origin requests
app.use(cors());

// connect to mLab

const MongoClient = require('mongodb').MongoClient;

mongoose.connect("mongodb+srv://username:password@cluster0.g5q0i.mongodb.net/username?retryWrites=true&w=majority",
    {useNewUrlParser: true});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for requests on port 4000')
});
