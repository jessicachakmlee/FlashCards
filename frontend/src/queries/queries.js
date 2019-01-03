import {gql} from 'apollo-boost';

const getCategoriesQuery = gql`
{
  categories {
    name
    id
  }
}
`;

const getQuestionsQuery = gql`
{
  questions {
    name
    answer
    id
  }
}
`;

const addQuestionMutation = gql`
mutation ($name: String!, $answer:String!, $categoryId: ID!){
    addQuestion (question: $name, answer: $answer, categoryId: $categoryId){
    name
    answer
    }
}
`;

const deleteQuestionMutation = gql`
mutation ($id: ID!) {
    deleteQuestion(id: $id){
    name
    }
}
`;

export{getQuestionsQuery, getCategoriesQuery, addQuestionMutation, deleteQuestionMutation};