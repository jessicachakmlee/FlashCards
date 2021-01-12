import React, {Component} from "react";
import styled from 'styled-components';
import {graphql, compose} from 'react-apollo';
import { withApollo } from 'react-apollo'
import {getCategoriesQuery, getQuestionsQuery, getCategoryQuestionsQuery} from "../queries/queries";

const QuestionAnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const QuestionAnswerDiv = styled.div`
    flex: 1;
`;

const QATitle = styled.h2`
    margin: 5px 10px;
    text-align: center;
    color: cornflowerblue;
`;

const QAContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
`;

const QuestionShow = styled.div`
    min-width: 90%;
    height: 250px;
    padding: 20px;
    border: 3px dashed cornflowerblue;
    overflow: auto;
`;

const buttonDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const NextQuestionButton = styled.button`
    background: cornflowerblue;
    color: white;
    font-size: 16px;
    font-weight: 700;
    width: 50%;
    height: 50px;
    align-self: center;
    
    :hover {
    background: skyblue;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
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

const AnswerDiv = styled.div`
    flex: 1;
`;

const AnswerTextDiv = styled.div`
    min-width: 90%;
    height: 250px;
    padding: 20px;
    border: 3px dashed cornflowerblue;
`;

const AnswerText = styled.span`
    display: block;
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    overflow: auto;
    height: 250px;
`;


const ShowAnswerButton = styled.button`
    background: ${props => props.show ? 'palevioletred' : 'cornflowerblue'};
    color: white;
    font-size: 16px;
    font-weight: 700;
    width: 50%;
    height: 50px;
    align-self: center;
    
    :hover {
    background: ${props => props.show ? 'lightpink' : 'skyblue'};
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

const QSelect = styled.select`
    width: 25%;
    height: auto;
    margin: 10px 0;
    align-self:center
`;

const QuestionAnswerWrapper = styled.div`
    display: flex;
`;

class QuestionAnswerGenerator extends Component {
    constructor(props) {
        super(props);

        const questionsLoaded = () => {
            let data = this.props.getQuestionsQuery;
            if (data.loading) {
                return [];
            } else {
                return data.questions;
            }
        };

        this.state = {
            categorySelected: null,
            questions: questionsLoaded(),
            AnswerShown: false,
            randomNumber: 0,
        }
    };


    componentDidUpdate(prevProps, prevState) {
        const allquestionsLoaded = () => {
            let data = this.props.getQuestionsQuery;
            if (data.loading) {
                return [];
            } else {
                return data.questions
            }
        };

        if (prevProps.getQuestionsQuery.loading !== this.props.getQuestionsQuery.loading) {
            this.setState({
                questions: allquestionsLoaded()
            })
        }
    }


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

    randomNumber = () => {
        return Math.floor(Math.random() * this.state.questions.length);
    };

    randomize = () => {
        this.setState({
            AnswerShown: false,
            randomNumber: this.randomNumber()
        });
    };

    showAnswer = () => {
        this.setState((prevState) => {
            return {AnswerShown: !prevState.AnswerShown}
        });
    };

    handleChangeCategory = async(event) => {
        event.persist();
        const allQuestionsLoaded = () => {
            let data = this.props.getQuestionsQuery;
            if (data.loading) {
                return [];
            } else {
                return data.questions
            }
        };

        if (event.target.value === 'all') {
            this.setState({
                    questions: allQuestionsLoaded(),
                    categorySelected: event.target.value
            })
        } else {
            const data = await this.props.client.query({
                query: getCategoryQuestionsQuery,
                variables: {id: event.target.value}});

            const Categoryquestions = data.data.category.questions;

            this.setState((prevState) => {
                return {
                    questions: Categoryquestions,
                    categorySelected: event.target.value
                }
            })
        }
    };

    render() {
        const ShownQuestion = this.state.categorySelected !== null && this.state.questions.length === 0 ?
                'No Questions in this Category, please select another category.'
                : (this.state.questions[this.state.randomNumber] ?
                    this.state.questions[this.state.randomNumber].name
                    : 'Loading Question...');
        const ShownAnswer = this.state.questions[this.state.randomNumber] ? this.state.questions[this.state.randomNumber].answer : 'Loading Answer...';
        const ShowAnswerButtonToggle = this.state.AnswerShown ? 'Hide Answer' : 'Show Answer';
        return (
            <QuestionAnswerContainer>
                <QATitle>Category</QATitle>
                <QSelect value={this.state.categoryId} onChange={e => this.handleChangeCategory(e)}>
                    <option key={'all-categories'} value={'all'}>All</option>
                    {this.displayCategories()}
                </QSelect>
                <QuestionAnswerWrapper>
                    <QuestionAnswerDiv>
                        <QATitle>Questions</QATitle>
                        <QAContent>
                            <QuestionShow>{ShownQuestion}</QuestionShow>
                            <NextQuestionButton onClick={this.randomize}>
                                Next Question
                            </NextQuestionButton>
                        </QAContent>
                    </QuestionAnswerDiv>
                    <QuestionAnswerDiv>
                        <QATitle>Answers</QATitle>
                        <QAContent>
                            <AnswerTextDiv>
                                <AnswerText show={this.state.AnswerShown}>{ShownAnswer}</AnswerText>
                            </AnswerTextDiv>
                            <ShowAnswerButton show={this.state.AnswerShown}
                                              onClick={this.showAnswer}>{ShowAnswerButtonToggle}
                            </ShowAnswerButton>
                        </QAContent>
                    </QuestionAnswerDiv>
                </QuestionAnswerWrapper>
            </QuestionAnswerContainer>
        )
    }
}

export default compose(
    withApollo,
    graphql(getQuestionsQuery, {name: "getQuestionsQuery"}),
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(getCategoryQuestionsQuery, {name: "getCategoryQuestionsQuery"})
)(QuestionAnswerGenerator);