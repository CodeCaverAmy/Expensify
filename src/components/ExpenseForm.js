import 'react-dates/initialize';
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// moment is the standard for dates
const now = moment();
console.log(now.format('MMMM Do, YYYY'));

export default class ExpenseForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(), // timestamp
            calendarFocused: false,
            error: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        // validate the amount .. 1) must be a number 2) can only have 2 decimals
        // using REGEX ... ^\d*(\.\d{0,2})?$ -- stars with a digit, followed by unlimited digits, optinal . followed by 0-2 digits, no more ($)
        if (amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    };
    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }));
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    render() {
        return (
            <div>
                <form>
                    <input 
                        type='text' 
                        placeholder='Description'
                        autoFocus
                        value={this.state.description} // read only value
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type='text'
                        placeholder='Amount'
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder='Add a note for your expense (optional)'
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>
                        Add Expense
                    </button>
                </form>
            </div>
        );
    }
}