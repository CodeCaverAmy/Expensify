// Jest test files are run through Babel
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// call test
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expenxe action objet', () => {
    const action = editExpense('34', { description: 'new description' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '34',
        updates: {
            description: 'new description'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Car Payment',
        amount: 39500,
        createdAt: 1000,
        note: 'January Car Payment'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const expenseData = {};
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});