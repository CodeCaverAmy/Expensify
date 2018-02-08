// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
        });
    case 'SET_EXPENSES':
        return action.expenses;
    default:
            return state;
    }
};