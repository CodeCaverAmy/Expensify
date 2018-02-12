import 'react-dates/initialize';
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// moment is the standard for dates
const now = moment();
export default class ExpenseForm extends React.Component {
    // use the constructor to grab values (if they exist) and set defaults if they do not
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
        // we need to test for 'no amount' (!amount) to allow the user to clear the dat
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    };
    onDateChange = (createdAt) => {
        // check to see if there was a value, else do nothing, preventing the user from clearing the data value
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault(); // to avoid a full page refresh
        // check to see if description and amount has been submitted, if not -> throw an error
        if(!this.state.description || !this.state.amount) {
            // set error state = 'Please provide description and amount'
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        } else {
            // clear the error
            this.setState(() => ({ error: '' }));
            // submit with the expense that was passed down from its parent
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, // convert string to a number and conert $ to cents
                createdAt: this.state.createdAt.valueOf(), // convert (with the help of moment) to convert to a number
                note: this.state.note
            });
        }
    };

    render() {
        return (
            <div>
                { this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.onSubmit}>
                    <input 
                        type='text' 
                        className='text-input'
                        placeholder='Description'
                        autoFocus
                        value={this.state.description} // read only value
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type='text'
                        className='text-input'
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
                        className='textarea'
                        placeholder='Add a note for your expense (optional)'
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>
                        {this.props.expense ? 'Edit' : 'Add'} Expense
                    </button>
                </form>
            </div>
        );
    }
}