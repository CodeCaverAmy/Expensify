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