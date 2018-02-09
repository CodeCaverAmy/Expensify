import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // allow us to provide the store to all of the components that make up our application
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading ...</p> , document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx , document.getElementById('app'));
});

firebase.auth().onAuthStateChanged((user) => {
    // runs when the user changes their authentication
    if(user) {
        // redirect to the login page
        console.log('log in');
    } else {
        // redirect to the home page
        console.log('log out');
    }
});