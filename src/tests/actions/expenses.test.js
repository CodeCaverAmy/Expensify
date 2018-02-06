// Jest test files are run through Babel
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // to allow us to use middleware
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {        // jest needs 'done' passed in since the store.dispatchEvent is asynchronous and needs to know whe its completed
    // create a mock store
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is the best one.',
        createdAt: 1000
    };
    
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions(); // from redux-mock-store, returning an array of all of the actions
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  // return this to use with the next chaned .then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // this sends the done method once the test has been completed
    }); 
});

test('should add expense with defaults to database and store', (done) => {
    // create a mock store
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions(); // from redux-mock-store, returning an array of all of the actions
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  // return this to use with the next chaned .then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); // this sends the done method once the test has been completed
    }); 

});

// test('should setup add expense action object with default values', () => {
//     const expenseData = {};
//     const action = addExpense(expenseData);
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });