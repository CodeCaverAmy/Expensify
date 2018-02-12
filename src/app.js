import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // allow us to provide the store to all of the components that make up our application
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';

const store = configureStore();
let hasRendered = false;
const renderApp = () => {   // render the app only if it has not been rendered yet
    if(!hasRendered) {
        ReactDOM.render(jsx , document.getElementById('app'));
        hasRendered = true;
    }
};

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<LoadingPage /> , document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    // runs when the user changes their authentication
    if(user) {
        // dispatch expenses only if the user has successfully logged in
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                // redirect to the dashboard page on a successful login
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/'); // redirect to the home page
    }
});