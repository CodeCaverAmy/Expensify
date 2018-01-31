// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({ // pass in the text value, if none sent in - set text to an empty string
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_AMOUNT
export const sortByAmount = (sortBy = 'amount') => ({
    type: 'SET_SORT_BY',
    sortBy
});

// SORT_BY_DATE
export const sortByDate = (sortBy = 'date') => ({
    type: 'SET_SORT_BY',
    sortBy
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});