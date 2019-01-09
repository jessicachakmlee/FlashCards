import React, {Component} from "react";
import styled from 'styled-components';
import {graphql, compose} from 'react-apollo';
import {getCategoriesQuery, addQuestionMutation, getQuestionsQuery} from "../queries/queries";


const QuestionSubmissionDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const QuestionSubmissionTitle = styled.h2`
    text-align: center;
    border: 1px solid;
    margin: 57px 10px 10px 10px;
    background: darkseagreen;
`;

const QSubmissionForm = styled.form`
    display: flex;
    height: auto;
    width: auto;
    flex-direction: column;
    border: 3px dashed darkseagreen;
    padding: 10px;
    align-self: center;
    margin: 0 10px 20px 10px;
`;

const QAlabel = styled.label`
    flex: 1;
`;

const QSubmissiontextarea = styled.textarea`
    flex: 4;
    margin-bottom: 10px;
`;

const QSelect = styled.select`
    width: 25%;
    height: auto;
    margin: 10px 0;
`;

const InputDiv = styled.div`
    margin-top: 10px;
    align-self: flex-end;
`;

const StyledInput = styled.input`
    background: darkseagreen;
    width: 100px;
    height: 25px;
    
    :hover {
    background: yellowgreen;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

class AddQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            TextAreaQuestion: "",
            TextAreaAnswer: "",
            categoryId: "5c303bd63040241a27ff46a7"
        }
    }

    displayCategories = () => {
        let data = this.props.getCategoriesQuery;
        if(data.loading){
            return <option disabled>Loading Categories</option>
        } else {
            return data.categories.map(category =>
                <option key={category.id} value={category.id}>{category.name}</option>
            )
        }
    };

    handleChangeQuestion = (event) => {
        this.setState({
            TextAreaQuestion: event.target.value
        })
    };

    handleChangeAnswer = (event) => {
        this.setState({
            TextAreaAnswer: event.target.value
        })
    };

    handleChangeCategory = (event) => {
        this.setState({
            categoryId: event.target.value
        })
    };

    handleSubmit = (event) => {
        alert('Question Submitted');
        this.props.addQuestionMutation({
            variables: {
                name: this.state.TextAreaQuestion,
                answer: this.state.TextAreaAnswer,
                categoryId: this.state.categoryId
            },
            refetchQueries:[{query: getQuestionsQuery}, {query: getCategoriesQuery}]
        });
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <QuestionSubmissionTitle>Question Submission</QuestionSubmissionTitle>
                <QSubmissionForm onSubmit={this.handleSubmit}>
                    <QuestionSubmissionDiv>
                        <QAlabel> Enter Question: </QAlabel>
                        <QSubmissiontextarea value={this.state.TextAreaQuestion}
                                             onChange={this.handleChangeQuestion}
                                             rows="4"
                                             cols="50"
                                             id="questionText"
                                             name="questionText"
                                             wrap="hard">Question</QSubmissiontextarea>
                        <QAlabel> Enter Answer: </QAlabel>
                        <QSubmissiontextarea value={this.state.TextAreaAnswer}
                                             onChange={this.handleChangeAnswer}
                                             rows="4"
                                             cols="50"
                                             id="questionAnswer"
                                             name="questionAnswer"
                                             wrap="hard">Answer</QSubmissiontextarea>
                        <QAlabel> Choose Category: </QAlabel>
                        <QSelect value={this.state.categoryId} onChange={this.handleChangeCategory}>
                            {this.displayCategories()}
                        </QSelect>
                    </QuestionSubmissionDiv>
                    <InputDiv>
                        <StyledInput type="submit"/>
                    </InputDiv>
                </QSubmissionForm>
            </div>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(addQuestionMutation, {name: "addQuestionMutation"})
)(AddQuestion);