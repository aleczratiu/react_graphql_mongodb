import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ERROR_CODES } from 'Constants';
import { getSessionToken, removeSessionToken } from 'Utils/auth';
import { onError } from 'apollo-link-error';

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        if (graphQLErrors.find(err => err && err.data && err.data.status === ERROR_CODES.UNAUTHORIZED)) {
            removeSessionToken();
            history.replace('/login');
        } else {
            Rollbar.error(`graphQLErrors: ${JSON.stringify(graphQLErrors)}`);
        }
    }
});

const middlewareLink = setContext(() => ({
    headers: {
        authorization: getSessionToken() || null,
    },
}));

const httpLink = new HttpLink({ uri: 'http://localhost:4000/', credentials: 'same-origin' })

const client = new ApolloClient({
    link: from([middlewareLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;
