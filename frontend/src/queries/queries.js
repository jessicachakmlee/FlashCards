import {gql} from 'apollo-boost';

const getCategoriesQuery = gql`
{
  categories{
    name
    id
    questions {
      id
      name
      answer
      category{
      name
      id
      }
    }
  }
}
`;

const getQuestionsQuery = gql`
{
  questions {
    name
    id
    answer
    category{
    name
    id
    }
  }
}
`;

const getCategoryQuestionsQuery = gql`
query ($id: ID) {
   category (id: $id){
   id
   name
   questions {
      id
      name
      answer
    }
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

const addCategoryMutation = gql`
mutation ($name: String!) {
    addCategory(name: $name){
    name
    id}
    }
`;

const deleteCategoryMutation = gql`
mutation ($id: ID!) {
    deleteCategory(id: $id){
    name
    }
}
`;


const addCategoryToQuestionMutation = gql`
mutation ($questionId: ID!, $categoryId: ID!) {
    addCategoryToQuestion(id: $questionId, categoryId: $categoryId) {
    name
    id
    }
}
`;

export{getQuestionsQuery, getCategoriesQuery, addQuestionMutation, deleteQuestionMutation, addCategoryMutation,
    deleteCategoryMutation, addCategoryToQuestionMutation, getCategoryQuestionsQuery};