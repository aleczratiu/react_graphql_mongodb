import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middlewares from './middlewares';
import reducers from './reducers';
import initialState from '../initialState';
import App from './components/App';

const composeEnhancers = composeWithDevTools({
});
const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)