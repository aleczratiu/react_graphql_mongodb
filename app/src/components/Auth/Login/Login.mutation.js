import gql from 'graphql-tag';

export default gql`
    mutation createSessionToken(
        $email: String!,
        $password: String!,
    ) {
    createSessionToken(
        email: $email,
        password: $password,
    ) {
        user {
            id,
            email
        }
            sessionToken
        }
    }
`;
