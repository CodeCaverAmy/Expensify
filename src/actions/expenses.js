import uuid from 'uuid'; // create universail identifiers
import database from '../firebase/firebase';

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