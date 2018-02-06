import uuid from 'uuid'; // create universail identifiers

// component calls action generator
// action generator returns an object
// component dispatches object
// redux store change

// --- changes to --- //

// component calls action generator
// action generator does not return an object, it returns a function
// component dispatches a function (middlewhare) and not an object
// function funs (has the ability to dispatch other actions and do whatever it wants)


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