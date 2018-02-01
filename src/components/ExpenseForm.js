import React from 'react';

export default class ExpenseForm extends React.Component{
    // add local state
    state = {
        description: '',
        note: '',
        amount: ''
    };
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