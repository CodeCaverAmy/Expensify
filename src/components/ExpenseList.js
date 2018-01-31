import React from 'react';
import { connect } from 'react-redux'; // import named export connect, connecting our component to the Redux store
import ExpenseListItem from './ExpenseListItem';
import SelectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => { // pass in updater function
            return <ExpenseListItem key={expense.id} {...expense} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
}

// create  new const for the HOC
export default connect(mapStateToProps)(ExpenseList); // connect gives something back - a function 

