// Jest test files are run through Babel
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense,
    removeExpense, 
    startRemoveExpense,
    setExpenses, 
    startSetExpenses 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // to allow us to use middleware
import database from '../../firebase/firebase';

const uid = '123abc';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

// set up some dummy data
beforeEach((done) => {
    const expensesData = {}; 
    expenses.forEach(({ id, description, note, amount, createdAt }) => { 
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

// remove expense from Redux
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

// remove epxense from Firebse
test('should remove the expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id=expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE', 
            id
        });
        // try to grab the expense that was removed
        return database.ref(`users/${uid}/expenss/${id}`).once('value'); 
    }).then((snapshot) => {
        // if the expense was removed, it should not exist and the val will be undefined, which is falsy
        expect(snapshot.val()).toBeFalsy();
        // send back done to say this has run
        done();
    });
});

test('should setup edit expense action objetc', () => {
    const action = editExpense('34', { description: 'new description' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '34',
        updates: {
            description: 'new description'
        }
    });
});

test('should edit expense in Firebase', (done) => {
    const store = createMockStore(defaultAuthState); // pass in an initially empty object to the mockstore
    const id = expenses[0].id; // use the first expense in the expenses array defined in beforeEach and get its id
    const updates = { description: 'Updated Bill' }; // make some change to test the update
    store.dispatch(startEditExpense(id, updates)).then(() => {
        // once the updates have been dispatched, test to make sure the expense actually was updated
        const actions = store.getActions(); // should only return 1 action
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        // make sure the data was changed in Firebase
        return database.ref(`users/${uid}/expenses/${id}`).once('value'); 
    }).then((snapshot) => {
        // once we have the expense returned
        expect(snapshot.val().description).toBe(updates.description);
        done();
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
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');  // return this to use with the next chaned .then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // this sends the done method once the test has been completed
    }); 
});

test('should add expense with defaults to database and store', (done) => {
    // create a mock store
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');  // return this to use with the next chaned .then
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); // this sends the done method once the test has been completed
    }); 

});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    // don't run until done comes back to say that the data has been fetched from the store
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        // wait for data to come back
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

