import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import QuestionList from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/QuestionList.js';
import AddQuestion from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/AddQuestion.js';
import AddCategory from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/AddCategory.js';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});


class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <AddCategory />
                    <AddQuestion />
                    <QuestionList/>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
