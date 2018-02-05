import filtersReducer from '../../reducers/filters';
import moment from 'moment';

// make sure default values get set first
test('should set up default values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

// SET_TEXT_FILTER
test('should set text filter', () => {
    const text = 'This is my filter';
    const action = { 
        type: 'SET_TEXT_FILTER', 
        text 
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

// SET_SORT_BY date
test('should set sort by date', () => {
    const currentState = { 
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const action = { type: 'SET_SORT_BY', sortBy: currentState.sortBy };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

// SET_SORT_BY amount
test('should set sort by amount', () => {
    const currentState = { 
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = { type: 'SET_SORT_BY', sortBy: currentState.sortBy };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('amount');
});

// SET_START_DATE
test('should set start date', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(state, action);
    expect(state.startDate).toEqual(startDate);
});

// SET_END_DATE
test('should set end date', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(state, action);
    expect(state.endDate).toEqual(endDate);
});
