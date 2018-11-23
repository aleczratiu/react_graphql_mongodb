export default `
    type UserAuth {
        user: User
        sessionToken: String!
    }

    type User {
        createdAt: String
        email: String
        firstName: String
        id: ID
        lastName: String
        privileges: [String]
        updatedAt: String
    }

    type UserWithToken {
        user: User
        sessionToken: String
    }

    type Event {
        createdAt: String
        description: String
        id: ID
        questions: [ID]
        title: String
        updatedAt: String
    }

    type Question {
        createdAt: String
        content: String
        events: [ID]
        id: ID
        updatedAt: String
    }

    type Mutation {
        createSessionToken(email: String!, password: String!): UserWithToken
        addEvent(description: String!, title: String!): Event
        addQuestion(content: String!): Question
        deleteEvent(id: ID!): Event
        deleteQuestion(id: ID!): Question
        editEvent(description: String!, id: ID!, title: String!,): Event
        editQuestion(id: ID!, content: String!): Question
        registerUser(email: String!, password: String!): UserWithToken
    }

    type Query {
        getUserBySessionToken(sessionToken: String!): User
    }
`;
