import expenses from "./expenses"; // get the expenses 

export default (expenses) => {
    // return the total from the expenses
    if (expenses.length === 0 ) {
        return 0;
    } else {
        return expenses.reduce((sum, expense) => {
            return sum + expense.amount;
        }, 0 );
    }
}