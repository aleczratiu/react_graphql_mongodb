import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Root from 'Components/Root.container';
import client from 'Apollo';
import middlewares from 'Middlewares';
import reducers from 'Reducers';
import initialState from '../initialState';

const composeEnhancers = composeWithDevTools({});

const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
));

render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Root />
        </Provider>
    </ApolloProvider >,
    document.getElementById('root'),
);
