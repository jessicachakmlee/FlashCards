import React, {Component} from "react";
import styled from 'styled-components';
import {
    getCategoriesQuery
} from "../queries/queries";
import {compose, graphql} from "react-apollo/index";


const CategoriesShow = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;     
    margin: 20px 0 0 10px;
`;

const CategoriesLabel = styled.div`
    border: 1px solid lightblue;
    background-color: lightblue;

    text-align: center;
    font-weight: 700;
`;

const QuestionDisplayed = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

const QuestionShowSpan = styled.span`
    align-self: flex-end;
    width: 75%;
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



class CategoriesList extends Component {
    constructor(props) {
        super(props);
    }

    displayCategories = () => {
        let data = this.props.getCategoriesQuery;
        if (data.loading) {
            return <div>Loading Categories...</div>;
        } else {
            return data.categories.map(category =>
                <QuestionDisplayed key={category.id}>
                    <QuestionShowSpan value={category.id}>{category.name}</QuestionShowSpan>
                    {category.id !== "5c303bd63040241a27ff46a7" ?
                        <DeleteQuestionButton
                            onClick={e => this.deleteCategory(e, category.id, category.questions)}> Delete</DeleteQuestionButton> : null}
                </QuestionDisplayed>
            )
        }
    };
    render() {
        return(
            <CategoriesShow>
                {this.displayCategories()}
            </CategoriesShow>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"})
)(CategoriesList);