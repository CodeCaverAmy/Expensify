import uuid from 'uuid'; // create universail identifiers
import database from '../firebase/firebase';
import expenses from '../tests/fixtures/expenses';

// ADD_EXPENSE
// add expense to the Redux store
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// add expense to Firebase
export const startAddExpense = (expenseData = {}) => {
    // return the thing that gets dispatched (a function)
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '', 
            note = '',
            amount = 0, 
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };
        
        // push to firebase
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            // dispatch, otherwise the Redux store is never going to change
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
// remove from Redux Store
export const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// remove from Firebase
export const startRemoveExpense = ( { id } = {} ) => {
    return (dispatch, getState) => {  // dispatch which gets passed to this function from the Redux library
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            // once it is removed, dispatch remove from above
            dispatch(removeExpense({ id }));
        });
    };
};

// EDIT_EXPENSE
// needs two arguments: id and updates
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// edit expense in Firebase
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // update the expense in database with the given id and updates submitted
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            // when the updates are successully synched, dispatch editExpense to change Redux
            dispatch(editExpense(id, updates));
        });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => { // asynchronous action
    // fetch all expense data once
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // return makes sure the promise gets returned, allowing us to have access to .then when we actuall dispatch in app.js
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
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