import React from 'react';
import { connect } from 'react-redux'; // we wand to connect this component to the store so that we can dispatch
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// with connect, we now have access to props.dispatch
const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
            onSubmit={(expense) => {
                // dispatch the action 'addExpense' passing in the expense
                props.dispatch(addExpense(expense));
                // redirect to the dashboard page
                props.history.push('/');
            }}
        />
    </div>
); 

export default connect()(AddExpensePage); // we don't need anything from the state, so the first () can be left empty