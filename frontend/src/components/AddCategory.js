import React, {Component} from "react";
import styled from 'styled-components';
import {graphql, compose} from 'react-apollo';
import {addCategoryMutation, getCategoriesQuery, deleteCategoryMutation, addCategoryToQuestionMutation, getQuestionsQuery} from "../queries/queries";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px dashed lightblue;
    margin: 0 0 0 10px;
    width: 50%;
`;

const CategoriesShow = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;     
    margin-top: 20px;
`;

const Title = styled.div`
    border: 2px solid lightblue;
    background-color: lightblue;
    font-weight: 800;
    word-wrap: break-word;
    text-align: center;
`;

const CategoriesLabel = styled.div`
    border: 1px solid lightblue;
    background-color: lightblue;

    text-align: center;
    font-weight: 700;
`;

const CategoriesInput = styled.span`
    margin-left: 10px;
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


class AddCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryName: '',
        }
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
                    <DeleteQuestionButton onClick={e => this.deleteCategory(e, category.id, category.questions)}> Delete</DeleteQuestionButton> : null}
                </QuestionDisplayed>
            )
        }
    };

    deleteCategory = (event, categoryId, questions) => {

        questions.map(question => {
            this.props.addCategoryToQuestionMutation({
                variables: {
                    questionId: question.id,
                    categoryId: "5c303bd63040241a27ff46a7"
                },
                refetchQueries:[{query: getQuestionsQuery}, {query: getCategoriesQuery}]
            });
        });
        this.props.deleteCategoryMutation({
            variables: {
                id: categoryId
            },
            refetchQueries:[{query: getCategoriesQuery}]
        });
        event.preventDefault();
    };



    handleCategoryName = (event) => {
        this.setState({
            categoryName: event.target.value
        })
    };

    handleSubmit = (event) => {
        alert('Category Created');
        this.props.addCategoryMutation({
            variables: {
                name: this.state.categoryName,
            },
            refetchQueries:[{query: getCategoriesQuery}]
        });
        event.preventDefault();
    };


    render() {
        return (
            <Wrapper>
                <Title>Add a Category</Title>
                <form id={'add-category'} onSubmit={this.handleSubmit}>
                    <CategoriesInput className={'field'}>
                        <label>Enter Category:</label>
                        <input type={'text'} onChange={this.handleCategoryName}/>
                    </CategoriesInput>
                    <button>Submit</button>
                </form>
                <CategoriesShow>
                    <CategoriesLabel>Current Catgeories</CategoriesLabel>
                    {this.displayCategories()}
                </CategoriesShow>
            </Wrapper>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(addCategoryMutation, {name: "addCategoryMutation"}),
    graphql(deleteCategoryMutation, {name: "deleteCategoryMutation"}),
    graphql(addCategoryToQuestionMutation, {name: "addCategoryToQuestionMutation"}),
    graphql(getQuestionsQuery, {name: "getQuestionsQuery"})
)(AddCategory);