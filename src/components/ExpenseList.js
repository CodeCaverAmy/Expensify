import React from 'react';
import { connect } from 'react-redux'; // import named export connect, connecting our component to the Redux store
import ExpenseListItem from './ExpenseListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>

            ) : (
                props.expenses.map((expense) => { 
                    return <ExpenseListItem key={expense.description} {...expense} />
                })            
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
};

// create  new const for the HOC
export default connect(mapStateToProps)(ExpenseList); // connect gives something back - a function 

