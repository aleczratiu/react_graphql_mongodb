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
        confirmed: Boolean
        subscribe: Boolean
    }

    type UserWithToken {
        user: User
        sessionToken: String
    }

    type Event {
        createdAt: String
        description: String
        id: ID
        name: String
        questions: [Question]
        updatedAt: String
    }

    type Question {
        createdAt: String
        content: String
        events: [Event]
        id: ID
        updatedAt: String
    }

    type Mutation {
        createSessionToken(email: String!, password: String!): UserWithToken
        addEvent(description: String!, name: String!): Event
        addQuestion(content: String!, eventId: ID!): Question
        deleteEvent(id: ID!): Event
        deleteQuestion(id: ID!): Question
        editEvent(description: String!, id: ID!, name: String!): Event
        editQuestion(id: ID!, content: String!): Question
        registerUser(email: String!, password: String!): UserWithToken
        updateSubscribe(id: ID!, subscribe: Boolean!): User
    }

    type Query {
        getEvents: [Event]
        getEventById(id: String!): Event
        getQuestions: [Question]
        getQuestionsByEventId(eventId: ID!): [Question]
        getUserBySessionToken(sessionToken: String!): User
        getUsers: [User]
        confirmEmail(id: String!): User
    }
`;
