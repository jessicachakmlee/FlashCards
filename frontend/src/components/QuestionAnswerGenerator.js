import React, {Component} from "react";
import styled from 'styled-components';
import {graphql, compose} from 'react-apollo';
import {getQuestionsQuery} from "../queries/queries";

const QuestionAnswerContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const QuestionAnswerDiv = styled.div`
    flex: 1;
`;

const QATitle = styled.h2`
    margin-right: 10px;
    text-align: center;
    border: 1px solid;
`;

const QAContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
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

class QuestionAnswerGenerator extends Component {
    constructor(props) {
       super(props);

       const questionsLoaded = () => {
           let data = this.props.getQuestionsQuery;
           if (data.loading) {
               return [];
           } else {
               return data.questions}};

        this.state = {
            questions: questionsLoaded(),
            AnswerShown: false,
            randomNumber: 0,
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const questionsLoaded = () => {
            let data = this.props.getQuestionsQuery;
            if (data.loading) {
                return [];
            } else {
                return data.questions}};

        if (prevProps.getQuestionsQuery.loading !== this.props.getQuestionsQuery.loading){
            this.setState({
                questions: questionsLoaded()
            })
        }

    }



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


    render() {
        const ShownQuestion = this.state.questions[this.state.randomNumber] ? this.state.questions[this.state.randomNumber].name : 'Loading Question...';
        const ShownAnswer = this.state.questions[this.state.randomNumber] ? this.state.questions[this.state.randomNumber].answer : 'Loading Answer...';
        const ShowAnswerButtonToggle = this.state.AnswerShown ? 'Hide Answer' : 'Show Answer';
        return (
            <QuestionAnswerContainer>
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
            </QuestionAnswerContainer>
        )
    }
}

export default compose(
    graphql(getQuestionsQuery, {name: "getQuestionsQuery"})
)(QuestionAnswerGenerator);