import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './service/store/store'

import * as serviceWorker from './serviceWorker';


const store = compose(applyMiddleware(thunk)(createStore)(rootReducer));

ReactDOM.render(<React.Fragment>
    <Provider store={store}>
        <App />
    </Provider>
</React.Fragment>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
