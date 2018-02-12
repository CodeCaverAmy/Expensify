import React from 'react';
import { connect } from 'react-redux'; // we wand to connect this component to the store so that we can dispatch
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// with connect, we now have access to props.dispatch
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className='page-header'>
                    <div className='content-container'>
                        <h1 className='page-header__title'>Add Expense</h1>
                    </div>
                </div>
                <div className='content-container'>
                    <ExpenseForm 
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage); // we don't need anything from the state, so the first () can be left empty