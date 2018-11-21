import gql from 'graphql-tag';

export default gql`
    mutation loggedUser(
        $email: String!,
        $password: String!,
    ) {
    loggedUser (
        user: {
            email: $email,
            password: $password,
        }
    ) {
        email,
        password
    }
}
`;
