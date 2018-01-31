import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'; // create universail identifiers

// ADD_EXPENSE
// ( {} = {} ) 'destructure the values  {} setting its defaults, and if it doesn't exist, pass in an empthy object {}
const addExpense = ( 
    { 
        description = '', 
        note = '',
        account = 0, 
        createdAt = 0
    } = {} 
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        account,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
// SET_TEXT_FILTER
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