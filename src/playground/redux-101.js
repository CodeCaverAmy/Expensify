import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
            return {
                count: state.count + incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count: state.count - decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
});

// watch for changes in the store

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});



// Actions - an object that gets sent to the store - convention: ACTIONS in all CAPS
// -- increment ---
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});
// -- decrement ---
store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
});

// -- reset --
store.dispatch({
    type: 'RESET'
});

// -- set --
store.dispatch({
    type: 'SET',
    count: 101
});
