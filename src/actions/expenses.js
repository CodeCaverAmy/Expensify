import uuid from 'uuid'; // create universail identifiers
import database from '../firebase/firebase';
import expenses from '../tests/fixtures/expenses';

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    // return the thing that gets dispatched (a function)
    return (dispatch) => {
        const {
            description = '', 
            note = '',
            amount = 0, 
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };
        
        // push to firebase
        return database.ref('expenses').push(expense).then((ref) => {
            // dispatch, otherwise the Redux store is never going to change
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
// needs two arguments: id and updates
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => { // asynchronous action
    // fetch all expense data once
    return (dispatch) => {
        // return makes sure the promise gets returned, allowing us to have access to .then when we actuall dispatch in app.js
        return database.ref('expenses').once('value').then((snapshot) => {
            // parse that snapshot data into an array
            const expense=[]; // intialize an empty array

            snapshot.forEach((childSnapshot) => {
                expenses.push({  // push all of the expenses onto the array
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            // dispatch SET_EXPENSES
            dispatch(setExpenses(expenses));
        });
    };
};