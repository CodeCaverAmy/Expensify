import moment from 'moment';
// Get visible expenses (after sorting)
// const getVisibleExpenses = (expenses, filters) => { // needs the entire expenses arrays along with the filters
export default (expenses, { text, sortBy, startDate, endDate }) => { // destructure the filters object
    // use filter to create a new array with all expenses that pass the test implemented by the provided function
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        // filtering by text, startDate, endDate
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        // figure out if expenses.description has the text vriable string inside of it
        return startDateMatch && endDateMatch && textMatch; // will return true if all are true .. item will be kept in array, else it will be removed
    }).sort((a, b) => { // sort() accepts a function which will return
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; // 1: b comes first, -1: a comes first
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    })
}