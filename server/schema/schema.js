// define types
// define relationships between types
// define root queries - how user initially jump into the graph and get data.

const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull} = graphql;
const _= require('lodash');
const Question = require('../models/question');
const Category = require('../models/category');

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        answer: {type: GraphQLString},
        category: {
            type: CategoryType,
            resolve(parent, args){
                return Category.findById(parent.categoryId);
            }
        }
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        questions: {type: GraphQLList(QuestionType),
            resolve(parent, args){
            return Question.find({categoryId: parent.id});
            }

        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        question: {
            type: QuestionType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Question.findById(args.id);
            }
        },
        category: {
            type: CategoryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Category.findById(args.id);
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args){
                return Question.find({});
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args){
                return Category.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addQuestion: {
            type: QuestionType,
            args: {
                question: {type: new GraphQLNonNull(GraphQLString)},
                answer: {type: new GraphQLNonNull (GraphQLString)},
                categoryId: {type: GraphQLID}
            },
            resolve(parent, args){
                let question = new Question({
                    name: args.question,
                    answer: args.answer,
                    categoryId: args.categoryId
                });
                return question.save();
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: {type: new GraphQLNonNull (GraphQLString)},
            },
            resolve(parent, args){
                let category = new Category({
                    name: args.name
                });
                return category.save();
            }
        },
        addCategoryToQuestion: {
            type: QuestionType,
            args: {
                id: {type: GraphQLID},
                categoryId: {type: GraphQLID}
            },
            resolve(parent, args){
                let question = Question.findOneAndUpdate({_id: args.id}, {categoryId: args.categoryId});
                return question;
            }
        },
        deleteQuestion: {
            type: QuestionType,
            args: {
                id: {type: GraphQLID},
            },
            resolve(parent, args){
                return Question.findOneAndRemove({_id: args.id});

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});