import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'; // create universail identifiers

// Get visible expenses (after sorting)
// const getVisibleExpenses = (expenses, filters) => { // needs the entire expenses arrays along with the filters
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => { // destructure the filters object
    // use filter to create a new array with all expenses that pass the test implemented by the provided function
    return expenses.filter((expense) => {
        // filtering by text, startDate, endDate
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDateMatch;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        // figure out if expenses.description has the text vriable string inside of it
        return startDateMatch && endDateMatch && textMatch; // will return true if all are true .. item will be kept in array, else it will be removed
    }).sort((a, b) => { // sort() accepts a function which will return
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; // 1: b comes first, -1: a comes first
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

// Store Creation using combineReducers
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

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
