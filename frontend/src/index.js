import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ApolloClient from "apollo-boost/lib/index";
import {ApolloProvider} from "react-apollo";

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>, document.getElementById('root'));


