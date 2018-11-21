import gql from 'graphql-tag';

export default gql`
    mutation registerUser(
        $email: String!,
        $password: String!,
    ) {
    registerUser(
        user: {
            email: $email,
            password: $password,
        }
    ) {
        id,
        email,
        password
    }
}
`;
