import { createStore, combineReducers } from 'redux';

// ADD_EXPENSE
const addExpense = () => ({
    type: 'ADD_EXPENSE',
    expense: {
        
    }
})

// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
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

console.log(store.getState());

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