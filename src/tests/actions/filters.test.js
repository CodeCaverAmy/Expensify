import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';

// test set text filter
test('should generate set text filter object with text value', () => {
    const text='filter'
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('should generate set text filter object with default falue', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

// test sort by amount
test('should generate set action object for sort by', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SET_SORT_BY',
        sortBy: 'amount'
    });
});

// test sort by date
test('should generate set action object for sort by', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SET_SORT_BY',
        sortBy: 'date'
    });
});

// test setStartDate
test('should generate set start date action object', () => {
    const action = setStartDate(moment(0)); // 1/1/1970
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

// test setEndDate
test('should generate set end date action object', () => {
    const action = setEndDate(moment(0)); // 1/1/1970
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});
