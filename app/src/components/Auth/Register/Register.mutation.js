import gql from 'graphql-tag';

export default gql`
    mutation registerUser(
        $email: String!,
        $password: String!,
    ) {
    registerUser(
        email: $email,
        password: $password,
    ) {
        user {
            id
            admin
            email
            confirmed
            createdAt
            updatedAt
        }
        sessionToken
    }
}
`;
