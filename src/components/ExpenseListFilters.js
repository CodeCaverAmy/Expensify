import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

// since we need to add state to track the DateChangerPicker, our original stateless component needs to now become  a class based component
export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => { // called by the react-dates-libraty with an object with startDate and endDate
        // when the dates change use the actions setStartDate and setEndDate to send to the Redux store
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => { // gets the new value and sets it
        this.setState(() => ({ calendarFocused })); // pass in the updater function by implicitly returning the object calendarFocused: calendarFocues
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount();
        }
    };
    render() {
        return (
            <div>
                <input 
                    type='text' 
                    value={this.props.filters.text} 
                    onChange={this.onTextChange}/>
                <select 
                    value={this.props.filters.sortBy} 
                    onChange={this.onSortChange}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}    // required
                    startDateId="startDateFilter"               // required,
                    endDate={this.props.filters.endDate}        // required
                    endDateId="endDateFilter"                   // required,
                    onDatesChange={this.onDatesChange}          // required
                    focusedInput={this.state.calendarFocused}   // required
                    onFocusChange={this.onFocusChange}          // rquired
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);