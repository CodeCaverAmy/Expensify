import moment from 'moment';

// Filters Reducer
const filtersReducersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), // start at beginning of month
    endDate: moment().endOf('month') // end at the end of the month
};

export default (state = filtersReducersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            // return a new object, getting all of the current values for state (current filter object) 
            return {
                ...state,
                text: action.text // override text, setting it to the text passed in
            };
        case 'SET_SORT_BY':
            // return a new object, getting all of the current values for state (filter object) and set sortBy
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            // return a new object, getting all of the current values for state, and set start Date
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            // return a new object, getting all of the current values for state, and set start Date
            return {
                ...state,
                endDate: action.endDate
            };
        default: 
            return state;
    }
};
