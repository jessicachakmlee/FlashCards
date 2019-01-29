import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import styled from 'styled-components';
import {Link, Route, Switch} from "react-router-dom";


//components
import QuestionList from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/QuestionList.js';
import AddQuestion from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/AddQuestion.js';
import AddCategory from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/AddCategory.js';
import QuestionAnswerGenerator from '/Users/jessicalee/studyingTool-reactGraphQLmLab/frontend/src/components/QuestionAnswerGenerator.js';
import CategoriesList from "./components/CategoriesList";

const Banner = styled.div`
    width: 100%;
    height: 100px;
    background-image: url('https://wikitravel.org/upload/shared//6/6a/Default_Banner.jpg');
    font-size: 80px;
    color: white;
    font-family: Almendra Display;
    text-transform: uppercase;
    text-align: center;
    margin: 10px;
`;

const CategoryQuestionDiv = styled.div`
display: flex;
justify-content: space-around;
`;

const StyledCategoryLink = styled(Link)`
    margin: 20px;
    background-color: cornflowerblue;
    color: white;
    font-size: 16px;
    font-weight: 700;
    width: 25%;
    text-align: center;
    border-radius: 2px;
    border: 1px solid black;
    text-decoration: none;
    padding: 10px
    
    :hover {
    background: skyblue;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

const StyledQuestionLink = styled(Link)`
    margin: 20px;
    background-color: #8FBC8F;
    color: white;
    font-size: 16px;
    font-weight: 700;
    width: 25%;
    text-align: center;
    border-radius: 2px;
    border: 1px solid black;
    text-decoration: none;
    align-self: center;
    padding: 10px
    
    :hover {
    background: yellowgreen;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

class App extends Component {
    render() {
        return (
            <div>
                <CategoryQuestionDiv>
                    <StyledCategoryLink to={'/addCategories'}>Add Categories</StyledCategoryLink>
                    <StyledQuestionLink to={'/addQuestions'}>Add Questions</StyledQuestionLink>
                </CategoryQuestionDiv>
                <Banner>FlashCards</Banner>
                <QuestionAnswerGenerator/>
                <Banner>Questions List</Banner>
                <QuestionList/>
                <Banner>Categories List</Banner>
                <CategoriesList />
                <Switch>
                    <Route exact path="/addCategories" component={AddCategory}/>
                    <Route exact path="/addQuestions" component={AddQuestion}/>
                </Switch>
            </div>
        )
    }
}

export default App;
