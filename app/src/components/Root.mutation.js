import gql from 'graphql-tag';

export default gql`
    query getUserBySessionToken(
        $sessionToken: String!,
    ) {
    getUserBySessionToken(
        sessionToken: $sessionToken,
    ) {
        id
        admin
        email
        confirmed
        createdAt
        updatedAt
    }
}
`
