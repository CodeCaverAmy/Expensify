import { createStore } from 'redux';

// Action Generators - functions taht return action objects

// const incrementCount = () => {
//     return {
//         type: 'INCREMENT'
//     };
// }

// --- same as vvv by wrapping the object {} in parenthesis ({ ... })//
// const incrementCount = () => ({
//     type: 'INCREMENT'
// })

// --- passing payload object in as an argument
// const incrementCount = (payload = {}) => ({
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// })

// using desctructuring .. the objet passed in (payload) can be replaced by { } with the properties inside
const incrementCount = ({ incrementBy = 1 } = {}) => ({ // increment default is 1
    type: 'INCREMENT',
    //incrementBy: typeof incrementBy === 'number' ? incrementBy : 1
    // incrementBy: incrementBy
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET',
})

const setCount = ( { count } = {} ) => ({
    type: 'SET',
    count
})

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
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
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }))

// // -- decrement ---
// store.dispatch({
//     type: 'DECREMENT'
// });

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }));

// -- reset --
store.dispatch(resetCount());

// -- set --
store.dispatch(setCount({ count: 57 }));
