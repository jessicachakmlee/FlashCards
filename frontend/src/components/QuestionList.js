import React, {Component} from "react";
import styled from 'styled-components';
import {graphql} from 'react-apollo';
import {
    getQuestionsQuery, deleteQuestionMutation, getCategoriesQuery,
    addCategoryToQuestionMutation, getCategoryQuestionsQuery
} from "../queries/queries";
import {compose} from "react-apollo/index";

const QuestionBank = styled.div`
    display: flex;
    overflow: auto;
    flex-direction: column;
    margin: 0 10px;
`;

const QuestionDisplayed = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

const QuestionShowSpan = styled.span`
    align-self: flex-end;
    width: 65%;
    white-space: pre-wrap;
    word-break: break-word;
`;

const DeleteQuestionButton = styled.button`
    background: palevioletred;
    color: white;
    font-size: 10px;
    font-weight: 700;
    width: 100px;
    height: 25px;
    align-self: flex-end;
    
    :hover {
    background: lightpink;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;




class QuestionList extends Component {

    displayCategories = () => {
        let data = this.props.getCategoriesQuery;
        if (data.loading) {
            return <option disabled>Loading Categories</option>
        } else {
            return data.categories.map(category =>
                <option key={category.id} value={category.id}>{category.name}</option>
            )
        }
    };


    displayQuestions = () => {
        let data = this.props.getQuestionsQuery;
        if (data.loading) {
            return <div>Loading Questions...</div>;
        } else {
            return data.questions.map(question =>
                <QuestionDisplayed key={question.id}>
                    <QuestionShowSpan value={question.id}>{question.name}</QuestionShowSpan>
                    <div> Category:
                        <select value={question.category.id} onChange={e => this.handleCategoryChange(e, question.id)}>
                            {this.displayCategories()}
                        </select>
                    </div>
                    <DeleteQuestionButton
                        onClick={e => this.deleteQuestion(e, question.id)}> Delete</DeleteQuestionButton>
                </QuestionDisplayed>
            )
        }
    };

    deleteQuestion = (event, questionId) => {
        this.props.deleteQuestionMutation({
            variables: {
                id: questionId
            },
            refetchQueries: [{query: getQuestionsQuery}]
        });
        event.preventDefault();
    };

    handleCategoryChange = (event, questionId) => {
        this.props.addCategoryToQuestionMutation({
            variables: {
                questionId: questionId,
                categoryId: event.target.value
            },
            refetchQueries: [{query: getQuestionsQuery}, {query: getCategoriesQuery}, {query: getCategoryQuestionsQuery }]
        });
    };


    render() {
        return (
            <QuestionBank>
                {this.displayQuestions()}
            </QuestionBank>
        );
    }
}

export default compose(
    graphql(getQuestionsQuery, {name: "getQuestionsQuery"}),
    graphql(deleteQuestionMutation, {name: "deleteQuestionMutation"}),
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(addCategoryToQuestionMutation, {name: "addCategoryToQuestionMutation"}),
    graphql(getCategoryQuestionsQuery, {name: "getCategoryQuestionsQuery"})
)(QuestionList);