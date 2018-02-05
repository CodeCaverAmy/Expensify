import expenses from '../fixtures/expenses';
import getTotalExpense from '../../selectors/expenses-total';

// test should return 0 of there are no expenses
test('', () => {
    const totalExpenses = getTotalExpense([]);
    expect(totalExpenses).toBe(0);
});

// test should return total if there is only one expense
test('', () => {
    const expenses = [{
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    }];
    const totalExpenses = getTotalExpense(expenses);
    expect(totalExpenses).toBe(195);
});

// test should reutrn total if there are multiple expenses
test('should correctly find the total of expenses', () => {
    const totalExpenses = getTotalExpense(expenses);
    expect(totalExpenses).toBe(parseFloat(expenses[0].amount) + parseFloat(expenses[1].amount) + parseFloat(expenses[2].amount));
})