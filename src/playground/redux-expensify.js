import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'; // create universail identifiers

store.subscribe(() => {
    const state = store.getState(); // get entire state (entire expenses array and all of its filters)
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Rent', amount: 700, createdAt: -21000 }));
const expenseThree = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -100 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// Edit an expense(description, note, amount) ... passing in two things .. 
// 1) id: expenseTwo.expense.id
// 2) what to udate
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// Set Text Filter 
// pass text filter
// store.dispatch(setTextFilter('rent')); // return expenses who have rent in either description or note field
store.dispatch(setTextFilter()); // return text value to an empty string

// Sort By ....
store.dispatch(sortByDate()); // set sortBy: 'date'
store.dispatch(sortByAmount()); // set sortBy: 'amount'

// Set Start and End Date
// store.dispatch(setStartDate(125)); // set startDate: 125
// store.dispatch(setStartDate()); // set startDate to undefined
// store.dispatch(setEndDate(1240)); // set endDate: 1240

const demoState = {
    expenses: [{
        id: '23',
        description: 'rent',
        note: 'rent for January 2018',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};
