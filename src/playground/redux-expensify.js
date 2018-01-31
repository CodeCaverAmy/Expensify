import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'; // create universail identifiers

// ADD_EXPENSE
// ( {} = {} ) 'destructure the values  {} setting its defaults, and if it doesn't exist, pass in an empthy object {}
const addExpense = ( 
    { 
        description = '', 
        note = '',
        amount = 0, 
        createdAt = 0
    } = {} 
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
// needs two arguments: id and updates
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({ // pass in the text value, if none sent in - set text to an empty string
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_AMOUNT
const sortByAmount = (sortBy = 'amount') => ({
    type: 'SET_SORT_BY',
    sortBy
});

// SORT_BY_DATE
const sortByDate = (sortBy = 'date') => ({
    type: 'SET_SORT_BY',
    sortBy
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state, // get all of the current values using the spread operator
                action.expense // add the new expense
            ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
        // go through every expense in the array to find the match .. when we find the match, correctly change the match
        return state.map((expense) => { // pass into state.map( ... ) the updater function for the expense
            if (expense.id === action.id) { 
                // if the current expense id we are iterating over with map = the expensie id we are trying to edit
                // return a brand new object (using the object spread operator .. grab all the existing properties)
                return { // return a new object, changing this particular expense
                    ...expense, // grab all of the properties on the existing expense
                    ...action.updates // override any that were passed down
                }
            } else {
                return expense;
            }
        })
    default:
            return state;
    }
};

// Filters Reducer
const filtersReducersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            // return a new object, getting all of the current values for state (current filter object) 
            return {
                ...state,
                text: action.text // override text, setting it to the text passed in
            };
        case 'SET_SORT_BY':
            // return a new object, getting all of the current values for state (filter object) and set sortBy
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            // return a new object, getting all of the current values for state, and set start Date
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            // return a new object, getting all of the current values for state, and set start Date
            return {
                ...state,
                endDate: action.endDate
            };
        default: 
            return state;
    }
};

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
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -100 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// Edit an expense(description, note, amount) ... passing in two things .. 
// 1) id: expenseTwo.expense.id
// 2) what to udate
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// Set Text Filter 
// pass text filter
// store.dispatch(setTextFilter('rent')); // return expenses who have rent in either description or note field
// store.dispatch(setTextFilter()); // return text value to an empty string

// Sort By ....
// store.dispatch(sortByAmount()); // set sortBy: 'amount'
// store.dispatch(sortByDate()); // set sortBy: 'date'

// Set Start and End Date
store.dispatch(setStartDate(125)); // set startDate: 125
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
