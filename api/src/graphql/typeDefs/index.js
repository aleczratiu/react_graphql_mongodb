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

    type Mutation {
        createSessionToken(email: String!, password: String!): UserWithToken
        registerUser(email: String!, password: String!): UserWithToken
    }

    type Query {
        getUserBySessionToken(sessionToken: String!): User
    }
`;
