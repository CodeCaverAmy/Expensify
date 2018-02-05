import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

// set default state
test('should set up default values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

// ADD_EXPENSE
test('should be able to add an expense', () => {
    const expense = {
        id: '12',
        description: 'Buy Coffee',
        note: '',
        createdAt: 2000,
        amount: 560
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});


// EDIT_EXPENSE
test('should be able to edit an expense', () => {
    const amount = 1220;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(amount);
});

test('should not be able to edit an expense if expense has not been found', () => {
    const amount = 1220;
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// REMOVE_EXPENSE
test('should be able to remove an expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '2'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should be able to remove an expense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '7'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

