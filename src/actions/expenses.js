import uuid from 'uuid'; // create universail identifiers

// ADD_EXPENSE
// ( {} = {} ) 'destructure the values  {} setting its defaults, and if it doesn't exist, pass in an empthy object {}
export const addExpense = ( 
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