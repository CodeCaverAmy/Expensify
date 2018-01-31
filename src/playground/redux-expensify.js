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

// SORT_BY_DATE
// SET_START_DATE
// SET_END_DATE

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
    sortBuy: 'date',
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
        default: 
            return state;
    }
};

// Store Creation using combineReducers
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// Edit an expense(description, note, amount) ... passing in two things .. 
// 1) id: expenseTwo.expense.id
// 2) what to udate
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// Set Text Filter 
// pass text filter
store.dispatch(setTextFilter('rent')); // return expenses who have rent in either description or note field
store.dispatch(setTextFilter()); // return text value to an empty string

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
