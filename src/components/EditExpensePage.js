import React from 'react';
import { connect } from 'react-redux'; // we want to connect this component to the redux store
import ExpenseForm from './ExpenseForm'; // we need the expense form so that we can use it in our component
import { editExpense, removeExpense } from '../actions/expenses'; // we need access to the editExpense action

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm 
                expense={props.expense} // send in the expense into the Expense Form
                onSubmit={(expense) => {
                    // dispatch the action to edit the expense
                    props.dispatch(editExpense(props.expense.id, expense));
                    // redirect to the dashboard page
                    props.history.push('/');
                }}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({id: props.expense.id }));
                // redirect to the dashboard page
                props.history.push('/');
            }}>Remove</button>
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