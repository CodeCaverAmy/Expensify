import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // allow us to provide the store to all of the components that make up our application
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AddExpensePage from './components/AddExpensePage';
import { setTimeout } from 'timers';

import './firebase/firebase';
import './playground/promises';

const store = configureStore();


// addExpense -> Water bill
const waterBill = store.dispatch(addExpense({ description: 'Water Bill', amount: 7500 }));
// addExpense -> Gas Bill
const gasBill = store.dispatch(addExpense({ description: 'Gas Bill', amount: 4500, createdAt: 1000 }));
// addExpense -> Rent Bill
const rentBill = store.dispatch(addExpense({ description: 'Rent', amount: 117500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx , document.getElementById('app'));
