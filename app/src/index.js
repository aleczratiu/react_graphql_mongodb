// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloProvider } from 'react-apollo';

// Components
import Root from './components/Root.container';
import Client from './ApolloClient';
import middlewares from './middlewares';
import reducers from './reducers';
import initialState from '../initialState';

const composeEnhancers = composeWithDevTools({
});
const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
));

render(
    <ApolloProvider client={Client}>
        <Provider store={store}>
            <Root />
        </Provider>
    </ApolloProvider >,
    document.getElementById('root')
)
