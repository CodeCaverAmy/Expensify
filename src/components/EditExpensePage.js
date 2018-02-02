import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm 
                expense={props.expense}
                onSubmit={(expense) => {
                    // dispatch the action to edit the expense
                    props.dispatch(editExpense(props.expense.id, expense));
                    // redirect to the dashboard page
                    props.history.push('/');
                }}
            />
        </div>
    );
}; 

// set up mapToStateProps to give the component the current expense object
const mapToStateProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

export default connect(mapToStateProps)(EditExpensePage);