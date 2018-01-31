import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AddExpensePage from './components/AddExpensePage';

const store = configureStore();


// addExpense -> Water bill
const waterBill = store.dispatch(addExpense({ description: 'Water Bill' }));
// addExpense -> Gas Bill
const gasBill = store.dispatch(addExpense({ description: 'Gas Bill' }));
// setTextFilter -> Bill
store.dispatch(setTextFilter('bill'));
// getVisibleExpenses -> print visible ones to the screen

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

ReactDOM.render(<AppRouter />, document.getElementById('app'));
