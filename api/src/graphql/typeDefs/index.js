export default `
    scalar ObjectID

    type UserAuth {
        user: User
        sessionToken: String!
    }

    type User {
        createdAt: String
        email: String
        firstName: String
        id: ObjectID
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
        id: ObjectID
        name: String
        questions: [Question]
        updatedAt: String
    }

    type DeleteEventPayload {
        createdAt: String
        description: String
        id: ObjectID
        name: String
        questions: [ObjectID]
        updatedAt: String
    }

    type Question {
        createdAt: String
        content: String
        events: [Event]
        id: ObjectID
        updatedAt: String
    }

    type DeleteQuestionPayload {
        content: String
        createdAt: String
        events: [ObjectID]
        id: ObjectID
        updatedAt: String
    }

    type Mutation {
        createSessionToken(email: String!, password: String!): UserWithToken
        addEvent(description: String!, name: String!): Event
        addQuestion(content: String!, eventId: ObjectID!): Question
        deleteEvent(id: ObjectID!): DeleteEventPayload
        deleteQuestion(id: ObjectID!): DeleteQuestionPayload
        editEvent(description: String!, id: ObjectID!, name: String!): Event
        editQuestion(id: ObjectID!, content: String!): Question
        registerUser(email: String!, password: String!): UserWithToken
        updateSubscribe(id: ObjectID!, subscribe: Boolean!): User
    }

    type Query {
        getEvents: [Event]
        getEventById(id: String!): Event
        getQuestions: [Question]
        getQuestionsByEventId(eventId: ObjectID!): [Question]
        getUserBySessionToken(sessionToken: String!): User
        getUsers: [User]
        confirmEmail(id: String!): User
    }
`;
